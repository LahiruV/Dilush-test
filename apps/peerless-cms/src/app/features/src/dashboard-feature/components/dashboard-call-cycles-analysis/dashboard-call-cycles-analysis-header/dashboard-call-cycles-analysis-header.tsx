import React, { useEffect } from "react";
import { Card } from "@progress/kendo-react-layout";
import './dashboard-call-cycles-analysis-header.css';
import { GetAllCallCyclesCountById } from '@peerless/queries';
import { RootState, setCallCycleAnalysisTableFilters, setisCallCyclesAnalysisListFetchChart } from '@peerless-cms/store';
import { useDispatch, useSelector } from 'react-redux';
import { CallCyclesAnalysisParameters, RenderStatusContentTable } from "@peerless/models";
import { getDate, statusRenderFunction } from "@peerless/common";
import { IndeterminateSpinner, PieChart } from "@peerless/controls";

const CallCyclesAnalysisHeader: React.FC = () => {
    const dispatch = useDispatch();
    const { callCyclesStartDate, callCyclesEndDate, isCallCyclesAnalysisListFetchChart, selectedOriginatorCallCyclesAnalysis, childOriginatorsCallCyclesAnalysis, callCycleAnalysisTableFilters } = useSelector((state: RootState) => state.dashboardCallCyclesAnalysis);

    const payload: CallCyclesAnalysisParameters = {
        originator: selectedOriginatorCallCyclesAnalysis.userName,
        sStartDate: getDate(new Date(callCyclesStartDate)),
        sEndDate: getDate(new Date(callCyclesEndDate)),
        repType: selectedOriginatorCallCyclesAnalysis.repType,
        isIncludeContact: false,
        orderBy: 'lead_name ASC',
        additionalParams: ``,
        childOriginators: ` ${childOriginatorsCallCyclesAnalysis}`,
        leadId: 0,
        callCyclesAnalysisFilterFilterPara: callCycleAnalysisTableFilters,
    };

    const { callCyclesCountByIDData, status, error } = GetAllCallCyclesCountById(payload, isCallCyclesAnalysisListFetchChart)

    const renderStatusContent = {
        isRenderStatusContentTable: true,
        status: status,
        isFetch: isCallCyclesAnalysisListFetchChart,
        error: error,
        setStateFunction: setisCallCyclesAnalysisListFetchChart,
        isStatusOutput: false
    } as RenderStatusContentTable;

    const categories = callCyclesCountByIDData?.map((item: any) => item.callCycle.description) || [];
    const seriesData = callCyclesCountByIDData?.map((item: any) => item.callCycle.noOfLeadCustomers) || [];
    const seriesColors = callCyclesCountByIDData?.map((item: any) => item.colourCode) || [];

    const series = [
        {
            data: seriesData,
            color: seriesColors,
        }
    ];

    const chartSize = categories.length <= 3
        ? { width: 900, height: 270 }
        : categories.length <= 30
            ? { width: 900, height: 310 }
            : { width: 900, height: 380 };


    useEffect(() => {
        dispatch(setCallCycleAnalysisTableFilters({
            callCycle: { value: null, matchMode: 'contains' },
            dueOn: { value: null, matchMode: 'contains' },
            organization: { value: null, matchMode: 'contains' },
            rep: { value: null, matchMode: 'contains' },
            leadStage: { value: null, matchMode: 'contains' },
            address: { value: null, matchMode: 'contains' },
            city: { value: null, matchMode: 'contains' },
            state: { value: null, matchMode: 'contains' },
            postCode: { value: null, matchMode: 'contains' }
        }))
    }, []);

    return (
        <div>
            <Card>
                <div className="dashboard-call-analysis-container">
                    <div className="pie-chart-container-call-analysis">
                        <div className="pie-chart-wrapper-call-analysis">
                            <PieChart categories={categories} series={series} legendPosition={"bottom"} legendAlign={"center"} width={chartSize.width} height={chartSize.height} renderStatusContent={renderStatusContent} />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CallCyclesAnalysisHeader;

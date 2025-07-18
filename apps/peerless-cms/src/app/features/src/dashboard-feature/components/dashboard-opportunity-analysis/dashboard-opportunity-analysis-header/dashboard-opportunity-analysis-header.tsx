import React, { useEffect } from "react";
import { Card } from "@progress/kendo-react-layout";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import './dashboard-opportunity-analysis-header.css';
import { GetAllClientOpportunity } from '@peerless/queries';
import { RootState, setIsDashboardOpportunityAnalysisFetch, setIsDashboardOpportunityAnalysisFetchHeader } from '@peerless-cms/store';
import { useSelector } from 'react-redux';
import { ClientOpportunity, OpportunityAnalysisParameters, RenderStatusContentTable } from "@peerless/models";
import { IndeterminateSpinner, PieChart } from "@peerless/controls";
import { customer_color, enduser_color, lead_color } from "@peerless-cms/theme";
import { statusRenderFunction, useClearQueryCache } from "@peerless/common";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardOpportunityAnalysisHeader: React.FC = () => {
    const { loggedUser } = useSelector((state: RootState) => state.header);
    const { opportunityStage, isDashboardOpportunityAnalysisFetch, selectedOriginatorOpportunityAnalysis, opportunityAnalysisTableFilters, isDashboardOpportunityAnalysisFetchHeader } = useSelector((state: RootState) => state.dashboardOpportunityAnalysis);

    const { clearCache } = useClearQueryCache();

    const payload: OpportunityAnalysisParameters = {
        childOriginators: ` (originator = '${selectedOriginatorOpportunityAnalysis.userName}')`,
        defaultDepartmentId: loggedUser.defaultDepartmentId,
        sStartDate: null,
        orderBy: 'close_date asc',
        additionalParams: ``,
        ignorePagination: false,
        opportunityAnalysisFilterPara: opportunityAnalysisTableFilters,
    };

    const { responseData: allClientOpportunityData, error, status } = GetAllClientOpportunity(payload, opportunityStage.value, isDashboardOpportunityAnalysisFetchHeader)

    useEffect(() => {
        return () => { clearCache(['all-client-opportunity-analysis-list']); }
    }, [])

    if (!allClientOpportunityData || allClientOpportunityData[0].count === 0 && allClientOpportunityData[1].count === 0 && allClientOpportunityData[2].count === 0 && allClientOpportunityData[0].value === 0 && allClientOpportunityData[1].value === 0 && allClientOpportunityData[2].value === 0 && allClientOpportunityData[0].tonnes === 0 && allClientOpportunityData[1].tonnes === 0 && allClientOpportunityData[2].tonnes === 0 && allClientOpportunityData[0].units === 0 && allClientOpportunityData[1].units === 0 && allClientOpportunityData[2].units === 0) {
        return null;
    }

    const data = (type: string): ClientOpportunity => {
        return allClientOpportunityData?.find((item) => item.opportunityOwner === type) || {
            opportunityOwner: type,
            value: 0,
            count: 0,
            units: 0,
            tonnes: 0
        };
    };

    const opportunityData = {
        lead: data('Lead'),
        customer: data('Customer'),
        endUser: data('End User')
    };

    const lead = opportunityData.lead;
    const customer = opportunityData.customer;
    const endUser = opportunityData.endUser;

    const tableData = [
        ["", "Lead", "Customer", "End User", "Total"],
        ["Number Of Opportunities", lead.count, customer.count, endUser.count, lead.count + customer.count + endUser.count],
        ["Total $", `$${lead.value}`, `$${customer.value}`, `$${endUser.value}`, `$${(lead.value + customer.value + endUser.value).toFixed(2)}`],
        ["Total Units", lead.units, customer.units, endUser.units, endUser.units + customer.units + lead.units],
        ["Total Tonnes", lead.tonnes.toFixed(2), customer.tonnes.toFixed(2), endUser.tonnes.toFixed(2), (endUser.tonnes + customer.tonnes + lead.tonnes).toFixed(2)],
    ];
    const categories = [" Lead ", " Customer ", " End User"]
    const series = [
        {
            data: [lead.value, customer.value, endUser.value],
            color: [lead_color, customer_color, enduser_color],
        }
    ];

    const renderStatusContent = {
        isRenderStatusContentTable: true,
        status: status,
        isFetch: isDashboardOpportunityAnalysisFetchHeader,
        error: error,
        setStateFunction: setIsDashboardOpportunityAnalysisFetchHeader,
        isStatusOutput: true
    } as RenderStatusContentTable;

    if (renderStatusContent?.isRenderStatusContentTable) {
        const statusOutput = statusRenderFunction.renderStatusContentTable(renderStatusContent.status, renderStatusContent.isFetch, renderStatusContent.error, renderStatusContent.setStateFunction);
        if (renderStatusContent.isStatusOutput && statusOutput) {
            if (statusOutput === 'Loading...') {
                return (
                    <div className="status-output">
                        <IndeterminateSpinner />
                    </div>
                );
            }
            if (!renderStatusContent.isHideClickFilterMessage) {
                return (
                    <div className="status-output" style={{ display: 'flex', justifyContent: 'center', marginTop: '15px', fontSize: '13px' }}>
                        {statusOutput}
                    </div>
                );
            }
        }
    }

    return (
        <div>
            <Card>
                <div className="dashboard-oppo-analysis-container">
                    <div className="pie-chart-container-oppo-analysis">
                        <div className="pie-chart-wrapper-oppo-analysis">
                            <PieChart categories={categories} series={series} legendPosition={"bottom"} legendAlign={"center"} width={240} height={240} />
                        </div>
                    </div>
                    <div className="table-container-oppo-analysis">
                        <table className="custom-table-oppo-analysis">
                            <thead>
                                <tr>
                                    {tableData[0].map((header, index) => (
                                        <th
                                            key={index}
                                            className={`header-cell ${index === 0 ? 'first-column-cell' : ''}`}
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.slice(1).map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                            <td
                                                key={cellIndex}
                                                className={`data-cell ${cellIndex === 0 ? 'first-column-cell' : ''} ${cellIndex === 1 ? 'second-column-cell' : ''} ${cellIndex === 2 ? 'third-column-cell' : ''} ${cellIndex === 3 ? 'fourth-column-cell' : ''} ${cellIndex === 4 ? 'last-column-cell' : ''}`}
                                            >
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default DashboardOpportunityAnalysisHeader;

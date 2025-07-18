import React from "react";
import { Card } from "@progress/kendo-react-layout";
import './dashboard-oppotunity-conversion-header.css';
import { RootState } from '@peerless-cms/store';
import { useSelector } from 'react-redux';
import { GetLeaderCustomerOpportunityCount } from "@peerless/queries";
import { LeaderCustomerOpportunityParameters } from "@peerless/models";
import { getDate } from "@peerless/common";
import { BarChart } from "@peerless/controls";

const OpportunityConversionHeader: React.FC = () => {

    const { loggedUser } = useSelector((state: RootState) => state.header);
    const { opportunityConversionStartDate, opportunityConversionEndDate, opportunityConversionState, opportunityConversionMarket, isLeaderCustomerOpportunityFetchCount, selectedOriginatorOpportunityConversion, childOriginatorsOpportunityConversion } = useSelector((state: RootState) => state.dashBoarOpportunityConversion);

    const payload: LeaderCustomerOpportunityParameters = {
        originator: loggedUser.userName,
        childOriginators: ` ${childOriginatorsOpportunityConversion}`,
        market: opportunityConversionMarket.value,
        state: opportunityConversionState.value,
        repType: selectedOriginatorOpportunityConversion.repType,
        sStartDate: getDate(new Date(opportunityConversionStartDate)),
        sEndDate: getDate(new Date(opportunityConversionEndDate)),
        orderBy: ``,
        ignorePagination: false,
    };

    const { LeaderCustomerOpportunityCountData } = GetLeaderCustomerOpportunityCount(payload, 5, isLeaderCustomerOpportunityFetchCount);

    const categories = LeaderCustomerOpportunityCountData?.map((item: any) => item.originator) || [];
    const seriesData = LeaderCustomerOpportunityCountData?.map((item: any) => item.amount) || [];
    const seriesColors = LeaderCustomerOpportunityCountData?.map((item: any) => item.colourCode) || [];

    const series = [
        {
            data: seriesData,
            color: seriesColors,
        }
    ];

    if (categories.length === 0) {
        return null;
    }

    return (
        <div>
            <Card>
                <div className="dashboard-opportunity-conversion-container">
                    <div className="bar-chart-container-opportunity-conversion">
                        <div className="bar-chart-wrapper-opportunity-conversion">
                            <BarChart categories={categories} series={series} legendPosition="bottom" legendAlign="center" displayLegend={false} />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default OpportunityConversionHeader;

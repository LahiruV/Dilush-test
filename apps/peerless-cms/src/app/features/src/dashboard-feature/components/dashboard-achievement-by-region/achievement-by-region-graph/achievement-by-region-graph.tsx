import React, { useMemo } from 'react';
import './achievement-by-region-graph.css';
import { useSelector } from 'react-redux';
import { RootState, setIsAcByRegFilters } from '@peerless-cms/store';
import { GetSalesAchievement } from '@peerless/queries';
import { BarChartV2 } from '@peerless/controls';
import { RenderStatusContentTable } from '@peerless/models';

interface ChartData {
    labels: string[];
    datasets: Array<{
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
    }>;
}

const AchievementByRegionGraph: React.FC = () => {
    const { acByRegAchievementRadio, acByRegFiltersReq, acByRegMonthDropdown, acByRegSalesDropdown, acByRegYearDropdown, isAcByRegFilters } = useSelector((state: RootState) => state.dashboardAchievementByRegion);
    const { responseData: acByRegionData, status, error } = GetSalesAchievement(acByRegFiltersReq, parseInt(acByRegAchievementRadio), acByRegMonthDropdown.value, acByRegSalesDropdown.value, acByRegYearDropdown.value, isAcByRegFilters);
    const chartData = useMemo((): ChartData => {
        const data: ChartData = {
            labels: [],
            datasets: [
                { label: 'Actual', data: [], backgroundColor: '#59BD89', borderColor: '#59BD89' },
                { label: 'Target', data: [], backgroundColor: '#F4BB41', borderColor: '#F4BB41' },
                { label: 'Variant', data: [], backgroundColor: '#4A65F6', borderColor: '#4A65F6' }
            ],
        };

        acByRegionData?.forEach((item: any) => {
            if (item && item.region) {
                const trimmedRegion = item.region.trim();
                if (!data.labels.includes(trimmedRegion)) {
                    data.labels.push(trimmedRegion);
                }
                const datasetIndex = data.datasets.findIndex((d: { label: string }) => d.label === item.type);
                if (datasetIndex !== -1 && item.amount >= 0) {
                    const regionIndex = data.labels.indexOf(trimmedRegion);
                    data.datasets[datasetIndex].data[regionIndex] = item.amount;
                }
            }
        });

        return data;
    }, [acByRegionData]);

    const renderStatusContent = {
        isRenderStatusContentTable: true,
        status: status,
        isFetch: isAcByRegFilters,
        error: error,
        setStateFunction: setIsAcByRegFilters,
        isStatusOutput: true
    } as RenderStatusContentTable;

    return (
        <div>
            <BarChartV2 chartData={chartData} legendPosition='bottom' renderStatusContent={renderStatusContent} />
        </div>
    );
};

export default AchievementByRegionGraph;




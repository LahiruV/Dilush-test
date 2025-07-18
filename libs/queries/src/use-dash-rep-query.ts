
import { getAxiosInstance } from '@peerless/services';
import { useQuery } from '@tanstack/react-query';
import { DashboardAPI } from '@peerless/utils';


type ChartData = {
    categories: string[];
    series: { name: string; data: number[]; color: string }[];
    userTypeSelect: any;
};

type SalesData = {
    monthName: string;
    [key: string]: string | number;
};

type RepTemplate = {
    template: string;
    originator: string;
};

const transformData = (
    data: SalesData[],
    filterKey: keyof SalesData,
    valueKey: keyof SalesData,
    filterValues: [string, string],
    seriesNames: [string, string],
    colors: [string, string],
    userTypeSelect: any
): ChartData => {
    const filteredData = (filterValue: string) => data.filter(item => item[filterKey] === filterValue);

    return {
        categories: filteredData(filterValues[0]).map(item => item.monthName),
        series: [
            {
                name: seriesNames[0],
                data: filteredData(filterValues[0]).map(item => item[valueKey] as number),
                color: colors[0]
            },
            {
                name: seriesNames[1],
                data: filteredData(filterValues[1]).map(item => item[valueKey] as number),
                color: colors[1]
            }
        ],
        userTypeSelect
    };
};

const fetchData = async (url: string, params: any) => {
    const response = await getAxiosInstance().get(url, { params });
    return response.data;
};

export const fetchLoadVisitsChart = (selectedOriginator: any, dropSelectVisit: any, userTypeSelect: any, year: any) => {

    const getLoadVisitsChart = async (selectedOriginator: any, dropSelectVisit: any, userTypeSelect: any, year: any) => {
        const params = {
            type: dropSelectVisit.value,
            year: year,
            repCode: selectedOriginator.userName,
        };
        const data = await fetchData(DashboardAPI.Get_Visits_Chart, params);
        const transformedData = transformData(data, 'yearCaption', 'noOfVisits', ["This Year", "Last Year"], ["This Year", "Last Year"], ['#3498db', '#2ecc71'], userTypeSelect);
        return transformedData;
    };

    const { data: visitsChartData, error: isVisitsChartError, isLoading: isVisitsChartLoad, isPending, isFetching, refetch } = useQuery({
        queryKey: ['visitsChartData', selectedOriginator, dropSelectVisit, userTypeSelect],
        queryFn: () => getLoadVisitsChart(selectedOriginator, dropSelectVisit, userTypeSelect, year),
    });

    return {
        visitsChartData,
        isVisitsChartError,
        isVisitsChartLoad,
        isPending,
        isFetching,
        refetch,
    };
};

export const fetchLoadSalesChart = (selectedOriginator: any, dropSelectSales: any, cusSalesRadio: any, userTypeSelect: any, selectedOriginatorReptype: any) => {

    const getchLoadSalesChart = async (selectedOriginator: any, dropSelectSales: any, cusSalesRadio: any, userTypeSelect: any, selectedOriginatorReptype: any) => {
        const params = {
            type: cusSalesRadio,
            repCode: selectedOriginator.userName,
            salesValueType: dropSelectSales.value,
            isBakeryRep: selectedOriginatorReptype,
        };
        const data = await fetchData(DashboardAPI.Get_Sales_Chart, params);
        const transformedData = transformData(data, 'year', 'noOfSales', ["This Year", "Last Year"], ["This Year", "Last Year"], ['#3498db', '#2ecc71'], userTypeSelect);
        return transformedData;
    };

    const { data: cusSalesChartData, error: isCusSalesChartError, isLoading: isCusSalesChartLoad, isPending, isFetching, refetch } = useQuery({
        queryKey: ['cusSalesChartData', selectedOriginator, dropSelectSales, cusSalesRadio, userTypeSelect, selectedOriginatorReptype],
        queryFn: () => getchLoadSalesChart(selectedOriginator, dropSelectSales, cusSalesRadio, userTypeSelect, selectedOriginatorReptype),
    });

    return {
        cusSalesChartData,
        isCusSalesChartError,
        isCusSalesChartLoad,
        isPending,
        isFetching,
        refetch,
    };
};

export const fetchLoadContributionTargetAchievmentChart = (conTargetAchievmentRadio: any, dropSelectCTAchive: any, repTemplateDrop: any, userTypeSelect: any) => {

    const getLoadContributionTargetAchievmentChart = async (conTargetAchievmentRadio: any, dropSelectCTAchive: any, repTemplateDrop: any, userTypeSelect: any) => {
        if (!repTemplateDrop) {
            return { categories: [], series: [], userTypeSelect: {} };
        }
        const params = {
            template: repTemplateDrop,
            graphType: dropSelectCTAchive.value,
            valueType: conTargetAchievmentRadio,
        };
        const data = await fetchData(DashboardAPI.Get_Contribution_Target_Achievment_Chart, params);
        const transformedData = transformData(data, 'type', 'value', ["GP", "Target"], ["CONTRIBUTION", "TARGET"], ['#3498db', '#2ecc71'], userTypeSelect);
        return transformedData;
    };

    const { data: contributionTargetAchievmentChartData, error: isContributionTargetAchievmentError, isLoading: isContributionTargetAchievmentLoad, isPending, isFetching, refetch } = useQuery({
        queryKey: ['contributionTargetAchievmentChartData', conTargetAchievmentRadio, dropSelectCTAchive, repTemplateDrop],
        queryFn: () => getLoadContributionTargetAchievmentChart(conTargetAchievmentRadio, dropSelectCTAchive, repTemplateDrop, userTypeSelect),
    });

    return {
        contributionTargetAchievmentChartData,
        isContributionTargetAchievmentError,
        isContributionTargetAchievmentLoad,
        isPending,
        isFetching,
        refetch,
    };
};

export const fetchLoadGPContributionGraphChart = (selectedOriginator: any, repTemplateDrop: any, userTypeSelect: any) => {

    const getLoadGPContributionGraphChart = async (selectedOriginator: any, repTemplateDrop: any, userTypeSelect: any) => {
        if (!repTemplateDrop) {
            return { categories: [], series: [], userTypeSelect: {} };
        }
        const params = {
            repCode: selectedOriginator.userName,
            chartType: 1,
            isPriorPeriod: false,
            template: repTemplateDrop,
        };
        const data = await fetchData(DashboardAPI.Get_GPContribution_Graph_Chart, params);
        const transformedData = transformData(data, 'type', 'value', ["Contribution", "GP"], ["CONTRIBUTION", "NET SALES"], ['#3498db', '#2ecc71'], userTypeSelect);
        return transformedData;
    };


    const { data: gPContributionsChartData, error: isGPContributionError, isLoading: isGPContributionLoad, isPending, isFetching, refetch } = useQuery({
        queryKey: ['gPContributionsChartData', selectedOriginator, repTemplateDrop],
        queryFn: () => getLoadGPContributionGraphChart(selectedOriginator, repTemplateDrop, userTypeSelect),
    });

    return {
        gPContributionsChartData,
        isGPContributionError,
        isGPContributionLoad,
        isPending,
        isFetching,
        refetch,
    };
};

export const fetchGetPerformanceWidgetsForQTD = (repTemplateDrop: any) => {

    const getPerformanceWidgetsForQTD = async (repTemplateDrop: any) => {
        if (!repTemplateDrop) {
            return [];
        }
        const params = {
            template: repTemplateDrop,
        };
        const data = await fetchData(DashboardAPI.Get_Performance_Widgets_For_QTD, params);
        return data;
    };

    const { data: performanceWidgetsQTDData, error: isPerformanceWidgetsQTDError, isLoading: isPerformanceWidgetsQTDLoad, isPending, isFetching, refetch } = useQuery({
        queryKey: ['performanceWidgetsQTDData', repTemplateDrop],
        queryFn: () => getPerformanceWidgetsForQTD(repTemplateDrop),
    });

    return {
        performanceWidgetsQTDData,
        isPerformanceWidgetsQTDError,
        isPerformanceWidgetsQTDLoad,
        isPending,
        isFetching,
        refetch,
    };
};

export const fetchGetPerformanceWidgets = (selectedOriginator: any, selectedOriginatorReptype: any) => {

    const getPerformanceWidgets = async (selectedOriginator: any, selectedOriginatorReptype: any) => {
        const params = {
            rep: selectedOriginator.userName,
            isBakeryRep: selectedOriginatorReptype,
        };
        const data = await fetchData(DashboardAPI.Get_Performance_Widgets, params);
        return data;
    };

    const { data: performanceWidgetsData, error: isPerformanceWidgetsError, isLoading: isPerformanceWidgetsLoad, isPending, isFetching, refetch } = useQuery({
        queryKey: ['performanceWidgetsData', selectedOriginator],
        queryFn: () => getPerformanceWidgets(selectedOriginator, selectedOriginatorReptype),
    });

    return {
        performanceWidgetsData,
        isPerformanceWidgetsError,
        isPerformanceWidgetsLoad,
        isPending,
        isFetching,
        refetch,
    };
};

export const fetchRepTemplate = (selectedOriginator: any) => {

    const getRepTemplate = async (selectedOriginator: any) => {
        const params = {
            originator: selectedOriginator.userName,
        };
        const data = await fetchData(DashboardAPI.Get_Rep_Template, params);
        const templates = data.map((item: RepTemplate) => item.template);
        return templates;
    };

    const { data: repTemplateData, error: isRepTemplateError, isLoading: isRepTemplateLoad, isPending, isFetching, refetch } = useQuery({
        queryKey: ['repTemplateData', selectedOriginator],
        queryFn: () => getRepTemplate(selectedOriginator),
    });

    return {
        repTemplateData,
        isRepTemplateError,
        isRepTemplateLoad,
        isPending,
        isFetching,
        refetch,
    };
};
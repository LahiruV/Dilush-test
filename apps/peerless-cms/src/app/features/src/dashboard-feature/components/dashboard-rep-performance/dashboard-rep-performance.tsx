import SectionMainBase from "../../../lib/section-main-base";
import { useEffect, useState } from "react";
import './dashboard-rep-performance.css';
import 'hammerjs';
import RepWidgetCard from "./widgetcard/dashboard-rep-performance-widget-card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@peerless-cms/store";
import { setRepTemplateDataList, setRepTemplateDrop } from '@peerless-cms/store';
import HeaderDropDown from "./header-dropdown/header-dropdown";
import { fetchGetPerformanceWidgets, fetchGetPerformanceWidgetsForQTD, fetchLoadContributionTargetAchievmentChart, fetchLoadGPContributionGraphChart, fetchLoadSalesChart, fetchLoadVisitsChart, fetchRepTemplate } from '@peerless/queries';
import RepTopLeftChart from "./main-components/dashboard-rep-tl-chart";
import RepTopRightChart from "./main-components/dashboard-rep-tr-chart";
import RepBottomLeftChart from "./main-components/dashboard-rep-bl-chart";
import RepBottomRightChart from "./main-components/dashboard-rep-br-chart";
import { ChartData, DropDownData, WidgetData } from "@peerless/models";

const selectorUserTypeData = [
    { text: "All", id: 1, value: 'all' },
    { text: "Customer", id: 2, value: 'customer' },
    { text: "End User", id: 3, value: 'enduser' }
];

const dropDownDataVisit = [
    { text: "Visit to Customer", id: 1, value: 2 },
    { text: "Visit to End Users", id: 2, value: 1 },
    { text: "Customer Acquisitions", id: 3, value: 3 },
    { text: "End User Acquisitions", id: 4, value: 4 }
];

const dropDownDataSales = [
    { text: "Sales in Tonnes", value: 2, id: 1 },
    { text: "Sales in Dollars", value: 1, id: 2 },
];

const dropDownDataCTAchive = [
    { text: "Financial Year", id: 1, value: 1 },
    { text: "Current Quarter", id: 2, value: 2 },
    { text: "Current Month", id: 3, value: 3 },
    { text: "Previous Financial Year", id: 4, value: 4 },
    { text: "Previous Quarter", id: 5, value: 5 },
    { text: "Previous Month", id: 6, value: 6 },
];

export function DashboardRepPerformance() {

    const year = new Date().getFullYear().toString();
    const dispatch = useDispatch();

    const { selectedOriginator, selectedOriginatorReptype } = useSelector((state: RootState) => state.header);
    const { repTemplateDrop } = useSelector((state: RootState) => state.dashoardRep);
    const [userTypeSelect, setUserTypeSelect] = useState<DropDownData>(selectorUserTypeData[0]);
    const [loadSalesChartData, setLoadSalesChartData] = useState<ChartData>({ categories: [], series: [], userTypeSelect: {} });
    const [visitChartData, setVisitChartData] = useState<ChartData>({ categories: [], series: [], userTypeSelect: {} });
    const [conTargetAchievmentChartData, setConTargetAchievmentChartData] = useState<ChartData>({ categories: [], series: [], userTypeSelect: {} });
    const [gPContributionChartData, setGPContributionChartData] = useState<ChartData>({ categories: [], series: [], userTypeSelect: {} });
    const cusDropDownData = dropDownDataVisit.filter(item => item.id === 1 || item.id === 3);
    const endDropDownData = dropDownDataVisit.filter(item => item.id === 2 || item.id === 4);
    const [dropSelectVisit, setDropSelectVisit] = useState<DropDownData>(dropDownDataVisit[0]);
    const [dropSelectSales, setDropSelectSales] = useState<DropDownData>(dropDownDataSales[0]);
    const [dropSelectCTAchive, setDropSelectCTAchive] = useState<DropDownData>(dropDownDataCTAchive[0]);
    const [cusSalesRadio, setCusSalesRadio] = useState<string>("1");
    const [conTargetAchievmentRadio, setConTargetAchievmentRadio] = useState<string>("1");
    const [dropDownDisabled, setDropDownDisabled] = useState(false);
    const [performanceWidgetData, setPerformanceWidgetData] = useState<WidgetData[]>([]);
    const [performanceWidgetQTDData, setPerformanceWidgetQTDData] = useState<WidgetData[]>([]);

    const { visitsChartData, isVisitsChartError } = fetchLoadVisitsChart(selectedOriginator, dropSelectVisit, userTypeSelect, year);
    const { cusSalesChartData, isCusSalesChartError } = fetchLoadSalesChart(selectedOriginator, dropSelectSales, cusSalesRadio, userTypeSelect, selectedOriginatorReptype);
    const { contributionTargetAchievmentChartData, isContributionTargetAchievmentError } = fetchLoadContributionTargetAchievmentChart(conTargetAchievmentRadio, dropSelectCTAchive, repTemplateDrop, userTypeSelect);
    const { gPContributionsChartData, isGPContributionError } = fetchLoadGPContributionGraphChart(selectedOriginator, repTemplateDrop, userTypeSelect);
    const { performanceWidgetsQTDData, isPerformanceWidgetsQTDError } = fetchGetPerformanceWidgetsForQTD(repTemplateDrop);
    const { performanceWidgetsData, isPerformanceWidgetsError } = fetchGetPerformanceWidgets(selectedOriginator, selectedOriginatorReptype);
    const { repTemplateData, isRepTemplateError } = fetchRepTemplate(selectedOriginator);

    useEffect(() => {
        if (repTemplateData) {
            dispatch(setRepTemplateDataList(repTemplateData));
            dispatch(setRepTemplateDrop(repTemplateData[0]));
        }
    }, [repTemplateData])

    const getDropDownDataVisits = () => {
        switch (userTypeSelect.value) {
            case "customer":
                return cusDropDownData;
            case "enduser":
                return endDropDownData;
            default:
                return dropDownDataVisit;
        }
    };

    useEffect(() => {
        const chartDataMapping = [
            { data: visitsChartData, setFunction: setVisitChartData },
            { data: cusSalesChartData, setFunction: setLoadSalesChartData },
            { data: contributionTargetAchievmentChartData, setFunction: setConTargetAchievmentChartData },
            { data: gPContributionsChartData, setFunction: setGPContributionChartData },
            { data: performanceWidgetsQTDData, setFunction: setPerformanceWidgetQTDData },
            { data: performanceWidgetsData, setFunction: setPerformanceWidgetData },
        ];
        chartDataMapping.forEach(({ data, setFunction }) => {
            if (data) {
                setFunction(data);
            }
        });
    }, [visitsChartData, cusSalesChartData, contributionTargetAchievmentChartData, gPContributionsChartData, performanceWidgetsQTDData, performanceWidgetsData]);

    useEffect(() => {
        if (isCusSalesChartError || isVisitsChartError || isContributionTargetAchievmentError || isGPContributionError || isPerformanceWidgetsQTDError || isPerformanceWidgetsError || isRepTemplateError) {
            console.error('Error fetching data');
        }
    }, [isCusSalesChartError, isVisitsChartError, isContributionTargetAchievmentError, isGPContributionError, isPerformanceWidgetsQTDError, isPerformanceWidgetsError, isRepTemplateError]);

    useEffect(() => {
        if (userTypeSelect.value === "customer") {
            setCusSalesRadio("1");
            setDropDownDisabled(false);
        } else if (userTypeSelect.value === "enduser") {
            setCusSalesRadio("2");
            setDropDownDisabled(true);
        } else {
            setCusSalesRadio("1");
            setDropDownDisabled(false);
        }
        const selectedData = getDropDownDataVisits();
        setDropSelectVisit(selectedData[0]);
    }, [userTypeSelect]);

    const main = (
        <div className='content'>
            <RepWidgetCard
                performanceWidgetData={performanceWidgetData}
                performanceWidgetQTDData={performanceWidgetQTDData}
            />
            <div className="charts-rep-container">

                <RepBottomLeftChart
                    setDropSelectCTAchive={setDropSelectCTAchive}
                    setConTargetAchievmentRadio={setConTargetAchievmentRadio}
                    conTargetAchievmentRadio={conTargetAchievmentRadio}
                    conTargetAchievmentChartData={conTargetAchievmentChartData}
                    dropSelectCTAchive={dropSelectCTAchive}
                />

                <RepBottomRightChart
                    gPContributionChartData={gPContributionChartData}
                />

                <RepTopLeftChart
                    setDropSelectVisit={setDropSelectVisit}
                    userTypeSelect={userTypeSelect}
                    dropSelectVisit={dropSelectVisit}
                    visitChartData={visitChartData}
                />

                <RepTopRightChart
                    setDropSelectSales={setDropSelectSales}
                    setCusSalesRadio={setCusSalesRadio}
                    setDropDownDisabled={setDropDownDisabled}
                    dropSelectSales={dropSelectSales}
                    cusSalesRadio={cusSalesRadio}
                    dropDownDisabled={dropDownDisabled}
                    loadSalesChartData={loadSalesChartData}
                    userTypeSelect={userTypeSelect}
                />

            </div>
        </div>
    );

    const header = (
        <div className="dashbaord-rep-header-container">
            <HeaderDropDown
                year={year}
                selectorUserTypeData={selectorUserTypeData}
                userTypeSelect={userTypeSelect}
                setUserTypeSelect={setUserTypeSelect}
            />
        </div>
    );

    return <SectionMainBase header={header} main={main}></SectionMainBase>;
}

export default DashboardRepPerformance;
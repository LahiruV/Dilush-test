import { BarChartV2, HeaderFilterContainer, ListTable } from "@peerless-cms/features-common-components";
import { RootState, setDebtorChartData, setIsSalesHistoryFetch, setSalesHistoryChartData, setSetDebtorTotalSales, setSetSalesHistoryTotalSales, setTriggerCustomerSalesHistoryFiltersFormSubmit } from "@peerless-cms/store";
import { useDispatch, useSelector } from "react-redux";
import './customer-sales-history.css';
import { format } from "date-fns";
import SectionMainBase from "../../../lib/section-main-base";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { getCustomerOutstandingDeliveryList, useDebtorData, useDeliveryData, useSalesData } from "@peerless/queries";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { DataGrid } from "@peerless/controls";
import { SalesHistoryGrid } from "@peerless/common";
import { RenderStatusContentTable } from "@peerless/models";
import { contactTypeName } from "@peerless/utils";
import { CustomerSalesHistoryFilters } from "./customer-sales-history-filters";

export interface CustomerSalesHistoryProps { }

export function CustomerSalesHistory(props: CustomerSalesHistoryProps) {
    const { ref, inView } = useInView({ triggerOnce: false });
    const dispatch = useDispatch();
    let salesHistoryTotal: any = 0;
    const { selectedLeedOrCustomer, contactType } = useSelector((state: RootState) => ({
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
        contactType: state.leedsAndCustomers.selectedContactType,
    }));
    const { outstandingOrderType, salesHistoryBy, isSalesHistoryFetch, cusSalesOrderType, cusCurrentOrCompleted, cusCatalogueType } = useSelector((state: RootState) => (state.customerPageFilters));

    const chartSalesAxis: any = {
        yLabel: 'Sales',
    }

    const chartDebtorsAxis: any = {
        yLabel: 'Outstandings $',
        xLabel: 'Days'
    }

    const generateSalesChart = (salesHistoryChartData: any) => {
        let colors = ['#003399', '#ffff66', '#ff0000', '#339900'];
        if (salesHistoryBy.text === 'Dollar') {
            let salesDataDollar: any = {
                labels: [salesHistoryChartData.xLabel_FirstMonth, salesHistoryChartData.xLabel_SecondMonth, salesHistoryChartData.xLabel_ThirdMonth, salesHistoryChartData.xLabel_FourthMonth],
                datasets: [{
                    label: '',
                    data: [salesHistoryChartData.dollar1, salesHistoryChartData.dollar2, salesHistoryChartData.dollar3, salesHistoryChartData.dollar4],
                    backgroundColor: colors,
                    borderColor: ''
                }]
            };
            salesHistoryTotal = ((salesHistoryChartData.dollar1 + salesHistoryChartData.dollar2 + salesHistoryChartData.dollar3) / 13);
            return <BarChartV2 chartData={salesDataDollar} displayLegend={false} axisLabels={chartSalesAxis} />;
        }
        else if (salesHistoryBy.text === 'Tonnes') {
            let salesDataTonnes: any = {
                labels: [salesHistoryChartData.xLabel_FirstMonth, salesHistoryChartData.xLabel_SecondMonth, salesHistoryChartData.xLabel_ThirdMonth, salesHistoryChartData.xLabel_FourthMonth],
                datasets: [{
                    label: '',
                    data: [salesHistoryChartData.tonnes1, salesHistoryChartData.tonnes2, salesHistoryChartData.tonnes3, salesHistoryChartData.tonnes4],
                    backgroundColor: colors,
                    borderColor: ''
                }]
            };
            salesHistoryTotal = ((salesHistoryChartData.tonnes1 + salesHistoryChartData.tonnes2 + salesHistoryChartData.tonnes3) / 13);
            return <BarChartV2 chartData={salesDataTonnes} displayLegend={false} axisLabels={chartSalesAxis} />;
        }
        else {
            let salesDataUnits: any = {
                labels: [salesHistoryChartData.xLabel_FirstMonth, salesHistoryChartData.xLabel_SecondMonth, salesHistoryChartData.xLabel_ThirdMonth, salesHistoryChartData.xLabel_FourthMonth],
                datasets: [{
                    label: '',
                    data: [salesHistoryChartData.unit1, salesHistoryChartData.unit2, salesHistoryChartData.unit3, salesHistoryChartData.unit4],
                    backgroundColor: colors,
                    borderColor: ''
                }]
            };
            salesHistoryTotal = ((salesHistoryChartData.unit1 + salesHistoryChartData.unit2 + salesHistoryChartData.unit3) / 13);
            return <BarChartV2 chartData={salesDataUnits} displayLegend={false} axisLabels={chartSalesAxis} />;
        }
    }

    const date = new Date();
    const formattedDate = format(date, 'yyyy/MM/dd');
    const { data: salesGraphData, error: salesGraphError, isLoading: isSalesGraphLoading } = useSalesData(selectedLeedOrCustomer.customerCode, formattedDate);

    let salesChart;
    if (isSalesGraphLoading)
        salesChart = <FontAwesomeIcon icon={fa.faChartBar} className="loading-icon" fade />;

    if (salesGraphData) {
        salesChart = generateSalesChart(salesGraphData);
    }

    const { data: debtorGraphData, error: debtorGraphError, isLoading: isDebtorGraphLoading } = useDebtorData(selectedLeedOrCustomer.customerCode);

    let debtorChart;
    if (isDebtorGraphLoading)
        debtorChart = <FontAwesomeIcon icon={fa.faChartBar} className="loading-icon" fade />;

    if (debtorGraphData) {
        let debtorDataUnits: any = {
            labels: ['CUR', '30', '60', '90', 'OVER'],
            datasets: [{
                label: '',
                data: [debtorGraphData.dCur, debtorGraphData.d30, debtorGraphData.d60, debtorGraphData.d90, debtorGraphData.dOver],
                backgroundColor: '#ff6600',
                borderColor: ''
            }]
        };
        debtorChart = <BarChartV2 chartData={debtorDataUnits} displayLegend={false} axisLabels={chartDebtorsAxis} />;
    }

    const { data: deliveryData, error: deliveryError, isLoading: isDeliveryLoading } = useDeliveryData(selectedLeedOrCustomer.customerCode);

    let lasDeliveryDate;
    let deliveryCount;
    if (isDeliveryLoading) {
        lasDeliveryDate = <FontAwesomeIcon icon={fa.faSpinner} spin />;
        deliveryCount = <FontAwesomeIcon icon={fa.faSpinner} spin />;
    }

    if (deliveryData) {
        lasDeliveryDate = deliveryData.lastDeliverDate ?? '-';
        deliveryCount = deliveryData.outstandingDeliveries ?? '-';
    }

    let args = {
        StartIndex: 1,
        RowCount: 50
    }

    const payload = { args: args, custCode: selectedLeedOrCustomer.customerCode, marketType: outstandingOrderType.value, loadData: isSalesHistoryFetch, loadInInit: false, orderType: cusSalesOrderType.value, viewType: cusCurrentOrCompleted.value, catType: cusCatalogueType.value };
    const { customerOutstandingData, error: newError, status: newStatus, fetchNextPage, isFetchingNextPage, hasNextPage } = getCustomerOutstandingDeliveryList(payload);

    const columns = [
        { name: 'Order No', selector: (row: any) => row.sOrderNo, sortable: true, width: '192px' },
        { name: 'Req. Date', selector: (row: any) => format(new Date(row.dateRequired), 'MMMM dd, yyyy'), sortable: true, width: '140px' },
        { name: 'Cat. Code', selector: (row: any) => row.catlogCode, sortable: true },
        { name: 'Qty', selector: (row: any) => row.requiredQty, sortable: true },
        { name: 'Price', selector: (row: any) => row.price, sortable: true },
        { name: 'Description', selector: (row: any) => row.description, sortable: true },
        { name: 'Order Date', selector: (row: any) => format(new Date(row.orderDate), 'MMMM dd, yyyy'), sortable: true, width: '140px' },
    ];


    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage().then(result => {
            }).catch(error => {
                console.error("Error fetching next page");
            });
        }
    }, [fetchNextPage, inView]);

    const renderStatusContent: RenderStatusContentTable = {
        isRenderStatusContentTable: true,
        status: newStatus,
        isFetch: isSalesHistoryFetch,
        error: newError,
        setStateFunction: setIsSalesHistoryFetch,
        isStatusOutput: true
    };

    let salesHistoryGrid = new SalesHistoryGrid();

    const handleExternalSubmit = () => {
        dispatch(setTriggerCustomerSalesHistoryFiltersFormSubmit(true));
    };

    const header = (
        <HeaderFilterContainer title="Sales History" icon={fa.faChartLine} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
            <CustomerSalesHistoryFilters isFiltersOpen={isFiltersOpen} isClearFilters={isClearFilters} setIsActiveFilters={setIsActiveFilters} />
        )}
            onFilterClick={handleExternalSubmit}
            isFetching={isSalesHistoryFetch}
            titleInlineBeforeElements={
                <>
                    {contactTypeName[contactType]}
                    <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
                </>
            }
            titleInlineAfterElements={
                <>
                    <span className="font-light">&nbsp; | &nbsp;</span>
                    <span className="section-title font-light sub-heading-clipped">{`(${selectedLeedOrCustomer.name})`}</span>
                </>
            }
        />
    );

    const main = (
        <div className="sales-history-container">
            <div className="graphs-container">
                <div className="graph-left">
                    <span className="left-title">Last 3 Months Sales</span>
                    {salesChart}
                    <div className="graph-footer-info">
                        {(isSalesGraphLoading) ? '' : <span className="graph-footer-label">
                            Avg. Wk. Sales: {salesHistoryTotal.toFixed(2)} ({salesHistoryBy?.text})
                        </span>}
                    </div>
                </div>
                <div className="graph-right">
                    <span className="right-title">Debtors Barometer</span>
                    {debtorChart}
                    <div className="graph-footer-info">
                        {(isDebtorGraphLoading) ? '' : <span className="graph-footer-label">
                            Total($): {debtorGraphData?.dTotal}
                        </span>}
                    </div>
                </div>
            </div>
            <div className="table-bottom">
                <span className="bottom-title">Outstanding Orders</span>
                {/* <ListTable columns={columns} data={customerOutstandingData} rowIdColumn={"orderID"} renderStatusContent={renderStatusContent} /> */}
                <DataGrid dataTable={salesHistoryGrid} data={customerOutstandingData} renderStatusContent={renderStatusContent} />
                <div ref={ref} style={{ height: '1px' }} />
                <div className="delivery-info">
                    <div className="delivery-row">
                        <span className="label">Last Delivery</span>
                        <span className="value-label last-delivery">{lasDeliveryDate}</span>
                    </div>
                    <div className="delivery-row">
                        <span className="label">Outstanding Deliveries</span>
                        <span className="value-label outstanding-deliveries">{deliveryCount}</span>
                    </div>
                </div>
            </div>
        </div>
    )

    return <SectionMainBase header={header} main={main}></SectionMainBase>;
}
import { RootState, setIsBusinessSalesEnqListFetch } from '@peerless-cms/store';
import { statusRenderFunction } from '@peerless/common';
import { IndeterminateSpinner, KendoDataGridWidget } from '@peerless/controls';
import { RenderStatusContentTable, SalesInfoDetailParameters } from '@peerless/models';
import { GetSalesInfoDetailViewState } from '@peerless/queries';
import { GridCellProps } from '@progress/kendo-react-grid';
import { useSelector } from 'react-redux';
import { dashBusinessDColumns, dashBusinessTColumns, dashBusinessUColumns } from './dashboard-business-sales-enquiry-table-col';
import './dashboard-business-sales-enquiry-table.css';

interface DashBoardBusinessSalesEnquiryTableProps {
    heightOffset?: number;
}

const DashBoardBusinessSalesEnquiryTable: React.FC<DashBoardBusinessSalesEnquiryTableProps> = ({ heightOffset }) => {
    const { businessSalesEnqSales, businessSalesEnqSortBy, businessSalesEnqGroupBy, isBusinessSalesEnqListFetch, selectedOriginatorBusinessSalesEnquiry, businessSalesmarket, businessSalesiCostPeriod, businessSalesYear } = useSelector((state: RootState) => state.dashBoardBusinessSalesEnquiry);
    const payload = {
        args: {
            rowCount: 200000,
            startIndex: 1,
            orderBy: "",
            additionalParams: "",
            repCode: selectedOriginatorBusinessSalesEnquiry.userName
        },
        busSalesEnqSrc: {
            cDisplayOption: businessSalesEnqSales.value,
            sLastFlag: businessSalesYear.value,
            detailType: businessSalesEnqGroupBy.value,
            catalogType: "F",
            repType: "F",
            backeryOption: 0,
            iCostPeriod: businessSalesiCostPeriod && businessSalesiCostPeriod.value ? parseInt(businessSalesiCostPeriod.value) : 0,
            sortField: businessSalesEnqSortBy.value,
            market: businessSalesmarket && businessSalesmarket.value ? businessSalesmarket.value : "",
        }
    } as SalesInfoDetailParameters

    const { businessSalesEnqSalesData, error, status } = GetSalesInfoDetailViewState(payload, 999999, isBusinessSalesEnqListFetch);

    const renderStatusContent = {
        isRenderStatusContentTable: true,
        status: status,
        isFetch: isBusinessSalesEnqListFetch,
        error: error,
        setStateFunction: setIsBusinessSalesEnqListFetch,
        isStatusOutput: true
    } as RenderStatusContentTable
        ;
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
            <KendoDataGridWidget
                className="kendo-header-green"
                data={
                    businessSalesEnqSalesData && businessSalesEnqSalesData.length > 0
                        ? businessSalesEnqSalesData[0]?.lstCustomizedTableGrid || []
                        : []
                }
                columns={
                    businessSalesEnqSales && businessSalesEnqSales.value
                        ? (businessSalesEnqSales.value === 'D')
                            ? dashBusinessDColumns(
                                businessSalesEnqGroupBy,
                                businessSalesEnqSalesData && businessSalesEnqSalesData[0]?.salesMonthNamelst
                                    ? businessSalesEnqSalesData[0].salesMonthNamelst
                                    : []
                            )
                            : (businessSalesEnqSales.value === 'T')
                                ? dashBusinessTColumns(
                                    businessSalesEnqGroupBy,
                                    businessSalesEnqSalesData && businessSalesEnqSalesData[0]?.salesMonthNamelst
                                        ? businessSalesEnqSalesData[0].salesMonthNamelst
                                        : []
                                )
                                : dashBusinessUColumns(
                                    businessSalesEnqGroupBy,
                                    businessSalesEnqSalesData && businessSalesEnqSalesData[0]?.salesMonthNamelst
                                        ? businessSalesEnqSalesData[0].salesMonthNamelst
                                        : []
                                )
                        : []
                }
                pageable={false}
                sortable={false}
                filterable={false}
                lockFirstColumn={true}
                pageSize={999999}
                maxHeight={heightOffset?.toString()}
                isRowSelectable={true}
            />
        </div>

    );
};

export default DashBoardBusinessSalesEnquiryTable;

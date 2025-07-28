import { CustomCell } from "@peerless/controls";
import { getFormattedDateTime } from "../functions";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class SalesEnquiryOutStandingEnquiryListDistributer extends BaseGrid {
    MAIN_GRID_ID = 'product';

    hasRowExpansionTemplate(): boolean {
        return false;
    }

    getColumns(): gridColumn {
        return {
            idColumn: this.MAIN_GRID_ID,
            columns: [
                {
                    field: 'orderNo', header: 'Order No', sortable: false, filter: true, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '50px' }, filterPlaceholder: "Filter By Order No", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.orderNo,
                        styles: { backgroundColor: rowData.columnColours?.orderNoColour },
                    })
                },
                {
                    field: 'customerCode', header: 'Cust Code', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '50px' }, filterPlaceholder: "Filter By Cust Code", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.customerCode,
                        styles: { backgroundColor: rowData.columnColours?.customerCodeColour },
                    })
                },
                {
                    field: 'name', header: 'Name', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '270px' }, filterPlaceholder: "Filter By Name", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.name,
                        styles: { backgroundColor: rowData.columnColours?.nameColour },
                    })
                },
                {
                    field: 'plistNo', header: 'Plist No', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '50px' }, filterPlaceholder: "Filter By Plist No", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.plistNo,
                        styles: { backgroundColor: rowData.columnColours?.plistNoColour },
                    })
                },
                {
                    field: 'customerOrderNo', header: 'Cust Ord No', sortable: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, filter: true, style: { width: '50px' }, filterPlaceholder: "Filter By Cust Ord No", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.customerOrderNo,
                        styles: { backgroundColor: rowData.columnColours?.customerOrderNoColour },
                    })
                },
                {
                    field: 'creditStatus',
                    header: 'Credit Status',
                    sortable: false,
                    filter: false,
                    headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' },
                    filterPlaceholder: "Filter By Credit Status",
                    filterMatchMode: 'contains',
                    style: { width: '50px' },
                    body: (rowData: any) => {
                        const creditStatusMap: { [key: string]: string } = {
                            '02': 'Account in terms',
                            '03': 'Account out of terms : Refer to Accounts Receivable Officer',
                            '04': 'Customer no longer in business : Refer to Accounts Receivable Officer',
                            '05': 'Approval to release one order only',
                            '06': 'Cash Before Delivery / Order to Order Account',
                            '07': 'Export Customer : Refer to Accounts Receivable Officer',
                            '08': 'Customer not traded in last 12 months : Refer to Accounts Receivable Officer',
                            '09': 'Legal Account : Refer to National Credit & Admin Manager',
                            '10': 'Account review credit limit/terms : Refer to Accounts Receivable Officer',
                            '11': '30 Days from invoice date : Refer to Accounts Receivable Officer',
                            '12': '7 Days from invoice date : Refer to Accounts Receivable Officer',
                            '13': 'New Zealand Foodservice',
                        };

                        const dynamicWidth = rowData.creditStatus === '02' ? '110px' : rowData.creditStatus === '05' ? '200px' : rowData.creditStatus === '05' ? '200px' : '370px';

                        return CustomCell({
                            value: creditStatusMap[rowData.creditStatus] || rowData.creditStatus,
                            styles: { backgroundColor: rowData.columnColours?.statusColour,
                            width: dynamicWidth },
                        });
                    },
                },
                {
                    field: 'product', header: 'Product', sortable: false, filter: true, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '50px' }, filterPlaceholder: "Filter By Product", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.product,
                        styles: {backgroundColor: rowData.columnColours?.productColour},
                    })
                },
                {
                    field: 'description', header: 'Description', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '300px' }, filterPlaceholder: "Filter By Description", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.description,
                        styles: { backgroundColor: rowData.columnColours?.descriptionColour },
                    })
                },
                {
                    field: 'netAmount', header: 'Net Amount', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '50px' }, filterPlaceholder: "Filter By Net Amount", filterMatchMode: 'contains', align: 'right',
                    body: (rowData: any) => CustomCell({
                        value: Number(rowData.netAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        styles: { backgroundColor: rowData.columnColours?.netAmountColour },
                    })
                },
                {
                    field: 'orderDate', header: 'Order Date', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '100px' }, filterPlaceholder: "Filter By Order Date", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: getFormattedDateTime(rowData.orderDate),
                    })
                },
                {
                    field: 'orderQty', header: 'Order Qty', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '50px' }, filterPlaceholder: "Filter By Order Qty", filterMatchMode: 'contains', align: 'right',
                    body: (rowData: any) => CustomCell({
                        value: Number(rowData.orderQty).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        styles: { backgroundColor: rowData.columnColours?.orderQtyColour },
                    }),
                },
                {
                    field: 'dateRequired', header: 'Date Required', sortable: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, filter: false, style: { width: '100px' }, filterPlaceholder: "Filter By Date Required", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: getFormattedDateTime(rowData.dateRequired),
                        styles: {backgroundColor: rowData.columnColours?.dateRequiredColour},
                    })
                },
                {
                    field: 'rsv', header: 'Rsv', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '50px' }, filterPlaceholder: "Filter By Rsv", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.rsv,
                        styles: { backgroundColor: rowData.columnColours?.rsvColour },
                    })
                },
                {
                    field: 'despatchQuantity', header: 'Desp.Qty', sortable: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, filter: false, style: { width: '50px' }, filterPlaceholder: "Filter By Desp.Qty", filterMatchMode: 'contains', align: 'right',
                    body: (rowData: any) => CustomCell({
                        value: Number(rowData.despatchQuantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        styles: { backgroundColor: rowData.columnColours?.despatchQuantityColour },
                    })
                },
                {
                    field: 'invoiceNo', header: 'Invoice No', sortable: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, filter: false, style: { width: '50px' }, filterPlaceholder: "Filter By Invoice No", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.invoiceNo,
                        styles: { backgroundColor: rowData.columnColours?.invoiceNoColour },
                    })
                },
                {
                    field: 'price', header: 'Price', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '50px' }, filterPlaceholder: "Filter By Price", filterMatchMode: 'contains', align: 'right',
                    body: (rowData: any) => CustomCell({
                        value: Number(rowData.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        styles: { backgroundColor: rowData.columnColours?.priceColour },
                    })
                },
                {
                    field: 'market', header: 'Market', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '50px' }, filterPlaceholder: "Filter By Market", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.market,
                        styles: { backgroundColor: rowData.columnColours?.marketColour },
                    })
                },
                // {
                //     field: 'addressName', header: 'Address Name', sortable: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, filter: false, filterPlaceholder: "Filter By Address Name", filterMatchMode: 'contains',
                //     body: (rowData: any) => CustomCell({
                //         value: rowData.addressName,
                //         backgroundColor: rowData.columnColours?.addressNameColour,
                //     })
                // },
            ]
        }
    }

    getColumnDefaultFilters(): gridFilter {
        let filters: gridFilter = {
            orderNo: { value: null, matchMode: 'contains' },
            customerOrderNo: { value: null, matchMode: 'contains' },
            product: { value: null, matchMode: 'contains' },
        }
        return filters;
    }

    getRowExpansionTemplate(): rowExpansion | null {
        return null;
    }
    getColumnDefaultFiltersForInnerTable(): gridFilter | null {
        return null;
    }

}
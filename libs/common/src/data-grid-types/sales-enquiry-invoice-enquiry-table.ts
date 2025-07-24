import { getFormattedDateTime } from "../functions";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class SalesEnquiryInvoiceEnquiryListDistributer extends BaseGrid {
    MAIN_GRID_ID = 'catlog_Code';
    cusRepType = false;
    invRepType = true;
    constructor(cusRepType: boolean, invRepType: boolean) {
        super();
        this.cusRepType = cusRepType;
        this.invRepType = invRepType;
    }

    hasRowExpansionTemplate(): boolean {
        return false;
    }

    getColumns(): gridColumn {
        return {
            idColumn: this.MAIN_GRID_ID,
            columns: [
                { field: 'invoiceNo', header: 'Doc No', headerStyle: { color: '#495057' }, sortable: false, filter: false, filterPlaceholder: "Filter By Customer Code", filterMatchMode: 'contains' },
                { field: 'customerCode', header: 'Cust Code', sortable: false, filter: false, filterPlaceholder: "Filter By Customer Code", filterMatchMode: 'contains' },
                { field: 'dateShipped', header: 'Shipped Date', style: { width: '120px' }, sortable: false, body: (rowData: any) => getFormattedDateTime(rowData.dateShipped), filter: false, filterPlaceholder: "Filter By Shipped Date", filterMatchMode: 'contains' },
                { field: 'catalogCode', header: 'Product', sortable: false, filter: false, filterPlaceholder: "Filter By Product Code", filterMatchMode: 'contains' },
                { field: 'carrierCode', header: 'Cust Order No', sortable: false, filter: false, filterPlaceholder: "Filter By Customer Name", filterMatchMode: 'contains' },
                { field: 'customerRepCode', header: 'Rep', sortable: false, filter: false, filterPlaceholder: "Filter By Customer Name", filterMatchMode: 'contains', hidden: this.cusRepType },
                { field: 'bakeryRepCode', header: 'BK Rep', sortable: false, filter: false, filterPlaceholder: "Filter By Customer Name", filterMatchMode: 'contains', hidden: this.cusRepType },
                { field: 'invoiceRepCode', header: 'I Rep', sortable: false, filter: false, filterPlaceholder: "Filter By Customer Name", filterMatchMode: 'contains', hidden: this.invRepType },
                { field: 'dispatchedQty', header: 'Desp Qty', sortable: false, body: (rowData: any) => Math.round(rowData?.dispatchedQty * 100) / 100, filter: false, filterPlaceholder: "Filter By Desp Qty", filterMatchMode: 'contains', align: 'right', },
                { field: 'tonnes', header: 'Tonnes', sortable: false, filter: false, body: (rowData: any) => Math.round(rowData?.tonnes * 100) / 100, filterPlaceholder: "Filter By Customer Name", filterMatchMode: 'contains', align: 'right' },
                { field: 'price', header: 'Price', sortable: false, body: (rowData: any) => Math.round(rowData?.price * 100) / 100, filter: false, filterPlaceholder: "Filter By Price", filterMatchMode: 'contains', align: 'right' },
                { field: 'discountPercent', header: 'Disc', sortable: false, filter: false, filterPlaceholder: "Filter By Customer Name", filterMatchMode: 'contains' },
                { field: 'discountedPrice', header: 'Nt Price', sortable: false, filter: false, filterPlaceholder: "Filter By Customer Name", filterMatchMode: 'contains', align: 'right' },
                { field: 'netAmount', header: 'Net Amount', sortable: false, body: (rowData: any) => Math.round(rowData?.netAmount * 100) / 100, filter: false, filterPlaceholder: "Filter By Net Amount", filterMatchMode: 'contains', align: 'right' },
                { field: 'status', header: 'S', sortable: false, filter: false, filterPlaceholder: "Filter By Net Amount", filterMatchMode: 'contains' },
                { field: 'manifestNo', header: 'Manifest No', sortable: false, filter: false, filterPlaceholder: "Filter By Customer Name", filterMatchMode: 'contains' },
                { field: 'priceListNo', header: 'PList No', sortable: false, filter: false, filterPlaceholder: "Filter By Customer Name", filterMatchMode: 'contains' },
                { field: 'salesOrderNo', header: 'Order No', sortable: false, filter: false, filterPlaceholder: "Filter By Customer Name", filterMatchMode: 'contains' },
                { field: 'gstAmount', header: 'Gst Amt', sortable: false, filter: false, body: (rowData: any) => Math.round(rowData?.gstAmount * 100) / 100, filterPlaceholder: "Filter By Customer Name", filterMatchMode: 'contains', align: 'right' },
                { field: 'aa', header: '', sortable: false, filter: false, filterPlaceholder: "Filter By Customer Name", filterMatchMode: 'contains' },
            ]
        }
    }

    getColumnDefaultFilters(): gridFilter {
        let filters: gridFilter = {
            invoiceNo: { value: null, matchMode: 'contains' },
            customerCode: { value: null, matchMode: 'contains' },
            dateShipped: { value: null, matchMode: 'contains' },
            catalogCode: { value: null, matchMode: 'contains' },
            carrierCode: { value: null, matchMode: 'contains' },
            customerRepCode: { value: null, matchMode: 'contains' },
            bakeryRepCode: { value: null, matchMode: 'contains' },
            dispatchedQty: { value: null, matchMode: 'contains' },
            tonnes: { value: null, matchMode: 'contains' },
            price: { value: null, matchMode: 'contains' },
            discountPercent: { value: null, matchMode: 'contains' },
            discountedPrice: { value: null, matchMode: 'contains' },
            netAmount: { value: null, matchMode: 'contains' },
            status: { value: null, matchMode: 'contains' },
            manifestNo: { value: null, matchMode: 'contains' },
            priceListNo: { value: null, matchMode: 'contains' },
            salesOrderNo: { value: null, matchMode: 'contains' },
            gstAmount: { value: null, matchMode: 'contains' },
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
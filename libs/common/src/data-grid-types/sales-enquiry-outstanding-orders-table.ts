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
                { field: 'orderNo', header: 'Order No', sortable: false, filter: false, headerStyle: { color: '#495057' }, style: { width: '50px', color: '#008c51', fontWeight: 'bold', }, filterPlaceholder: "Filter By Order No", filterMatchMode: 'contains', },
                { field: 'customerCode', header: 'Cust Code', sortable: false, filter: false, style: { width: '50px' }, filterPlaceholder: "Filter By Cust Code", filterMatchMode: 'contains' },
                { field: 'name', header: 'Name', sortable: false, filter: false, style: { width: '270px' }, filterPlaceholder: "Filter By Name", filterMatchMode: 'contains' },
                { field: 'plistNo', header: 'Plist No', sortable: false, filter: false, style: { width: '50px' }, filterPlaceholder: "Filter By Plist No", filterMatchMode: 'contains' },
                { field: 'customerOrderNo', header: 'Cust Ord No', sortable: false, filter: false, style: { width: '50px' }, filterPlaceholder: "Filter By Cust Ord No", filterMatchMode: 'contains' },
                { field: 'area', header: 'Area', sortable: false, filter: false, style: { width: '110px' }, filterPlaceholder: "Filter By Area", filterMatchMode: 'contains' },
                { field: 'product', header: 'Product', sortable: false, filter: false, style: { width: '50px' }, filterPlaceholder: "Filter By Product", filterMatchMode: 'contains' },
                { field: 'description', header: 'Description', sortable: false, filter: false, style: { width: '300px' }, filterPlaceholder: "Filter By Description", filterMatchMode: 'contains' },
                { field: 'netAmount', header: 'Net Amount', sortable: false, filter: false, style: { width: '50px' }, filterPlaceholder: "Filter By Net Amount", filterMatchMode: 'contains', align: 'right', body: (rowData: any) => Number(rowData.netAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
                { field: 'orderDate', header: 'Order Date', sortable: false, filter: false, style: { width: '100px' }, filterPlaceholder: "Filter By Order Date", filterMatchMode: 'contains', body: (rowData: any) => getFormattedDateTime(rowData.orderDate), },
                { field: 'orderQty', header: 'Order Qty', sortable: false, filter: false, style: { width: '50px' }, filterPlaceholder: "Filter By Order Qty", filterMatchMode: 'contains', align: 'right', body: (rowData: any) => Number(rowData.orderQty).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
                { field: 'dateRequired', header: 'Date Required', sortable: false, filter: false, style: { width: '100px' }, filterPlaceholder: "Filter By Date Required", filterMatchMode: 'contains', body: (rowData: any) => getFormattedDateTime(rowData.dateRequired) },
                { field: 'rsv', header: 'Rsv', sortable: false, filter: false, style: { width: '50px' }, filterPlaceholder: "Filter By Rsv", filterMatchMode: 'contains' },
                { field: 'despatchQuantity', header: 'Desp.Qty', sortable: false, filter: false, style: { width: '50px' }, filterPlaceholder: "Filter By Desp.Qty", filterMatchMode: 'contains', align: 'right', body: (rowData: any) => Number(rowData.despatchQuantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
                { field: 'invoiceNo', header: 'Invoice No', sortable: false, filter: false, style: { width: '50px' }, filterPlaceholder: "Filter By Invoice No", filterMatchMode: 'contains' },
                { field: 'price', header: 'Price', sortable: false, filter: false, style: { width: '50px' }, filterPlaceholder: "Filter By Price", filterMatchMode: 'contains', align: 'right', body: (rowData: any) => Number(rowData.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
                { field: 'market', header: 'Market', sortable: false, filter: false, style: { width: '50px' }, filterPlaceholder: "Filter By Market", filterMatchMode: 'contains' },
                { field: 'addressName', header: 'Address Name', sortable: false, filter: false, filterPlaceholder: "Filter By Address Name", filterMatchMode: 'contains' },
            ]
        }
    }

    getColumnDefaultFilters(): gridFilter {
        let filters: gridFilter = {
            customerCode: { value: null, matchMode: 'contains' },
            name: { value: null, matchMode: 'contains' },
            product: { value: null, matchMode: 'contains' },
            description: { value: null, matchMode: 'contains' },
            rep: { value: null, matchMode: 'contains' },
            orderQty: { value: null, matchMode: 'contains' },
            price: { value: null, matchMode: 'contains' },
            netAmount: { value: null, matchMode: 'contains' },
            dateRequired: { value: null, matchMode: 'contains' },
            despatchQuantity: { value: null, matchMode: 'contains' }
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
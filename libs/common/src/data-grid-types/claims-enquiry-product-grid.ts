import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";


export class ClaimsEnquiryProductGrid extends BaseGrid {
    hasRowExpansionTemplate(): boolean {
        return false;
    }
    getColumns(): gridColumn {
        return {
            idColumn: 'catlogCode',
            columns: [
                { field: 'catlogCode', header: 'Product', headerStyle: { color: '#495057' }, style: { width: '50px', color: '#008c51', fontWeight: 'bold', }, sortable: false },
                { field: 'description', header: 'Description', style: { width: '170px' }, sortable: false },
                { field: 'ivceNo', header: 'Inv No', style: { width: '60px' }, sortable: false, filter: false, filterMatchMode: 'contains', align: 'right', },
                { field: 'promoNo', header: 'Promo No', style: { width: '70px' }, sortable: false, align: 'right', },
                { field: 'despQty', header: 'Qty', style: { width: '40px' }, sortable: false, align: 'right', },
                { field: 'uomOrder', header: 'Uom', style: { width: '70px' }, sortable: false, },
                { field: 'repCode', header: 'Rep', style: { width: '70px' }, sortable: false, },
                { field: 'price', header: 'Price', style: { width: '80px' }, sortable: false, align: 'right', body: (rowData: any) => (rowData.price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
                { field: 'gst', header: 'Gst Amt', style: { width: '80px' }, sortable: false, align: 'right', body: (rowData: any) => (rowData.gst || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
                { field: 'amount', header: 'Amount', style: { width: '70px' }, sortable: false, align: 'right', body: (rowData: any) => (rowData.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
                { field: 'totalAmount', header: 'Total', style: { width: '60px' }, sortable: false, align: 'right', body: (rowData: any) => (rowData.totalAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
                { field: 'analysisCode', header: 'Reason', style: { width: '80px' }, sortable: false, },
                { field: 'dealNo', header: 'Return #', style: { width: '70px' }, sortable: false, align: 'right', },
            ]
        }
    }
    getColumnDefaultFilters(): gridFilter | null {
        let filters: gridFilter = {
            ivceNo: { value: null, matchMode: 'contains' }
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
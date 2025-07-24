import { getDate, getFormattedDateTime } from "../functions";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class SalesEnquiryDealEnquiryListDistributer extends BaseGrid {
    MAIN_GRID_ID = 'seqNo';

    hasRowExpansionTemplate(): boolean {
        return false;
    }

    getColumns(): gridColumn {
        return {
            idColumn: this.MAIN_GRID_ID,
            columns: [
                { field: 'customerCode', header: 'Customer Code', sortable: false, headerStyle: { color: '#495057' }, style: { width: '115px', }, filter: false, filterPlaceholder: "Filter By Customer Code", filterMatchMode: 'contains' },
                { field: 'name', header: 'Name', sortable: false, filter: false, style: { width: '200px' }, filterPlaceholder: "Filter By Name", filterMatchMode: 'contains' },
                { field: 'product', header: 'Product', sortable: false, style: { width: '120px' }, filter: false, filterPlaceholder: "Filter By Product", filterMatchMode: 'contains' },
                { field: 'description', header: 'Description', sortable: false, filter: false, style: { width: '230px' }, filterPlaceholder: "Filter By Description", filterMatchMode: 'contains' },
                { field: 'effectiveFrom', header: 'Effect From', sortable: false, style: { width: '100px' }, body: (rowData: any) => getFormattedDateTime(rowData.effectiveFrom), filter: false, filterPlaceholder: "Filter By Effect From", filterMatchMode: 'contains' },
                { field: 'effectiveTo', header: 'Effect To', sortable: false, style: { width: '100px' }, body: (rowData: any) => getFormattedDateTime(rowData.effectiveTo), filter: false, filterPlaceholder: "Filter By Effect To", filterMatchMode: 'contains' },
                { field: 'minQty', header: 'MinQty', sortable: false, align: 'right', style: { width: '60px' }, body: (rowData: any) => rowData?.minQty.toFixed(2), filter: false, filterPlaceholder: "Filter By Min Qty", filterMatchMode: 'contains' },
                { field: 'dealPrice', header: 'Deal Price', sortable: false, align: 'right', style: { width: '80px' }, body: (rowData: any) => rowData?.dealPrice.toFixed(2), filter: false, filterPlaceholder: "Filter By Deal Price", filterMatchMode: 'contains' },
                { field: 'dealDiscount', header: 'Deal Discount', sortable: false, align: 'right', style: { width: '80px' }, body: (rowData: any) => rowData?.dealDiscount.toFixed(2), filter: false, filterPlaceholder: "Filter By Deal Discount", filterMatchMode: 'contains' },
                { field: 'netPrice', header: 'Net Price', sortable: false, align: 'right', style: { width: '90px' }, body: (rowData: any) => rowData?.netPrice.toFixed(2), filter: false, filterPlaceholder: "Filter By Net Price", filterMatchMode: 'contains' },
                { field: 'dealName', header: 'Deal Name', sortable: false, style: { width: '230px' }, filter: false, filterPlaceholder: "Filter By Deal Name", filterMatchMode: 'contains' },
                { field: 'status', header: 'Status', sortable: false, style: { width: '70px' }, filter: false, filterPlaceholder: "Status", filterMatchMode: 'contains' }
            ]
        }
    }

    getColumnDefaultFilters(): gridFilter {
        let filters: gridFilter = {
            customerCode: { value: null, matchMode: 'contains' },
            name: { value: null, matchMode: 'contains' },
            product: { value: null, matchMode: 'contains' },
            description: { value: null, matchMode: 'contains' },
            effectiveFrom: { value: null, matchMode: 'contains' },
            effectiveTo: { value: null, matchMode: 'contains' },
            minQty: { value: null, matchMode: 'contains' },
            dealPrice: { value: null, matchMode: 'contains' },
            dealDiscount: { value: null, matchMode: 'contains' },
            netPrice: { value: null, matchMode: 'contains' },
            dealName: { value: null, matchMode: 'contains' },
            status: { value: null, matchMode: 'contains' }
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
import { format } from "date-fns/format";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";
import { rowOptions } from "@peerless/controls";
import { getFormattedDateTime,getDate } from "../functions";
import { FilterMatchMode } from "primereact/api";


export class CustomerPriceGrid extends BaseGrid {
    MAIN_GRID_ID = 'catlogCode';
    multiSortMeta = null;
    onSortCallback = null;

     constructor(multiSortMeta: any, onSortCallback: any) {
        super();
        this.multiSortMeta = multiSortMeta;
        this.onSortCallback = onSortCallback;
    }

    hasRowExpansionTemplate(): boolean {
        return false;
    }
    getColumns(): gridColumn {
        return {
            idColumn: this.MAIN_GRID_ID,
            multiSortMeta: this.multiSortMeta,
            onSortCallback: this.onSortCallback,
             columns: [
                        { field: 'catlogCode', header: 'Product', sortable: true, style: { width: '10px' }, filter: false, filterPlaceholder: "Filter By Product", filterMatchMode: FilterMatchMode.CONTAINS },
                        { field: 'catlogDesc', header: 'Description', sortable: true, filter: false, filterPlaceholder: "Filter By Description", filterMatchMode: FilterMatchMode.CONTAINS },
                        { field: 'minQty', header: 'Min Qty', body: (rowData: any) => Number(rowData.minQty).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), sortable: true, align: 'right', style: { width: '80px' }, filter: false, filterPlaceholder: "Filter By Min Qty", filterMatchMode: FilterMatchMode.CONTAINS },
                        { field: 'discPercent', header: 'Disc $', align: 'right', sortable: true, style: { width: '80px' }, body: (rowData: any) => Number(rowData.discPercent).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), filter: false, filterPlaceholder: "Filter By Disc $", filterMatchMode: FilterMatchMode.CONTAINS },
                        { field: 'listPrice', header: 'List Price', sortable: true, align: 'right', style: { width: '105px' }, body: (rowData: any) => Number(rowData.listPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), filter: false, filterPlaceholder: "Filter By List Price", filterMatchMode: FilterMatchMode.CONTAINS },
                        { field: 'buyDateFrom', header: 'Deal From', sortable: true, style: { width: '110px' }, body: (rowData: any) => getDate(rowData.buyDateFrom), filter: false, filterPlaceholder: "Filter By Deal From", filterMatchMode: FilterMatchMode.CONTAINS },
                        { field: 'buyDateTo', header: 'Deal To', sortable: true, style: { width: '110px' }, body: (rowData: any) => getDate(rowData.buyDateTo), filter: false, filterPlaceholder: "Filter By Deal To", filterMatchMode: FilterMatchMode.CONTAINS },
                        { field: 'price', header: 'Price', sortable: true, align: 'right', style: { width: '50px' }, body: (rowData: any) => Number(rowData.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), filter: false, filterPlaceholder: "Filter By Price", filterMatchMode: FilterMatchMode.CONTAINS },
                        { field: 'dealPrice', header: 'Deal Price', align: 'right', sortable: true, style: { width: '110px' }, body: (rowData: any) => Number(rowData.dealPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), filter: false, filterPlaceholder: "Filter By Deal Price", filterMatchMode: FilterMatchMode.CONTAINS },
                        { field: 'dealDiscPercent', header: 'Deal Disc $', align: 'right', sortable: true, style: { width: '115px' }, body: (rowData: any) => Number(rowData.dealDiscPercent).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), filter: false, filterPlaceholder: "Filter By Deal Disc $", filterMatchMode: FilterMatchMode.CONTAINS },
                        { field: 'netAmount', header: 'Net Price', align: 'right', sortable: true, style: { width: '105px' }, body: (rowData: any) => Number(rowData.netAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), filter: false, filterPlaceholder: "Filter By Net Price", filterMatchMode: FilterMatchMode.CONTAINS }
                    ]
        }
    }

    getColumnDefaultFilters(): gridFilter {
            let filters: gridFilter = {
                catlogCode: { value: null, matchMode: FilterMatchMode.CONTAINS },
                description: { value: null, matchMode: FilterMatchMode.CONTAINS },
                minQty: { value: null, matchMode: FilterMatchMode.CONTAINS },
                discPercentage: { value: null, matchMode: FilterMatchMode.CONTAINS },
                listPrice: { value: null, matchMode: FilterMatchMode.CONTAINS },
                dealFrom: { value: null, matchMode: FilterMatchMode.CONTAINS },
                dealTo: { value: null, matchMode: FilterMatchMode.CONTAINS },
                price: { value: null, matchMode: FilterMatchMode.CONTAINS },
                dealPrice: { value: null, matchMode: FilterMatchMode.CONTAINS },
                dealDiscPercentage: { value: null, matchMode: FilterMatchMode.CONTAINS },
                netPrice: { value: null, matchMode: FilterMatchMode.CONTAINS },
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


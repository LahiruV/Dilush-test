import { getFormattedDateTime } from "../functions";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class OpportunityConversionBottomListDistributer extends BaseGrid {
    MAIN_GRID_ID = 'opportunityId';
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
            multiSortMeta: this.multiSortMeta,
            onSortCallback: this.onSortCallback,
            idColumn: this.MAIN_GRID_ID,
            columns: [
                { field: 'originator', header: 'Rep', sortable: true, filter: false, filterPlaceholder: "Filter By Rep", filterMatchMode: 'contains' },
                { field: 'opportunity', header: 'Opportunity', sortable: true, filter: false, filterPlaceholder: "Filter By Opportunity", filterMatchMode: 'contains' },
                { field: 'repName', header: 'Rep Name', sortable: true, filter: false, filterPlaceholder: "Filter By Rep Name", filterMatchMode: 'contains' },
                { field: 'stage', header: 'Status', sortable: true, filter: false, filterPlaceholder: "Filter By Status", filterMatchMode: 'contains' },
                { field: 'createdDate', header: 'Created Date', sortable: true, body: (rowData: any) => getFormattedDateTime(new Date(rowData.createdDate)), filter: false, filterPlaceholder: "Filter By Created Date", filterMatchMode: 'contains' },
                { field: 'amount', header: 'Amount', sortable: true, align: 'right', body: (rowData: any) => "$ " + rowData.amount, filter: false, filterPlaceholder: "Filter By Amount", filterMatchMode: 'contains', style: { width: '10px' }, },
                { field: 'tonnes', header: 'Units', sortable: true, align: 'right', body: (rowData: any) => rowData.tonnes, filter: false, filterPlaceholder: "Filter By Units", filterMatchMode: 'contains', style: { width: '10px' }, },
                { field: 'state', header: 'State', sortable: true, filter: false, filterPlaceholder: "Filter By State", filterMatchMode: 'contains' },
                { field: 'market', header: 'Market', sortable: true, filter: false, filterPlaceholder: "Filter By Market", filterMatchMode: 'contains' }
            ]
        }
    }

    getColumnDefaultFilters(): gridFilter {
        let filters: gridFilter = {
            originator: { value: null, matchMode: 'contains' },
            opportunity: { value: null, matchMode: 'contains' },
            repName: { value: null, matchMode: 'contains' },
            stage: { value: null, matchMode: 'contains' },
            createdDate: { value: null, matchMode: 'contains' },
            amount: { value: null, matchMode: 'contains' },
            tonnes: { value: null, matchMode: 'contains' },
            state: { value: null, matchMode: 'contains' },
            market: { value: null, matchMode: 'contains' }
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
import { getDate, getFormattedDateTime } from "../functions";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class EndUserTransferLogListDistributer extends BaseGrid {
    MAIN_GRID_ID = 'enduserCode';
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
                { field: 'enduserCode', header: 'End User Code', sortable: true, filter: true, filterPlaceholder: "Filter By Code", filterMatchMode: 'contains', style: { width: '200px' } },
                { field: 'enduserName', header: 'End User Name', sortable: true, filter: true, filterPlaceholder: "Filter By Name", filterMatchMode: 'contains', style: { width: '200px' } },
                { field: 'transferredOn', header: 'Transferred On', sortable: true, body: (rowData: any) => getFormattedDateTime(rowData.transferredOn), filter: true, filterPlaceholder: "Filter By Date", filterMatchMode: 'contains', style: { width: '200px' } },
                { field: 'oldCustomer', header: 'Old Customer', sortable: true, filter: true, filterPlaceholder: "Filter By Old Customer", filterMatchMode: 'contains' },
                { field: 'newCustomer', header: 'New Customer', sortable: true, filter: true, filterPlaceholder: "Filter By New Customer", filterMatchMode: 'contains', style: { width: '200px' } }
            ]
        }
    }

    getColumnDefaultFilters(): gridFilter {
        let filters: gridFilter = {
            enduserCode: { value: null, matchMode: 'contains' },
            enduserName: { value: null, matchMode: 'contains' },
            transferredOn: { value: null, matchMode: 'contains' },
            oldCustomer: { value: null, matchMode: 'contains' },
            newCustomer: { value: null, matchMode: 'contains' }
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
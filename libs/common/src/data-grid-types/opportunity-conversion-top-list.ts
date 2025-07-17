import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class OpportunityConversionTopListDistributer extends BaseGrid {
    MAIN_GRID_ID = 'name';
    footer: any = null

    constructor(footer: any) {
        super();
        this.footer = footer;
    }

    hasRowExpansionTemplate(): boolean {
        return false;
    }

    getColumns(): gridColumn {
        return {
            idColumn: this.MAIN_GRID_ID,
            columns: [
                { field: 'name', header: 'Rep', sortable: false, filter: false, filterPlaceholder: "Filter By Rep", filterMatchMode: 'contains' },
                { field: 'amount', header: 'Amount', align: 'right', sortable: false, body: (rowData: any) => "$ " + rowData?.amount.toFixed(2), filter: false, filterPlaceholder: "Filter By Amount", filterMatchMode: 'contains', style: { width: '320px' }, footer: this.footer.amount },
                { field: 'tonnes', header: 'Units', align: 'right', sortable: false, body: (rowData: any) => rowData?.tonnes.toFixed(2), filter: false, filterPlaceholder: "Filter By Units", filterMatchMode: 'contains', style: { width: '320px' }, footer: this.footer.tonnes },
                { field: 'ratio', header: 'Conversion Ratio', align: 'right', sortable: false, filter: false, filterPlaceholder: "Filter By Conversion Ratio", filterMatchMode: 'contains', style: { width: '320px', } }
            ]
        }
    }

    getColumnDefaultFilters(): gridFilter {
        let filters: gridFilter = {
            name: { value: null, matchMode: 'contains' },
            amount: { value: null, matchMode: 'contains' },
            tonnes: { value: null, matchMode: 'contains' },
            ratio: { value: null, matchMode: 'contains' },
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
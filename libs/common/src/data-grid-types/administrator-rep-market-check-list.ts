import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class AdministratorRepMarketCheckListDistributer extends BaseGrid {
    MAIN_GRID_ID = 'marketCode';

    hasRowExpansionTemplate(): boolean {
        return false;
    }

    getColumns(): gridColumn {
        return {
            idColumn: this.MAIN_GRID_ID,
            columns: [
                { field: 'marketCode', header: 'Code', style: { width: '10px' }, sortable: true, filter: true },
                { field: 'description', header: 'Description', style: { width: '1000px' }, sortable: false, filter: false },
            ]
        }
    }

    getColumnDefaultFilters(): gridFilter {
        let filters: gridFilter = {
            marketCode: { value: null, matchMode: 'contains' },
            description: { value: null, matchMode: 'contains' }
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
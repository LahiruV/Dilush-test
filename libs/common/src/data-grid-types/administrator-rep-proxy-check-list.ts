import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class AdministratorRepProxyCheckListDistributer extends BaseGrid {
    MAIN_GRID_ID = 'repCode';

    hasRowExpansionTemplate(): boolean {
        return false;
    }

    getColumns(): gridColumn {
        return {
            idColumn: this.MAIN_GRID_ID,
            columns: [
                { field: 'repCode', header: 'Rep Code', style: { width: '70px' }, sortable: true, filter: false },
                { field: 'name', header: 'Name', style: { width: '1000px' }, sortable: false, filter: false },
            ]
        }
    }

    getColumnDefaultFilters(): gridFilter {
        let filters: gridFilter = {
            repCode: { value: null, matchMode: 'contains' },
            name: { value: null, matchMode: 'contains' }
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
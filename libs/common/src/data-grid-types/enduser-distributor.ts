import { rowOptions } from "@peerless/controls";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class EnduserDistributor extends BaseGrid {
    MAIN_GRID_ID = 'customerCode';
    gridOptionCallback = null;
    isOptionsEnabled = false;

    constructor(gridOptionCallback: any, isOptionsEnabled: boolean) {
        super();
        this.gridOptionCallback = gridOptionCallback;
        this.isOptionsEnabled = isOptionsEnabled;
    }

    hasRowExpansionTemplate(): boolean {
        return false;
    }

    getColumns(): gridColumn {
        let columnDropdownOptions = [
            { label: 'Delete', type: 'delete', icon: 'pi pi-minus-circle', command: this.gridOptionCallback },
        ];

        return {
            idColumn: this.MAIN_GRID_ID,
            columns: [
                { field: 'name', header: 'Primary Distributor', style: { width: '260px' } },
                { field: 'customerCode', header: 'Code', style: { width: '100px' } },
                { field: '', header: '', body: (rowData: any) => (rowOptions(columnDropdownOptions, rowData, 'pi pi-trash')), hidden: (!this.isOptionsEnabled) },
                { field: '', header: '' } //empty col to align table
            ]
        }
    }

    getColumnDefaultFilters(): gridFilter | null {
        return null;
    }

    getRowExpansionTemplate(): rowExpansion | null {
        return null;
    }

    getColumnDefaultFiltersForInnerTable(): gridFilter | null {
        return null;
    }
}
import { rowOptions } from "@peerless/controls";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class AdministratorPantryListDistributer extends BaseGrid {
    MAIN_GRID_ID = 'catalogCode';
    gridOptionCallback = null;

    constructor(gridOptionCallback: any) {
        super();
        this.gridOptionCallback = gridOptionCallback;
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
                { field: 'catalogCode', header: 'Code', style: { width: '120px' }, sortable: true },
                { field: 'description', header: 'Description', style: { width: '300px' }, sortable: false },
                { field: '', header: '', body: (rowData: any) => rowOptions(columnDropdownOptions, rowData, 'pi pi-trash') }
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
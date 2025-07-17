import { rowOptions } from "@peerless/controls";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class OrganisationDistributorGrid extends BaseGrid{
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
            { label: 'Edit', type: 'edit', icon: 'pi pi-pencil', command: this.gridOptionCallback },
            { label: 'Delete', type: 'delete', icon: 'pi pi-trash', command: this.gridOptionCallback },
        ];
        
        return {
            idColumn: 'linkId',
            columns: [
                { field: 'customerCode', header: 'Customer Code', style: { width: '150px' }, sortable: false },
                { field: 'name', header: 'Name', style: { width: '250px' }, sortable: false },
                { field: '', header: '', body: (rowData: any) => rowOptions(columnDropdownOptions, rowData) }
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
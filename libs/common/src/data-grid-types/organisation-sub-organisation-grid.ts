import { rowOptions } from "@peerless/controls";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class OrganisationSubOrganisationGrid extends BaseGrid{
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
                { field: 'organisationName', header: 'Organisation Name', style: { width: '110px' }, sortable: false },
                { field: 'organisationType', header: 'Organisation Type', style: { width: '130px' }, sortable: false },
                { field: 'shortName', header: 'Short Name', style: { width: '100px' }, sortable: false },
                { field: 'acn', header: 'Acn', style: { width: '140px' }, sortable: false },
                { field: 'abn', header: 'Abn', style: { width: '140px' }, sortable: false },
                { field: 'telephone', header: 'Telephone', style: { width: '120px' }, sortable: false },
                { field: 'fax', header: 'Fax', style: { width: '70px' }, sortable: false },
                { field: 'mobile', header: 'Mobile', style: { width: '90px' }, sortable: false },
                { field: 'repCode', header: 'RepCode', style: { width: '75px' }, sortable: false },
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
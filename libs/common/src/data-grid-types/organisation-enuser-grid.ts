import { rowOptions } from "@peerless/controls";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class OrganisationEnduserGrid extends BaseGrid{
    gridOptionCallback = null;
    constructor(gridOptionCallback: any, contactType?: any) {
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
                { field: 'endUserCode', header: 'Enduser Code', style: { width: '110px' }, sortable: false },
                { field: 'name', header: 'Name', style: { width: '130px' }, sortable: false },
                { field: 'contact', header: 'Contact', style: { width: '100px' }, sortable: false },
                { field: 'address1', header: 'Address 1', style: { width: '140px' }, sortable: false },
                { field: 'address2', header: 'Address 2', style: { width: '140px' }, sortable: false },
                { field: 'city', header: 'City', style: { width: '120px' }, sortable: false },
                { field: 'state', header: 'State', style: { width: '70px' }, sortable: false },
                { field: 'postCode', header: 'Post Code', style: { width: '90px' }, sortable: false },
                { field: 'grade', header: 'Grade', style: { width: '75px' }, sortable: false },
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
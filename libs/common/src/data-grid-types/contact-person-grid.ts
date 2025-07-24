import { rowOptions } from "@peerless/controls";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";
import { contactTypeEnum } from "@peerless/utils";

export class ContactPersonGrid extends BaseGrid {
    gridOptionCallback = null;
    contactType = null;

    constructor(gridOptionCallback: any, contactType: any) {
        super();
        this.gridOptionCallback = gridOptionCallback;
        this.contactType = contactType;
    }    
    hasRowExpansionTemplate(): boolean {
        return false;
    }
    getColumns(): gridColumn {
        let columnDropdownOptions = [
            { label: 'Edit', type: 'edit', icon: 'pi pi-pencil', command: this.gridOptionCallback },
            { label: 'Retire', type: 'retireCP', icon: 'pi pi-power-off', command: this.gridOptionCallback },
        ];

        if(this.contactType != contactTypeEnum.customer){
            columnDropdownOptions = columnDropdownOptions.filter(option => option.type !== 'retireCP');
        }

        return {
            idColumn: 'contactPersonID',
            columns: [
                { field: '', header: 'Name', body: (rowData: any) => (`${rowData.title || ''} ${rowData.firstName || ''} ${rowData.lastName || ''}`.trim()), style: { width: '200px' }, sortable: false },
                { field: 'position', header: 'Position', style: { width: '200px' }, sortable: false },
                { field: 'telephone', header: 'Telephone', style: { width: '200px' }, sortable: false },
                { field: 'mobile', header: 'Mobile', style: { width: '200px' }, sortable: false },
                { field: 'emailAddress', header: 'Email', style: { width: '200px' }, sortable: false },
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
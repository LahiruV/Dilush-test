import { ChipWidget, rowOptions } from "@peerless/controls";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class EnduserListGrid extends BaseGrid {
    gridOptionCallback = null;
    //contactType: any = null;

    constructor(gridOptionCallback: any, contactType?: any) {
        super();
        this.gridOptionCallback = gridOptionCallback;
        //this.contactType = contactType;
    }
    hasRowExpansionTemplate(): boolean {
        return false;
    }
    getColumns(): gridColumn {
        let columnDropdownOptions = [
            { label: 'Edit', type: 'edit', icon: 'pi pi-pencil', command: this.gridOptionCallback },
            { label: 'Transfer', type: 'transfer', icon: 'pi pi-arrows-h', command: this.gridOptionCallback },
        ];

        return {
            idColumn: 'endUserCode',
            columns: [
                { field: 'endUserCode', header: 'Enduser Code', style: { width: '150px' }, sortable: false },
                { field: 'name', header: 'Name', style: { width: '230px' }, sortable: false },
                { field: 'contact', header: 'Contact', style: { width: '150px' }, sortable: false },
                { field: 'address1', header: 'Address 1', sortable: false },
                { field: 'address2', header: 'Address 2', sortable: false },
                { field: 'city', header: 'City', style: { width: '120px' }, sortable: false },
                { field: 'state', header: 'State', style: { width: '70px' }, sortable: false },
                { field: 'postCode', header: 'Post Code', style: { width: '90px' }, sortable: false },
                { field: 'grade', header: 'Grade', style: { width: '75px' }, sortable: false },
                { field: 'customerRefference', header: 'Cust Ref Code', style: { width: '120px' }, sortable: false },
                {
                    field: 'isActive', header: 'Status', style: { width: '120px' },
                    body: (rowData: any) => ChipWidget({
                        type: rowData.isActive == true ? 'Active' : 'Inactive',
                        className: rowData?.isActive == true ? 'lead-color-bg' : 'enduser-color-bg',
                        fontSize: '10px',
                        textAlign: 'center',
                        minWidth: '70px',
                    }),
                    sortable: false
                },
                { field: '', header: '', body: (rowData: any) => rowOptions(columnDropdownOptions, rowData), style: { width: '50px' }, }
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

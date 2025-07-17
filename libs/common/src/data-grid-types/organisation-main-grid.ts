import { rowOptions } from "@peerless/controls";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";
import { leadCustomerAreaMap } from "@peerless/utils";
import { getPiIconName } from "../functions";

export class OrganisationMainGrid extends BaseGrid {
    gridOptionCallback = null;
    onRowClick = null;
    contactType = null;

    constructor(gridOptionCallback: any, onRowClick: any, contactType: any) {
        super();
        this.gridOptionCallback = gridOptionCallback;
        this.onRowClick = onRowClick;
        this.contactType = contactType;
    }    
    hasRowExpansionTemplate(): boolean {
        return false;
    }
    getColumns(): gridColumn {
        let columnDropdownOptions = leadCustomerAreaMap[this.contactType ?? ''];
        columnDropdownOptions = columnDropdownOptions.map((item: any) => ({
            ...item,
            icon: `pi pi-${getPiIconName(item.label)}`,
            command: this.gridOptionCallback
        }));

        return {
            idColumn: 'orgnaisationID',
            columns: [
                { field: 'organisationName', header: 'Name', style: { width: '250px' } },
                { field: 'category', header: 'Category', style: { width: '150px' }, sortable: false },
                { field: 'orgTypeDescription', header: 'Type', style: { width: '100px' }, sortable: false },
                //{ field: 'contact', header: 'Contact', style: { width: '100px' }, sortable: false },
                //{ field: 'mobile', header: 'Mobile', style: { width: '100px' }, sortable: false },
                //{ field: 'telephone', header: 'Telephone', style: { width: '80px' }, sortable: false },
                //{ field: 'city', header: 'City', style: { width: '100px' }, sortable: false },
                //{ field: 'state', header: 'State', style: { width: '100px' }, sortable: false },
                { field: 'repCode', header: 'RepCode', style: { width: '100px' }, sortable: false },
                { field: 'status', header: 'Status', style: { width: '100px' }, sortable: false },
                //{ field: 'correspondence', header: 'Correspondence', style: { width: '100px' }, sortable: false },
                //{ field: 'preferredMethod', header: 'Preferred Method', style: { width: '100px' }, sortable: false },
                //{ field: 'noOfEmployees', header: 'No Of Employees', style: { width: '100px' }, sortable: false },
                //{ field: 'annualRevenue', header: 'Annual Revenue', style: { width: '100px' }, sortable: false },
                { field: '', header: '', body: (rowData: any) => rowOptions(columnDropdownOptions, rowData, null, true, this.onRowClick) }
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


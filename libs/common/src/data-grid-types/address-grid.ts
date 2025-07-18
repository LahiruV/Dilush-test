import { ChipWidget, rowOptions } from "@peerless/controls";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";
import { addressId, contactTypeEnum } from "@peerless/utils";

export class AddressGrid extends BaseGrid {
    gridOptionCallback = null;
    contactType: any = null;

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
        ];

        return {
            idColumn: addressId[this.contactType],
            columns: [
                { field: 'primaryAddressDisplay', header: 'Is Primary', style: { width: '60px' }, hidden: (this.contactType != contactTypeEnum.organisation), body: (rowData: any) => rowData?.primaryAddressDisplay ? 'Yes' : 'No' },
                { field: 'address1', header: 'Address 1', sortable: false },
                { field: 'address2', header: 'Address 2', sortable: false },
                { field: 'city', header: 'City', style: { width: '120px' }, sortable: false },
                { field: 'state', header: 'State', style: { width: '120px' }, sortable: false },
                { field: (this.contactType == contactTypeEnum.organisation ? 'postcode' : 'postCode'), header: 'Postcode', style: { width: '120px' }, sortable: false },
                { field: 'dpid', header: 'DPID', style: { width: '60px' }, sortable: false, hidden: (this.contactType != contactTypeEnum.organisation) },
                { field: 'addressName', header: 'Name', style: { width: '120px' }, sortable: false, hidden: (this.contactType != contactTypeEnum.organisation) },
                { field: 'contact', header: 'Contact', style: { width: '120px' }, sortable: false, hidden: (this.contactType != contactTypeEnum.organisation) },
                {
                    field: 'status', header: 'Status', sortable: false, hidden: (this.contactType != contactTypeEnum.customer), headerStyle: { color: '#495057' },
                    body: (rowData: any) => ChipWidget({
                        type: rowData?.status == 'A' ? 'Active' : 'Deleted  ',
                        className: rowData?.status == 'A' ? 'lead-color-bg' : 'enduser-color-bg',
                        fontSize: '10px',
                        textAlign: 'center',
                        minWidth: '70px',
                    }),
                    style: {
                        width: '100px',
                    },
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
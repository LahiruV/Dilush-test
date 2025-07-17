import { contactId, contactTypeEnum, leadCustomerAreaMap } from "@peerless/utils";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";
import { ChipWidget, rowOptions, TextWidget } from "@peerless/controls";
import { getFormattedDateTime, getPiIconName } from "../functions";

export class MainLeadListGrid extends BaseGrid {
    gridOptionCallback = null;
    contactType = null;
    onRowClick = null;
    multiSortMeta = null;
    onSortCallback = null;

    constructor(gridOptionCallback: any, contactType: any, onRowClick: any, multiSortMeta: any, onSortCallback: any) {
        super();
        this.gridOptionCallback = gridOptionCallback;
        this.contactType = contactType;
        this.onRowClick = onRowClick;
        this.multiSortMeta = multiSortMeta;
        this.onSortCallback = onSortCallback;
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
            idColumn: contactId[this.contactType ?? ''],
            multiSortMeta: this.multiSortMeta,
            onSortCallback: this.onSortCallback,
            columns: [
                {
                    field: contactId[this.contactType ?? ''], header: (this.contactType == contactTypeEnum.lead ? 'REF.No' : 'CODE'), sortable: true, style: { width: '100px' },
                    body: (rowData: any) => TextWidget({
                        text: rowData[contactId[this.contactType ?? '']],
                        className: 'bolder'
                    })
                },
                { field: 'customerName', header: 'CUSTOMER NAME', sortable: true, hidden: (this.contactType != contactTypeEnum.enduser), headerStyle: { color: '#495057' }, style: { color: '#008c51' }, },
                { field: 'name', header: 'NAME', sortable: true, headerStyle: { color: '#495057' }, style: { color: '#008c51' }, },
                // {
                //     field: 'mainAddress', header: 'ADDRESS', sortable: false,
                // },
                {
                    field: 'leadStage', header: 'LEAD STAGE', sortable: false, hidden: (this.contactType == contactTypeEnum.enduser), style: { width: '110px' },
                    body: (rowData: any) => ChipWidget({
                        type: rowData?.leadStage,
                        className: rowData?.leadStage == 'End User' ? 'enduser-color-lower-bg' : rowData?.leadStage == 'Customer' ? 'customer-color-lower-bg' : rowData?.leadStage == 'Organisation' ? 'organisation-color-lower-bg' : 'lead-color-lower-bg',
                        fontSize: '10px',
                        textAlign: 'center',
                        minWidth: '80px',
                    })
                },
                { field: 'state', header: 'STATE', sortable: false, hidden: (this.contactType != contactTypeEnum.lead), style: { width: '80px' }, },
                { field: 'city', header: 'SUBURB', sortable: false, hidden: (this.contactType != contactTypeEnum.lead), style: { width: '80px' }, },
                { field: 'grade', header: 'GRADE', sortable: false, hidden: (this.contactType != contactTypeEnum.customer), style: { width: '80px' }, },
                { field: 'grade', header: 'GRADE', sortable: false, hidden: (this.contactType != contactTypeEnum.enduser), style: { width: '80px' }, },
                { field: 'customerCategoryDescription', header: 'CUSTOMER CATEGORY', sortable: false, hidden: (this.contactType != contactTypeEnum.enduser), style: { width: '140px' }, },
                { field: 'lastActiveDate', header: 'LAST ACTIVITY DATE', body: (rowData: any) => getFormattedDateTime(rowData.endDate), sortable: false, hidden: (this.contactType != contactTypeEnum.customer), style: { width: '125px' }, },
                { field: '', header: '', body: (rowData: any) => rowOptions(columnDropdownOptions, rowData, null, true, this.onRowClick), bodyStyle: { display: 'contents', textAlign: 'right' }, style: { width: '50px' }, }
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

import { rowOptions } from "@peerless/controls";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";
import { contactTypeEnum } from "@peerless/utils";
import { getFormattedDateTime } from "../functions";

export class ActivityGrid extends BaseGrid {
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
            { label: 'Send to Calendar', type: 'sendToCalendar', icon: 'pi pi-calendar', command: this.gridOptionCallback },
        ];

        return {
            idColumn: 'activityID',
            columns: [
                { field: 'subject', header: 'Subject', style: { width: '150px' }, sortable: false },
                { field: 'customerCode', header: 'Customer Code', style: { width: '120px' }, sortable: false, hidden: (this.contactType != contactTypeEnum.enduser)  },
                { field: 'startDate', header: (this.contactType == contactTypeEnum.enduser? 'Activity Date' : 'Start Date'), style: { width: '120px' }, sortable: false, body: (rowData: any) => getFormattedDateTime(new Date(rowData.startDate)) },
                { field: 'endDate', header: 'End Date', style: { width: '120px' }, sortable: false, body: (rowData: any) => getFormattedDateTime(new Date(rowData.endDate)), hidden: (this.contactType == contactTypeEnum.enduser) },
                { field: (this.contactType == contactTypeEnum.enduser? 'statusDescription' : 'status'), header: 'Status', style: { width: '100px' }, sortable: false },
                { field: 'assignedTo', header: 'Assigned To', style: { width: '100px' }, sortable: false },
                { field: 'sentMail', header: 'Sent Mail', style: { width: '100px' }, sortable: false },
                { field: (this.contactType == contactTypeEnum.enduser? 'priorityDescription' : 'priority'), header: 'Priority', style: { width: '80px' }, sortable: false },
                { field: (this.contactType == contactTypeEnum.enduser? 'activityTypeDescription' : 'activityType'), header: 'Type', style: { width: '130px' }, sortable: false },
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
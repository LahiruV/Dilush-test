import { ChipWidget } from "@peerless/controls";
import { getFormattedDateTime } from "../functions";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class ActivityAnalysisListDistributer extends BaseGrid {
    MAIN_GRID_ID = 'activityID';
    multiSortMeta = null;
    onSortCallback = null;

    constructor(multiSortMeta: any, onSortCallback: any) {
        super();
        this.multiSortMeta = multiSortMeta;
        this.onSortCallback = onSortCallback;
    }


    hasRowExpansionTemplate(): boolean {
        return false;
    }

    getColumns(): gridColumn {
        return {
            idColumn: this.MAIN_GRID_ID,
            multiSortMeta: this.multiSortMeta,
            onSortCallback: this.onSortCallback,
            columns: [
                { field: 'leadName', header: 'Lead Name', sortable: true, filter: true, filterPlaceholder: "Filter By Name", filterMatchMode: 'contains' },
                { field: 'activityType', header: 'Activity Type', style: { width: '120px' }, sortable: true, filter: true, filterPlaceholder: "Filter By Type", filterMatchMode: 'contains' },
                {
                    field: 'leadStage', header: 'Lead Stage', style: { width: '120px' }, sortable: true, filter: true, filterPlaceholder: "Filter By Stage", filterMatchMode: 'contains',
                    body: (rowData: any) => ChipWidget({
                        type: rowData?.leadStage,
                        className: rowData?.leadStage == 'End User' ? 'enduser-color-bg' : rowData?.leadStage == 'Customer' ? 'customer-color-bg' : rowData?.leadStage == 'Organisation' ? 'organisation-color-bg' : 'lead-color-bg',
                        fontSize: '10px',
                        textAlign: 'center',
                        minWidth: '70px',
                    })
                },
                { field: 'subject', header: 'Subject', style: { width: '220px' }, sortable: true, filter: true, filterPlaceholder: "Filter By Subject", filterMatchMode: 'contains' },
                { field: 'startDate', header: 'Start Date', style: { width: '120px' }, sortable: true, body: (rowData: any) => (getFormattedDateTime(rowData?.startDate)), filter: false, filterPlaceholder: "Filter By Start Date", filterMatchMode: 'contains' },
                { field: 'endDate', header: 'End Date', style: { width: '120px' }, sortable: true, body: (rowData: any) => getFormattedDateTime(rowData.endDate), filter: false, filterPlaceholder: "Filter By End Date", filterMatchMode: 'contains' },
            ]
        }
    }

    getColumnDefaultFilters(): gridFilter {
        let filters: gridFilter = {
            leadName: { value: null, matchMode: 'contains' },
            activityType: { value: null, matchMode: 'contains' },
            leadStage: { value: null, matchMode: 'contains' },
            subject: { value: null, matchMode: 'contains' },
            startDate: { value: null, matchMode: 'contains' },
            endDate: { value: null, matchMode: 'contains' }
        }
        return filters;
    }

    getRowExpansionTemplate(): rowExpansion | null {
        return null;
    }
    getColumnDefaultFiltersForInnerTable(): gridFilter | null {
        return null;
    }

}
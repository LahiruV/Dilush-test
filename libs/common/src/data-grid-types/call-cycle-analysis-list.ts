import { ChipWidget } from "@peerless/controls";
import { getFormattedDateTime } from "../functions";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class CallCycleAnalysisListDistributer extends BaseGrid {
    MAIN_GRID_ID = 'itemIndex';
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
            multiSortMeta: this.multiSortMeta,
            onSortCallback: this.onSortCallback,
            idColumn: this.MAIN_GRID_ID,
            columns: [

                { field: 'callCycle', header: 'Call Cycle', style: { width: '120px' }, body: (rowData: any) => rowData.callCycle.description, sortable: true, filter: true, filterPlaceholder: "Filter By Call Cycle", filterMatchMode: 'contains' },
                { field: 'dueOn', header: 'Due On', style: { width: '100px' }, body: (rowData: any) => getFormattedDateTime(rowData.callCycle.dueOn), sortable: true, filter: true, filterPlaceholder: "Filter By Due Date", filterMatchMode: 'contains' },
                { field: 'organization', header: 'Organization', sortable: true, body: (rowData: any) => rowData.contact.name, filter: true, filterPlaceholder: "Filter By Organization", filterMatchMode: 'contains' },
                { field: 'rep', header: 'Rep', style: { width: '75px' }, body: (rowData: any) => rowData.originator, sortable: true, filter: true, filterPlaceholder: "Filter By Rep", filterMatchMode: 'contains' },
                {
                    field: 'leadStage', header: 'Lead Stage', style: { width: '120px' }, sortable: true, filter: true, filterPlaceholder: "Filter By Stage", filterMatchMode: 'contains',
                    body: (rowData: any) => ChipWidget({
                        type: rowData?.leadStage.stageName,
                        className: rowData?.leadStage.stageName == 'End User' ? 'enduser-color-bg' : rowData?.leadStage.stageName == 'Customer' ? 'customer-color-bg' : rowData?.leadStage.stageName == 'Organisation' ? 'organisation-color-bg' : 'lead-color-bg',
                        fontSize: '10px',
                        textAlign: 'center',
                        minWidth: '70px'
                    })
                },
                { field: 'address', header: 'Address', body: (rowData: any) => rowData.contact.address, sortable: true, filter: true, filterPlaceholder: "Filter By Address", filterMatchMode: 'contains' },
                { field: 'city', header: 'City', style: { width: '130px' }, body: (rowData: any) => rowData.contact.city, sortable: true, filter: true, filterPlaceholder: "Filter By City", filterMatchMode: 'contains' },
                { field: 'state', header: 'State', style: { width: '70px' }, body: (rowData: any) => rowData.contact.state, sortable: true, filter: true, filterPlaceholder: "Filter By State", filterMatchMode: 'contains' },
                { field: 'postCode', header: 'Post Code', style: { width: '110px' }, body: (rowData: any) => rowData.contact.postalCode, sortable: true, filter: true, filterPlaceholder: "Filter By Post Code", filterMatchMode: 'contains' },
            ]
        }
    }

    getColumnDefaultFilters(): gridFilter {
        let filters: gridFilter = {
            organization: { value: null, matchMode: 'contains' },
            leadStage: { value: null, matchMode: 'contains' },
            rep: { value: null, matchMode: 'contains' },
            callCycle: { value: null, matchMode: 'contains' },
            address: { value: null, matchMode: 'contains' },
            city: { value: null, matchMode: 'contains' },
            state: { value: null, matchMode: 'contains' },
            postCode: { value: null, matchMode: 'contains' },
            dueOn: { value: null, matchMode: 'contains' }
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
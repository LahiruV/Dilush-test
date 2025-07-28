import { ChipWidget } from "@peerless/controls";
import { getFormattedDateTime } from "../functions";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class OpportunityAnalysisDistributer extends BaseGrid {
    MAIN_GRID_ID = 'opportunityID';
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
                { field: 'leadName', header: 'Name', sortable: true, filter: true, filterPlaceholder: "Filter By Name", filterMatchMode: 'contains', style: { width: '400px' } },
                { field: 'originator', header: 'Rep', sortable: true, filter: true, filterPlaceholder: "Filter By Rep", filterMatchMode: 'contains', style: { width: '80px' } },
                { field: 'probability', header: '%', sortable: true, align: 'right', body: (rowData: any) => rowData?.probability.toFixed(2), filter: true, filterPlaceholder: "Filter By Probability", filterMatchMode: 'contains', style: { width: '80px' } },
                { field: 'amount', header: 'Amount', sortable: true, align: 'right', body: (rowData: any) => rowData?.amount.toFixed(2), filter: true, filterPlaceholder: "Filter By Amount", filterMatchMode: 'contains', style: { width: '80px' } },
                { field: 'units', header: 'Units', sortable: true, align: 'right', body: (rowData: any) => rowData?.units.toFixed(2), filter: true, filterPlaceholder: "Filter By Units", filterMatchMode: 'contains', style: { width: '80px' } },
                { field: 'tonnes', header: 'Tonnes', sortable: true, align: 'right', body: (rowData: any) => rowData?.tonnes.toFixed(2), filter: true, filterPlaceholder: "Filter By Tons", filterMatchMode: 'contains', style: { width: '80px' } },
                {
                    field: 'leadStage', header: 'Lead Stage', style: { width: '120px' }, sortable: true, filter: true, filterPlaceholder: "Filter By Stage", filterMatchMode: 'contains',
                    body: (rowData: any) => ChipWidget({
                        type: rowData?.leadStage,
                        className: rowData?.leadStage == 'End User' ? 'enduser-color-bg' : rowData?.leadStage == 'Customer' ? 'customer-color-bg' : rowData?.leadStage == 'Organisation' ? 'organisation-color-bg' : 'lead-color-bg',
                        fontSize: '10px',
                        textAlign: 'center',
                        minWidth: '70px'
                    })
                },
                { field: 'closeDate', header: 'Close Date', sortable: true, body: (rowData: any) => getFormattedDateTime(rowData.closeDate), filter: true, filterPlaceholder: "Filter By Close Date", filterMatchMode: 'contains', }
            ]
        }
    }

    getColumnDefaultFilters(): gridFilter {
        let filters: gridFilter = {
            leadName: { value: null, matchMode: 'contains' },
            originator: { value: null, matchMode: 'contains' },
            probability: { value: null, matchMode: 'contains' },
            amount: { value: null, matchMode: 'contains' },
            units: { value: null, matchMode: 'contains' },
            tonnes: { value: null, matchMode: 'contains' },
            leadStage: { value: null, matchMode: 'contains' },
            closeDate: { value: null, matchMode: 'contains' }
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
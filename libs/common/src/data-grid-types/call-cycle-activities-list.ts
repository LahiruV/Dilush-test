import { callCycleActivityAreaMap } from "@peerless/utils";
import { getPiIconName } from "../functions";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";
import { ChipWidget, rowOptions } from "@peerless/controls";

export class CallCycleActivityListDistributer extends BaseGrid {
    MAIN_GRID_ID = 'callCycleID';
    gridOptionCallback = null;
    onRowClick = null;

    constructor(gridOptionCallback: any, onRowClick: any) {
        super();
        this.gridOptionCallback = gridOptionCallback;
        this.onRowClick = onRowClick;
    }

    hasRowExpansionTemplate(): boolean {
        return false;
    }

    getColumns(): gridColumn {
        let columnDropdownOptions = callCycleActivityAreaMap.map((item: any) => ({
            ...item,
            icon: `pi pi-${getPiIconName(item.label)}`,
            command: this.gridOptionCallback
        }));
        return {
            idColumn: this.MAIN_GRID_ID,
            columns: [
                { field: 'callCycleID', header: 'Schedule Id', style: { width: '120px' }, sortable: true, filter: true, filterPlaceholder: "Filter By Name", filterMatchMode: 'contains' },
                { field: 'description', header: 'Schedule', style: { width: '200px' }, sortable: true, filter: true, filterPlaceholder: "Filter By Type", filterMatchMode: 'contains' },
                {
                    field: 'delFlag', header: 'Status', style: { width: '120px' },
                    body: (rowData: any) => ChipWidget({
                        type: rowData?.delFlag === 'N' ? 'Active' : 'Inactive',
                        className: rowData?.delFlag == 'N' ? 'active-color-bg' : 'inactive-color-bg',
                        fontSize: '10px',
                        textAlign: 'center',
                        minWidth: '70px',
                    })
                },
                { field: '', header: '', body: (rowData: any) => rowOptions(columnDropdownOptions, rowData, null, true, this.onRowClick), style: { width: '50px' } },
                { field: 'aa', header: '', }
            ]
        }
    }

    getColumnDefaultFilters(): gridFilter {
        let filters: gridFilter = {
            callCycleID: { value: null, matchMode: 'contains' },
            description: { value: null, matchMode: 'contains' },
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

import { ChipWidget } from "@peerless/controls";
import { getFormattedDateTime } from "../functions";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class LeaveListGrid extends BaseGrid {
    MAIN_GRID_ID = 'leave_id';

    hasRowExpansionTemplate(): boolean {
        return false;
    }
    getColumns(): gridColumn {
        return {
            idColumn: this.MAIN_GRID_ID,
            columns: [
                { field: 'name', header: 'Name', sortable: true, filter: false, filterPlaceholder: "Filter By Code", filterMatchMode: 'contains', style: { width: '150px', color: '#008c51' }, headerStyle: { color: '#495057' }, },
                { field: 'from_date', header: 'From Date', sortable: true, body: (rowData: any) => getFormattedDateTime(rowData.from_date), filter: false, filterPlaceholder: "Filter By Date", filterMatchMode: 'contains', style: { width: '100px' } },
                { field: 'to_date', header: 'To Date', sortable: true, body: (rowData: any) => getFormattedDateTime(rowData.to_date), filter: false, filterPlaceholder: "Filter By Date", filterMatchMode: 'contains', style: { width: '100px' } },
                {
                    field: 'leaveType', header: 'Leave Type', sortable: true, filter: false, filterPlaceholder: "Filter By Code", filterMatchMode: 'contains', style: { width: '200px' }, headerStyle: { paddingLeft: '50px' },
                    body: (rowData: any) => {
                        const leaveTypeClassMap: { [key: string]: string } = {
                            "Annual Leave": "annual-leave-color-lower-bg",
                            "Personal Leave": "personal-leave-color-lower-bg",
                            "Long Service Leave": "long-service-leave-color-lower-bg",
                            "Leave Without Pay": "leave-without-pay-color-lower-bg",
                            "Cancelled": "cancelled-leave-color-lower-bg",
                            "Other Leave": "other-leave-color-lower-bg",
                        };

                        const leaveStatusClassMap: { [key: string]: string } = {
                            "N": "pending-leave-color-lower-bg",
                            "X": "cancelled-leave-color-lower-bg",
                            "R": "declined-leave-color-lower-bg"
                        };

                        const className =
                            leaveStatusClassMap[rowData?.leaveStatus] ||
                            leaveTypeClassMap[rowData?.leaveType] ||
                            "other-leave-color-lower-bg";

                        return ChipWidget({
                            type: rowData?.leaveType,
                            className,
                            fontSize: '11px',
                            textAlign: 'center',
                            minWidth: '150px',
                        });
                    }
                },
                { field: '', header: '', sortable: false, filter: false, filterPlaceholder: "Filter By Code", filterMatchMode: 'contains', },
            ]
        };
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
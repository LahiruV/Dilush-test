import { rowOptions } from "@peerless/controls";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";
import { format } from "date-fns/format";

export class OpportunityGrid extends BaseGrid {
    gridOptionCallback = null;

    constructor(gridOptionCallback: any) {
        super();
        this.gridOptionCallback = gridOptionCallback;
    }    
    hasRowExpansionTemplate(): boolean {
        return false;
    }
    getColumns(): gridColumn {
        let columnDropdownOptions = [
            { label: 'Edit', type: 'edit', icon: 'pi pi-pencil', command: this.gridOptionCallback },
            { label: 'Delete', type: 'delete', icon: 'pi pi-trash', command: this.gridOptionCallback },
        ];

        return {
            idColumn: 'opportunityID',
            columns: [
                { field: 'name', header: 'Name', style: { width: '120px' }, sortable: false },
                { field: 'closeDate', header: 'Close Date', body: (rowData: any) => format(new Date(rowData.closeDate), 'dd/MM/yyyy'), style: { width: '120px' }, sortable: false },
                { field: 'pipelineStage', header: 'Pipeline Stage', style: { width: '110px' }, sortable: false },
                { field: 'probability', header: 'Probability', style: { width: '95px' }, sortable: false },
                { field: 'amount', header: 'Amount', style: { width: '80px' }, sortable: false },
                { field: 'description', header: 'Description', style: { width: '200px' }, sortable: false },
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
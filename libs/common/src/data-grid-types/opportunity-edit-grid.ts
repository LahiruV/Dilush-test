import { NumberEditor } from "@peerless/controls";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class OpportunityEditGrid extends BaseGrid {
    onCellEdit: any = null;
    constructor(onCellEdit: any) {
        super();
        this.onCellEdit = onCellEdit;
    }    
    hasRowExpansionTemplate(): boolean {
        return false;
    }
    getColumns(): gridColumn {
        // let columnDropdownOptions = [
        //     { label: 'Edit', type: 'edit', icon: 'pi pi-pencil', command: this.gridOptionCallback },
        //     { label: 'Delete', type: 'delete', icon: 'pi pi-trash', command: this.gridOptionCallback },
        // ];

        return {
            idColumn: 'catlogCode',
            columns: [
                { field: 'catlogCode', header: 'Product Code', style: { width: '120px' }, sortable: false },
                { field: 'description', header: 'Description', style: { width: '120px' }, sortable: false },
                { field: 'units', header: 'Units', style: { width: '110px' }, sortable: false, editor: (e: any) => NumberEditor({value: e.rowData.units, rowData: e.rowData, field: 'units', editorCallback: this.onCellEdit}) },
                { field: 'price', header: 'Price', style: { width: '95px' }, sortable: false, editor: (e: any) => NumberEditor({value: e.rowData.price, rowData: e.rowData, field: 'price', editorCallback: this.onCellEdit}) },
                // { field: '', header: '', body: (rowData: any) => rowOptions(columnDropdownOptions, rowData) }
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


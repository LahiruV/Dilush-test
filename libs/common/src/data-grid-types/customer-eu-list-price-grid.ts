import { NumberEditor, rowOptions } from "@peerless/controls";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class CustomerEUListPriceGrid extends BaseGrid {
    gridOptionCallback = null;
    isEditable: any = false;
    showDelete: any = false;
    onCellEdit: any = null;

    constructor(gridOptionCallback: any, isEditable: any, showDelete: any, onCellEdit: any) {
        super();
        this.gridOptionCallback = gridOptionCallback;
        this.isEditable = isEditable == null ? false : isEditable;
        this.showDelete = showDelete == null ? false : showDelete;
        this.onCellEdit = onCellEdit;
    }
    hasRowExpansionTemplate(): boolean {
        return false;
    }
    getColumns(): gridColumn {
        let columnDropdownOptions = [
            { label: 'Delete', type: 'delete', icon: 'pi pi-minus-circle', command: this.gridOptionCallback },
        ];

        return {
            idColumn: 'catlogCode',
            columns: [
                { field: 'catlogCode', header: 'Catlog Code', style: { width: '120px' }, sortable: false },
                { field: 'description', header: 'Description', style: { width: '200px' }, sortable: false },
                {
                    field: 'price', header: 'Price', style: { width: '170px' }, sortable: false, body: (rowData: any) => (rowData?.price ? Number(rowData.price).toFixed(2) : (0).toFixed(2)),
                    editor: (e: any) => (this.isEditable == true ? NumberEditor({ rowIndex: e.rowIndex, value: e.rowData.price, rowData: e.rowData, field: 'price', editorCallback: this.onCellEdit, className: 'custom-editor-bg', style: { marginLeft: '-9px', marginRight: '-17px' }, id: `price-editor-${e.rowIndex}`, isSelectText: true }) : Number(e.value ?? 0).toFixed(2)),
                    bodyStyle: { backgroundColor: '#fffbe7' },
                },
                this.showDelete && { field: '', header: '', body: (rowData: any) => rowOptions(columnDropdownOptions, rowData, 'pi pi-trash') }
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
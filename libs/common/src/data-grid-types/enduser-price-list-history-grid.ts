import { NumberEditor } from "@peerless/controls";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class EnduserPriceListHistoryGrid extends BaseGrid{
    onCellEdit: any = null;
    constructor(onCellEdit: any) {
        super();
        this.onCellEdit = onCellEdit;
    }    
    hasRowExpansionTemplate(): boolean {
        return false;
    }
    getColumns(): gridColumn {
        return {
            idColumn: 'seqNo',
            columns: [  
                { field: 'effectiveDateString', header: 'Effective Date', style:{ width: '100px' } }, 
                { field: 'catlogCode', header: 'Catlog Code', style:{ width: '200px' } },       
                { field: 'description', header: 'Description' }, 
                { field: 'price', header: 'Price', style:{ width: '100px' }, 
                    body: (rowData: any) => (rowData?.price ? Number(rowData.price).toFixed(2) : (0).toFixed(2)), 
                    editor:(e: any) => NumberEditor({value: e.rowData.price, rowData: e.rowData, field: 'price', editorCallback: this.onCellEdit}) },               
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
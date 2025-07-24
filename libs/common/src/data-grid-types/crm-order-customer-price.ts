import { contactTypeEnum } from "@peerless/utils";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";
import { NumberEditor } from "@peerless/controls"; 

export class CrmOrderCustomerPrice extends BaseGrid{
    MAIN_GRID_ID = 'catlog_code';    
    contactType = null;
    onCellEdit: any = null;

    constructor(contactType: any, onCellEdit: any) {
        super();         
        this.contactType = contactType;
        this.onCellEdit = onCellEdit;
        if(contactType == contactTypeEnum.enduser){
            this.MAIN_GRID_ID = 'SeqNo';
        }
    }      

    hasRowExpansionTemplate(): boolean {
        return false;
    }
    
    getColumns(): gridColumn {
        return {
            idColumn: this.MAIN_GRID_ID,
            columns: [
                { field: 'catlog_code', header: 'Catalog Code', sortable: false, style:{ width: '120px' } },
                { field: 'catlog_description', header: 'Description', sortable: false, filter: true, filterPlaceholder:"Filter by description" , filterMatchMode:'contains', style:{ width: '220px' } },
                { field: 'price', header: 'Customer Price', style:{ width: '80px' }, body: (rowData: any) => (rowData?.price ? Number(rowData.price).toFixed(2) : (0).toFixed(2)), 
                    editor: (e: any) =>  (this.contactType == contactTypeEnum.enduser ?  NumberEditor({value: e.rowData.price, rowData: e.rowData, field: 'price', editorCallback: this.onCellEdit}) : Number(e.value ?? 0).toFixed(2)) },
                { field: 'order_qty', header: 'Order Qty', style:{ width: '60px' }, body: (rowData: any) => (rowData.order_qty ? Number(rowData.order_qty) : 0 ), 
                    editor: (e: any) =>  NumberEditor({value: e.rowData.order_qty, rowData: e.rowData, field: 'order_qty', editorCallback: this.onCellEdit, id: `qty-editor-${e.rowIndex}`, isSelectText: true }, ), },
                { field: 'amount', header: 'Amount', body: (rowData: any) => Number((rowData?.price) * rowData?.order_qty).toFixed(2), }, 
            ]
        }
    }
    
    getColumnDefaultFilters(): gridFilter|null {
        return null;
    }
    getRowExpansionTemplate(): rowExpansion|null {
        return null;
    }
    getColumnDefaultFiltersForInnerTable(): gridFilter|null {
        return null;
    }

}
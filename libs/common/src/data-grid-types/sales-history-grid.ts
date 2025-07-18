import { format } from "date-fns/format";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class SalesHistoryGrid extends BaseGrid {
    hasRowExpansionTemplate(): boolean {
        return false;
    }
    getColumns(): gridColumn {
        return {
            idColumn: 'sOrderNo',
            columns: [
                { field: 'sOrderNo', header: 'Order No', style: { width: '60px' }, sortable: false },
                { field: 'dateRequired', header: 'Req. Date', body: (rowData: any) => format(new Date(rowData.dateRequired), 'MMMM dd, yyyy'), style: { width: '120px' }, sortable: false },
                { field: 'catlogCode', header: 'Cat. Code', style: { width: '100px' }, sortable: false },
                { field: 'requiredQty', header: 'Qty', style: { width: '60px' }, sortable: false },
                { field: 'price', header: 'Price', style: { width: '80px' }, sortable: false },
                { field: 'description', header: 'Description', style: { width: '150px' }, sortable: false },
                { field: 'orderDate', header: 'Order Date', body: (rowData: any) => format(new Date(rowData.orderDate), 'MMMM dd, yyyy'), sortable: false },                
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

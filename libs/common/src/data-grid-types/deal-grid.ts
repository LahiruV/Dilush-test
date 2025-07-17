import { format } from "date-fns/format";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class DealGrid extends BaseGrid {
    hasRowExpansionTemplate(): boolean {
        return false;
    }
    getColumns(): gridColumn {
        return {
            idColumn: 'catlogCode',
            columns: [
                { field: 'dealFrom', header: 'Deal From', sortable: false, body: (rowData: any) => format(new Date(rowData.dealFrom), 'MMMM dd, yyyy'), style: { width: '120px' } },    
                { field: 'dealTo', header: 'Deal To', sortable: false, body: (rowData: any) => format(new Date(rowData.dealTo), 'MMMM dd, yyyy'), style: { width: '120px' } },    
                { field: 'dealPrice', header: 'Deal Price', sortable: false, style: { width: '80px' } },
                { field: 'discPercentage', header: 'Disc', sortable: false, style: { width: '70px' } },   
                { field: 'netPrice', header: 'Net Price', sortable: false, style: { width: '80px' } },                     
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

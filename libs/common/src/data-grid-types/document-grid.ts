import { format } from "date-fns/format";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";
import { link, rowOptions } from "@peerless/controls";

export class DocumentGrid extends BaseGrid {
    gridOptionCallback = null;
    linkCallBack = null;

    constructor(gridOptionCallback: any, linkCallBack: any) {
        super();
        this.gridOptionCallback = gridOptionCallback;
        this.linkCallBack = linkCallBack;
    }    
    hasRowExpansionTemplate(): boolean {
        return false;
    }
    getColumns(): gridColumn {
        let columnDropdownOptions = [
            { label: 'Delete', type: 'delete', icon: 'pi pi-minus-circle', command: this.gridOptionCallback },
        ];

        return {
            idColumn: 'documentID',
            columns: [
                { field: '', header: 'Document Name', sortable: false, body: (rowData: any) => link('', rowData, rowData.documentName, 'pi pi-download', this.linkCallBack) },
                { field: 'attachedBy', header: 'Attached By', sortable: false },
                { field: 'attachedDate', header: 'Attached Date', sortable: false, body: (rowData: any) => format(new Date(rowData.attachedDate), 'dd/MM/yyyy') },                
                { field: '', header: '', body: (rowData: any) => rowOptions(columnDropdownOptions, rowData, 'pi pi-trash') }
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

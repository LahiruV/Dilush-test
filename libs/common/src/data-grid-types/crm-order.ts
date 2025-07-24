import { rowOptions } from "@peerless/controls";
import { getFormattedDateTime } from "../functions";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";
import { contactTypeEnum } from "@peerless/utils";



export class CrmOrder extends BaseGrid{       
    MAIN_GRID_ID = 'webId';
    gridOptionCallback = null;
    contactType = null;
    
    constructor(gridOptionCallback:any, contactType: any) {
        super();         
        this.gridOptionCallback = gridOptionCallback; 
        this.contactType = contactType
        this.MAIN_GRID_ID = this.contactType == contactTypeEnum.customer ? 'webId' : 'tiOrderNumber';
    }
    
    hasRowExpansionTemplate(): boolean {
        return true;
    }
    
    getColumns(): gridColumn {
        let columnDropdownOptions: any = [];
        if(this.contactType == contactTypeEnum.customer){
            columnDropdownOptions = [
                // { key: 1, label: 'Edit', value: 'Edit', callback: this.gridOptionCallback  }, //used for dropdown button
                { label: 'Edit', type: 'edit', icon: 'pi pi-pencil', command: this.gridOptionCallback },
            ];
        }
        else{ //enduser
            columnDropdownOptions = [
                // { key: 1, label: 'Edit', value: 'Edit', callback: this.gridOptionCallback  }, //used for dropdown button
                { label: 'Edit', type: 'edit', icon: 'pi pi-pencil', command: this.gridOptionCallback },
                { label: 'Delete', type: 'delete', icon: 'pi pi-trash', command: this.gridOptionCallback },
            ];
        }       

        return {
            idColumn: this.MAIN_GRID_ID,
            columns: [
                { field: 'tiOrderNumber', header: 'TIO No', style:{ width: '120px' }, sortable: false, filter: true, filterPlaceholder:"Filter by order" , filterMatchMode:'contains', hidden: (this.contactType != contactTypeEnum.enduser) }, 
                { field: 'webId', header: 'Order Number', style:{ width: '120px' }, sortable: false, filter: true, filterPlaceholder:"Filter by order" , filterMatchMode:'contains', hidden: (this.contactType != contactTypeEnum.customer) },
                { field: 'orderDate', header: 'Order Date', style:{ width: '160px' }, body: (rowData: any) => (getFormattedDateTime(rowData?.orderDate)) },
                { field: 'custCode', header: 'Customer Code', style:{ width: '100px' } },
                { field: 'endUserCode', header: 'Enduser Code', style:{ width: '120px' }, sortable: false, filter: true, filterPlaceholder:"Filter by enduser code" , filterMatchMode:'contains', hidden: (this.contactType != contactTypeEnum.enduser) },
                { field: 'status', header: 'Status', style:{ width: '70px' }, hidden: (this.contactType != contactTypeEnum.customer) },
                { field: 'acceptStatusDesc', header: 'Status', style:{ width: '70px' }, hidden: (this.contactType != contactTypeEnum.enduser) },
                {field: '', header: '', body: (rowData: any) => rowOptions(columnDropdownOptions, rowData)}
            ]
        }
    }

    getColumnDefaultFilters(): gridFilter {
        let filters: gridFilter = {
            webId : { value: null, matchMode: 'contains'},
            tiOrderNumber : { value: null, matchMode: 'contains'},
            endUserCode : { value: null, matchMode: 'contains'}
        }
        return filters;
    }

    getRowExpansionTemplate(): rowExpansion {
        return {
            title: 'Orders for ',
            addDataInTitle: true,
            displayColumn: this.MAIN_GRID_ID,
            idColumn: 'catlogCode',
            columns: [
                { field: (this.contactType == contactTypeEnum.customer ? 'catlogCode' : 'catlog_code'), header: 'Catalog Code', sortable: false, style:{ width: '120px' } },
                { field: (this.contactType == contactTypeEnum.customer ? 'catlog_description' : 'catlog_desc'), header: 'Description', sortable: false, filter: true, filterPlaceholder:"Filter by description" , filterMatchMode:'contains', style:{ width: '220px' } },
                { field: (this.contactType == contactTypeEnum.customer ? 'unitPrice' : 'price'), header: 'Price', style:{ width: '60px' }, body: (rowData: any) => this.contactType == contactTypeEnum.customer ? (rowData?.unitPrice.toFixed(2)) : (rowData?.price.toFixed(2)), },
                { field: (this.contactType == contactTypeEnum.customer ? 'orderQty' : 'order_qty'), header: 'Order Qty', style:{ width: '60px' } },
                { field: 'amount', header: 'Amount', body: (rowData: any) => (rowData?.amount.toFixed(2)), },
              ]
        }
    }

    getColumnDefaultFiltersForInnerTable(): gridFilter {
        let filters: gridFilter = {
            catlog_description : { value: null, matchMode: 'contains'}
        }
        return filters;
    } 
}
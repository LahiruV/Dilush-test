import { GridButton, GridButtonWidgetProps } from "@peerless/controls";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";
import { classNames } from "primereact/utils";
import { contactTypeEnum } from "@peerless/utils";

export class EnduserPantryListGrid extends BaseGrid{
    callBackMethod:any = null;
    additionalButtonOptions: GridButtonWidgetProps | null = null;
    contactType: string | undefined;
    constructor(callBackFunc:any, additionalButtonOptions?: GridButtonWidgetProps | null, contactType?: string) {
        super();   
        this.callBackMethod = callBackFunc;
        this.additionalButtonOptions = additionalButtonOptions ?? null;
        this.contactType = contactType;
    }      

    hasRowExpansionTemplate(): boolean {
        return false;
    }

    renderAddOrRemoveButton = (rowData: any) => {
        if(rowData.isUsed){            
            const actionType = 'remove';
            const btnRemoveProps: GridButtonWidgetProps = {
                id: 'btnRemove',
                name: this.additionalButtonOptions != null && this.additionalButtonOptions.name != null && 
                    this.additionalButtonOptions.name.length > 0 && this.additionalButtonOptions.actionType == actionType 
                    && (this.additionalButtonOptions.rowId == rowData.catalogCode || this.additionalButtonOptions.rowId == rowData.catlogCode) ? this.additionalButtonOptions.name : 'Remove',
                callBack: this.callBackMethod,
                classNames:'grid-button border-none color-red',
                icon: 'pi pi-minus-circle',
                isDisabled: this.additionalButtonOptions != null && this.additionalButtonOptions.isDisabled != undefined ? this.additionalButtonOptions.isDisabled : false,
            }
            return GridButton(btnRemoveProps, actionType, rowData);
        }
        else{
            const actionType = 'add';
            const btnAddProps: GridButtonWidgetProps = {
                id: 'btnAdd',
                name: this.additionalButtonOptions != null && this.additionalButtonOptions.name != null && 
                    this.additionalButtonOptions.name.length > 0 && this.additionalButtonOptions.actionType == actionType 
                    && (this.additionalButtonOptions.rowId == rowData.catalogCode || this.additionalButtonOptions.rowId == rowData.catlogCode) ? this.additionalButtonOptions.name : 'Add',
                callBack: this.callBackMethod,
                classNames:'grid-button border-none color-green',
                icon:'pi pi-plus-circle',
                isDisabled: this.additionalButtonOptions != null && this.additionalButtonOptions.isDisabled != undefined ? this.additionalButtonOptions.isDisabled : false,
            }
            return GridButton(btnAddProps, actionType, rowData);
        }
    }

    getColumns(): gridColumn {
        return {
            idColumn: 'catlogCode',
            columns: [
                { field: '', header: 'Status', style:{ width: '80px' }, body: (rowData: any) => { return (rowData.isUsed? 'Added' : 'Removed') } },
                { field: (this.contactType == contactTypeEnum.customer ? 'catalogCode' : 'catlogCode'), header: 'Catlog Code', style:{ width: '120px' } },
                { field: 'description', header: 'Description', style:{ width: '250px' } },
                { field: 'salesVolume', header: 'Sales Volume', style:{ width: '120px' } },
                { field: 'salesTonnes', header: 'Sales Tonnes', style:{ width: '120px' } },    
                { field: '', header: 'Actions', body: (rowData: any) => this.renderAddOrRemoveButton(rowData) },             
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
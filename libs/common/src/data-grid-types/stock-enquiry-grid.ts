import { FilterMatchMode } from "primereact/api";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class StockEnquiryGrid extends BaseGrid {
    colVisibility: any = null;
    constructor(colVisibility: any) {
        super();
        this.colVisibility = colVisibility;
    }
    hasRowExpansionTemplate(): boolean {
        return false;
    }
    getColumns(): gridColumn {
        return {
            idColumn: 'stockNo',
            columns: [
                { field: 'lineNumber', header: 'Line', style: { width: '50px' }, sortable: false, filter: true, filterMatchMode: FilterMatchMode.CONTAINS },
                { field: 'catalogCode', header: 'Product Code', headerStyle: { color: '#495057' }, style: { width: '70px' }, sortable: false },
                { field: 'catalogCodeManufacturer', header: 'Manufacture Code', style: { width: '100px' }, sortable: false, filter: false }, //, filterMatchMode: FilterMatchMode.CONTAINS
                { field: 'description', header: 'Description', sortable: false, filter: true, filterMatchMode: FilterMatchMode.CONTAINS },
                { field: 'productCategory', header: 'Prod Cat', style: { width: '50px' }, sortable: false },
                { field: 'stockQuantity', header: 'Stock', style: { width: '50px', textAlign: 'right' }, sortable: false, body: (rowData: any) => rowData.stockQuantity?.toFixed(0) || '0', bodyStyle: { backgroundColor: '#ffea9c' }, align: 'right', },
                { field: 'palletQTY', header: 'Pallet Qty', style: { width: '60px', textAlign: 'right' }, sortable: false, align: 'right', },
                { field: 'currentOrderQuantity', header: (this.colVisibility?.viewType == 'M' ? 'Ord. ' + this.getMonthName() : 'Ord WK0'), style: { width: '60px', textAlign: 'right' }, sortable: false, align: 'right', },
                { field: 'dueNow', header: 'Due Now', style: { width: '70px', textAlign: 'right' }, sortable: false, hidden: this.colVisibility?.viewType == 'W', align: 'right', },
                { field: 'freeQuantity', header: 'Critical Stock', style: { width: '80px', textAlign: 'right' }, sortable: false, body: (rowData: any) => rowData.freeQuantity?.toFixed(0) || '0', bodyStyle: { backgroundColor: '#fffec8' }, align: 'right', },
                { field: 'currentOrderQuantity1', header: (this.colVisibility?.viewType == 'M' ? 'Ord. ' + this.getMonthName(1) : 'Ord WK1'), style: { width: '60px', textAlign: 'right' }, sortable: false, align: 'right', },
                { field: 'currentOrderQuantity2', header: (this.colVisibility?.viewType == 'M' ? 'Ord. ' + this.getMonthName(2) : 'Ord WK2'), style: { width: '60px', textAlign: 'right' }, sortable: false, align: 'right', },
                { field: 'currentOrderQuantity3', header: 'Ord WK3+', style: { width: '60px', textAlign: 'right' }, sortable: false, hidden: this.colVisibility?.viewType == 'M', align: 'right', },
                { field: 'projectedQuantity', header: 'Nett Stock', style: { width: '70px', textAlign: 'right' }, sortable: false, body: (rowData: any) => rowData.projectedQuantity?.toFixed(0) || '0', bodyStyle: { backgroundColor: '#fffec8' }, align: 'right', },
                { field: 'forecastAverage', header: "F'cast Weekly Avg", style: { width: '70px', textAlign: 'right' }, sortable: false, body: (rowData: any) => rowData.forecastAverage?.toFixed(0) || '0', align: 'right', },
                { field: 'forecastNoOfWeeksCoverage', header: "F'cast No of Wks Coverage", style: { width: '70px', textAlign: 'right' }, sortable: false, body: (rowData: any) => rowData.forecastNoOfWeeksCoverage?.toFixed(1) || '0.0', align: 'right', },
                { field: 'salesWeeklyAvg', header: 'Sales Weekly Avg', style: { width: '70px', textAlign: 'right' }, sortable: false, align: 'right', },
                { field: 'salesNoOfWeeklyAvg', header: 'Sales No of Wks Coverage', style: { width: '70px', textAlign: 'right' }, sortable: false, body: (rowData: any) => rowData.salesNoOfWeeklyAvg?.toFixed(1) || '0.0', align: 'right', },
                { field: 'workInProgressQuantity', header: 'WIP', style: { width: '70px', textAlign: 'right' }, sortable: false, hidden: this.colVisibility?.hideWip, align: 'right', },
                { field: 'promoForcast', header: 'Promo Forecast', style: { width: '70px', textAlign: 'right' }, sortable: false, hidden: this.colVisibility?.hidePromoForecast, align: 'right', },
                { field: 'promoSales', header: 'Promo Sales', style: { width: '70px', textAlign: 'right' }, sortable: false, hidden: this.colVisibility?.hidePromoSales, align: 'right', },
                { field: 'planCurrent', header: 'Plan Current', style: { width: '70px', textAlign: 'right' }, sortable: false, align: 'right', },
                { field: 'planNext', header: 'Plan Next', style: { width: '60px', textAlign: 'right' }, sortable: false, align: 'right', },
                { field: 'planWeekThree', header: 'Plan Week 3', style: { width: '60px', textAlign: 'right', paddingRight: '23px' }, sortable: false, align: 'right', },
            ]
        }
    }
    getColumnDefaultFilters(): gridFilter | null {
        let filters: gridFilter = {
            lineNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
            //catalogCodeManufacturer : { value: '', matchMode: FilterMatchMode.CONTAINS}, 
            description: { value: '', matchMode: FilterMatchMode.CONTAINS }
        }
        return filters;
    }
    getRowExpansionTemplate(): rowExpansion | null {
        return null;
    }
    getColumnDefaultFiltersForInnerTable(): gridFilter | null {
        return null;
    }
    getMonthName = (monthOffset = 0) => {
        const date = new Date();
        date.setMonth(date.getMonth() + monthOffset);
        return date.toLocaleString("default", { month: "short" });
    };


}
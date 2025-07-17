import { FilterMatchMode } from "primereact/api";
import { getFormattedDateTime } from "../functions";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class EndUserPriceReportListDistributer extends BaseGrid {
    MAIN_GRID_ID = 'seqNo';

    hasRowExpansionTemplate(): boolean {
        return false;
    }

    getColumns(): gridColumn {
        return {
            idColumn: this.MAIN_GRID_ID,
            columns: [
                { field: 'bakeryRepCode', header: 'Rep Code', style: { width: '80px' }, sortable: false, filter: false, filterPlaceholder: "Filter By Rep Code", filterMatchMode: FilterMatchMode.CONTAINS },
                { field: 'distributorCode', header: 'Distributor', style: { width: '80px' }, sortable: false, filter: true, filterPlaceholder: "Filter By Distributor", filterMatchMode: FilterMatchMode.CONTAINS },
                { field: 'distributorName', header: 'Distributor Name', style: { width: '260px' }, sortable: false, filter: true, filterPlaceholder: "Filter By Distributor Name", filterMatchMode: FilterMatchMode.CONTAINS },
                { field: 'endUserCode', header: 'Enduser', style: { width: '80px' }, sortable: false, filter: true, filterPlaceholder: "Filter By Enduser", filterMatchMode: FilterMatchMode.CONTAINS },
                { field: 'endUserName', header: 'Enduser Name', sortable: false, filter: false, filterPlaceholder: "Filter By Enduser Name", filterMatchMode: FilterMatchMode.CONTAINS },
                { field: 'endUserRef', header: 'Enduser Ref', style: { width: '80px' }, sortable: false, filter: true, filterPlaceholder: "Filter By Enduser Ref", filterMatchMode: FilterMatchMode.CONTAINS },
                { field: 'productCode', header: 'Product', style: { width: '80px' }, sortable: false, filter: true, filterPlaceholder: "Filter By Product", filterMatchMode: FilterMatchMode.CONTAINS },
                { field: 'description', header: 'Description', sortable: false, filter: true, filterPlaceholder: "Filter By Description", filterMatchMode: FilterMatchMode.CONTAINS },
                { field: 'productRef', header: 'Product Ref', style: { width: '80px' }, sortable: false, filter: true, filterPlaceholder: "Filter By Product Ref", filterMatchMode: FilterMatchMode.CONTAINS },
                { field: 'distributorEffDate', header: 'Distributor Eff Date', style: { width: '80px' }, body: (rowData: any) => (getFormattedDateTime(rowData?.distributorEffDate)), sortable: false, filter: false, filterPlaceholder: "Filter By Distributor Eff Date", filterMatchMode: FilterMatchMode.CONTAINS },
                { field: 'distributorPrice', header: 'Distributor Price', style: { width: '80px' }, body: (rowData: any) => ('$ ' + parseFloat(rowData?.distributorPrice).toFixed(2)), align: 'right', sortable: false, filter: false, filterPlaceholder: "Filter By Distributor Price", filterMatchMode: FilterMatchMode.CONTAINS },
                { field: 'endUserEffDate', header: 'Enduser Eff Date', style: { width: '80px' }, body: (rowData: any) => (getFormattedDateTime(rowData?.endUserEffDate)), sortable: false, filter: false, filterPlaceholder: "Filter By Enduser Eff Date", filterMatchMode: 'contains' },
                { field: 'endUserPrice', header: 'Enduser Price', style: { width: '80px' }, body: (rowData: any) => ('$ ' + parseFloat(rowData?.endUserPrice).toFixed(2)), align: 'right', sortable: false, filter: false, filterPlaceholder: "Filter By Enduser Price", filterMatchMode: FilterMatchMode.CONTAINS },
            ]
        }
    }

    getColumnDefaultFilters(): gridFilter {
        let filters: gridFilter = {
            distributorCode: { value: null, matchMode: FilterMatchMode.CONTAINS },
            distributorName: { value: null, matchMode: FilterMatchMode.CONTAINS },
            endUserCode: { value: null, matchMode: FilterMatchMode.CONTAINS },
            endUserName: { value: null, matchMode: FilterMatchMode.CONTAINS },
            endUserRef: { value: null, matchMode: FilterMatchMode.CONTAINS },
            productCode: { value: null, matchMode: FilterMatchMode.CONTAINS },
            description: { value: null, matchMode: FilterMatchMode.CONTAINS },
            productRef: { value: null, matchMode: FilterMatchMode.CONTAINS },
        }
        return filters;
    }

    getRowExpansionTemplate(): rowExpansion | null {
        return null;
    }
    getColumnDefaultFiltersForInnerTable(): gridFilter | null {
        return null;
    }

}
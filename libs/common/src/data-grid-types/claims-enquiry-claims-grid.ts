import { format } from "date-fns";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from ".";
import { DateFilterTemplate, TagLabel } from "@peerless/controls";
import { FilterMatchMode } from "primereact/api";

export class ClaimsEnquiryClaimsGrid extends BaseGrid {
    hasRowExpansionTemplate(): boolean {
        return false;
    }
    getColumns(): gridColumn {
        return {
            idColumn: 'claimNo',
            columns: [
                { field: 'claimNo', header: 'Claim No', style: { width: '50px' }, sortable: false, filter: true, filterMatchMode: FilterMatchMode.CONTAINS },
                { field: 'custClaimNo', header: 'Cust Clm', style: { width: '160px' }, sortable: false, filter: true, filterMatchMode: FilterMatchMode.CONTAINS },
                {
                    field: 'dateClaim', header: 'Claim Date', body: (rowData: any) => format(new Date(rowData.dateClaim), 'dd/MM/yyyy'), style: { width: '110px' },
                    sortable: false, filter: false, filterMatchMode: FilterMatchMode.EQUALS, filterTemplate: DateFilterTemplate
                },
                {
                    field: 'dateEntered', header: 'Entered', body: (rowData: any) => format(new Date(rowData.dateEntered), 'dd/MM/yyyy'), style: { width: '110px' },
                    sortable: false, filter: true, filterMatchMode: FilterMatchMode.EQUALS, filterTemplate: DateFilterTemplate
                },
                { field: 'forApproval', header: 'For App', style: { width: '60px' }, sortable: false, headerStyle: { textAlign: 'right' } },
                { field: 'creditNo', header: 'Credit No', style: { width: '60px' }, sortable: false, align: 'right' },
                { field: 'ivceNo', header: 'Invoice No', style: { width: '60px' }, sortable: false, align: 'right' },
                { field: 'complaintNo', header: 'NCR', style: { width: '60px' }, sortable: false, filter: true, filterMatchMode: FilterMatchMode.CONTAINS, align: 'right' },
                { field: 'custCode', header: 'Customer', style: { width: '60px' }, sortable: false },
                { field: 'payeeNo', header: 'Payee Code', style: { width: '60px' }, sortable: false },
                { field: 'payMethod', header: 'Pay Method', style: { width: '60px' }, sortable: false },
                { field: 'gst', header: 'Gst Amt', style: { width: '60px' }, sortable: false, align: 'right', body: (rowData: any) => (rowData.gst || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
                { field: 'totalNetAmount', header: 'Amount', style: { width: '60px' }, sortable: false, align: 'right', body: (rowData: any) => (rowData.totalNetAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
                { field: 'totalAmount', header: 'Total', style: { width: '60px' }, sortable: false, align: 'right', body: (rowData: any) => (rowData.totalAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
                { field: 'claimAppType', header: 'Claim Type', style: { width: '60px' }, sortable: false },
                { field: 'status', header: 'Status', style: { width: '60px' }, sortable: false, body: TagLabel },
            ]
        }
    }
    getColumnDefaultFilters(): gridFilter | null {
        let filters: gridFilter = {
            claimNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
            custClaimNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
            dateClaim: { value: null, matchMode: FilterMatchMode.EQUALS },
            dateEntered: { value: null, matchMode: FilterMatchMode.EQUALS },
            complaintNo: { value: null, matchMode: FilterMatchMode.CONTAINS }
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
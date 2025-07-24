import { CustomCell } from "@peerless/controls";
import { getFormattedDateTime } from "../functions";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class SalesEnquiryOutStandingEnquiryListDistributer extends BaseGrid {
    MAIN_GRID_ID = 'product';

    hasRowExpansionTemplate(): boolean {
        return false;
    }

    getColumns(): gridColumn {
        return {
            idColumn: this.MAIN_GRID_ID,
            columns: [
                {
                    field: 'orderNo', header: 'Order No', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '50px' }, filterPlaceholder: "Filter By Order No", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.orderNo,
                        backgroundColor: rowData.columnColours?.orderNoColour,
                    })
                },
                {
                    field: 'customerCode', header: 'Cust Code', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '50px' }, filterPlaceholder: "Filter By Cust Code", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.customerCode,
                        backgroundColor: rowData.columnColours?.customerCodeColour,
                    })
                },
                {
                    field: 'name', header: 'Name', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '270px' }, filterPlaceholder: "Filter By Name", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.name,
                        backgroundColor: rowData.columnColours?.nameColour,
                    })
                },
                {
                    field: 'plistNo', header: 'Plist No', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '50px' }, filterPlaceholder: "Filter By Plist No", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.plistNo,
                        backgroundColor: rowData.columnColours?.plistNoColour,
                    })
                },
                {
                    field: 'customerOrderNo', header: 'Cust Ord No', sortable: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, filter: false, style: { width: '50px' }, filterPlaceholder: "Filter By Cust Ord No", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.customerOrderNo,
                        backgroundColor: rowData.columnColours?.customerOrderNoColour,
                    })
                },
                {
                    field: 'area', header: 'Area', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '110px' }, filterPlaceholder: "Filter By Area", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.area,
                        backgroundColor: rowData.columnColours?.areaColour,
                    })
                },
                {
                    field: 'product', header: 'Product', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '50px' }, filterPlaceholder: "Filter By Product", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.product,
                        backgroundColor: rowData.columnColours?.productColour,
                    })
                },
                {
                    field: 'description', header: 'Description', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '300px' }, filterPlaceholder: "Filter By Description", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.description,
                        backgroundColor: rowData.columnColours?.descriptionColour,
                    })
                },
                {
                    field: 'netAmount', header: 'Net Amount', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '50px' }, filterPlaceholder: "Filter By Net Amount", filterMatchMode: 'contains', align: 'right',
                    body: (rowData: any) => CustomCell({
                        value: Number(rowData.netAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        backgroundColor: rowData.columnColours?.netAmountColour,
                    })
                },
                {
                    field: 'orderDate', header: 'Order Date', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '100px' }, filterPlaceholder: "Filter By Order Date", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: getFormattedDateTime(rowData.orderDate),
                    })
                },
                {
                    field: 'orderQty', header: 'Order Qty', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '50px' }, filterPlaceholder: "Filter By Order Qty", filterMatchMode: 'contains', align: 'right',
                    body: (rowData: any) => CustomCell({
                        value: Number(rowData.orderQty).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        backgroundColor: rowData.columnColours?.orderQtyColour,
                    }),
                },
                {
                    field: 'dateRequired', header: 'Date Required', sortable: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, filter: false, style: { width: '100px' }, filterPlaceholder: "Filter By Date Required", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: getFormattedDateTime(rowData.dateRequired),
                        backgroundColor: rowData.columnColours?.dateRequiredColour,
                    })
                },
                {
                    field: 'rsv', header: 'Rsv', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '50px' }, filterPlaceholder: "Filter By Rsv", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.rsv,
                        backgroundColor: rowData.columnColours?.rsvColour,
                    })
                },
                {
                    field: 'despatchQuantity', header: 'Desp.Qty', sortable: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, filter: false, style: { width: '50px' }, filterPlaceholder: "Filter By Desp.Qty", filterMatchMode: 'contains', align: 'right',
                    body: (rowData: any) => CustomCell({
                        value: Number(rowData.despatchQuantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        backgroundColor: rowData.columnColours?.despatchQuantityColour,
                    })
                },
                {
                    field: 'invoiceNo', header: 'Invoice No', sortable: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, filter: false, style: { width: '50px' }, filterPlaceholder: "Filter By Invoice No", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.invoiceNo,
                        backgroundColor: rowData.columnColours?.invoiceNoColour,
                    })
                },
                {
                    field: 'price', header: 'Price', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '50px' }, filterPlaceholder: "Filter By Price", filterMatchMode: 'contains', align: 'right',
                    body: (rowData: any) => CustomCell({
                        value: Number(rowData.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        backgroundColor: rowData.columnColours?.priceColour,
                    })
                },
                {
                    field: 'market', header: 'Market', sortable: false, filter: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, style: { width: '50px' }, filterPlaceholder: "Filter By Market", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.market,
                        backgroundColor: rowData.columnColours?.marketColour,
                    })
                },
                {
                    field: 'addressName', header: 'Address Name', sortable: false, headerStyle: { color: '#495057', backgroundColor: '#f0f4fa' }, filter: false, filterPlaceholder: "Filter By Address Name", filterMatchMode: 'contains',
                    body: (rowData: any) => CustomCell({
                        value: rowData.addressName,
                        backgroundColor: rowData.columnColours?.addressNameColour,
                    })
                },
            ]
        }
    }

    getColumnDefaultFilters(): gridFilter {
        let filters: gridFilter = {
            customerCode: { value: null, matchMode: 'contains' },
            name: { value: null, matchMode: 'contains' },
            product: { value: null, matchMode: 'contains' },
            description: { value: null, matchMode: 'contains' },
            rep: { value: null, matchMode: 'contains' },
            orderQty: { value: null, matchMode: 'contains' },
            price: { value: null, matchMode: 'contains' },
            netAmount: { value: null, matchMode: 'contains' },
            dateRequired: { value: null, matchMode: 'contains' },
            despatchQuantity: { value: null, matchMode: 'contains' }
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
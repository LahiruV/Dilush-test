import { textAlign, width } from "@mui/system";
import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

export class BusinessSalesEnquiryListDistributer extends BaseGrid {
    MAIN_GRID_ID = 'mc';
    businessSalesEnqSales: any = null
    footerObjD: any = null
    footerObjT: any = null
    footerObjU: any = null

    constructor(businessSalesEnqSales: any, footerObjD: any, footerObjT: any, footerObjU: any) {
        super();
        this.businessSalesEnqSales = businessSalesEnqSales;
        this.footerObjD = footerObjD;
        this.footerObjT = footerObjT;
        this.footerObjU = footerObjU;
    }

    hasRowExpansionTemplate(): boolean {
        return false;
    }

    getColumns(): gridColumn {
        if (this.businessSalesEnqSales === 'D') {
            return {
                idColumn: this.MAIN_GRID_ID,
                columns: [
                    { field: 'market', header: 'Market', sortable: false, body: (rowData: any) => rowData.md, footer: this.footerObjD?.md },
                    { field: 'jul', header: 'JUL', sortable: false, body: (rowData: any) => rowData?.m_m6D.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjD?.m_m6D },
                    { field: 'aug', header: 'AUG', sortable: false, body: (rowData: any) => rowData?.m_m5D.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjD?.m_m5D },
                    { field: 'sep', header: 'SEP', sortable: false, body: (rowData: any) => rowData?.m_m4D.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjD?.m_m4D },
                    { field: 'oct', header: 'OCT', sortable: false, body: (rowData: any) => rowData?.m_m3D.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjD?.m_m3D },
                    { field: 'nov', header: 'NOV', sortable: false, body: (rowData: any) => rowData?.m_m2D.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjD?.m_m2D },
                    { field: 'dec', header: 'DEC', sortable: false, body: (rowData: any) => rowData?.m_m1D.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjD?.m_m1D },
                    { field: 'jan', header: 'JAN', sortable: false, body: (rowData: any) => rowData?.m1D.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjD?.m1D },
                    { field: 'feb', header: 'FEB', sortable: false, body: (rowData: any) => rowData?.m2D.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjD?.m2D },
                    { field: 'mar', header: 'MAR', sortable: false, body: (rowData: any) => rowData?.m3D.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjD?.m3D },
                    { field: 'apr', header: 'APR', sortable: false, body: (rowData: any) => rowData?.m4D.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjD?.m4D },
                    { field: 'may', header: 'MAY', sortable: false, body: (rowData: any) => rowData?.m5D.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjD?.m5D },
                    { field: 'jun', header: 'JUN', sortable: false, body: (rowData: any) => rowData?.m6D.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjD?.m6D },
                    { field: 'total', header: 'Total', sortable: false, body: (rowData: any) => rowData?.mtd.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjD?.mtd },
                    { field: 'monthBudget', header: 'Month Budget', sortable: false, body: (rowData: any) => rowData?.currentMonthBudget.toFixed(2), style: { textAlign: 'right', width: '100px' }, footer: this.footerObjD?.currentMonthBudget },
                    { field: 'thisYTD', header: 'This YTD', sortable: false, body: (rowData: any) => rowData?.mtytdd.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjD?.mtytdd },
                    { field: 'lastYTD', header: 'Last YTD', sortable: false, body: (rowData: any) => rowData?.mlytdd.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjD?.mlytdd },
                    { field: 'percentage', header: '%', sortable: false, body: (rowData: any) => rowData?.mpd.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjD?.mpd },
                    { field: 'budgetYTD', header: 'Budget YTD', sortable: false, body: (rowData: any) => rowData?.budgetYTD.toFixed(2), style: { textAlign: 'right', width: '100px' }, footer: this.footerObjD?.budgetYTD },
                    { field: 'year2023', header: '2023', sortable: false, body: (rowData: any) => rowData?.mY1D.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjD?.mY1D },
                    { field: 'year2022', header: '2022', sortable: false, body: (rowData: any) => rowData?.mY2D.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjD?.mY2D },
                ]
            }
        }
        if (this.businessSalesEnqSales === 'T') {
            return {
                idColumn: this.MAIN_GRID_ID,
                columns: [
                    { field: 'market', header: 'Market', sortable: false, body: (rowData: any) => rowData.md, footer: this.footerObjT?.md },
                    { field: 'jul', header: 'JUL', sortable: false, body: (rowData: any) => rowData?.m_m6T.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjT?.m_m6T },
                    { field: 'aug', header: 'AUG', sortable: false, body: (rowData: any) => rowData?.m_m5T.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjT?.m_m5T },
                    { field: 'sep', header: 'SEP', sortable: false, body: (rowData: any) => rowData?.m_m4T.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjT?.m_m4T },
                    { field: 'oct', header: 'OCT', sortable: false, body: (rowData: any) => rowData?.m_m3T.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjT?.m_m3T },
                    { field: 'nov', header: 'NOV', sortable: false, body: (rowData: any) => rowData?.m_m2T.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjT?.m_m2T },
                    { field: 'dec', header: 'DEC', sortable: false, body: (rowData: any) => rowData?.m_m1T.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjT?.m_m1T },
                    { field: 'jan', header: 'JAN', sortable: false, body: (rowData: any) => rowData?.m1T.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjT?.m1T },
                    { field: 'feb', header: 'FEB', sortable: false, body: (rowData: any) => rowData?.m2T.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjT?.m2T },
                    { field: 'mar', header: 'MAR', sortable: false, body: (rowData: any) => rowData?.m3T.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjT?.m3T },
                    { field: 'apr', header: 'APR', sortable: false, body: (rowData: any) => rowData?.m4T.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjT?.m4T },
                    { field: 'may', header: 'MAY', sortable: false, body: (rowData: any) => rowData?.m5T.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjT?.m5T },
                    { field: 'jun', header: 'JUN', sortable: false, body: (rowData: any) => rowData?.m6T.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjT?.m6T },
                    { field: 'total', header: 'Total', sortable: false, body: (rowData: any) => rowData?.mtt.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjT?.mtt },
                    { field: 'monthBudget', header: 'Month Budget', sortable: false, body: (rowData: any) => rowData?.currentMonthBudgetT.toFixed(2), style: { textAlign: 'right', width: '100px' }, footer: this.footerObjT?.currentMonthBudgetT },
                    { field: 'thisYTD', header: 'This YTD', sortable: false, body: (rowData: any) => rowData?.mtytdt.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjT?.mtytdt },
                    { field: 'lastYTD', header: 'Last YTD', sortable: false, body: (rowData: any) => rowData?.mlytdt.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjT?.mlytdt },
                    { field: 'percentage', header: '%', sortable: false, body: (rowData: any) => rowData?.mpt.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjT?.mpt },
                    { field: 'budgetYTD', header: 'Budget YTD', sortable: false, body: (rowData: any) => rowData?.budgetYTD_T.toFixed(2), style: { textAlign: 'right', width: '100px' }, footer: this.footerObjT?.budgetYTD_T },
                    { field: 'year2023', header: '2023', sortable: false, body: (rowData: any) => rowData?.mY1T.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjT?.mY1T },
                    { field: 'year2022', header: '2022', sortable: false, body: (rowData: any) => rowData?.mY2T.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjT?.mY2T },
                ]
            }
        }

        return {
            idColumn: this.MAIN_GRID_ID,
            columns: [
                { field: 'market', header: 'Market', sortable: false, body: (rowData: any) => rowData.md, footer: this.footerObjU?.md },
                { field: 'jul', header: 'JUL', sortable: false, body: (rowData: any) => rowData?.m_m6U.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjU?.m_m6U },
                { field: 'aug', header: 'AUG', sortable: false, body: (rowData: any) => rowData?.m_m5U.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjU?.m_m5U },
                { field: 'sep', header: 'SEP', sortable: false, body: (rowData: any) => rowData?.m_m4U.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjU?.m_m4U },
                { field: 'oct', header: 'OCT', sortable: false, body: (rowData: any) => rowData?.m_m3U.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjU?.m_m3U },
                { field: 'nov', header: 'NOV', sortable: false, body: (rowData: any) => rowData?.m_m2U.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjU?.m_m2U },
                { field: 'dec', header: 'DEC', sortable: false, body: (rowData: any) => rowData?.m_m1U.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjU?.m_m1U },
                { field: 'jan', header: 'JAN', sortable: false, body: (rowData: any) => rowData?.m1U.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjU?.m1U },
                { field: 'feb', header: 'FEB', sortable: false, body: (rowData: any) => rowData?.m2U.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjU?.m2U },
                { field: 'mar', header: 'MAR', sortable: false, body: (rowData: any) => rowData?.m3U.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjU?.m3U },
                { field: 'apr', header: 'APR', sortable: false, body: (rowData: any) => rowData?.m4U.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjU?.m4U },
                { field: 'may', header: 'MAY', sortable: false, body: (rowData: any) => rowData?.m5U.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjU?.m5U },
                { field: 'jun', header: 'JUN', sortable: false, body: (rowData: any) => rowData?.m6U.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjU?.m6U },
                { field: 'total', header: 'Total', sortable: false, body: (rowData: any) => rowData?.mtu.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjU?.mtu },
                { field: 'monthBudget', header: 'Month Budget', sortable: false, body: (rowData: any) => rowData?.currentMonthBudgetU.toFixed(2), style: { textAlign: 'right', width: '100px' }, footer: this.footerObjU?.currentMonthBudgetU },
                { field: 'thisYTD', header: 'This YTD', sortable: false, body: (rowData: any) => rowData?.mtytdu.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjU?.mtytdu },
                { field: 'lastYTD', header: 'Last YTD', sortable: false, body: (rowData: any) => rowData?.mlytdu.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjU?.mlytdu },
                { field: 'percentage', header: '%', sortable: false, body: (rowData: any) => rowData?.mpu.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjU?.mpu },
                { field: 'budgetYTD', header: 'Budget YTD', sortable: false, body: (rowData: any) => rowData?.budgetYTD_U.toFixed(2), style: { textAlign: 'right', width: '100px' }, footer: this.footerObjU?.budgetYTD_U },
                { field: 'year2023', header: '2023', sortable: false, body: (rowData: any) => rowData?.mY1U.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjU?.mY1U },
                { field: 'year2022', header: '2022', sortable: false, body: (rowData: any) => rowData?.mY2U.toFixed(2), style: { textAlign: 'right', width: '10px' }, footer: this.footerObjU?.mY2U },
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
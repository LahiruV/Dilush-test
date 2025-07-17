import { BaseGrid, gridColumn, gridFilter, rowExpansion } from "./base-grid";

type EnduserGridProps = {
    year: any,
    month: any,
    prodWithNoSales: any,
    activeOnly: any
}

export class EnduserSalesGrid extends BaseGrid{
    monthname = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    salesHeaderParams:EnduserGridProps|null = null;
    basedate: any;
    basemonth: any;
    startDate: any;
    year: any;
    
    constructor(salesHeaderParams:EnduserGridProps) {
        super();         
        this.salesHeaderParams = salesHeaderParams; 

        this.basedate = new Date(this.salesHeaderParams?.year, 6, 1);
        this.basemonth = this.basedate.getMonth();

        this.startDate = new Date(this.salesHeaderParams?.year, this.basemonth + parseInt(this.salesHeaderParams?.month) - 12, 1);

        this.basemonth = this.startDate?.getMonth();    
        this.year = this.startDate.getFullYear();
        this.startDate = new Date(this.year, this.basemonth - 12, 1);
    }      

    getColumnHeader(startDate: any, monthId: any): string {
        let baseMonth = startDate.getMonth() + monthId;
        let baseYear = startDate.getFullYear();
        startDate = new Date(baseYear, baseMonth, 1);
        baseMonth = startDate.getMonth();
        baseYear = startDate.getFullYear();
        return Number.isNaN(baseMonth) ? '' : this.monthname[baseMonth] + " " + baseYear;
    }

    hasRowExpansionTemplate(): boolean {
        return false;
    }
    getColumns(): gridColumn {
        return {
            idColumn: 'CatlogCode',
            columns: [
                //{ field: 'customerCode', header: 'Customer Code', },
                { field: 'catlogCode', header: 'Catlog Code', style:{ width: '80px' } },
                { field: 'description', header: 'Description', style:{ width: '150px' } },
                { field: 'price', header: 'WS List Price', style:{ width: '85px', textAlign:'right' }},
                { field: 'curPrice', header: 'EU Price', style:{ width: '60px', textAlign:'right' } },
                
                { field: 'month1', header: this.getColumnHeader(this.startDate, 0), style:{ textAlign:'right' }},
                { field: 'month2', header: this.getColumnHeader(this.startDate, 1), style:{ textAlign:'right' }},
                { field: 'month3', header: this.getColumnHeader(this.startDate, 2), style:{ textAlign:'right' }},
                { field: 'month4', header: this.getColumnHeader(this.startDate, 3), style:{ textAlign:'right' }},
                { field: 'month5', header: this.getColumnHeader(this.startDate, 4), style:{ textAlign:'right' }},
                { field: 'month6', header: this.getColumnHeader(this.startDate, 5), style:{ textAlign:'right' }},
                { field: 'month7', header: this.getColumnHeader(this.startDate, 6), style:{ textAlign:'right' }},
                { field: 'month8', header: this.getColumnHeader(this.startDate, 7), style:{ textAlign:'right' }},
                { field: 'month9', header: this.getColumnHeader(this.startDate, 8), style:{ textAlign:'right' }},
                { field: 'month10', header: this.getColumnHeader(this.startDate, 9), style:{ textAlign:'right' }},
                { field: 'month11', header: this.getColumnHeader(this.startDate, 10), style:{ textAlign:'right' }},
                { field: 'month12', header: this.getColumnHeader(this.startDate, 11), style:{ textAlign:'right' }},

                { field: 'totalCases', header: 'Total Cases', style:{ width: '80px', textAlign:'right' } },
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
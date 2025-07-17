export interface ChartData {
    categories: string[];
    series: { name: string; data: number[]; color: string }[];
    userTypeSelect: any;
};

export interface DropDownData {
    text: string;
    value: any;
    id: number;
};

export interface WidgetData {
    mtD_TIO_Value: number;
    ytD_TIO_Value: number;
    mtD_Sales_Value: number;
    qtD_Contribution: number;
    qtD_Tons: number;
    mtD_Contribution: number;
    mtD_Tons: number;
    mtD_TIO: number;
    wtD_TIO: number;
  }
  


// Add color: '#008c51' to all footer <div> styles
import { GridCellProps } from "@progress/kendo-react-grid";

export interface TitleDataInfo {
    salesMonth1: string;
    salesMonth2: string;
    salesMonth3: string;
    salesMonth4: string;
    salesMonth5: string;
    salesMonth6: string;
    salesMonth7: string;
    salesMonth8: string;
    salesMonth9: string;
    salesMonth10: string;
    salesMonth11: string;
    salesMonth12: string;
    salesYearCurrent: string;
    salesYearLast: string;
}

export const dashBusinessDColumns = (businessSalesEnqGroupBy: any, titleData: TitleDataInfo) => [
    {
        field: 'md', title: businessSalesEnqGroupBy.text, width: 150, filterable: true,
        cell: (props: GridCellProps) => {
            const isFirstColumn = props.field === 'md';
            return (
                <td
                    className="bolder"
                    style={{
                        color: '#008c51',
                        textAlign: 'left',
                        position: isFirstColumn ? 'sticky' : undefined,
                        left: isFirstColumn ? 0 : undefined,
                        background: isFirstColumn ? '#fff' : undefined,
                        zIndex: isFirstColumn ? 1 : undefined,
                    }}
                >
                    {props.dataItem[props.field as string]}
                </td>
            );
        },
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                Total: {data[0]?.mdTot ? Math.round(data[0].mdTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm_m6D',
        title: titleData.salesMonth1 || '',
        width: 110,
        filterable: true,
        cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }}>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m_m6DTot ? Math.round(data[0].m_m6DTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm_m5D', title: titleData.salesMonth2 || '', width: 110, filterable: true,
        cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m_m5DTot ? Math.round(data[0].m_m5DTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm_m4D', title: titleData.salesMonth3 || '', width: 110, filterable: true,
        cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m_m4DTot ? Math.round(data[0].m_m4DTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm_m3D', title: titleData.salesMonth4 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m_m3DTot ? Math.round(data[0].m_m3DTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm_m2D', title: titleData.salesMonth5 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m_m2DTot ? Math.round(data[0].m_m2DTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm_m1D', title: titleData.salesMonth6 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m_m1DTot ? Math.round(data[0].m_m1DTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm1D', title: titleData.salesMonth7 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m1DTot ? Math.round(data[0].m1DTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm2D', title: titleData.salesMonth8 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m2DTot ? Math.round(data[0].m2DTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm3D', title: titleData.salesMonth9 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m3DTot ? Math.round(data[0].m3DTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm4D', title: titleData.salesMonth10 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m4DTot ? Math.round(data[0].m4DTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm5D', title: titleData.salesMonth11 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m5DTot ? Math.round(data[0].m5DTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm6D', title: titleData.salesMonth12 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m6DTot ? Math.round(data[0].m6DTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'mtd', title: 'Total', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.mtdTot ? Math.round(data[0].mtdTot).toLocaleString() : 0}
            </div>
        )
    },
    // {
    //     field: 'currentMonthBudget', title: 'Month Budget', width: 111, filterable: true
    //     , cell: (props: GridCellProps) => (
    //         <td style={{ textAlign: 'right' }
    //         }>
    //             {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
    //         </td>
    //     ),
    //     footer: (data: any[]) => (
    //         <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
    //             {data[0]?.currentMonthBudgetTot ? Math.round(data[0].currentMonthBudgetTot).toLocaleString() : 0}
    //         </div>
    //     )
    // },
    {
        field: 'mtytdd', title: 'This YTD', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.mtytddTot ? Math.round(data[0].mtytddTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'mlytdd', title: 'Last YTD', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.mlytddTot ? Math.round(data[0].mlytddTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'mpd', title: '%', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.mpdTot ? Math.round(data[0].mpdTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'budgetYTD', title: 'Budget YTD', width: 130, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.budgetYTDTot ? Math.round(data[0].budgetYTDTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'mY1D', title: titleData.salesYearCurrent || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.mY1DTot ? Math.round(data[0].mY1DTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'mY2D', title: titleData.salesYearLast || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.mY2DTot ? Math.round(data[0].mY2DTot).toLocaleString() : 0}
            </div>
        )
    }
];

export const dashBusinessTColumns = (businessSalesEnqGroupBy: any, titleData: TitleDataInfo) => [
    {
        field: 'md', title: businessSalesEnqGroupBy.text, width: 150, filterable: true,
        cell: (props: GridCellProps) => {
            const isFirstColumn = props.field === 'md';
            return (
                <td
                    className="bolder"
                    style={{
                        color: '#008c51',
                        textAlign: 'left',
                        position: isFirstColumn ? 'sticky' : undefined,
                        left: isFirstColumn ? 0 : undefined,
                        background: isFirstColumn ? '#fff' : undefined,
                        zIndex: isFirstColumn ? 1 : undefined,
                    }}
                >
                    {props.dataItem[props.field as string]}
                </td>
            );
        },
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                Total: {data[0]?.mdTot ? Math.round(data[0].mdTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm_m6T',
        title: titleData.salesMonth1 || '',
        width: 110,
        filterable: true,
        cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }}>
                {(props.dataItem[props.field || ''] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m_m6TTot ? (data[0].m_m6TTot).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}
            </div>
        )
    },
    {
        field: 'm_m5T', title: titleData.salesMonth2 || '', width: 110, filterable: true,
        cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {(props.dataItem[props.field || ''] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m_m5TTot ? (data[0].m_m5TTot).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}
            </div>
        )
    },
    {
        field: 'm_m4T', title: titleData.salesMonth3 || '', width: 110, filterable: true,
        cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {(props.dataItem[props.field || ''] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m_m4TTot ? (data[0].m_m4TTot).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}
            </div>
        )
    },
    {
        field: 'm_m3T', title: titleData.salesMonth4 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {(props.dataItem[props.field || ''] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m_m3TTot ? (data[0].m_m3TTot).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}
            </div>
        )
    },
    {
        field: 'm_m2T', title: titleData.salesMonth5 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {(props.dataItem[props.field || ''] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m_m2TTot ? (data[0].m_m2TTot).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}
            </div>
        )
    },
    {
        field: 'm_m1T', title: titleData.salesMonth6 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {(props.dataItem[props.field || ''] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m_m1TTot ? (data[0].m_m1TTot).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}
            </div>
        )
    },
    {
        field: 'm1T', title: titleData.salesMonth7 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {(props.dataItem[props.field || ''] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m1TTot ? (data[0].m1TTot).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}
            </div>
        )
    },
    {
        field: 'm2T', title: titleData.salesMonth8 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {(props.dataItem[props.field || ''] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m2TTot ? (data[0].m2TTot).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}
            </div>
        )
    },
    {
        field: 'm3T', title: titleData.salesMonth9 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {(props.dataItem[props.field || ''] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m3TTot ? (data[0].m3TTot).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}
            </div>
        )
    },
    {
        field: 'm4T', title: titleData.salesMonth10 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {(props.dataItem[props.field || ''] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m4TTot ? (data[0].m4TTot).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}
            </div>
        )
    },
    {
        field: 'm5T', title: titleData.salesMonth11 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {(props.dataItem[props.field || ''] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m5TTot ? (data[0].m5TTot).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}
            </div>
        )
    },
    {
        field: 'm6T', title: titleData.salesMonth12 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {(props.dataItem[props.field || ''] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m6TTot ? (data[0].m6TTot).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}
            </div>
        )
    },
    {
        field: 'mtt', title: 'Total', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {(props.dataItem[props.field || ''] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.mttTot ? (data[0].mttTot).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}
            </div>
        )
    },
    // {
    //     field: 'currentMonthBudgetT', title: 'Month Budget', width: 111, filterable: true
    //     , cell: (props: GridCellProps) => (
    //         <td style={{ textAlign: 'right' }
    //         }>
    //             {(props.dataItem[props.field || ''] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    //         </td>
    //     ),
    //     footer: (data: any[]) => (
    //         <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
    //             {data[0]?.currentMonthBudgetTTot ? (data[0].currentMonthBudgetTTot).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}
    //         </div>
    //     )
    // },
    {
        field: 'mtytdt', title: 'This YTD', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {(props.dataItem[props.field || ''] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.mtytdtTot ? (data[0].mtytdtTot).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}
            </div>
        )
    },
    {
        field: 'mlytdt', title: 'Last YTD', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {(props.dataItem[props.field || ''] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.mlytdtTot ? (data[0].mlytdtTot).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}
            </div>
        )
    },
    {
        field: 'mpt', title: '%', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {(props.dataItem[props.field || ''] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.mptTot ? (data[0].mptTot).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}
            </div>
        )
    },
    {
        field: 'budgetYTD_T', title: 'Budget YTD', width: 130, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {(props.dataItem[props.field || ''] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.budgetYTD_TTot ? (data[0].budgetYTD_TTot).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}
            </div>
        )
    },
    {
        field: 'mY1T', title: titleData.salesYearCurrent || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {(props.dataItem[props.field || ''] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.mY1TTot ? (data[0].mY1TTot).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}
            </div>
        )
    },
    {
        field: 'mY2T', title: titleData.salesYearLast || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {(props.dataItem[props.field || ''] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.mY2TTot ? Math.round(data[0].mY2TTot).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0.00}
            </div>
        )
    }
];

export const dashBusinessUColumns = (businessSalesEnqGroupBy: any, titleData: TitleDataInfo) => [
    {
        field: 'md', title: businessSalesEnqGroupBy.text, width: 150, filterable: true,
        cell: (props: GridCellProps) => {
            const isFirstColumn = props.field === 'md';
            return (
                <td
                    className="bolder"
                    style={{
                        color: '#008c51',
                        textAlign: 'left',
                        position: isFirstColumn ? 'sticky' : undefined,
                        left: isFirstColumn ? 0 : undefined,
                        background: isFirstColumn ? '#fff' : undefined,
                        zIndex: isFirstColumn ? 1 : undefined,
                    }}
                >
                    {props.dataItem[props.field as string]}
                </td>
            );
        },
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                Total: {data[0]?.mdTot ? Math.round(data[0].mdTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm_m6U',
        title: titleData.salesMonth1 || '',
        width: 110,
        filterable: true,
        cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }}>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m_m6UTot ? Math.round(data[0].m_m6UTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm_m5U', title: titleData.salesMonth2 || '', width: 110, filterable: true,
        cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m_m5UTot ? Math.round(data[0].m_m5UTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm_m4U', title: titleData.salesMonth3 || '', width: 110, filterable: true,
        cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m_m4UTot ? Math.round(data[0].m_m4UTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm_m3U', title: titleData.salesMonth4 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m_m3UTot ? Math.round(data[0].m_m3UTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm_m2U', title: titleData.salesMonth5 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m_m2UTot ? Math.round(data[0].m_m2UTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm_m1U', title: titleData.salesMonth6 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m_m1UTot ? Math.round(data[0].m_m1UTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm1U', title: titleData.salesMonth7 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m1UTot ? Math.round(data[0].m1UTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm2U', title: titleData.salesMonth8 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m2UTot ? Math.round(data[0].m2UTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm3U', title: titleData.salesMonth9 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m3UTot ? Math.round(data[0].m3UTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm4U', title: titleData.salesMonth10 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m4UTot ? Math.round(data[0].m4UTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm5U', title: titleData.salesMonth11 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m5UTot ? Math.round(data[0].m5UTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'm6U', title: titleData.salesMonth12 || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.m6UTot ? Math.round(data[0].m6UTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'mtu', title: 'Total', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.mtuTot ? Math.round(data[0].mtuTot).toLocaleString() : 0}
            </div>
        )
    },
    // {
    //     field: 'currentMonthBudgetU', title: 'Month Budget', width: 111, filterable: true
    //     , cell: (props: GridCellProps) => (
    //         <td style={{ textAlign: 'right' }
    //         }>
    //             {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
    //         </td>
    //     ),
    //     footer: (data: any[]) => (
    //         <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
    //             {data[0]?.currentMonthBudgetUTot ? Math.round(data[0].currentMonthBudgetUTot).toLocaleString() : 0}
    //         </div>
    //     )
    // },
    {
        field: 'mtytdu', title: 'This YTD', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.mtytduTot ? Math.round(data[0].mtytduTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'mlytdu', title: 'Last YTD', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.mlytduTot ? Math.round(data[0].mlytduTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'mpu', title: '%', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.mpuTot ? Math.round(data[0].mpuTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'budgetYTD_U', title: 'Budget YTD', width: 130, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.budgetYTD_UTot ? Math.round(data[0].budgetYTD_UTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'mY1U', title: titleData.salesYearCurrent || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.mY1UTot ? Math.round(data[0].mY1UTot).toLocaleString() : 0}
            </div>
        )
    },
    {
        field: 'mY2U', title: titleData.salesYearLast || '', width: 110, filterable: true
        , cell: (props: GridCellProps) => (
            <td style={{ textAlign: 'right' }
            }>
                {Math.round(props.dataItem[props.field || ''] || 0).toLocaleString()}
            </td>
        ),
        footer: (data: any[]) => (
            <div style={{ textAlign: 'right', width: '100%', color: '#008c51' }}>
                {data[0]?.mY2UTot ? Math.round(data[0].mY2UTot).toLocaleString() : 0}
            </div>
        )
    }
];

import React, { useState } from 'react';
import {
    Grid,
    GridColumn as Column,
    GridCellProps,
    GridPageChangeEvent,
    GridFilterChangeEvent,
    GridFooterCellProps
} from '@progress/kendo-react-grid';
import { CompositeFilterDescriptor, filterBy } from '@progress/kendo-data-query';

export interface ColumnDefinition {
    field: string;
    title: string;
    width?: string | number;
    editable?: boolean;
    filterable?: boolean;
    cell?: (props: GridCellProps) => React.ReactNode;
    footer?: (data: any[]) => React.ReactNode;
}

export interface KendoDataGridWidgetProps<T> {
    data: T[];
    columns: ColumnDefinition[];
    pageable?: boolean;
    sortable?: boolean;
    filterable?: boolean;
    pageSize?: number;
    lockFirstColumn?: boolean;
    className?: string;
    maxHeight?: string;
}

export function KendoDataGridWidget<T>(props: KendoDataGridWidgetProps<T>) {
    const [page, setPage] = useState({ skip: 0, take: props.pageSize || 10 });
    const [filter, setFilter] = useState<CompositeFilterDescriptor>({ logic: 'and', filters: [] });

    const filteredData = filterBy(props.data, filter);
    const pagedData = filteredData.slice(page.skip, page.skip + page.take);

    const handlePageChange = (e: GridPageChangeEvent) => setPage(e.page);
    const handleFilterChange = (e: GridFilterChangeEvent) => {
        setFilter(e.filter as CompositeFilterDescriptor);
        setPage({ skip: 0, take: page.take });
    };

    return (
        <div style={{ overflowX: 'auto', maxHeight: '80vh' }}>
            <Grid
                className={props.className || ''}
                style={{ maxHeight: `${props.maxHeight}px` }}
                data={pagedData}
                total={filteredData.length}
                skip={page.skip}
                take={page.take}
                pageable={props.pageable}
                sortable={props.sortable}
                filterable={props.filterable}
                filter={filter}
                onPageChange={handlePageChange}
                onFilterChange={handleFilterChange}
            >
                {props.columns.map((col, index) => (
                    <Column
                        key={col.field}
                        field={col.field}
                        title={col.title}
                        width={col.width}
                        filterable={col.filterable}
                        cell={col.cell}
                        locked={props.lockFirstColumn && index === 0}
                        footerCell={(footerProps: GridFooterCellProps) => {
                            const isLocked = props.lockFirstColumn && index === 0;
                            return (
                                <td
                                    className="k-footer-cell"
                                    style={{
                                        position: isLocked ? 'sticky' : undefined,
                                        left: isLocked ? 0 : undefined,
                                        background: isLocked ? '#f5f5f5' : undefined,
                                        zIndex: isLocked ? 1 : undefined,
                                    }}
                                >
                                    {col.footer ? col.footer(filteredData) : null}
                                </td>
                            );
                        }}
                    />
                ))}
            </Grid>
        </div>
    );
}

export default KendoDataGridWidget;

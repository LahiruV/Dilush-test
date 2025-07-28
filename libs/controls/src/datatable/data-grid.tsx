import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useDeferredValue, useEffect, useState } from 'react';
import { BaseGrid, getDate, rowExpansion, statusRenderFunction } from "@peerless/common";
import './data-grid.css';
import IndeterminateSpinner from '../indeterminate-spinner/indeterminate-spinner';
import React from 'react';
import { RenderStatusContentTable } from '@peerless/models';
import { format } from 'date-fns';


export interface DataGridProps {
    uniqueId?: string;
    dataTable: BaseGrid;
    data: any;
    onRowTogglesCallback?: any;
    expandedData?: any;
    scrollHeight?: any;
    editMode?: any;
    onCellEditComplete?: any;
    rowClassName?: any;
    selectionMode?: any;
    isSelectionColumnShow?: boolean;
    selectedRow?: any;
    setSelectedRow?: any;
    selectionColHeader?: any;
    renderStatusContent?: RenderStatusContentTable;
    rowGroupMode?: "subheader" | "rowspan";
    groupRowsBy?: any;
    sortMode?: "single" | "multiple";
    sortField?: any;
    sortOrder?: any;
    expandableRowGroups?: boolean;
    rowGroupHeaderTemplate?: any;
    rowGroupFooterTemplate?: any;
    emptyMessage?: any;
    isScrollable?: boolean;
    style?: any;
    cssClasses?: any;
    onFilterCallback?: any;
    enablePagination?: boolean;
    pageSize?: number;
    isServerSidePaging?: boolean;
    firstIndex?: number;
    totalRecords?: number;
    onPage?: any; //no need to pass if isServerSidePaging is false
    isShowPageOptions?: boolean;
    isAutoScrollHeight?: boolean;
    heightOffset?: number;
    width?: string;
    isFullDetailPagination?: boolean;
}

type ExpandedRowsType = { [key: number]: boolean };

export function DataGrid({ dataTable, data, onRowTogglesCallback, expandedData, scrollHeight,
    editMode, onCellEditComplete, rowClassName, selectionMode, selectedRow, setSelectedRow, selectionColHeader, renderStatusContent, isSelectionColumnShow = true,
    rowGroupMode, groupRowsBy, sortMode, sortField, sortOrder, expandableRowGroups, rowGroupHeaderTemplate, rowGroupFooterTemplate, emptyMessage, isScrollable,
    style, cssClasses, onFilterCallback, enablePagination, pageSize, isServerSidePaging, firstIndex, totalRecords, onPage, isShowPageOptions, isAutoScrollHeight, heightOffset, width, uniqueId, isFullDetailPagination }: DataGridProps) {
    const [expandedRows, setExpandedRows] = useState<ExpandedRowsType>([]);
    const [loadingRows, setLoadingRows] = useState<{ [key: number]: boolean }>({});

    const initialFilters: any = dataTable.getColumnDefaultFilters();
    const [filters, setFilters] = useState(initialFilters);

    const initialFiltersInnerTable: any = dataTable.getColumnDefaultFiltersForInnerTable();
    const [filtersInnerTable, setFiltersInnerTable] = useState(initialFiltersInnerTable);
    const [loading, setLoading] = React.useState(false);
    const [autoScrollHeight, setAutoScrollHeight] = useState<number>(0);

    useEffect(() => {
        // Calculate screen height dynamically and set scrollHeight
        const updateScrollHeight = () => {
            const screenHeight = window.innerHeight;
            const headerHeight = 100; // Set a fixed header height or dynamically calculate it
            const footerHeight = 50; // If you have a footer or other elements
            if (!heightOffset) {
                heightOffset = 0;
            }
            const availableHeight = screenHeight - headerHeight - footerHeight - heightOffset;
            setAutoScrollHeight(availableHeight);
        };

        // Set initial scrollHeight
        updateScrollHeight();

        // Update scrollHeight when the window is resized
        window.addEventListener("resize", updateScrollHeight);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener("resize", updateScrollHeight);
        };
    }, [heightOffset]);

    let mainGridColumns = dataTable.getColumns();

    const rowExpansionTemplate = (row: any) => {
        const rowId = row?.[mainGridColumns.idColumn];
        if (loadingRows[rowId]) {
            return <div>Loading...</div>;
        }

        let rowExp: rowExpansion | null = dataTable.getRowExpansionTemplate();
        if (dataTable.hasRowExpansionTemplate() && expandedData != null) {  //&& expandedData[row?.[mainGridColumns.idColumn]] //expandedData != null - may also need to remove
            const rowSpecificData = expandedData[rowId];
            return (
                <div>
                    <span className="inner-table-title">{rowExp != null && rowExp.title} {rowExp != null && rowExp.addDataInTitle == true && row?.[rowExp.displayColumn ?? '']}</span>
                    <DataTable value={rowSpecificData} onFilter={(e: any) => setFiltersInnerTable(e.filters)} filters={filtersInnerTable}>
                        {rowExp != null && rowExp.columns.map((col: any) => (
                            <Column
                                key={col.field}
                                field={col.field}
                                header={col.header}
                                filter={col.filter !== undefined ? col.filter : false}
                                filterPlaceholder={col.filterPlaceholder !== undefined ? col.filterPlaceholder : ''}
                                filterMatchMode={col.filterMatchMode !== undefined ? col.filterMatchMode : 'contains'}
                                style={col.style}
                                body={col.body}
                                footer={col.footer}
                                bodyStyle={{ paddingLeft: '10px', ...col.bodyStyle }}
                            />
                        ))}
                    </DataTable>
                </div>
            );
        }
        else {
            return <div>Loading...</div>;
        }
    }

    const onRowToggle = (e: any) => {
        setExpandedRows(e.data);
        onRowTogglesCallback && onRowTogglesCallback(e.data);
    }

    if (renderStatusContent?.isRenderStatusContentTable) {
        const statusOutput = statusRenderFunction.renderStatusContentTable(renderStatusContent.status, renderStatusContent.isFetch, renderStatusContent.error, renderStatusContent.setStateFunction);
        if (renderStatusContent.isStatusOutput && statusOutput) {
            if (statusOutput === 'Loading...') {
                return (
                    <div className="status-output">
                        <IndeterminateSpinner />
                    </div>
                );
            }
            if (!renderStatusContent.isHideClickFilterMessage) {
                return (
                    <div className="status-output" style={{ display: 'flex', justifyContent: 'center', marginTop: '15px', fontSize: '13px' }}>
                        {statusOutput}
                    </div>
                );
            }
        }
    }

    const processedData = data == null || data == undefined ? [] : data.map((row: any, index: any) => ({
        ...row,
        uniqueId: `${row?.[mainGridColumns.idColumn]}-${index}`, // Generate a unique ID
    }));

    const renderActiveFilters = () => {
        return Object.entries(filters as Record<string, { value: any }>).map(([key, filter]) => {
            if (filter.value) {
                const column = mainGridColumns.columns.find((col) => col.field === key);
                const header = column?.header || key;
                return (
                    <div key={key} className='active-filter-item'>
                        <strong>{header}:</strong> {filter.value.toString()}
                    </div>
                );
            }
            return null;
        });
    };

    const clearAllFilters = () => {
        setFilters(initialFilters);
        onFilterCallback && onFilterCallback(null, true);
    };

    const onFilter = (e: any) => {
        const updatedFilters = { ...e.filters };

        // Ensure all filter values are properly formatted
        Object.keys(updatedFilters).forEach((key) => {
            const filterValue = updatedFilters[key]?.value;

            if (filterValue instanceof Date) {
                // Format Date to 'dd/MM/yyyy' for display purposes
                updatedFilters[key].value = format(filterValue, 'dd/MM/yyyy');
            } else if (filterValue === null || filterValue === undefined) {
                // Remove empty filters
                //delete updatedFilters[key];
            }
        });

        // Update state and notify parent callback
        setFilters(updatedFilters);
        onFilterCallback && onFilterCallback(e, false);
    };

    const onSelectionChange = (e: any) => {
        setLoading(true);
        setTimeout(() => {
            if (setSelectedRow) {
                setSelectedRow(e.value);
            }
            setLoading(false);
        }, 500);
    };

    return (
        <div className={"datatable-2 datatable-nested" + (isScrollable ? " tbl-scollable " : "")}>
            {filters != null && Object.values(filters).some((filter: any) => filter.value) && <div className="active-filters">
                <span className='active-filter-header'><strong>Active Filters:</strong></span>
                {renderActiveFilters()}
                <button className="clear-filters-btn" onClick={clearAllFilters}>
                    Clear All
                </button>
            </div>}
            <DataTable
                value={processedData}
                expandedRows={expandedRows ?? []}
                onRowToggle={onRowToggle}
                rowExpansionTemplate={rowExpansionTemplate}
                dataKey={uniqueId || "uniqueId"}
                onFilter={onFilter}
                filters={filters}
                scrollHeight={(isAutoScrollHeight ? autoScrollHeight : scrollHeight)}
                editMode={editMode}
                rowClassName={rowClassName}
                selectionMode={selectionMode}
                selection={selectedRow}
                onSelectionChange={onSelectionChange}
                rowGroupMode={rowGroupMode}
                groupRowsBy={groupRowsBy}
                {...(sortMode && { sortMode: sortMode })}
                sortField={sortField}
                sortOrder={sortOrder}
                expandableRowGroups={expandableRowGroups}
                rowGroupHeaderTemplate={rowGroupHeaderTemplate}
                rowGroupFooterTemplate={rowGroupFooterTemplate}
                emptyMessage={emptyMessage}
                multiSortMeta={mainGridColumns.multiSortMeta}
                onSort={mainGridColumns.onSortCallback}
                style={{ ...style, fontSize: '13px' }}
                className={cssClasses}
                loading={loading}
                paginator={enablePagination}
                rows={pageSize ?? 10}
                lazy={isServerSidePaging}
                first={firstIndex ?? 0}
                totalRecords={totalRecords}
                {...(isServerSidePaging && { onPage: onPage })}
                {...(isShowPageOptions && { rowsPerPageOptions: [10, 20, 50] })}
                tableStyle={
                    { minWidth: '100%', width: width }
                }
                {...(isFullDetailPagination && {
                    paginatorTemplate:
                        "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
                    currentPageReportTemplate: "{first} to {last} of {totalRecords}",
                })}
            >
                {dataTable.hasRowExpansionTemplate() && <Column expander style={{ width: '3em' }} />}
                {isSelectionColumnShow && selectionMode && <Column selectionMode={selectionMode} header={selectionColHeader} headerStyle={{ width: '3em' }} />}
                {mainGridColumns.columns.map((col: any) => (
                    <Column
                        key={col.field}
                        field={col.field}
                        header={col.header}
                        sortable={col.sortable}
                        headerStyle={col.headerStyle}
                        filter={col.filter !== undefined ? col.filter : false}
                        filterPlaceholder={col.filterPlaceholder !== undefined ? col.filterPlaceholder : ''}
                        filterMatchMode={col.filterMatchMode !== undefined ? col.filterMatchMode : 'contains'}
                        filterElement={col.filterTemplate !== undefined ? col.filterTemplate : ''}
                        style={{ ...col.style, fontSize: '13px' }}
                        body={col.body}
                        editor={col.editor}
                        onCellEditComplete={onCellEditComplete}
                        footer={col.footer}
                        hidden={col.hidden}
                        bodyStyle={{ textAlign: col.align, paddingLeft: '10px', ...col.bodyStyle }}
                        footerStyle={{ textAlign: col.align, paddingLeft: '10px' }}
                    />
                ))}
            </DataTable>
        </div>
    );
}
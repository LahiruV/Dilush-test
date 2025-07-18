import { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch } from 'react-redux';
import './list-table.css';
import { statusRenderFunction } from '@peerless/common';
import { IndeterminateSpinner } from '@peerless/controls';
import { RenderStatusContentTable } from '@peerless/models';

export interface ListTableProps {
  columns: any;
  data: any;
  customStyles?: any;
  conditionalRowStyles?: any;
  handleRowClick?: any;
  dispatchAction?: any;
  selectedRow?: any;
  rowIdColumn: string;
  footer?: FooterColumns[];
  callbackOnEnterPress?: any;
  isFixedHeader?: boolean;
  scrollableHeight?: string;
  customLastRow?: any;
  disableLastRowSelection?: boolean;
  renderStatusContent?: RenderStatusContentTable;
}

export interface FooterColumns {
  label: string;
  data: any;
}

export function ListTable({
  columns,
  data,
  customStyles,
  conditionalRowStyles,
  handleRowClick,
  dispatchAction,
  selectedRow,
  rowIdColumn,
  footer,
  callbackOnEnterPress,
  customLastRow,
  disableLastRowSelection = false,
  isFixedHeader,
  scrollableHeight,
  renderStatusContent
}: ListTableProps) {

  const dispatch = useDispatch();

  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [columnWidths, setColumnWidths] = useState<string[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tableElement = tableRef.current;
    if (tableElement) {
      const headerCells = tableElement.querySelectorAll('.rdt_TableHeadRow .rdt_TableCol');
      const widths = Array.from(headerCells).map((cell) => {
        const headerCell = cell as HTMLElement;
        return `${headerCell.offsetWidth}px`;
      });
      setColumnWidths(widths);
    }
  }, [columns, data]);

  const finalData = customLastRow ? (customLastRow ? [...(data || []), customLastRow] : [...(data || [])]) : [...(data || [])];

  if (!customStyles) {
    customStyles = {
      headRow: {
        style: {
          minHeight: '36px',
        },
      },
      headCells: {
        style: {
          backgroundColor: '#f0f4fa',
          color: '#000000',
          fontWeight: '700',
          fontSize: '10px'
        },
      },
      rows: {
        style: {
          fontSize: '10px',
          minHeight: '30px',
          '&:hover': {
            backgroundColor: '#e6f7ff',
            cursor: 'pointer',
          }
        },
      },
      footer: {
        style: {
          fontSize: '10px',
          display: 'grid',
          gridTemplateColumns: columnWidths.join(' '),
          padding: '10px 0px',
          backgroundColor: '#f0f4fa',
          borderTop: '1px solid #ddd',
          height: '36px',
        },
      },
    };
  }

  if (!conditionalRowStyles) {
    conditionalRowStyles = [
      {
        when: (row: any) => selectedRow && (row[rowIdColumn] === selectedRow?.[rowIdColumn]),
        style: {
          backgroundColor: '#eaf4fc',
          color: 'black',
          fontWeight: 'bold',
        },
      },
      {
        when: (row: any) => disableLastRowSelection && (customLastRow ? row === customLastRow : data.indexOf(row) === data.length - 1),
        style: {
          cursor: 'default',
          '&:hover': {
            backgroundColor: 'inherit',
          },
        },
      },
    ];
  }

  const CustomFooter = () => (
    footer && data && data.length > 0 ?
      <div style={customStyles.footer.style}>
        {
          footer.map((col, index) => (
            <span key={index}>
              <span className='footer-column-label'>{col.label}</span>
              <span className='footer-column-data'>{(col.data ? ('' + col.data) : '')}</span>
            </span>
          ))
        }
      </div>
      : ''
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let newIndex: number | null = null;

      if (event.key === 'ArrowUp') {
        if (selectedRow)
          newIndex = Math.max(0, (data.indexOf(selectedRow)) - 1);
        else
          newIndex = selectedRowIndex !== null ? Math.max(0, selectedRowIndex - 1) : 0;
      } else if (event.key === 'ArrowDown') {
        if (selectedRow) {
          newIndex = Math.min(data.length - (disableLastRowSelection ? 2 : 1), (data.indexOf(selectedRow)) + 1);
        } else {
          newIndex = selectedRowIndex !== null ? Math.min(data.length - (disableLastRowSelection ? 2 : 1), selectedRowIndex + 1) : 0;
        }
      }

      if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && newIndex !== null) {
        setSelectedRowIndex(newIndex);
        dispatchAction && dispatch(dispatchAction(data[newIndex]));
      }

      if (event.key === 'Enter' && callbackOnEnterPress) {
        event.preventDefault();
        event.stopPropagation();
        callbackOnEnterPress();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedRowIndex, data, disableLastRowSelection]);

  const handleRowClickWrapper = (row: any) => {
    const isLastRow = disableLastRowSelection && (customLastRow ? row === customLastRow : data.indexOf(row) === data.length - 1);
    if (!isLastRow) {
      handleRowClick && handleRowClick(row);
      dispatchAction && dispatch(dispatchAction(row));
    }
  };

  if (renderStatusContent?.isRenderStatusContentTable) {
    const statusOutput = statusRenderFunction.renderStatusContentTable(renderStatusContent.status, renderStatusContent.isFetch, renderStatusContent.error, renderStatusContent.setStateFunction || (() => { }));
    if (renderStatusContent.isStatusOutput && statusOutput) {
      if (statusOutput === 'Loading...') {
        return (
          <div className="status-output" >
            <IndeterminateSpinner />
          </div>
        );
      }
      return (
        <div className="status-output" style={{ display: 'flex', justifyContent: 'center', marginTop: '15px', fontSize: '12px' }}>
          {statusOutput}
        </div>
      );
    }
  }

  return (
    <div className="data-table-container">
      <div ref={tableRef}>
        <DataTable
          columns={columns}
          data={finalData.map((item, index) => ({ ...item, rowIndex: index }))}
          customStyles={customStyles}
          conditionalRowStyles={conditionalRowStyles}
          onRowClicked={handleRowClickWrapper}
          onSelectedRowsChange={({ selectedRows }) => {
            if (selectedRows.length > 0) {
              dispatch(dispatchAction(selectedRows[0]));
            }
          }}
          clearSelectedRows={selectedRow === null}
          fixedHeader={isFixedHeader != null && isFixedHeader == true}
          fixedHeaderScrollHeight={scrollableHeight ?? ''}
          keyField="rowIndex"
        />
        <CustomFooter />
      </div>
    </div>
  );
}

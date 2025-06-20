import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export interface DataGridWidgetProps {
    className?: string;
    columns: GridColDef[];
    rows: any[];
    pageSize?: number;
}
const DataGridWidget: React.FC<DataGridWidgetProps> = ({
    className,
    columns,
    rows,
    pageSize,
}) => {
    return (
        <div className={`${className} width-auto`}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: pageSize || 5,
                        },
                    },
                }}
                pageSizeOptions={[pageSize || 5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </div>
    );
}
export default DataGridWidget;

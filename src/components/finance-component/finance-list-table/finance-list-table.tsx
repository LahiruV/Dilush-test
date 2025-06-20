
import { GridColDef } from '@mui/x-data-grid';
import { DataGridWidget } from '@zenra/widgets';

export interface FinanceListTableProps {
    rows: any[];
    columns: GridColDef[];
}
const FinanceListTable: React.FC<FinanceListTableProps> = ({
    rows,
    columns,
}) => {
    return (
        <div>
            <DataGridWidget
                columns={columns}
                rows={rows}
                pageSize={10}
            />
        </div>
    );
};

export default FinanceListTable;
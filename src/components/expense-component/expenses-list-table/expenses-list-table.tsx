
import { GridColDef } from '@mui/x-data-grid';
import { DataGridWidget } from '@zenra/widgets';

export interface ExpensesListTableProps {
    rows: any[];
    columns: GridColDef[];
}
const ExpensesListTable: React.FC<ExpensesListTableProps> = ({
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

export default ExpensesListTable;
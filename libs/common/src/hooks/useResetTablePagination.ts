import { useEffect } from "react";

export const useResetTablePagination = (rows: number, setState: Function, dependencies: any[]) => {
    useEffect(() => {
        setState({ first: 1, rows: rows });
    }, [...dependencies]);
};

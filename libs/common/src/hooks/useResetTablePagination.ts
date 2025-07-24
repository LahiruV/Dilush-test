import { useEffect } from "react";

export const useResetTablePagination = (rows: number, setState: Function, dependencies: any[], first?: number) => {
    useEffect(() => {
        setState({ first: first ?? 1, rows: rows });
    }, [...dependencies]);
};

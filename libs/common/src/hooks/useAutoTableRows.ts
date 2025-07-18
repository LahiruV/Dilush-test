import { useEffect, useState, useCallback } from "react";

/**
 * Custom hook to calculate table row count based on viewport and zoom.
 *
 * @param rowHeight - Height of a table row in px (default: 48)
 * @param headerHeight - Reserved vertical px for headers/toolbars (default: 160)
 * @param footerHeight - Reserved vertical px for footers/pagination (default: 56)
 * @param minRows - Minimum allowed rows (default: 8)
 * @param maxRows - Maximum allowed rows (default: 32)
 * @returns [pageState, setPageState, pageSize]
 */
export function useAutoTableRows(
    rowHeight: number = 48,
    headerHeight: number = 160,
    footerHeight: number = 56,
    minRows: number = 8,
    maxRows: number = 32
): [
        pageState: { first: number; rows: number },
        setPageState: React.Dispatch<React.SetStateAction<{ first: number; rows: number }>>,
        pageSize: number
    ] {
    const calcRows = useCallback(() => {
        const viewportHeight = window.innerHeight;
        const zoom = window.devicePixelRatio || 1;
        const availableHeight = viewportHeight / zoom - headerHeight - footerHeight;
        const rawRows = Math.floor(availableHeight / rowHeight);
        return Math.max(minRows, Math.min(maxRows, rawRows));
    }, [rowHeight, headerHeight, footerHeight, minRows, maxRows]);

    const [pageSize, setPageSize] = useState<number>(calcRows());
    const [pageState, setPageState] = useState<{ first: number; rows: number }>({
        first: 1,
        rows: pageSize
    });

    useEffect(() => {
        function handleResize() {
            const rows = calcRows();
            setPageSize(rows);
            setPageState(prev => ({ ...prev, rows }));
        }

        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("orientationchange", handleResize);
        };
    }, [calcRows]);

    return [pageState, setPageState, pageSize];
}

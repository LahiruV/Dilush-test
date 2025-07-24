import {useState, useEffect, Dispatch, SetStateAction} from 'react'

interface HookProps {
    isFormSubmit: boolean;
    multiSortMeta: any[];
    setMultiSortMeta: Dispatch<SetStateAction<any[]>>;
    orderBy: string;
    setOrderBy: () => void;
    dispatcher: () => void;
    refetch: () => void;
}

/**
 * Handles form submission and filter clearing logic for filter forms.
 * @param {HookProps} props - `HookProps` properties
 * @param {boolean} props.isFormSubmit - Indicates if the form is submitted
 * @param {Array} props.multiSortMeta - Sorting data
 * @param {Function} props.setMultiSortMeta - Set sorting data
 * @param {string} props.orderBy - Sorting value
 * @param {Function} props.setOrderBy - Set sorting value
 * @param {Function} props.dispatcher - Redux dispatcher to be executed on form submit
 * @param {Function} props.refetch - Query refetch
 * 
 * @example
 *   useResetTableSorting({
        isFormSubmit,
        multiSortMeta,
        setMultiSortMeta,
        orderBy,
        setOrderBy: () => setOrderBy("catlog_code asc"),
        dispatcher: () => dispatch(setIsFetchingCustomerPriceList(false)),
        refetch,
    });
 */

export const useResetTableSorting = ({isFormSubmit, multiSortMeta, setMultiSortMeta, orderBy, setOrderBy, dispatcher, refetch}: HookProps) => {
  const [isFetching, setIsFetching] = useState(false);

 useEffect(() => {
        if (isFormSubmit && multiSortMeta.length > 0) {
            dispatcher();
            setMultiSortMeta([]);
            setOrderBy();
            setIsFetching(true);
        }
    }, [isFormSubmit, multiSortMeta]);

    useEffect(() => {
        if (isFetching) {
            refetch();
            setIsFetching(false);
        }
    }, [orderBy, isFetching])
}


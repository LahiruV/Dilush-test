import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface UseCheckedListProps<T> {
    initialList: T[];
    updateAction: (updatedList: T[]) => { type: string; payload: T[] };
    idKey: keyof T;
}

/**
 * Custom hook to manage a list of items with a checked status.
 *
 * @template T - The type of items in the list. Each item must have an optional `checked` property.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {T[]} params.initialList - The initial list of items.
 * @param {Function} params.updateAction - The action to dispatch when the list is updated.
 * @param {string} params.idKey - The key used to identify items in the list.
 *
 * @returns {Object} The hook's return values.
 * @returns {T[]} return.list - The current list of items.
 * @returns {T[]} return.checkedItems - The list of checked items.
 * @returns {Function} return.updateCheckedStatus - Function to update the checked status of items.
 * 
 * author: @LahiruV	
 */
export const useCheckedList = <T extends { [key: string]: any; checked?: boolean }>({
    initialList,
    updateAction,
    idKey,
}: UseCheckedListProps<T>) => {
    const dispatch = useDispatch();
    const [list, setList] = useState<T[]>(initialList);
    const [checkedItems, setCheckedItems] = useState<T[]>([]);

    useEffect(() => {
        setList(initialList);
    }, [initialList]);

    useEffect(() => {
        const filtered = list.map((item, index) => ({
            ...item,
            uniqueId: `${item?.[idKey]}-${index}`
        })).filter((item) => item.checked);
        setCheckedItems(filtered);
    }, [list]);


    const updateCheckedStatus = (selectedItems: T[]) => {
        const updatedList = list.map((item) => ({
            ...item,
            checked: selectedItems.some((selected) => selected[idKey] === item[idKey]),
        }));
        setList(updatedList);
        dispatch(updateAction(updatedList));
    };

    return {
        list,
        checkedItems,
        updateCheckedStatus,
    };
};

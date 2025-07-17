import { useDispatch } from 'react-redux';
/**
 * Renders the status content for a table based on the provided status.
 * 
 * @param {string} status - The current status of the operation.
 * @param {boolean} isFetch - Indicates if the data is being fetched.
 * @param {any} error - The error object if an error occurred.
 * @param {Function} setState - The function to update the state.
 * @returns {string} - The content to be rendered based on the status.
 * @author Lahiru Vimukthi
 * @date 18/09/2024
 */
export const renderStatusContentTable = (status: any, isFetch: any, error: any, setState?: Function | null) => {
    const dispatch = useDispatch();
    switch (status) {
        case 'pending':
            return !isFetch ? 'Please click on filter to view data' : 'Loading...';
        case 'error':
            setState && dispatch(setState(false));
            return (error?.message || "An error occurred");
        case 'success':
            setState && dispatch(setState(false));
    }
};

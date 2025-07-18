import { Tag } from "primereact/tag";
import './widget.css';

export const TagLabel = (rowData: any) => {
    let severity: 'success' | 'danger' | 'warning' | 'info' | 'secondary' | 'new' = 'secondary'; // Default to secondary
    let label = '';
    
    switch (rowData.status) {
        case 'Complete':
            severity = 'success'; // Green
            label = 'Complete';
            break;
        case 'Rejected':
            severity = 'danger'; // Red
            label = 'Rejected';
            break;
        case 'Cancelled':
            severity = 'warning'; // Yellow
            label = 'Cancelled';
            break;
        case 'Represented':
            severity = 'info'; // Blue
            label = 'Represented';
            break;
        case 'Printed':
            severity = 'secondary'; // Blue
            label = 'Printed';
            break;
        case 'New':
            severity = 'new'; // Blue
            label = 'New';
            break;
        default:
            severity = 'secondary'; // Grey
            label = rowData.status;
            break;
    }

    return <Tag className={"tag-label " + (severity == 'new' ? 'tag-label-new' : '')} value={label} severity={severity == 'new' ? null : severity} />;
};
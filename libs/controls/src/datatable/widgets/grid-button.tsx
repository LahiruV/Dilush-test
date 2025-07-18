import { Button } from 'primereact/button';
import './widget.css';

export interface GridButtonWidgetProps {
    id?: string;
    name?: string;
    classNames?: string;
    callBack?: any;
    isDisabled?: boolean;
    isFetching?: boolean;
    isExporting?: boolean;
    icon?: any;
    actionType?: string;
    rowId?: any;
}

export const GridButton = (options: GridButtonWidgetProps, buttonType?: string, rowData?: any) => {
    return (
        <Button
                id={options.id}
                className={`k-button ${options.classNames}`}
                onClick={() => options.callBack(buttonType ?? '', rowData)}
                disabled={options.isDisabled}                
                icon={options.icon? options.icon : null}
            >
                {options.name}
            </Button>
    );
};
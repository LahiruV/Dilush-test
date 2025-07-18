import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import * as fa2 from '@fortawesome/free-solid-svg-icons';

export interface ButtonWidgetProps {
    id: string;
    name?: string;
    classNames?: string;
    Function?: () => void;
    isDisabled?: boolean;
    isFetching?: boolean;
    isExporting?: boolean;
    type?: 'button' | 'submit' | 'reset';
    form?: string;
    isIcon?: boolean;
    icon?: ReactNode;
    iconCss?: string;
}

/**
 * ButtonWidget component renders a button with dynamic label and state.
 * 
 * @param {ButtonWidgetProps} props - The properties for the ButtonWidget component.
 * @param {string} props.id - The unique identifier for the button.
 * @param {string} props.name - The default label for the button.
 * @param {string} props.classNames - Additional CSS classes for styling the button.
 * @param {Function} props.Function - The function to be called on button click.
 * @param {boolean} props.isDisabled - Flag to indicate if the button is disabled.
 * @param {boolean} props.isExporting - Flag to indicate if data is being exported.
 * @param {boolean} props.isFetching - Flag to indicate if data is being fetched.
 * @param {string} props.type - The type of the button (button, submit, reset).
 * @param {string} props.form - The form the button is associated with.
 * @param {boolean} [props.isIcon] - Optional flag to indicate if the button is an icon button.
 * @param {any} [props.icon] - Optional icon to be displayed on the button if `isIcon` is true.
 * @param {string} [props.iconCss] - Optional CSS class for the icon.
 * 
 * @returns {JSX.Element} The rendered button component.
 * 
 * @author @LahiruV 🐺
 * @date 2024-10-05
 */
export function ButtonWidget({ id, name, classNames, Function, isDisabled, isExporting, isFetching, type, form, isIcon, icon, iconCss }: ButtonWidgetProps) {
    const buttonLabel = () => {
        if (isFetching) {
            return isDisabled ? 'Filtering...' : 'Filter';
        }
        if (isExporting) {
            return isDisabled ? 'Excel' : 'Excel';
        }
        return name;
    };

    return (
        <div>
            <button
                id={id}
                className={`k-button ${classNames}`}
                onClick={() => Function?.()}
                disabled={isDisabled}
                type={type}
                form={form}
            >
                {buttonLabel()}
                {isIcon && icon && <span className={`icon ${iconCss}`}>{icon}</span>}
                {isExporting && <FontAwesomeIcon color='white' icon={fa2.faFileExcel} className="margin-left-2" />}
            </button>
        </div>
    );
}

export default ButtonWidget;

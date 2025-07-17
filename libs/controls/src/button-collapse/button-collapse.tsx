import { CSSProperties } from 'react'
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './button-collapse.css';

export interface ButtonWidgetCollapseProps {
    id: string;
    name?: string;
    classNames?: string;
    numSpaces?: number;
    setState: (newState: boolean) => void;
    state: boolean;
    isDisabled?: boolean;
    isIconButton?: boolean;
    buttonIcon?: fa2.IconDefinition;
    iconButtonStyles?: CSSProperties;
}

/**
 * ButtonWidgetCollapse component renders a button that toggles its state when clicked.
 * It displays a name and an icon that changes based on the state.
 * 
 * @param {string} id - The unique identifier for the button element.
 * @param {string} name - The text to be displayed on the button.
 * @param {string} classNames - Additional CSS classes to apply to the button.
 * @param {number} [numSpaces=1] - The number of non-breaking spaces to insert after the name.
 * @param {Function} setState - The function to call to toggle the state.
 * @param {boolean} state - The current state of the button, used to determine the icon.
 * @param {boolean} isDisabled - Indicates whether the button is disabled.
 * 
 * @returns {JSX.Element} The rendered button component.
 * 
 * @author @LahiruV 🐺
 * @date 2024-10-05
 */
export function ButtonWidgetCollapse({
    id,
    name,
    classNames,
    numSpaces = 1,
    setState,
    state,
    isDisabled,
    isIconButton = false,
    buttonIcon = fa2.faChevronDown,
    iconButtonStyles
}: ButtonWidgetCollapseProps) {

    const createSpaces = (count: number) => {
        return Array.from({ length: count }, () => '\u00A0').join('');
    };

    return (
        <div>
            <button
                id={id}
                className={isIconButton ? `icon-button ${classNames}` : `k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary ${classNames}`}
                onClick={() => setState(!state)}
                disabled={isDisabled}
                type='button'
            >
                {isIconButton ? (<>
                    <FontAwesomeIcon className='icon-button-icon' icon={buttonIcon} style={{ ...iconButtonStyles }} />
                </>) : (<>
                    {name}{createSpaces(numSpaces)}
                    <FontAwesomeIcon icon={state ? fa2.faAngleUp : fa2.faAngleDown} style={{ paddingLeft: '12px', marginTop: '1px' }} />
                </>)}
            </button>
        </div>
    );
}

export default ButtonWidgetCollapse;

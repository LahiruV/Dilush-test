import React, { useState, useEffect, useRef } from 'react';

interface EditableDropdownProps {
    label: string; // The label for the dropdown
    options: { label: string, value: string }[]; // Array of objects with label and value
    selectedValue: string; // The currently selected value
    onChange: (value: string) => void; // Callback to handle the selected value change
}

const EditableDropdown: React.FC<EditableDropdownProps> = ({ label, options, selectedValue, onChange }) => {
    const [inputValue, setInputValue] = useState(selectedValue);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown container

    // Close the dropdown when focus is lost
    const handleBlur = () => {
        setTimeout(() => {
            setIsDropdownOpen(false);
        }, 100);
    };

    useEffect(() => {
        setInputValue(selectedValue); // Sync the selected value prop with the input value
    }, [selectedValue]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility when clicked
    };

    const handleOptionSelect = (option: string) => {
        setInputValue(option); // Set the input to the selected option
        onChange(option); // Notify the parent component of the selection
        setIsDropdownOpen(false); // Close the dropdown after selection
    };

    const handleClear = () => {
        setInputValue(''); // Clear the input value
        onChange(''); // Notify the parent component to reset the value
        setIsDropdownOpen(false); // Close the dropdown
    };

    return (
        <div className="dropdown-container" >
            <label htmlFor="editable-dropdown">
                {label}
            </label>
            <div className="dropdown" style={{ position: 'relative' }} ref={dropdownRef}>
                <div className="input-container" style={{ position: 'relative' }}>
                    <input
                        type="text"
                        id="editable-dropdown"
                        className="form-control"
                        value={inputValue}
                        onChange={handleInputChange}
                        onClick={handleDropdownToggle} // Toggle dropdown on click
                        onBlur={handleBlur} // Close dropdown when focus is lost
                        placeholder="Select or type an option"
                    />
                    {/* Clear Icon */}
                    {inputValue && (
                        <button
                            type="button"
                            className="clear-button"
                            onClick={handleClear}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#aaa',
                            }}
                        >
                            &times; {/* You can replace this with an SVG or FontAwesome icon */}
                        </button>
                    )}
                </div>

                {isDropdownOpen && (
                    <ul className="dropdown-menu show" style={{ position: 'absolute', width: '100%' }}>
                        {options
                            .filter(option => option.label.toLowerCase().includes(inputValue.toString().toLowerCase()))
                            .map((option, index) => (
                                <li
                                    key={index}
                                    className="dropdown-item"
                                    onMouseDown={() => handleOptionSelect(option.value)} // Use onMouseDown to prevent input blur immediately
                                >
                                    {option.label}
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default EditableDropdown;

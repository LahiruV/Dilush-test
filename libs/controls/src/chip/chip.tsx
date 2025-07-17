import Chip from '@mui/joy/Chip';

interface ChipWidgetProps {
    type: any;
    className?: string;
    minWidth?: string;
    fontSize?: string;
    textAlign?: string;
    size?: 'sm' | 'md' | 'lg';
}

/**
 * Renders a ChipWidget component using the provided data and configuration options.
 * @param {ChipWidgetProps} props - The properties object.
 * @param {any} props.type - The type of the chip (string, number, etc.).
 * @param {string} [props.className] - Additional CSS classes for styling the chip.
 * @param {string} [props.minWidth] - Minimum width of the chip.
 * @param {string} [props.fontSize] - Font size of the chip text.
 * @param {string} [props.textAlign] - Text alignment within the chip.
 * @param {'sm' | 'md' | 'lg'} [props.size] - Size of the chip.
 * 
 * @returns {JSX.Element} The rendered ChipWidget component.
 * 
 * @author @LahiruV 🐺
 * @date 2024-10-05
 * */

export const ChipWidget = ({ type, className, minWidth, fontSize, textAlign, size }: ChipWidgetProps) => {
    return (
        <div style={{ fontSize: '10px' }}>
            {type && typeof type !== 'object' &&
                <Chip
                    variant="solid"
                    style={{ fontSize: fontSize || '12px', minWidth: minWidth || '', textAlign: textAlign as 'left' | 'right' | 'center' | 'justify' | undefined || 'center' }}
                    className={className}
                    size={size || 'sm'}
                >
                    {String(type)}
                </Chip>
            }
        </div>
    );
}

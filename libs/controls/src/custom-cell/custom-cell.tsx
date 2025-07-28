import { CSSProperties } from 'react'

interface CustomCellProps {
    styles?: CSSProperties;
    value?: string | number | null;
    className?: string;
}

export const CustomCell = ({ className, styles, value }: CustomCellProps) => {
    return (
        <span
            className={className}
            style={{
                display: styles?.width === 'auto' ? undefined : 'inline-block',
                padding: '0 4px',
                borderRadius: '3px',
                ...styles,
            }}
        >
            {value}
        </span>
    );
}

interface CustomCellProps {
    value?: string | number | null;
    color?: string | null;
    backgroundColor?: string | null;
    width?: string;
    className?: string;
}

export const CustomCell = ({ value, color, backgroundColor, width = 'auto', className }: CustomCellProps) => {
    return (
        <span
            className={className}
            style={{
                color: color || undefined,
                backgroundColor: backgroundColor || undefined,
                width,
                display: width === 'auto' ? undefined : 'inline-block',
                padding: '0 4px',
                borderRadius: '3px',
            }}
        >
            {value}
        </span>
    );
}

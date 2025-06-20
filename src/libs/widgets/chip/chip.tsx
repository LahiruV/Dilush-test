import * as React from 'react';
import Chip from '@mui/joy/Chip';

export interface BasicChipProps {
    className?: string;
    variant?: 'outlined' | 'plain' | 'soft' | 'solid';
    icon?: JSX.Element;
    color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
    size?: 'sm' | 'md' | 'lg';
    style?: React.CSSProperties;
    label: string;
}

const BasicChip: React.FC<BasicChipProps> = ({ className, variant, icon, color, size, style, label }) => {
    variant = variant || 'solid';
    return (
        <div>
            <Chip
                size={size}
                color={color}
                className={className}
                variant={variant}
                startDecorator={icon}
                style={style}
            >
                {label}
            </Chip>
        </div>
    );
}

export default BasicChip;

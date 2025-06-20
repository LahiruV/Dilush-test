import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import { CardHeader } from '@mui/material';

export interface BasicCardProps {
    classNameHeader?: string;
    className?: string;
    variant?: 'outlined' | 'plain' | 'soft' | 'solid';
    color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
    size?: 'sm' | 'md' | 'lg';
    content: React.ReactNode;
    header?: string;
    isHeader?: boolean;
    action?: React.ReactNode;
}

const BasicCard: React.FC<BasicCardProps> = ({ classNameHeader, className, variant, color, size, header, content, isHeader, action }) => {
    variant = variant || 'plain';
    return (
        <div>
            <Card
                variant={variant}
                color={color}
                size={size}
                className={className}
            >
                {isHeader && (
                    <CardHeader
                        title={header}
                        className={classNameHeader}
                        action={
                            action
                        }
                    />
                )}
                <CardContent>
                    {content}
                </CardContent>
            </Card>
        </div>
    );
}

export default BasicCard;

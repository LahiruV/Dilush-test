/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export interface HorizontalBarsProps {
    textColor: string
    dataset: any
    yAxisDataKey: string
    xAxisLabel: string
    dataKey: string
    label: string
    forMatter?: string
    width?: number
    height?: number
    color?: string
    className?: string
}

const HorizontalBars: React.FC<HorizontalBarsProps> = ({ textColor, dataset, yAxisDataKey, xAxisLabel, dataKey, label, forMatter, width, height, color, className }) => {

    function valueFormatter(value: number | null) {
        return `${value} ${forMatter || ''}`;
    }

    const customTheme = createTheme({
        palette: {
            text: {
                primary: textColor,
            },
        },
        typography: {
            fontSize: 12,
        },
    });

    return (
        <ThemeProvider theme={customTheme}>
            <div className={className}>
                <BarChart
                    dataset={dataset}
                    yAxis={[{
                        scaleType: 'band', dataKey: yAxisDataKey,
                    }]}
                    xAxis={[{ label: xAxisLabel, }]}
                    width={width}
                    height={height}
                    series={[{ dataKey: dataKey, label: label, valueFormatter, color: color || '#02B2AF' }]}
                    layout="horizontal"
                />
            </div>
        </ThemeProvider>
    );
};

export default HorizontalBars;

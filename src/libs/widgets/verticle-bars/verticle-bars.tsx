/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarChart } from '@mui/x-charts/BarChart';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface Series {
    dataKey: string
    label: string
    forMatter?: string
    color?: string
}

export interface SimpleBarChartProps {
    textColor: string
    dataset: any
    xAxisDataKey: string
    xAxisLabel?: string
    yAxisLabel?: string
    width?: number
    height?: number
    className?: string
    borderRadius?: number
    series?: Series[]
}

const VerticleBars: React.FC<SimpleBarChartProps> = ({ textColor, dataset, xAxisDataKey, width, height, xAxisLabel, yAxisLabel, className, borderRadius, series }) => {

    function valueFormatter(value: number | null) {
        return `${value} ${(series?.[0]?.forMatter) || ''}`;
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
                    width={width}
                    height={height}
                    xAxis={[{
                        scaleType: 'band', dataKey: xAxisDataKey, label: xAxisLabel,
                    }]}
                    yAxis={[{
                        label: yAxisLabel
                    }]}
                    // series={[{ dataKey: dataKey, label: label, valueFormatter, color: color || '#02B2AF' }]}
                    series={series || [{ dataKey: '', label: '', valueFormatter, color: '#02B2AF' }]}
                    borderRadius={borderRadius || 0}
                />
            </div>
        </ThemeProvider>
    );
}

export default VerticleBars;

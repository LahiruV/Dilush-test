import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { statusRenderFunction } from '@peerless/common';
import IndeterminateSpinner from '../indeterminate-spinner/indeterminate-spinner';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export interface LineChartProps {
    categories: string[];
    series: {
        name?: string;
        data: any[];
        color: string;
    }[];
    legendPosition?: "top" | "bottom" | "left" | "right";
    legendAlign?: "start" | "center" | "end";
    displayLegend?: boolean;
    renderStatusContent?: any
}

/**
 * Renders a LineChart component using the provided data and configuration.
 * 
 * @param {Object} props - The properties object.
 * @param {Array<string>} props.categories - The categories for the x-axis labels.
 * @param {Array<Object>} props.series - The series data for the chart.
 * @param {string} props.legendPosition - The position of the legend on the chart.
 * @param {string} props.legendAlign - The alignment of the legend on the chart.
 * @param {boolean} props.displayLegend - Flag to display or hide the legend.
 * @param {Object} props.renderStatusContent - Configuration for rendering status content.
 * @param {boolean} props.renderStatusContent.isRenderStatusContentTable - Flag to render status content table.
 * @param {boolean} props.renderStatusContent.isFetch - Flag indicating if data is being fetched.
 * @param {string} props.renderStatusContent.status - The status message to display.
 * @param {boolean} props.renderStatusContent.isStatusOutput - Flag to determine if status output should be returned.
 * @param {Function} props.renderStatusContent.setStateFunction - Function to set the state.
 * @param {string} props.renderStatusContent.error - Error message to display.
 * 
 * @returns {JSX.Element} The rendered LineChart component or status content.
 * 
 * @author @LahiruV 🐺
 * @date 2024-10-05
 */
export function LineChart({ categories, series, legendPosition, legendAlign, displayLegend, renderStatusContent }: LineChartProps) {
    const chartData = {
        labels: categories,
        datasets: series.map((series) => ({
            label: series.name,
            data: series.data,
            borderColor: series.color,
            backgroundColor: series.color,
            fill: false,
        }))
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: displayLegend,
                position: legendPosition,
                align: legendAlign,
            },
            tooltip: {
                enabled: true,
            },
        }
    };

    if (renderStatusContent?.isRenderStatusContentTable) {
        const statusOutput = statusRenderFunction.renderStatusContentTable(renderStatusContent.status, renderStatusContent.isFetch, renderStatusContent.error, renderStatusContent.setStateFunction || (() => { }));
        if (renderStatusContent.isStatusOutput && statusOutput) {
            if (statusOutput === 'Loading...') {
                return (
                    <div className="status-output">
                        <IndeterminateSpinner />
                    </div>
                );
            }
            return (
                <div className="status-output" style={{ display: 'flex', justifyContent: 'center', marginTop: '15px', fontSize: '12px' }}>
                    {statusOutput}
                </div>
            );
        }
    }


    return (
        <Line data={chartData} options={options} />
    );
}

export default LineChart;

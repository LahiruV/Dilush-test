import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { statusRenderFunction } from '@peerless/common';
import IndeterminateSpinner from '../indeterminate-spinner/indeterminate-spinner';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export interface BarChartProps {
    categories: string[];
    series: {
        name?: string;
        data: any[];
        color: string[];
    }[];
    legendPosition?: "top" | "bottom" | "left" | "right";
    legendAlign?: "start" | "center" | "end";
    displayLegend?: boolean;
    renderStatusContent?: any;
    customTooltipCallback?: (tooltipItem: any) => string | string[];
}

/**
 * Renders a bar chart using the provided categories and series data.
 * 
 * @param {BarChartProps} props - The properties for the BarChart component.
 * @param {string[]} props.categories - The categories for the x-axis of the chart.
 * @param {Array<{ name: string, data: number[], color: string }>} props.series - The series data for the chart.
 * @param {string} props.legendPosition - The position of the legend on the chart.
 * @param {string} props.legendAlign - The alignment of the legend on the chart.
 * @param {boolean} props.displayLegend - Flag to display or hide the legend.
 * @param {Object} [props.renderStatusContent] - Optional object to render status content.
 * @param {boolean} [props.renderStatusContent.isRenderStatusContentTable] - Flag to determine if status content table should be rendered.
 * @param {boolean} [props.renderStatusContent.isStatusOutput] - Flag to determine if status output should be returned.
 * @param {string} [props.renderStatusContent.status] - The status to be rendered.
 * @param {boolean} [props.renderStatusContent.isFetch] - Flag to indicate if data is being fetched.
 * @param {string} [props.renderStatusContent.error] - Error message to be displayed if any.
 * @param {Function} [props.renderStatusContent.setStateFunction] - Function to set the state.
 * @param {Function} [props.customTooltipCallback] - Optional custom tooltip callback function to format tooltip content.
 * 
 * @returns {JSX.Element} The rendered bar chart or status content.
 * 
 * @author @LahiruV 🐺
 * @date 2024-10-05
 */
export function BarChart({ categories, series, legendPosition, legendAlign, displayLegend, renderStatusContent, customTooltipCallback }: BarChartProps) {
    const chartData = {
        labels: categories,
        datasets: series.map((series) => ({
            label: series.name,
            data: series.data,
            backgroundColor: series.color,
        }))
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: legendPosition,
                align: legendAlign,
                display: displayLegend,
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: customTooltipCallback
                        ? customTooltipCallback
                        : function (tooltipItem: any) {
                            return `${tooltipItem.parsed.y}`;
                        },
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
        maintainAspectRatio: true,
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
        <Bar data={chartData} options={options} />
    );
}

export default BarChart;

import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";
import { statusRenderFunction } from "@peerless/common";
import IndeterminateSpinner from "../indeterminate-spinner/indeterminate-spinner";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface PieChartProps {
    categories: string[];
    series: {
        name?: string;
        data: any[];
        color: string[];
    }[];
    legendPosition?: "top" | "bottom" | "left" | "right";
    legendAlign?: "start" | "center" | "end";
    width?: number;
    height?: number;
    displayLegend?: boolean;
    renderStatusContent?: any
    customTooltipCallback?: (context: any) => string | string[];
}

/**
 * Renders a PieChart component using the provided data and configuration options.
 * 
 * @param {Object} props - The properties object.
 * @param {Array<string>} props.categories - The categories for the pie chart.
 * @param {Array<Object>} props.series - The series data for the pie chart.
 * @param {string} props.legendPosition - The position of the legend.
 * @param {string} props.legendAlign - The alignment of the legend.
 * @param {number} [props.width=400] - The width of the chart.
 * @param {number} [props.height=400] - The height of the chart.
 * @param {boolean} props.displayLegend - Flag to display the legend.
 * @param {Object} props.renderStatusContent - The status content rendering configuration.
 * @param {boolean} props.customTooltipCallback - Optional custom tooltip callback function to format tooltip content.
 * 
 * @returns {JSX.Element} The rendered PieChart component.
 * 
 * @author @LahiruV 🐺
 * @date 2024-10-05
 */
export function PieChart({ categories, series, legendPosition, legendAlign, width, height, displayLegend, renderStatusContent, customTooltipCallback }: PieChartProps) {
    const chartData = {
        labels: categories,
        datasets: series.map((series) => ({
            label: series.name,
            data: series.data,
            borderColor: series.color,
            backgroundColor: series.color,
            fill: false,
        })),
    };

    const options: ChartOptions<'pie'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: displayLegend,
                position: legendPosition,
                align: legendAlign,
                labels: {
                    boxWidth: 20,
                    padding: 10,
                    usePointStyle: true,
                },
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: customTooltipCallback
                        ? customTooltipCallback
                        : function (context) {
                            const value = context.raw as number;
                            const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
                            const percent = ((value / total) * 100).toFixed(1);
                            const label = context.label || '';
                            return `${label}: ${value} (${percent}%)`;
                        },
                },
            },
        },
    };

    const chartWidth = width || 400;
    const chartHeights = height || 400;

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
        <div style={{ position: 'relative', width: `${chartWidth}px`, height: `${chartHeights}px` }}>
            <Pie data={chartData} options={options} />
        </div>
    );
}

export default PieChart;

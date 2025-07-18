import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";
import { statusRenderFunction } from "@peerless/common";
import { RenderStatusContentTable } from "@peerless/models";

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
    renderStatusContent?: RenderStatusContentTable
}

export function PieChart({ categories, series, legendPosition, legendAlign, width, height, displayLegend, renderStatusContent }: PieChartProps) {
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
            },
        },
    };

    const chartWidth = width || 400;
    const chartHeights = height || 400;

    if (renderStatusContent?.isRenderStatusContentTable) {
        const statusOutput = statusRenderFunction.renderStatusContentTable(renderStatusContent.status, renderStatusContent.isFetch, renderStatusContent.error, renderStatusContent.setStateFunction || (() => { }));
        if (renderStatusContent.isStatusOutput)
            if (statusOutput) return statusOutput;
    }

    return (
        <div style={{ position: 'relative', width: `${chartWidth}px`, height: `${chartHeights}px` }}>
            <Pie data={chartData} options={options} />
        </div>
    );
}

export default PieChart;

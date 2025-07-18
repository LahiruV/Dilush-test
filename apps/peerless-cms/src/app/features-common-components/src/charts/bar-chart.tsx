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
import { RenderStatusContentTable } from '@peerless/models';

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
    renderStatusContent?: RenderStatusContentTable
}

export function BarChart({ categories, series, legendPosition, legendAlign, displayLegend, renderStatusContent }: BarChartProps) {
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
        if (renderStatusContent.isStatusOutput)
            if (statusOutput) return statusOutput;
    }

    return (
        <div>
            <Bar data={chartData} options={options} />
        </div>
    );
}

export default BarChart;

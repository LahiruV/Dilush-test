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
import { RenderStatusContentTable } from '@peerless/models';

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
    renderStatusContent?: RenderStatusContentTable
}

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
        if (renderStatusContent.isStatusOutput)
            if (statusOutput) return statusOutput;
    }

    return (
        <div>
            <Line data={chartData} options={options} />
        </div>
    );
}

export default LineChart;

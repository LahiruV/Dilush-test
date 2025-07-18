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

interface ChartData {
    labels: string[];
    datasets: Array<{
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
    }>;
}

interface AxisLabel {
    xLabel?: string,
    yLabel?: string,
    fontColor?: string,
    fontSize?: number
}

export interface BarChartV2Props {
    chartData: ChartData;
    legendPosition?: "top" | "bottom" | "left" | "right";
    legendAlign?: "start" | "center" | "end";
    displayLegend?: boolean;
    axisLabels?: AxisLabel;
    renderStatusContent?: RenderStatusContentTable
}

export function BarChartV2({ chartData, legendPosition, legendAlign, displayLegend, axisLabels, renderStatusContent }: BarChartV2Props) {
    const options = {
        scales: {
            x: {
                title: {
                    display: axisLabels != null,
                    text: axisLabels != null ? axisLabels.xLabel ?? '' : '',
                    font: {
                        size: axisLabels != null ? axisLabels.fontSize ?? 12 : 12,
                    },
                    color: axisLabels != null ? axisLabels.fontColor ?? '#6D869F' : '#6D869F',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: axisLabels != null,
                    text: axisLabels != null ? axisLabels.yLabel ?? '' : '',
                    font: {
                        size: axisLabels != null ? axisLabels.fontSize ?? 12 : 12,
                    },
                    color: axisLabels != null ? axisLabels.fontColor ?? '#6D869F' : '#6D869F',
                },
            }
        },
        plugins: {
            legend: {
                display: displayLegend,
                position: legendPosition,
                align: legendAlign,
            }
        }
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

export default BarChartV2;

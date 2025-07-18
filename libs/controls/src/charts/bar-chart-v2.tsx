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
    renderStatusContent?: any
}

/**
 * Renders a Bar Chart with customizable options and status content.
 * 
 * @param {BarChartV2Props} props - The properties for the BarChartV2 component.
 * @param {object} props.chartData - The data to be displayed in the bar chart.
 * @param {string} props.legendPosition - The position of the legend in the chart.
 * @param {string} props.legendAlign - The alignment of the legend in the chart.
 * @param {boolean} props.displayLegend - Flag to display or hide the legend.
 * @param {object} props.axisLabels - The labels for the x and y axes.
 * @param {string} [props.axisLabels.xLabel] - The label for the x-axis.
 * @param {string} [props.axisLabels.yLabel] - The label for the y-axis.
 * @param {number} [props.axisLabels.fontSize=12] - The font size for the axis labels.
 * @param {string} [props.axisLabels.fontColor='#6D869F'] - The font color for the axis labels.
 * @param {object} props.renderStatusContent - The status content to be rendered.
 * @param {boolean} props.renderStatusContent.isRenderStatusContentTable - Flag to render status content table.
 * @param {boolean} props.renderStatusContent.isFetch - Flag indicating if data is being fetched.
 * @param {string} props.renderStatusContent.status - The status of the content.
 * @param {boolean} props.renderStatusContent.isStatusOutput - Flag to determine if status output should be returned.
 * @param {Function} [props.renderStatusContent.setStateFunction] - Function to set the state.
 * 
 * @returns {JSX.Element} The rendered Bar Chart component.
 * 
 * @author @LahiruV 🐺
 */
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

export default BarChartV2;

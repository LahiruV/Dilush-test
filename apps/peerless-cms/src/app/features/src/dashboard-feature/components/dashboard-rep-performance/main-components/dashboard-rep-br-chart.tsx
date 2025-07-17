
import { ChartData } from '@peerless/models';
import './dashboard-rep-main-chart.css';
import { LineChart } from '@peerless/controls';

export interface RepBottomRightChartProps {
    gPContributionChartData: ChartData;
}

export function RepBottomRightChart(props: RepBottomRightChartProps) {

    return (
        <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #e0e0e0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <span className='rep-bold'>CONTRIBUTION & NET SALES CHART</span>
            <div className='padding-25'>
                <div className="chart-rep-item">
                    <LineChart {...props.gPContributionChartData} legendPosition='bottom' legendAlign='center' />
                </div>
            </div>
        </div>
    );
}

export default RepBottomRightChart;

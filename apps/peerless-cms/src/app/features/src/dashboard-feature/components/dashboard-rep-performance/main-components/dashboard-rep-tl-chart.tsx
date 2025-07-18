import { Dispatch, SetStateAction } from 'react';
import './dashboard-rep-main-chart.css';
import { ChartData, DropDownData } from '@peerless/models';
import { DropDown, LineChart } from '@peerless/controls';

export interface RepTopLeftChartProps {
    setDropSelectVisit: Dispatch<SetStateAction<DropDownData>>;
    userTypeSelect: DropDownData;
    dropSelectVisit: DropDownData;
    visitChartData: ChartData;
}

const dropDownDataVisit = [
    { text: "Visit to Customer", id: 1, value: 2 },
    { text: "Visit to End Users", id: 2, value: 1 },
    { text: "Customer Acquisitions", id: 3, value: 3 },
    { text: "End User Acquisitions", id: 4, value: 4 }
];

export function RepTopLeftChart(props: RepTopLeftChartProps) {

    const cusDropDownData = dropDownDataVisit.filter(item => item.id === 1 || item.id === 3);
    const endDropDownData = dropDownDataVisit.filter(item => item.id === 2 || item.id === 4);

    const getDropDownDataVisits = () => {
        switch (props.userTypeSelect.value) {
            case "customer":
                return cusDropDownData;
            case "enduser":
                return endDropDownData;
            default:
                return dropDownDataVisit;
        }
    };

    const popupSettings = {
        width: '152px',
        fontSize: '12px'
    };


    return (
        <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #e0e0e0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <span className='rep-bold'>VISITS CHART</span>
            <div className='rep-controlled-aliment'>
                <DropDown
                    id='tl-dropdown'
                    className="dropdown-rep"
                    isClearable={false}
                    datalist={getDropDownDataVisits()}
                    textField="text"
                    dataItemKey="id"
                    size={'small'}
                    setValue={props.setDropSelectVisit}
                    fillMode={'flat'}
                    value={props.dropSelectVisit}
                    popupSettings={popupSettings}
                />
            </div>
            <div className="chart-rep-item">
                <LineChart {...props.visitChartData} legendPosition='bottom' legendAlign='center' />
            </div>
        </div>
    );
}

export default RepTopLeftChart;

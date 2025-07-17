import { Dispatch, SetStateAction } from 'react';
import './dashboard-rep-main-chart.css';
import { ChartData, DropDownData } from '@peerless/models';
import { DropDown, LineChart, RadioButtonWidget } from '@peerless/controls';

export interface RepBottomLeftChartProps {
    setDropSelectCTAchive: Dispatch<SetStateAction<DropDownData>>;
    setConTargetAchievmentRadio: Dispatch<SetStateAction<string>>;
    dropSelectCTAchive: DropDownData;
    conTargetAchievmentRadio: string;
    conTargetAchievmentChartData: ChartData;
}

const dropDownDataCTAchive = [
    { text: "Financial Year", id: 1, value: 1 },
    { text: "Current Quarter", id: 2, value: 2 },
    { text: "Current Month", id: 3, value: 3 },
    { text: "Previous Financial Year", id: 4, value: 4 },
    { text: "Previous Quarter", id: 5, value: 5 },
    { text: "Previous Month", id: 6, value: 6 },
];

const popupSettings = {
    width: '152px',
    fontSize: '12px'
};

export function RepBottomLeftChart(props: RepBottomLeftChartProps) {

    return (
        <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #e0e0e0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <span className='rep-bold'>CONTRIBUTION & TONNES TARGET ACHIEVEMENT CHART</span>
            <div className='rep-controlled-aliment'>

                <DropDown
                    id='bl-dropdown'
                    className="dropdown-rep"
                    isClearable={false}
                    datalist={dropDownDataCTAchive}
                    textField="text"
                    dataItemKey="id"
                    setValue={props.setDropSelectCTAchive}
                    value={props.dropSelectCTAchive}
                    fillMode={'flat'}
                    size={'small'}
                    popupSettings={popupSettings}
                />


                <RadioButtonWidget
                    id='bl-radio-dollars'
                    className="radio-button-rep"
                    name="chartType2"
                    value="1"
                    checked={props.conTargetAchievmentRadio === "1"}
                    label="Dollars"
                    setValue={props.setConTargetAchievmentRadio}
                />

                <RadioButtonWidget
                    id='bl-radio-tonnes'
                    className="radio-button-rep"
                    name="chartType2"
                    value="2"
                    checked={props.conTargetAchievmentRadio === "2"}
                    label="Tonnes"
                    setValue={props.setConTargetAchievmentRadio}
                />
            </div>
            <div className="chart-rep-item">
                <LineChart {...props.conTargetAchievmentChartData} legendPosition='bottom' legendAlign='center' />
            </div>
        </div>
    );
}

export default RepBottomLeftChart;

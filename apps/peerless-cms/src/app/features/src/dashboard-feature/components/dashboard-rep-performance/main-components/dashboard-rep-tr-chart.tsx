import { Dispatch, SetStateAction } from 'react';
import { RadioButton } from '@progress/kendo-react-inputs';
import './dashboard-rep-main-chart.css';
import { ChartData, DropDownData } from '@peerless/models';
import { DropDown, LineChart } from '@peerless/controls';

export interface RepTopRightChartProps {
    setDropSelectSales: Dispatch<SetStateAction<DropDownData>>;
    setDropDownDisabled: Dispatch<SetStateAction<boolean>>;
    setCusSalesRadio: Dispatch<SetStateAction<string>>;
    dropSelectSales: DropDownData;
    dropDownDisabled: boolean;
    loadSalesChartData: ChartData;
    userTypeSelect: DropDownData;
    cusSalesRadio: string;
}

const dropDownDataSales = [
    { text: "Sales in Tonnes", value: 2, id: 1 },
    { text: "Sales in Dollars", value: 1, id: 2 },
];

export function RepTopRightChart(props: RepTopRightChartProps) {

    const renderRadioButtons = () => {
        if (props.userTypeSelect.value === "all") {

            return (
                <>
                    <RadioButton
                        id='tr-radio-customer'
                        className="radio-button-rep"
                        name="cusSalesRadio"
                        value="1"
                        checked={props.cusSalesRadio === "1"}
                        label="Customer"
                        onClick={(event: any) => {
                            props.setCusSalesRadio(event.target.value);
                            props.setDropDownDisabled(false);
                        }}
                    />
                    <RadioButton
                        id='tr-radio-enduser'
                        className="radio-button-rep"
                        name="cusSalesRadio"
                        value="2"
                        checked={props.cusSalesRadio === "2"}
                        label="End User"
                        onClick={(event: any) => {
                            props.setCusSalesRadio(event.target.value);
                            props.setDropDownDisabled(true);
                        }}
                    />
                </>
            );
        } else if (props.userTypeSelect.value === "customer") {
            return (
                <RadioButton
                    id='tr-radio-customer'
                    className="radio-button-rep"
                    name="cusSalesRadio"
                    value="1"
                    checked={props.cusSalesRadio === "1"}
                    label="Customer"
                    onClick={(event: any) => {
                        props.setCusSalesRadio(event.target.value);
                    }}
                />
            );
        } else if (props.userTypeSelect.value === "enduser") {
            return (
                <RadioButton
                    id='tr-radio-enduser'
                    className="radio-button-rep"
                    name="cusSalesRadio"
                    value="2"
                    checked={props.cusSalesRadio === "2"}
                    label="End User"
                    onClick={(event: any) => {
                        props.setCusSalesRadio(event.target.value);
                    }}
                />
            );
        }
        return null;
    };

    const popupSettings = {
        width: '152px',
        fontSize: '12px'
    };


    return (
        <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #e0e0e0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <span className='rep-bold'>CUSTOMER SALES / END-USER TIOS CHART</span>
            <div className='rep-controlled-aliment'>
                <DropDown
                    id='tr-dropdown'
                    className="dropdown-rep"
                    isClearable={false}
                    datalist={dropDownDataSales}
                    textField="text"
                    dataItemKey="id"
                    setValue={props.setDropSelectSales}
                    value={props.dropSelectSales}
                    fillMode={'flat'}
                    size={'small'}
                    popupSettings={popupSettings}
                />
                {renderRadioButtons()}
            </div>
            <div className="chart-rep-item">
                <LineChart {...props.loadSalesChartData} legendPosition='bottom' legendAlign='center' />
            </div>
        </div>
    )

}

export default RepTopRightChart;

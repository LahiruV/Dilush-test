import { RootState } from "@peerless-cms/store";
import { dropDownDataConverter, statusRenderFunction } from "@peerless/common";
import { IndeterminateSpinner, LeaveCalendar } from "@peerless/controls";
import { RenderStatusContentTable } from "@peerless/models";
import { useSelector } from "react-redux";

interface LeaveViewComponentProps {
    leaveListData: any;
    renderStatusContent?: RenderStatusContentTable;
    year: string;
}

export const LeaveViewComponent = ({ renderStatusContent, leaveListData, year }: LeaveViewComponentProps) => {

    const leaveListViewData = dropDownDataConverter.leaveDataConverter(leaveListData || [], 'from_date', 'leaveType', 'reason', 'leaveStatus',);

    const january = new Date(Number(year), 0, 1);
    const janMin = new Date(Number(year), 0, 1);
    const janMax = new Date(Number(year), 0, 31);
    const february = new Date(Number(year), 1, 1);
    const febMin = new Date(Number(year), 1, 1);
    const febMax = new Date(Number(year), 1, 28);
    const march = new Date(Number(year), 2, 1);
    const marMin = new Date(Number(year), 2, 1);
    const marMax = new Date(Number(year), 2, 31);
    const april = new Date(Number(year), 3, 1);
    const aprMin = new Date(Number(year), 3, 1);
    const aprMax = new Date(Number(year), 3, 30);
    const may = new Date(Number(year), 4, 1);
    const mayMin = new Date(Number(year), 4, 1);
    const mayMax = new Date(Number(year), 4, 31);
    const june = new Date(Number(year), 5, 1);
    const junMin = new Date(Number(year), 5, 1);
    const junMax = new Date(Number(year), 5, 30);
    const july = new Date(Number(year), 6, 1);
    const julMin = new Date(Number(year), 6, 1);
    const julMax = new Date(Number(year), 6, 31);
    const august = new Date(Number(year), 7, 1);
    const augMin = new Date(Number(year), 7, 1);
    const augMax = new Date(Number(year), 7, 31);
    const september = new Date(Number(year), 8, 1);
    const sepMin = new Date(Number(year), 8, 1);
    const sepMax = new Date(Number(year), 8, 30);
    const october = new Date(Number(year), 9, 1);
    const octMin = new Date(Number(year), 9, 1);
    const octMax = new Date(Number(year), 9, 31);
    const november = new Date(Number(year), 10, 1);
    const novMin = new Date(Number(year), 10, 1);
    const novMax = new Date(Number(year), 10, 30);
    const december = new Date(Number(year), 11, 1);
    const decMin = new Date(Number(year), 11, 1);
    const decMax = new Date(Number(year), 11, 31);

    if (renderStatusContent?.isRenderStatusContentTable) {
        const statusOutput = statusRenderFunction.renderStatusContentTable(renderStatusContent.status, renderStatusContent.isFetch, renderStatusContent.error, renderStatusContent.setStateFunction);
        if (renderStatusContent.isStatusOutput && statusOutput) {
            if (statusOutput === 'Loading...') {
                return (
                    <div className="status-output">
                        <IndeterminateSpinner />
                    </div>
                );
            }
            if (!renderStatusContent.isHideClickFilterMessage) {
                return (
                    <div className="status-output" style={{ display: 'flex', justifyContent: 'center', marginTop: '15px', fontSize: '13px' }}>
                        {statusOutput}
                    </div>
                );
            }
        }
    }

    return (
        <div>
            <div className="w-1/2">
                <LeaveCalendar
                    showMonth={january}
                    minDate={janMin}
                    maxDate={janMax}
                    leaves={leaveListViewData}
                    isRemoveToday={true}
                />
                <LeaveCalendar
                    showMonth={february}
                    minDate={febMin}
                    maxDate={febMax}
                    leaves={leaveListViewData}
                    isRemoveToday={true}
                />
                <LeaveCalendar
                    showMonth={march}
                    minDate={marMin}
                    maxDate={marMax}
                    leaves={leaveListViewData}
                    isRemoveToday={true}
                />
                <LeaveCalendar
                    showMonth={april}
                    minDate={aprMin}
                    maxDate={aprMax}
                    leaves={leaveListViewData}
                    isRemoveToday={true}
                />
                <LeaveCalendar
                    showMonth={may}
                    minDate={mayMin}
                    maxDate={mayMax}
                    leaves={leaveListViewData}
                    isRemoveToday={true}
                />
                <LeaveCalendar
                    showMonth={june}
                    minDate={junMin}
                    maxDate={junMax}
                    leaves={leaveListViewData}
                    isRemoveToday={true}
                />
                <LeaveCalendar
                    showMonth={july}
                    minDate={julMin}
                    maxDate={julMax}
                    leaves={leaveListViewData}
                    isRemoveToday={true}
                />
                <LeaveCalendar
                    showMonth={august}
                    minDate={augMin}
                    maxDate={augMax}
                    leaves={leaveListViewData}
                    isRemoveToday={true}
                />
                <LeaveCalendar
                    showMonth={september}
                    minDate={sepMin}
                    maxDate={sepMax}
                    leaves={leaveListViewData}
                    isRemoveToday={true}
                />
                <LeaveCalendar
                    showMonth={october}
                    minDate={octMin}
                    maxDate={octMax}
                    leaves={leaveListViewData}
                    isRemoveToday={true}
                />
                <LeaveCalendar
                    showMonth={november}
                    minDate={novMin}
                    maxDate={novMax}
                    leaves={leaveListViewData}
                    isRemoveToday={true}
                />
                <LeaveCalendar
                    showMonth={december}
                    minDate={decMin}
                    maxDate={decMax}
                    leaves={leaveListViewData}
                    isRemoveToday={true}
                />
            </div>
        </div>
    );
};
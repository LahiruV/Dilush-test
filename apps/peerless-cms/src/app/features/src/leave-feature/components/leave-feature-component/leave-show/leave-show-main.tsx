import { LeaveViewComponent } from "./leave-show";
import { RootState, setIsFetchingLeaveEntryList, setIsFetchingShowLeaveList } from "@peerless-cms/store";
import { RenderStatusContentTable } from "@peerless/models";
import { GetAllLeavesAndPublic } from "@peerless/queries";
import { useSelector } from "react-redux";

export const LeaveViewMainComponent = () => {

    const { DepartmentsMainDrop, OriginatorMainDrop, LeavetypeMainDrop, Yeartype, isFetchingShowLeaveList, isFetchingLeaveEntryList } = useSelector((state: RootState) => state.leaveEntry);

    const payload = {
        deptId: DepartmentsMainDrop.value,
        origator: OriginatorMainDrop.value,
        year: parseInt(Yeartype),
        leaveType: LeavetypeMainDrop.text,
        originatorId: OriginatorMainDrop.id,
        showRejected: true,
        NextRecord: 0,
        NumberOfRecords: 0
    };

    const { data: LeaveListViewDate, error, status } = GetAllLeavesAndPublic(payload, isFetchingLeaveEntryList)

    const renderStatusContent = {
        isRenderStatusContentTable: true,
        status: status,
        isFetch: isFetchingLeaveEntryList,
        error: error,
        setStateFunction: setIsFetchingLeaveEntryList,
        isStatusOutput: true
    } as RenderStatusContentTable;

    return (
        <LeaveViewComponent renderStatusContent={renderStatusContent} leaveListData={LeaveListViewDate} year={Yeartype} />
    );
};
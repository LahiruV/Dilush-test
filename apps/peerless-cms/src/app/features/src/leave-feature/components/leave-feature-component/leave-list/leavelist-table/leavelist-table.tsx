
import { RootState, setIsAddLeaveModalOpen, setIsFetchingLeaveEntryList, setLeaveEntrySelectedArea } from "@peerless-cms/store";
import { dropDownDataConverter, LeaveListGrid } from "@peerless/common";
import { CustomToastMessage, DataGrid, ValidationModal } from "@peerless/controls";
import { RenderStatusContentTable } from "@peerless/models";
import { GetAllLeaves, GetAllLeavesAndPublic } from "@peerless/queries";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import LeaveEnter from "../../leave-enter-component/leave-enter-component";
import { useEffect, useState } from "react";

interface LeaveListTableProps {
    heightOffset?: number;
}

const LeaveListTable: React.FC<LeaveListTableProps> = ({ heightOffset }) => {

    const dispatch = useDispatch();
    const { loggedUser } = useSelector((state: RootState) => state.header);
    const { DepartmentsMainDrop, OriginatorMainDrop, LeavetypeMainDrop, Yeartype, isFetchingLeaveEntryList, renderNumLeaveEntry } = useSelector((state: RootState) => state.leaveEntry);
    const [pageState, setPageState] = useState({ first: 0, rows: 20 });
    const [pageSize, setPageSize] = useState(20);
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [labelText, setLabelText] = useState("");
    const [triggerKey, setTriggerKey] = useState(0);
    const [newStatus, setNewStatus] = useState("");

    const { isAddLeaveModalOpen } = useSelector((state: RootState) => ({
        isAddLeaveModalOpen: state.modal.isAddLeaveModalOpen,
    }));

    const closeAddLeaveModal = () => {
        dispatch(setIsAddLeaveModalOpen(false));
    }

    const payload = {
        deptId: DepartmentsMainDrop.value,
        origator: OriginatorMainDrop.value,
        year: parseInt(Yeartype),
        leaveType: LeavetypeMainDrop.text,
        originatorId: OriginatorMainDrop.id,
        showRejected: true,
        NextRecord: pageState.first,
        NumberOfRecords: pageState.rows,
        renderNumLeaveEntry: renderNumLeaveEntry
    };

    const loggedPayload = {
        deptId: loggedUser.leaveDept,
        origator: loggedUser.userName,
        year: new Date().getFullYear(),
        leaveType: '',
        originatorId: loggedUser.originatorId,
        showRejected: true,
        NextRecord: pageState.first,
        NumberOfRecords: pageState.rows
    };

    const onPage = (event: any) => {
        const { first, rows } = event;
        setPageState({ first, rows: (first + rows) });
        dispatch(setIsFetchingLeaveEntryList(true));
    };

    const { data: LeaveListData, error, status } = GetAllLeaves(payload, isFetchingLeaveEntryList)
    const { data: LeaveLoggedListViewDate } = GetAllLeavesAndPublic(loggedPayload, true)

    const publicleaveListViewData = dropDownDataConverter.publicLeaveDataConverter(LeaveLoggedListViewDate || [], 'from_date', 'leaveType', 'reason', 'leaveStatus',);

    let countRecords = LeaveListData?.length;

    const renderStatusContent = {
        isRenderStatusContentTable: true,
        status: status,
        isFetch: isFetchingLeaveEntryList,
        error: error,
        setStateFunction: setIsFetchingLeaveEntryList,
        isStatusOutput: true
    } as RenderStatusContentTable;

    const leavelist = new LeaveListGrid();

    useEffect(() => {
        dispatch(setLeaveEntrySelectedArea("leave-application"));
    }, [])

    return (
        <div>
            <DataGrid dataTable={leavelist} data={LeaveListData} renderStatusContent={renderStatusContent} enablePagination={true} pageSize={pageSize} firstIndex={pageState.first}
                totalRecords={LeaveListData && countRecords} onPage={onPage} cssClasses={'sticky-header'} isScrollable={true}
                isAutoScrollHeight={true}
                heightOffset={heightOffset}
            />

            <Dialog visible={isAddLeaveModalOpen} onHide={() => setVisible(true)} header='Leave Application Form'>
                {(
                    <div>
                        < LeaveEnter closeAddLeaveModal={closeAddLeaveModal} leaveListViewData={publicleaveListViewData} onClose={(status, labelText, triggerKey) => {
                            setOpen(true);
                            setNewStatus(status);
                            setLabelText(labelText);
                            setTriggerKey(triggerKey);
                        }} />
                    </div>
                )}
            </Dialog>
            {visible && (
                <ValidationModal
                    title={"Confirmation"}
                    message={"Changes have been made, Do you wish to continue closing?"}
                    setState={setVisible}
                    onSubmit={() => {
                        closeAddLeaveModal();
                    }}
                />
            )}
            <CustomToastMessage
                status={newStatus || ""}
                labelText={labelText}
                state={open}
                setState={setOpen}
                triggerKey={triggerKey}
                timeToWait={2500}
            />
        </div>
    );
};

export default LeaveListTable;
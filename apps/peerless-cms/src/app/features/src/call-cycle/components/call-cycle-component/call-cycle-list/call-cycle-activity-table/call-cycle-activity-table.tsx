import { RootState, setCallCycleActivityPath, setIsAddCallCycleActivityModalOpen, setIsCallCycleActivityDetail, setIsCallCycleActivityReadOnly, setSelectedCallCycleActivity } from '@peerless-cms/store';
import { useDispatch, useSelector } from 'react-redux';
import { DeactivateCallCycle, GetAllCallCyclesList } from '@peerless/queries';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { DeactivateCallCycleParameters, GetAllCallCyclesListParameters, RenderStatusContentTable } from '@peerless/models';
import { CallCycleActivityListDistributer } from '@peerless/common';
import { CustomToastMessage, DataGrid, ToastManager } from '@peerless/controls';
import { useNavigate } from 'react-router-dom';
import { Dialog } from "primereact/dialog";
import { CallCycleDetails } from '../../call-cylcle-details/call-cylcle-details';
import { ConfirmDialog } from 'primereact/confirmdialog';

const CallCycleActivityTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { deactivateCallCycle } = DeactivateCallCycle();
    const { ref, inView } = useInView({ triggerOnce: false });
    const messagesRef = useRef<any>(null);
    const { loggedUser, selectedOriginator } = useSelector((state: RootState) => state.header);
    const { isAddCallCycleActivityModalOpen } = useSelector((state: RootState) => state.callCycleActivity);
    const messageMgr = new ToastManager(messagesRef);
    const [messageStatus, setMessageStatus] = useState('');
    const [labelText, setLabelText] = useState('');
    const [open, setOpen] = useState(false);
    const [isConfirmBoxVisible, setIsConfirmBoxVisible] = useState(false);
    const [row, setRow] = useState<any>();

    const payload: GetAllCallCyclesListParameters = {
        orderBy: 'description ASC',
        additionalParams: '',
        childOriginators: `(created_by = '${selectedOriginator.userName}')`,
        startIndex: 1,
        rowCount: 50
    };

    const { callCycleListData, error, status, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading, refetch } = GetAllCallCyclesList(payload, 50, true);

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage().then(result => {
                console.log("Fetched next page data:", result.data);
            }).catch(error => {
                console.error("Error fetching next page:", error);
            });
        }
        dispatch(setIsCallCycleActivityDetail(false));
    }, [fetchNextPage, inView]);

    const handleRowPopupClick = (options: any, rowData: any) => {
        dispatch(setCallCycleActivityPath(options.label));
        if (options.type == 'Delete') {
            handleDeactivate(rowData);
            return;
        }
        if (!options.path || options.path == '') {
            dispatch(setIsCallCycleActivityDetail(true));
            navigate(`${rowData.callCycleID}`);
        }
        else {
            dispatch(setIsCallCycleActivityDetail(true));
            navigate(`${rowData.callCycleID}${options.path}`);
        }
    };

    const renderStatusContent = {
        isRenderStatusContentTable: true,
        status: status,
        isFetch: isLoading,
        error: error,
        isStatusOutput: true
    } as RenderStatusContentTable;

    const closeAddCallCycleModal = () => {
        dispatch(setIsAddCallCycleActivityModalOpen(false));
    }

    const handleSelectionChange = (row: any) => {
        dispatch(setSelectedCallCycleActivity(row));
    };

    useEffect(() => {
        dispatch(setIsCallCycleActivityReadOnly(true));
    })

    const [triggerKey, setTriggerKey] = useState(0);

    const handleDeactivate = (row: any) => {
        setRow(row);
        setIsConfirmBoxVisible(true);
    };

    const handleCustomerDelete = () => {
        const payloadDeactivate: DeactivateCallCycleParameters = {
            callCycleId: row.callCycleID,
            isDelete: 'Y'
        };
        deactivateCallCycle(payloadDeactivate, {
            onSuccess: () => {
                refetch();
                setIsConfirmBoxVisible(false);
                setRow(null);
                dispatch(setIsAddCallCycleActivityModalOpen(false));
                setMessageStatus('success-notification-color');
                setLabelText('Delete Successfully');
                setTriggerKey((prevKey) => prevKey + 1);
            },
            onError: () => {
                setIsConfirmBoxVisible(false);
                setRow(null);
                setMessageStatus('error-notification-color');
                setLabelText('Delete Failed');
                setTriggerKey((prevKey) => prevKey + 1);
            }
        });
    };

    useEffect(() => {
        dispatch(setCallCycleActivityPath(''));
    });

    const callCycleActivityList = new CallCycleActivityListDistributer(handleRowPopupClick, handleSelectionChange);

    return (
        <div>
            <DataGrid
                dataTable={callCycleActivityList}
                data={callCycleListData}
                renderStatusContent={renderStatusContent}
                isScrollable={true}
                isAutoScrollHeight={true}
                cssClasses={'sticky-header'}
            />
            <div ref={ref} style={{ height: '1px' }} />

            <ConfirmDialog
                visible={isConfirmBoxVisible}
                onHide={() => setIsConfirmBoxVisible(false)}
                message="Are you sure you want to delete?"
                header="Confirmation"
                icon="pi pi-exclamation-triangle"
                accept={handleCustomerDelete}
                reject={() => console.log('Rejected')}
            />
            <Dialog visible={isAddCallCycleActivityModalOpen} onHide={closeAddCallCycleModal} header='Add Call Cycle'>
                {(
                    <div>
                        <CallCycleDetails refetchList={refetch} messageMgr={messageMgr} isShow={false} setMessageStatus={setMessageStatus} setLabelText={setLabelText} setTriggerKey={setTriggerKey} isNew={true} />
                    </div>
                )}
            </Dialog>
            <CustomToastMessage status={messageStatus || ''} labelText={labelText} state={open} setState={setOpen} triggerKey={triggerKey} />
        </div>
    );
};

export default CallCycleActivityTable;

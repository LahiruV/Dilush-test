import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { pageModeEnum, RootState, setCallCycleActivityPath, setIsAddCallCycleActivityModalOpen, setIsCallCycleActivityModalOpen, setIsCallCycleActivityReadOnly, setOrgDetailPageMode, setSelectedOrganisation, updateDetails, setSelectedCallCycleActivity } from '@peerless-cms/store';
import { ButtonWidget, ToastManager, ToastMessages } from '@peerless/controls';
import { DeactivateCallCycle } from '@peerless/queries';
import { DeactivateCallCycleParameters } from '@peerless/models';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';


export interface CallCycleAreasProps { }

export function CallCycleAreas(props: CallCycleAreasProps) {
    const [isDeActivated, setIsDeActivated] = useState(false);
    const [isActiveStatusOpen, setIsActiveStatusOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const messagesRef = useRef<any>(null);
    const messageMgr = new ToastManager(messagesRef);

    const { isCallCycleActivityDetail, callCycleActivityPath, selectedCallCycleActivity } = useSelector((state: RootState) => state.callCycleActivity);

    const { deactivateCallCycle } = DeactivateCallCycle();

    const handleAddCallCycle = () => {
        dispatch(setIsCallCycleActivityReadOnly(false));
        dispatch(setOrgDetailPageMode(pageModeEnum.New));
        dispatch(updateDetails(false));
        dispatch(setSelectedOrganisation(null));
        dispatch(setIsAddCallCycleActivityModalOpen(true));
    }

    const handleAddActivity = () => {
        dispatch(setIsCallCycleActivityModalOpen(true));
    }

    const handleActivateDeactivate = (isDeActivated: boolean) => {
        setIsDeActivated(isDeActivated);
        setIsActiveStatusOpen(true);
    }

    const closeActiveStatusModal = () => {
        setIsActiveStatusOpen(false);
    }

    const toggleActivation = () => {
        setIsProcessing(true);

        const payloadDeactivate: DeactivateCallCycleParameters = {
            callCycleId: selectedCallCycleActivity.callCycleID,
            isDelete: isDeActivated ? 'Y' : 'N'
        };

        deactivateCallCycle(payloadDeactivate, {
            onSuccess: (response: any) => {
                queryClient.refetchQueries({ queryKey: ['all-call-cycles-list'] });
                dispatch(setIsAddCallCycleActivityModalOpen(false));
                const updatedCallCycleActivity = {
                    ...selectedCallCycleActivity,
                    delFlag: isDeActivated ? 'Y' : 'N'
                };
                dispatch(setSelectedCallCycleActivity(updatedCallCycleActivity));
                setIsProcessing(false);
                setIsDeActivated(!isDeActivated);
                setIsActiveStatusOpen(false);

                // messageMgr.showMessage('success', 'Success: ', `${isDeActivated ? 'Deactivated' : 'Activated'}`);
                toast.success(`${isDeActivated ? 'Deactivated' : 'Activated'} Successfully`);
            },
            onError: () => {
                setIsProcessing(false);
                closeActiveStatusModal();
                // messageMgr.showMessage('error', 'Error: ', 'Error occurred while updating');
                toast.error(`${isDeActivated ? 'Deactivation' : 'Activation'} Failed`);
            }
        });
    }

    const onClickBackToList = () => {
        dispatch(setCallCycleActivityPath(''));
        navigate(`/call-cycle/`);
    }

    const orgDetails = (
        <>
            <ToastMessages ref={messagesRef} />

            <div>
                <div className="company-info">
                    <div className="company-header">
                        <FontAwesomeIcon icon={fa.faSuitcase} size='1x' />
                        <span className="company-name">{selectedCallCycleActivity.callCycleID}</span>
                    </div>
                    <div className="company-address">
                        {selectedCallCycleActivity.description}
                    </div>
                </div>
                <div className="options-button-container border-bottom">
                    <button id='back-to-list' type="button" className="back-button" onClick={onClickBackToList}>
                        <FontAwesomeIcon icon={fa.faArrowLeft} size='1x' /> Back to List
                    </button>
                </div>

                {selectedCallCycleActivity && (
                    selectedCallCycleActivity.delFlag === "N" ? <div className="options-button-container border-top">
                        <button type="button" className="deactivate-button" onClick={(e) => handleActivateDeactivate(true)}>
                            <FontAwesomeIcon icon={fa.faBan} size='1x' /> Deactivate
                        </button>
                    </div> :
                        <div className="options-button-container border-top">
                            <button type="button" className="activate-button" onClick={(e) => handleActivateDeactivate(false)}>
                                <FontAwesomeIcon icon={fa.faPowerOff} size='1x' /> Activate
                            </button>
                        </div>
                )}
                {
                    callCycleActivityPath === 'Call Cycle Planner' &&
                    <div className="options-button-container border-bottom">
                        <button id='back-to-list' type="button" className="back-button" onClick={handleAddActivity}>
                            <FontAwesomeIcon icon={fa.faPlus} size='1x' /> Create Activity
                        </button>
                    </div>
                }
            </div>

            <Dialog visible={isActiveStatusOpen} onHide={closeActiveStatusModal} header='Confirm' className="custom-confirm-dialog">
                {(
                    <div className="confirmation-box no-padding">
                        <div className="confirm-body">
                            <div>Are you sure you want to {isDeActivated ? 'deactivate' : 'activate'} ?</div>
                        </div>
                        <div className="button-container margin-top-10 padding-right-30 float-right">
                            <button className="button-green" disabled={isProcessing} onClick={toggleActivation}>
                                {isDeActivated ? (isProcessing ? 'Deactivating...' : 'Deactivate') : (isProcessing ? 'Activating...' : 'Activate')}
                            </button>
                            <button disabled={isProcessing} className="button-red" onClick={closeActiveStatusModal}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </Dialog>
        </>
    )

    const renderAreas = () => {
        if (['Call Cycle Details', 'Call Cycle Activities', 'Call Cycle Planner'].includes(callCycleActivityPath)) {
            return orgDetails;
        }
        return null;
    };

    return (
        <div>
            {!isCallCycleActivityDetail && <div className="create-buttons-container border-bottom" style={{ marginTop: '-10px' }}>
                <ButtonWidget id='add-call-cycle' name='Add Call Cycle' classNames='add-btn' Function={handleAddCallCycle} />
            </div>}
            {renderAreas()}
        </div>
    );
}

export default CallCycleAreas;
import React, { useEffect, useState } from 'react';
import { DragAndDrop } from '@progress/kendo-react-common';
import { DraggableButton } from './button';
import { DroppableBox } from './dropbox';
import { GetScheduledCallCycleContacts, ShiftSchedule } from '@peerless/queries';
import { GetCallCycleContactsParameters, ShiftScheduleParameters } from '@peerless/models';
import { RootState, setIsCallCycleActivityModalOpen } from '@peerless-cms/store';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from "primereact/dialog";
import CallCyclePlannerDay from '../../call-cycle-planner/call-cycle-planner-day/call-cycle-planner-day';
import { CustomToastMessage } from '@peerless/controls';

interface Item {
    id: string;
    value: string;
}

interface Items {
    [key: string]: Item[];
}

export const convertApiResponseToItems = (apiResponse: any[]): Items => {
    const items: Items = {};
    apiResponse.forEach(response => {
        const dayKey = `Day ${response.day}`;
        items[dayKey] = response.callCycleContacts.map((contact: any) => ({
            id: contact.recordID,
            value: contact.displayName,
            callCycleId: contact.callCycleID,
            customerCode: contact.customerCode,
            endUserCode: contact.endUserCode,
            orgId: contact.orgId,
            leadId: contact.leadId,
            leadStage: contact.leadStage,
            name: contact.name,
            weekDay: contact.weekDay,
            dayPrder: contact.dayOrder,
        }));
    });

    return items;
}

const ActivityColumns = () => {
    const dispatch = useDispatch();
    const { loggedUser, childOriginators } = useSelector((state: RootState) => state.header);
    const { selectedCallCycleActivity, isCallCycleActivityModalOpen } = useSelector((state: RootState) => state.callCycleActivity);
    const { saveShiftSchedule } = ShiftSchedule();
    const [selectItem, setSelectitem] = useState<any>(null);
    const [pIndex, setPIndex] = useState<any>(null);
    const [items, setItems] = useState<Items>({});
    const [opens, setOpens] = useState(false);
    const [labelTexts, setLabelTexts] = useState('');
    const [messageStatus, setMessageStatus] = useState('');
    const [triggerKeys, setTriggerKeys] = useState(0);

    const closeCallCycleActivityModal = () => {
        dispatch(setIsCallCycleActivityModalOpen(false));
    }
    const payload: GetCallCycleContactsParameters = {
        orderBy: 'description,lead_name asc',
        additionalParams: '',
        childOriginators: childOriginators,
        startIndex: 1,
        rowCount: 100,
        originator: loggedUser.userName,
        callCycleID: selectedCallCycleActivity.callCycleID,
        callCycleName: ''
    };
    const { data: callCycleContactsData, status } = GetScheduledCallCycleContacts(payload, true);
    const handleDrop = (targetDay: string) => {
        const sourceDay = Object.keys(items)[pIndex]
        if (sourceDay && sourceDay !== targetDay) {
            setItems(prevItems => ({
                ...prevItems,
                [sourceDay]: prevItems[sourceDay].filter(it => it.id !== selectItem.id),
                [targetDay]: [...prevItems[targetDay], selectItem]
            }));
            const payload: ShiftScheduleParameters = {
                callCycleID: selectItem.callCycleId,
                customerCode: selectItem.customerCode,
                endUserCode: selectItem.endUserCode,
                orgId: selectItem.orgId,
                leadId: selectItem.leadId,
                leadStage: selectItem.leadStage,
                weekDay: parseInt(targetDay.split(' ')[1])
            }
            saveShiftSchedule(payload);
        }
    };
    useEffect(() => {
        if (callCycleContactsData) {
            setItems(convertApiResponseToItems(callCycleContactsData));
        }
    }, [callCycleContactsData]);

    return (
        <div style={{ height: '100%' }}>
            <Dialog visible={isCallCycleActivityModalOpen} onHide={closeCallCycleActivityModal} header='Create Call Cycle Activity' style={{ width: '56vw' }} modal={true} >
                {(
                    <CallCyclePlannerDay callCycleDstributorList={[items]} setLabelTexts={setLabelTexts} setMessageStatus={setMessageStatus} setTriggerKeys={setTriggerKeys} setIsCallCycleActivityModalOpen={setIsCallCycleActivityModalOpen} />
                )}
            </Dialog>
            <div style={{ display: 'grid', gridGap: '10px', gridTemplateColumns: 'repeat(5, 1fr)' }}>
                <DragAndDrop>
                    {Object.keys(items).map((day, pIndex) => (
                        <DroppableBox key={day} selected={items[day].length > 0} id={day} indexDrop={pIndex} onDrop={(event: any) => handleDrop(day)}>
                            {items[day].map((item) => (
                                <DraggableButton pIndex={pIndex} key={item.id} content={item.value} draggable={item} setSelectitem={setSelectitem} setPIndex={setPIndex} />
                            ))}
                        </DroppableBox>
                    ))}
                </DragAndDrop>
            </div>
            <CustomToastMessage status={messageStatus || ''} labelText={labelTexts} state={opens} setState={setOpens} triggerKey={triggerKeys} />
        </div>
    );
};

export default ActivityColumns;

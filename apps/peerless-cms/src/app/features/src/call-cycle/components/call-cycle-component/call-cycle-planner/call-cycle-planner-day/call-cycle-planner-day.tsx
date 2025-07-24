import { CheckBox, DatePickerWidget, DropDown, TimePickerWidget } from "@peerless/controls";
import { CustomListCard } from "@peerless-cms/features-common-components";
import { useEffect, useState } from "react";
import { CreateCallCycleActivitiesFromTemplateParameters, DropDownData } from "@peerless/models";
import Button from "react-bootstrap/esm/Button";
import './call-cycle-planner-day.css';
import { CreateCallCycleActivitiesFromTemplate } from "@peerless/queries";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@peerless-cms/store";

const repeatArray: DropDownData[] = [
    { id: 1, value: 1, text: '1 Time' },
    { id: 2, value: 2, text: '2 Times' },
    { id: 3, value: 3, text: '3 Times' },
    { id: 4, value: 4, text: '4 Times' }
]

const evryArray: DropDownData[] = [
    { id: 1, value: 1, text: 'Week' },
    { id: 2, value: 2, text: '2 Weeks' },
    { id: 3, value: 3, text: '3 Weeks' },
    { id: 4, value: 4, text: '4 Weeks' }
]

type CallCyclePlannerDayProps = {
    callCycleDstributorList: any[];
    setLabelTexts: Function;
    setMessageStatus: Function;
    setTriggerKeys: Function;
    setIsCallCycleActivityModalOpen: Function;
}
function getCurrentWeekdays(): Date[] {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

    return Array.from({ length: 5 }, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        d.setHours(0, 0, 0, 0);
        return d;
    });
}

function getDateWithCurrentTime(date: Date) {
    const now = new Date();
    const rawDate = new Date(date);
    rawDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    return rawDate;
}

const CallCyclePlannerDay = ({ callCycleDstributorList, setLabelTexts, setMessageStatus, setTriggerKeys, setIsCallCycleActivityModalOpen }: CallCyclePlannerDayProps) => {

    const dispatch = useDispatch();
    const { createCallCycleActivitiesFromTemplate } = CreateCallCycleActivitiesFromTemplate();
    const newList = callCycleDstributorList.find(day => day);
    const { loggedUser } = useSelector((state: RootState) => state.header);
    const { selectedCallCycleActivity } = useSelector((state: RootState) => state.callCycleActivity);
    const weekdays = getCurrentWeekdays();
    const [dueOnDayOne, setDueOnDayOne] = useState<Date>(getDateWithCurrentTime(weekdays[0]));
    const [dueOnDayTwo, setDueOnDayTwo] = useState<Date>(getDateWithCurrentTime(weekdays[1]));
    const [dueOnDayThree, setDueOnDayThree] = useState<Date>(getDateWithCurrentTime(weekdays[2]));
    const [dueOnDayFour, setDueOnDayFour] = useState<Date>(getDateWithCurrentTime(weekdays[3]));
    const [dueOnDayFive, setDueOnDayFive] = useState<Date>(getDateWithCurrentTime(weekdays[4]));
    const [startTimeDayOne, setStartTimeDayOne] = useState<Date | null>(new Date());
    const [selectedDayOne, setSelectedDayOne] = useState(false);
    const [startTimeDayTwo, setStartTimeDayTwo] = useState<Date | null>(new Date());
    const [selectedDayTwo, setSelectedDayTwo] = useState(false);
    const [startTimeDayThree, setStartTimeDayThree] = useState<Date | null>(new Date());
    const [selectedDayThree, setSelectedDayThree] = useState(false);
    const [startTimeDayFour, setStartTimeDayFour] = useState<Date | null>(new Date());
    const [selectedDayFour, setSelectedDayFour] = useState(false);
    const [startTimeDayFive, setStartTimeDayFive] = useState<Date | null>(new Date());
    const [selectedDayFive, setSelectedDayFive] = useState(false);
    const [repeatTimes, setRepeatTimes] = useState<DropDownData>(repeatArray[0]);
    const [repeatEvery, setRepeatEvery] = useState<DropDownData>(evryArray[0]);

    const popupSettings = {
        width: '150px',
        fontSize: '12px'
    }

    const popUpSettingTime = {
        width: '205px',
        fontSize: '12px'
    }

    const handleSubmit = () => {
        const payload: CreateCallCycleActivitiesFromTemplateParameters = {
            callCycleContact: [
                ...(selectedDayOne ? [{
                    day: 1,
                    startTime: startTimeDayOne?.toISOString().split('T')[1] || '',
                    dueOn: typeof dueOnDayOne === "object" ? dueOnDayOne.toISOString().split('T')[0] + 'T' + startTimeDayOne?.toISOString().split('T')[1] : dueOnDayOne || '',
                    originator: loggedUser.userName,
                    repeatTime: repeatTimes.value,
                    repeatWeek: repeatEvery.value,
                    callCycleId: selectedCallCycleActivity.callCycleID,
                    callCycleDescription: selectedCallCycleActivity.description,
                    callCycleContacts: newList["Day 1"].map((item: any) => ({
                        callCycleID: item.callCycleId,
                        customerCode: item.customerCode,
                        endUserCode: item.endUserCode,
                        orgId: item.orgId,
                        leadId: item.leadId,
                        leadStage: item.leadStage,
                        name: item.name,
                        displayName: '',
                        weekDay: item.weekDay,
                        dayPrder: 1,
                        recordID: 1
                    }))
                }] : []),
                ...(selectedDayTwo ? [{
                    day: 2,
                    startTime: startTimeDayTwo?.toISOString().split('T')[1] || '',
                    dueOn: typeof dueOnDayTwo === "object" ? dueOnDayTwo.toISOString().split('T')[0] + 'T' + startTimeDayTwo?.toISOString().split('T')[1] : dueOnDayTwo || '',
                    originator: loggedUser.userName,
                    repeatTime: repeatTimes.value,
                    repeatWeek: repeatEvery.value,
                    callCycleId: selectedCallCycleActivity.callCycleID,
                    callCycleDescription: selectedCallCycleActivity.description,
                    callCycleContacts: newList["Day 2"].map((item: any) => ({
                        callCycleID: item.callCycleId,
                        customerCode: item.customerCode,
                        endUserCode: item.endUserCode,
                        orgId: item.orgId,
                        leadId: item.leadId,
                        leadStage: item.leadStage,
                        name: item.name,
                        displayName: 'string',
                        weekDay: 1,
                        dayPrder: 1,
                        recordID: 0
                    }))
                }] : []),
                ...(selectedDayThree ? [{
                    day: 3,
                    startTime: startTimeDayThree?.toISOString().split('T')[1] || '',
                    dueOn: typeof dueOnDayThree === "object" ? dueOnDayThree.toISOString().split('T')[0] + 'T' + startTimeDayThree?.toISOString().split('T')[1] : dueOnDayThree || '',
                    originator: loggedUser.userName,
                    repeatTime: repeatTimes.value,
                    repeatWeek: repeatEvery.value,
                    callCycleId: selectedCallCycleActivity.callCycleID,
                    callCycleDescription: selectedCallCycleActivity.description,
                    callCycleContacts: newList["Day 3"].map((item: any) => ({
                        callCycleID: item.callCycleId,
                        customerCode: item.customerCode,
                        endUserCode: item.endUserCode,
                        orgId: item.orgId,
                        leadId: item.leadId,
                        leadStage: item.leadStage,
                        name: item.name,
                        displayName: '',
                        weekDay: item.weekDay,
                        dayPrder: 1,
                        recordID: 1
                    }))
                }] : []),
                ...(selectedDayFour ? [{
                    day: 4,
                    startTime: startTimeDayFour?.toISOString().split('T')[1] || '',
                    dueOn: typeof dueOnDayFour === "object" ? dueOnDayFour.toISOString().split('T')[0] + 'T' + startTimeDayFour?.toISOString().split('T')[1] : dueOnDayFour || '',
                    originator: loggedUser.userName,
                    repeatTime: repeatTimes.value,
                    repeatWeek: repeatEvery.value,
                    callCycleId: selectedCallCycleActivity.callCycleID,
                    callCycleDescription: selectedCallCycleActivity.description,
                    callCycleContacts: newList["Day 4"].map((item: any) => ({
                        callCycleID: item.callCycleId,
                        customerCode: item.customerCode,
                        endUserCode: item.endUserCode,
                        orgId: item.orgId,
                        leadId: item.leadId,
                        leadStage: item.leadStage,
                        name: item.name,
                        displayName: '',
                        weekDay: item.weekDay,
                        dayPrder: 1,
                        recordID: 1
                    }))
                }] : []),
                ...(selectedDayFive ? [{
                    day: 5,
                    startTime: startTimeDayFive?.toISOString().split('T')[1] || '',
                    dueOn: typeof dueOnDayFive === "object" ? dueOnDayFive.toISOString().split('T')[0] + 'T' + startTimeDayFive?.toISOString().split('T')[1] : dueOnDayFive || '',
                    originator: loggedUser.userName,
                    repeatTime: repeatTimes.value,
                    repeatWeek: repeatEvery.value,
                    callCycleId: selectedCallCycleActivity.callCycleID,
                    callCycleDescription: selectedCallCycleActivity.description,
                    callCycleContacts: newList["Day 5"].map((item: any) => ({
                        callCycleID: item.callCycleId,
                        customerCode: item.customerCode,
                        endUserCode: item.endUserCode,
                        orgId: item.orgId,
                        leadId: item.leadId,
                        leadStage: item.leadStage,
                        name: item.name,
                        displayName: '',
                        weekDay: item.weekDay,
                        dayPrder: 1,
                        recordID: 1
                    }))
                }] : [])
            ]
        }
        createCallCycleActivitiesFromTemplate(payload, {
            onSuccess: (response: any) => {
                dispatch(setIsCallCycleActivityModalOpen(false));
                setMessageStatus('success-notification-color');
                setLabelTexts('Create Successfully');
                setTriggerKeys((prevKey: number) => prevKey + 1);
            },
            onError: (error: any) => {
                dispatch(setIsCallCycleActivityModalOpen(false));
                setMessageStatus('error-notification-color');
                setLabelTexts('Create Failed');
                setTriggerKeys((prevKey: number) => prevKey + 1);
            }
        });
    }

    const cardsData = [
        {
            title: 'Day 1', content:
                <div className="font-12">
                    <div className="flex">
                        <span className="pad-right-10 pad-left-15" style={{ paddingTop: '2px' }}>
                            Due On
                        </span>
                        <div>
                            <DatePickerWidget id="due-on-one" size="small" fillMode="solid" value={dueOnDayOne} setValue={(e) => setDueOnDayOne(e)} />
                        </div>
                    </div >
                    <div className="flex pad-top-5">
                        <span style={{ paddingTop: '2px', paddingRight: '7.5px' }}>
                            Start Time
                        </span>
                        <div style={{ paddingLeft: '2px' }}>
                            <TimePickerWidget id="start-time-one" size="small" fillMode="solid" value={startTimeDayOne} setValue={(e) => setStartTimeDayOne(e)} popupSettings={popUpSettingTime} />
                        </div>
                    </div >
                    <div className="flex pad-top-5">
                        <span style={{ paddingTop: '2px', paddingLeft: '21px', paddingRight: '12px' }}>
                            Select
                        </span>
                        <div>
                            <CheckBox id="selected-box-one" size="medium" value={selectedDayOne} setValue={(e) => setSelectedDayOne(e)} />
                        </div>
                    </div >
                </div >
        },
        {
            title: 'Day 2', content:
                <div className="font-12">
                    <div className="flex">
                        <span className="pad-right-10 pad-left-15" style={{ paddingTop: '2px' }}>
                            Due On
                        </span>
                        <div>
                            <DatePickerWidget id="due-on-two" size="small" fillMode="solid" value={dueOnDayTwo} setValue={(e) => setDueOnDayTwo(e)} />
                        </div>
                    </div >
                    <div className="flex pad-top-5">
                        <span style={{ paddingTop: '2px', paddingRight: '7.5px' }}>
                            Start Time
                        </span>
                        <div style={{ paddingLeft: '2px' }}>
                            <TimePickerWidget id="start-time-two" size="small" fillMode="solid" value={startTimeDayTwo} setValue={(e) => setStartTimeDayTwo(e)} />
                        </div>
                    </div >
                    <div className="flex pad-top-5">
                        <span style={{ paddingTop: '2px', paddingLeft: '21px', paddingRight: '12px' }}>
                            Select
                        </span>
                        <div>
                            <CheckBox id="selected-box-two" size="medium" value={selectedDayTwo} setValue={(e) => setSelectedDayTwo(e)} />
                        </div>
                    </div >
                </div >
        },
        {
            title: 'Day 3', content:
                <div className="font-12">
                    <div className="flex">
                        <span className="pad-right-10 pad-left-15" style={{ paddingTop: '2px' }}>
                            Due On
                        </span>
                        <div>
                            <DatePickerWidget id="due-on-three" size="small" fillMode="solid" value={dueOnDayThree} setValue={(e) => setDueOnDayThree(e)} />
                        </div>
                    </div >
                    <div className="flex pad-top-5">
                        <span style={{ paddingTop: '2px', paddingRight: '7.5px' }}>
                            Start Time
                        </span>
                        <div style={{ paddingLeft: '2px' }}>
                            <TimePickerWidget id="start-time-three" size="small" fillMode="solid" value={startTimeDayThree} setValue={(e) => setStartTimeDayThree(e)} />
                        </div>
                    </div >
                    <div className="flex pad-top-5">
                        <span style={{ paddingTop: '2px', paddingLeft: '21px', paddingRight: '12px' }}>
                            Select
                        </span>
                        <div>
                            <CheckBox id="selected-box-three" size="medium" value={selectedDayThree} setValue={(e) => setSelectedDayThree(e)} />
                        </div>
                    </div >
                </div >
        },
        {
            title: 'Day 4', content:
                <div className="font-12">
                    <div className="flex">
                        <span className="pad-right-10 pad-left-15" style={{ paddingTop: '2px' }}>
                            Due On
                        </span>
                        <div>
                            <DatePickerWidget id="due-on-four" size="small" fillMode="solid" value={dueOnDayFour} setValue={(e) => setDueOnDayFour(e)} />
                        </div>
                    </div >
                    <div className="flex pad-top-5">
                        <span style={{ paddingTop: '2px', paddingRight: '7.5px' }}>
                            Start Time
                        </span>
                        <div style={{ paddingLeft: '2px' }}>
                            <TimePickerWidget id="start-time-four" size="small" fillMode="solid" value={startTimeDayFour} setValue={(e) => setStartTimeDayFour(e)} />
                        </div>
                    </div >
                    <div className="flex pad-top-5">
                        <span style={{ paddingTop: '2px', paddingLeft: '21px', paddingRight: '12px' }}>
                            Select
                        </span>
                        <div>
                            <CheckBox id="selected-box-four" size="medium" value={selectedDayFour} setValue={(e) => setSelectedDayFour(e)} />
                        </div>
                    </div >
                </div >
        },
        {
            title: 'Day 5', content:
                <div className="font-12">
                    <div className="flex">
                        <span className="pad-right-10 pad-left-15" style={{ paddingTop: '2px' }}>
                            Due On
                        </span>
                        <div>
                            <DatePickerWidget id="due-on-five" size="small" fillMode="solid" value={dueOnDayFive} setValue={(e) => setDueOnDayFive(e)} />
                        </div>
                    </div >
                    <div className="flex pad-top-5">
                        <span style={{ paddingTop: '2px', paddingRight: '7.5px' }}>
                            Start Time
                        </span>
                        <div style={{ paddingLeft: '2px' }}>
                            <TimePickerWidget id="start-time-five" size="small" fillMode="solid" value={startTimeDayFive} setValue={(e) => setStartTimeDayFive(e)} />
                        </div>
                    </div >
                    <div className="flex pad-top-5">
                        <span style={{ paddingTop: '2px', paddingLeft: '21px', paddingRight: '12px' }}>
                            Select
                        </span>
                        <div>
                            <CheckBox id="selected-box-five" size="medium" value={selectedDayFive} setValue={(e) => setSelectedDayFive(e)} />
                        </div>
                    </div >
                </div >
        }
    ];

    return (
        <div>
            <div className="flex font-12">
                <div className="flex">
                    <div className="flex">
                        <span style={{ paddingTop: '2px', paddingLeft: '21px', paddingRight: '12px' }}>
                            Repeat
                        </span>
                        <div>
                            <DropDown id="repeat-times" className="drop-downs-create-call-activity-modal" size="small" fillMode="solid" textField="text" value={repeatTimes} setValue={(e) => setRepeatTimes(e)} defaultValue={repeatArray[0]} datalist={repeatArray} popupSettings={popupSettings} />
                        </div>
                    </div>
                    <div className="flex">
                        <span style={{ paddingTop: '2px', paddingLeft: '21px', paddingRight: '12px' }}>
                            Every
                        </span>
                        <div>
                            <DropDown id="repeat-every" className="drop-downs-create-call-activity-modal" size="small" fillMode="solid" textField="text" value={repeatEvery} setValue={(e) => setRepeatEvery(e)} defaultValue={evryArray[0]} datalist={evryArray} popupSettings={popupSettings} />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="administrator-card-container">
                <CustomListCard
                    content={cardsData}
                    maxWidth="320px"
                    borderRadius="5px"
                    backgroundColorTitle="#00693E"
                    fontSizeTitle="14px"
                    colorTitle="white"
                    paddingTitle="8px"
                />
            </div>
            <hr />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                <div></div>
                <div className='form-button-container'>
                    <span>Make sure you have verified all your changes before create</span>
                    <Button type='button' variant='outline-green' className='btn-submit' onClick={handleSubmit} disabled={selectedDayOne || selectedDayTwo || selectedDayThree || selectedDayFour || selectedDayFive ? false : true}>
                        Create
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CallCyclePlannerDay;

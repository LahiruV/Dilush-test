import { DropDownData } from '@peerless/models';
import { createSlice } from '@reduxjs/toolkit';

interface LeaveEntryState {
    DepartmentsMainDrop: DropDownData;
    OriginatorMainDrop: DropDownData;
    LeavetypeMainDrop: DropDownData;
    Yeartype: string;
    leaveEntrySelectedArea: string | null;
    isFetchingLeaveEntryList: boolean;
    isFetchingShowLeaveList: boolean;
    selectedLeave: any;
    renderNumLeaveEntry: number;
    isFormSubmit: boolean;
    leaveFilterExpanded: boolean;
    isAddLeaveButton: boolean;
}

const initialState: LeaveEntryState = {
    leaveEntrySelectedArea: 'leave-application',
    DepartmentsMainDrop: { text: "", value: "", id: 0 } as DropDownData,
    OriginatorMainDrop: { text: "", value: "", id: 0 } as DropDownData,
    LeavetypeMainDrop: { text: "", value: "", id: 0 } as DropDownData,
    Yeartype: new Date().getFullYear.toString(),
    isFetchingLeaveEntryList: false,
    isFetchingShowLeaveList: false,
    selectedLeave: null,
    renderNumLeaveEntry: 0,
    isFormSubmit: false,
    leaveFilterExpanded: true,
    isAddLeaveButton: false
};

export const leaveEntrySlice = createSlice({
    name: 'leave-entry-slice',
    initialState,
    reducers: {
        setLeaveEntrySelectedArea: (state, action) => {
            state.leaveEntrySelectedArea = action.payload
        },
        setDepartmentsMainDrop: (state, action) => {
            state.DepartmentsMainDrop = action.payload
        },
        setOriginatorMainDrop: (state, action) => {
            state.OriginatorMainDrop = action.payload
        },
        setLeavetypeMainDrop: (state, action) => {
            state.LeavetypeMainDrop = action.payload
        },
        setYeartype: (state, action) => {
            state.Yeartype = action.payload
        },
        setIsFetchingLeaveEntryList: (state, action) => {
            state.isFetchingLeaveEntryList = action.payload
        },
        setIsFetchingShowLeaveList: (state, action) => {
            state.isFetchingShowLeaveList = action.payload
        },
        setSelectedLeave: (state, action) => {
            state.selectedLeave = action.payload
        },
        setRenderNumLeaveEntry: (state, action) => {
            state.renderNumLeaveEntry = action.payload
        },
        setTriggerLeaveListFormSubmit: (state, action) => {
            state.isFormSubmit = action.payload;
        },
        setLeaveFilterExpanded: (state, action) => {
            state.leaveFilterExpanded = action.payload;
        },
        setIsAddLeaveButton: (state, action) => {
            state.isAddLeaveButton = action.payload;
        }
    }
});

export const { setLeaveEntrySelectedArea, setDepartmentsMainDrop, setOriginatorMainDrop, setLeavetypeMainDrop, setYeartype, setIsFetchingLeaveEntryList, setIsFetchingShowLeaveList, setSelectedLeave, setRenderNumLeaveEntry, setTriggerLeaveListFormSubmit, setLeaveFilterExpanded, setIsAddLeaveButton } = leaveEntrySlice.actions;

export default leaveEntrySlice.reducer;
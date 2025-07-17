import { createSlice } from '@reduxjs/toolkit';

interface CallCycleState {
    isFetchCallCycleActivities: boolean;
    isAddCallCycleActivityModalOpen: boolean;
    isCallCycleActivityReadOnly: boolean;
    selectedCallCycleActivity: any;
    isCallCycleActivityDetail: boolean;
    callCycleActivityPath: string;
    isCallCycleActivityModalOpen: boolean;
}

const initialState: CallCycleState = {
    isFetchCallCycleActivities: true,
    isAddCallCycleActivityModalOpen: false,
    isCallCycleActivityReadOnly: true,
    selectedCallCycleActivity: {},
    isCallCycleActivityDetail: false,
    callCycleActivityPath: '',
    isCallCycleActivityModalOpen: false
};

export const callCycleSlice = createSlice({
    name: 'call-cycle-activities',
    initialState,
    reducers: {
        setIsFetchCallCycleActivities: (state, action) => {
            state.isFetchCallCycleActivities = action.payload;
        },
        setIsAddCallCycleActivityModalOpen: (state, action) => {
            state.isAddCallCycleActivityModalOpen = action.payload;
        },
        setIsCallCycleActivityReadOnly: (state, action) => {
            state.isCallCycleActivityReadOnly = action.payload;
        },
        setSelectedCallCycleActivity: (state, action) => {
            state.selectedCallCycleActivity = action.payload;
        },
        setIsCallCycleActivityDetail: (state, action) => {
            state.isCallCycleActivityDetail = action.payload;
        },
        setCallCycleActivityPath: (state, action) => {
            state.callCycleActivityPath = action.payload
        },
        setIsCallCycleActivityModalOpen: (state, action) => {
            state.isCallCycleActivityModalOpen = action.payload
        }
    }
});

export const { setIsFetchCallCycleActivities, setIsAddCallCycleActivityModalOpen, setIsCallCycleActivityReadOnly, setSelectedCallCycleActivity, setIsCallCycleActivityDetail, setCallCycleActivityPath, setIsCallCycleActivityModalOpen } = callCycleSlice.actions;

export default callCycleSlice.reducer;

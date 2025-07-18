import { DropDownData } from '@peerless/models';
import { createSlice } from '@reduxjs/toolkit';

interface ActivityPlannerState {
    activityPlannerStatus: DropDownData;
    activityPlannerTerritory: DropDownData;
    activityPlannerType: DropDownData;
    isFetchActivityPlanner: boolean;
    activityPlannerSelectedArea: string | null;
    isFormSubmit: boolean;
}

const today = new Date();
let startDate = new Date(today);
startDate.setMonth(today.getMonth() - 1);

const initialState: ActivityPlannerState = {
    activityPlannerStatus: { text: "All", value: "", id: 1 },
    activityPlannerTerritory: { text: "NSW", value: "NSW", id: 2 },
    activityPlannerType: { text: "All", value: "", id: 1 },
    isFetchActivityPlanner: true,
    activityPlannerSelectedArea: 'activity-planner',
    isFormSubmit: false
};

export const activityPlannerSlice = createSlice({
    name: 'activity-planner',
    initialState,
    reducers: {
        setActivityPlannerStatus: (state, action) => {
            state.activityPlannerStatus = action.payload;
        },
        setActivityPlannerTerritory: (state, action) => {
            state.activityPlannerTerritory = action.payload;
        },
        setActivityPlannerType: (state, action) => {
            state.activityPlannerType = action.payload;
        },
        setIsFetchActivityPlanner: (state, action) => {
            state.isFetchActivityPlanner = action.payload;
        },
        setActivityPlannerSelectedArea: (state, action) => {
            state.activityPlannerSelectedArea = action.payload
        },
        setTriggerActivityPlannerFormSubmit: (state, action) => {
            state.isFormSubmit = action.payload;
        }
    }
});

export const { setActivityPlannerStatus, setActivityPlannerTerritory, setActivityPlannerType, setIsFetchActivityPlanner, setActivityPlannerSelectedArea, setTriggerActivityPlannerFormSubmit } = activityPlannerSlice.actions;

export default activityPlannerSlice.reducer;

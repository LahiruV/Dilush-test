import { DropDownData } from '@peerless/models';
import { createSlice } from '@reduxjs/toolkit';

interface AdministratorSettingsState {
    responseTimeHrs: DropDownData;
}

const initialState: AdministratorSettingsState = {
    responseTimeHrs: { id: 1, text: '4', value: 4 } as DropDownData,
};

export const administratorSettingsSlice = createSlice({
    name: 'administrator-settings',
    initialState,
    reducers: {
        setResponseTimeHrs: (state, action) => {
            state.responseTimeHrs = action.payload
        }
    }
});

export const { setResponseTimeHrs } = administratorSettingsSlice.actions;

export default administratorSettingsSlice.reducer;

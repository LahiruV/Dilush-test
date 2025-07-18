import { createSlice } from '@reduxjs/toolkit';

interface DashRepState {   
    repTemplateDataList: string[];
    repTemplateDrop: string;
}

const initialState: DashRepState = {   
    repTemplateDataList: [],
    repTemplateDrop: '',
};

export const dashboardRepSlice = createSlice({
    name: 'dashboard-rep',
    initialState,
    reducers: {       
        setRepTemplateDataList: (state, action) => {
            state.repTemplateDataList = action.payload;
        },
        setRepTemplateDrop: (state, action) => {
            state.repTemplateDrop = action.payload;
        },
    },
});

export const { setRepTemplateDataList, setRepTemplateDrop } =
dashboardRepSlice.actions;

export default dashboardRepSlice.reducer;

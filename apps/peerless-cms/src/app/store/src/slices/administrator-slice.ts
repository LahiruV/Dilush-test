import { DropDownData } from '@peerless/models';
import { createSlice } from '@reduxjs/toolkit';

interface AdministratorState {
    administratorSelectedArea: string | null;
    administratorRep: DropDownData;
    administratorRepMarketList: any;
    administratorRepProxy: DropDownData;
    administratorRepProxyList: any;
    administratorPantryList: any;
    administratorBusinessTemplate: any;
}

const initialState: AdministratorState = {
    administratorSelectedArea: 'administrator-rep-markets',
    administratorRep: { text: '', value: '', id: 0 } as DropDownData,
    administratorRepMarketList: [],
    administratorRepProxy: { text: '', value: '', id: 0 } as DropDownData,
    administratorRepProxyList: [],
    administratorPantryList: [],
    administratorBusinessTemplate: ''
};

export const administratorSlice = createSlice({
    name: 'administrator-slice',
    initialState,
    reducers: {
        setAdministratorSelectedArea: (state, action) => {
            state.administratorSelectedArea = action.payload
        },
        setAdministratorRep: (state, action) => {
            state.administratorRep = action.payload
        },
        setAdministratorRepMarketList: (state, action) => {
            state.administratorRepMarketList = action.payload
        },
        setAdministratorRepProxy: (state, action) => {
            state.administratorRepProxy = action.payload
        },
        setAdministratorRepProxyList: (state, action) => {
            state.administratorRepProxyList = action.payload
        },
        setAdministratorPantryList: (state, action) => {
            state.administratorPantryList = action.payload
        },
        setAdministratorBusinessTemplate: (state, action) => {
            state.administratorBusinessTemplate = action.payload
        },
    }
});

export const { setAdministratorSelectedArea, setAdministratorRep, setAdministratorRepMarketList, setAdministratorRepProxy, setAdministratorRepProxyList, setAdministratorPantryList, setAdministratorBusinessTemplate } = administratorSlice.actions;

export default administratorSlice.reducer;

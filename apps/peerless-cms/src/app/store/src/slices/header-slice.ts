import { Originator } from '@peerless/models';
import { createSlice } from '@reduxjs/toolkit';
import { set } from 'date-fns';

interface HeaderState {
    childOriginatorsList: [];
    originalData: [];
    loading: boolean;
    visible: boolean;
    isManagerMode: boolean;
    loggedUser: Originator;
    selectedOriginator: Originator;
    selectedOriginatorReptype: boolean;
    childOriginators: string;
    originatorInList: string;
}


const initialState: HeaderState = {
    childOriginatorsList: [],
    originalData: [],
    loading: false,
    visible: false,
    isManagerMode: true,
    loggedUser: {
        name: '',
        userName: '',
        position: '',
        managerMode: false,
        clientType: '',
        repType: '',
        defaultDepartmentId: '',
    } as Originator,
    selectedOriginator: {} as Originator,
    selectedOriginatorReptype: false,
    childOriginators: '',
    originatorInList: '',
};

export const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setChildOriginatorsList: (state, action) => {
            state.childOriginatorsList = action.payload;
        },
        setOriginalData: (state, action) => {
            state.originalData = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setVisible: (state, action) => {
            state.visible = action.payload;
        },
        setLoggedUser: (state, action) => {
            state.loggedUser = action.payload;
        },
        setSelectedOriginator: (state, action) => {
            state.selectedOriginator = action.payload;
        },
        setIsManagerMode: (state, action) => {
            state.isManagerMode = action.payload;
        },
        setSelectedOriginatorReptype: (state, action) => {
            state.selectedOriginatorReptype = action.payload;
        },
        setChildOriginators: (state, action) => {
            state.childOriginators = action.payload;
        },
        setOriginatorInList: (state, action) => {
            state.originatorInList = action.payload;
        }
    },
});

export const { setChildOriginatorsList, setOriginalData, setLoading, setVisible, setLoggedUser, setSelectedOriginator, setIsManagerMode, setSelectedOriginatorReptype, setChildOriginators, setOriginatorInList } =
    headerSlice.actions;

export default headerSlice.reducer;

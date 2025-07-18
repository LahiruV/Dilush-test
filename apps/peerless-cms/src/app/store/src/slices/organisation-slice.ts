import { createSlice } from "@reduxjs/toolkit";
import { pageModeEnum } from "./leeds-and-customers-slice";

interface ModalState {
    searchText: string;
    organisationTypes: any;
    filterEnabled: boolean;
    orgDetailPageMode: pageModeEnum;
    selectedOrganisation: any;
    selectedOrgEnduser: any;
    organisationEnduserPageMode: pageModeEnum;
    organisationSubOrgPageMode: pageModeEnum;
    selectedSubOrg: any;
    organisationDistributorPageMode: pageModeEnum,
    selectedOrgDistributor: any,
}

const initialState: ModalState = {
    searchText: '',
    organisationTypes: ['Org'],
    filterEnabled: false,
    orgDetailPageMode: pageModeEnum.New,
    selectedOrganisation: {},
    selectedOrgEnduser: {},
    organisationEnduserPageMode: pageModeEnum.List,
    organisationSubOrgPageMode: pageModeEnum.List,
    selectedSubOrg: {},
    organisationDistributorPageMode: pageModeEnum.List,
    selectedOrgDistributor: {},
}

export const organisationSlice = createSlice({
    name: 'organisation',
    initialState,
    reducers: {
        setSearchText: (state, action) => {
            state.filterEnabled = initialState.filterEnabled;
            state.searchText = action.payload;            
        },
        setOrganisationTypes: (state, action) => {
            state.filterEnabled = initialState.filterEnabled;
            state.organisationTypes = action.payload;            
        },
        setOrgFilterEnabled: (state, action) => {
            state.filterEnabled = action.payload;
        },
        setOrgDetailPageMode: (state, action) => {
            state.orgDetailPageMode = action.payload;
        },
        setSelectedOrganisation: (state, action) => {
            state.selectedOrganisation = action.payload;
        },
        setSelectedOrgEnduser: (state, action) => {
            state.selectedOrgEnduser = action.payload;
        },
        setOrganisationEnduserPageMode: (state, action) => {
            state.organisationEnduserPageMode = action.payload;
        },
        setOrganisationSubOrgPageMode: (state, action) => {
            state.organisationSubOrgPageMode = action.payload;
        },
        setSelectedSubOrg: (state, action) => {
            state.selectedSubOrg = action.payload;
        },
        setOrganisationDistributorPageMode: (state, action) => {
            state.organisationDistributorPageMode = action.payload;
        },
        setSelectedOrgDistributor: (state, action) => {
            state.selectedOrgDistributor = action.payload;
        },
    },
  });
  
  export const { setSearchText, setOrganisationTypes, setOrgFilterEnabled, setOrgDetailPageMode, setSelectedOrganisation, setSelectedOrgEnduser, 
    setOrganisationEnduserPageMode, setOrganisationSubOrgPageMode, setSelectedSubOrg, setOrganisationDistributorPageMode, setSelectedOrgDistributor } =
  organisationSlice.actions;
  
  export default organisationSlice.reducer;
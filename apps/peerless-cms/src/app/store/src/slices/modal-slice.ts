import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isModalOpen: boolean;
  isAddContactModalOpen: boolean;
  isAddressTblPopupOpen: boolean;
  isContactPersonTblPopupOpen: boolean;
  isActivityTblPopupOpen: boolean;
  isDocumentTblDeletePopupOpen: boolean;
  isOpportunityTblPopupOpen: boolean;
  isOpportunityDeletePopupOpen: boolean;
  isCustomerEnduserTblPopupOpen: boolean;
  isCustomerEnduserTransferPopupOpen: boolean;
  isCustomerEUPriceListTblPopupOpen: boolean;
  isCustomerPriceTblPopupOpen: boolean;
  isDealPopupOpen: boolean,
  isPantryListTblPopupOpen: boolean,
  isCrmOrderTblPopupOpen: boolean,
  isAddEnduserModalOpen: boolean;
  isEnduserTIODeletePopupOpen: boolean;
  isEnduserPriceListHistoryOpen: boolean;
  isAddLeadModalOpen: boolean;
  isAddOrganisationModalOpen: boolean;
  modalPosition: { top: number, left: number };
  isAddLeaveModalOpen: boolean;
}

const initialState: ModalState = {
  isModalOpen: false,
  isAddContactModalOpen: false,
  isAddressTblPopupOpen: false,
  isContactPersonTblPopupOpen: false,
  isActivityTblPopupOpen: false,
  isDocumentTblDeletePopupOpen: false,
  isOpportunityTblPopupOpen: false,
  isOpportunityDeletePopupOpen: false,
  isCustomerEnduserTblPopupOpen: false,
  isCustomerEnduserTransferPopupOpen: false,
  isCustomerEUPriceListTblPopupOpen: false,
  isCustomerPriceTblPopupOpen: false,
  isDealPopupOpen: false,
  isPantryListTblPopupOpen: false,
  isCrmOrderTblPopupOpen: false,
  isAddEnduserModalOpen: false,
  isEnduserTIODeletePopupOpen: false,
  isEnduserPriceListHistoryOpen: false,
  isAddLeadModalOpen: false,
  isAddOrganisationModalOpen: false,
  modalPosition: { top: 100, left: 100 },
  isAddLeaveModalOpen: false
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setIsAddContactModalOpen: (state, action) => {
      state.isAddContactModalOpen = action.payload;
    },
    setModalPosition: (state, action) => {
      state.modalPosition = action.payload;
    },
    setIsAddressTblPopupOpen: (state, action) => {
      state.isAddressTblPopupOpen = action.payload;
    },
    setIsContactPersonTblPopupOpen: (state, action) => {
      state.isContactPersonTblPopupOpen = action.payload;
    },
    setIsActivityTblPopupOpen: (state, action) => {
      state.isActivityTblPopupOpen = action.payload;
    },
    setIsDocumentTblDeletePopupOpen: (state, action) => {
      state.isDocumentTblDeletePopupOpen = action.payload;
    },
    setIsOpportunityTblPopupOpen: (state, action) => {
      state.isOpportunityTblPopupOpen = action.payload;
    },
    setIsOpportunityDeletePopupOpen: (state, action) => {
      state.isOpportunityDeletePopupOpen = action.payload;
    },
    setIsCustomerEnduserTblPopupOpen: (state, action) => {
      state.isCustomerEnduserTblPopupOpen = action.payload;
    },
    setIsCustomerEnduserTransferPopupOpen: (state, action) => {
      state.isCustomerEnduserTransferPopupOpen = action.payload;
    },
    setIsCustomerEUPriceListTblPopupOpen: (state, action) => {
      state.isCustomerEUPriceListTblPopupOpen = action.payload;
    },
    setIsCustomerPriceTblPopupOpen: (state, action) => {
      state.isCustomerPriceTblPopupOpen = action.payload;
    },
    setIsDealPopupOpen: (state, action) => {
      state.isDealPopupOpen = action.payload;
    },
    setIsPantryListTblPopupOpen: (state, action) => {
      state.isPantryListTblPopupOpen = action.payload;
    },
    setIsCrmOrderTblPopupOpen: (state, action) => {
      state.isCrmOrderTblPopupOpen = action.payload;
    },
    setIsAddEnduserModalOpen: (state, action) => {
      state.isAddEnduserModalOpen = action.payload;
    },
    setIsEnduserTIODeletePopupOpen: (state, action) => {
      state.isEnduserTIODeletePopupOpen = action.payload;
    },
    setIsEnduserPriceListHistoryOpen: (state, action) => {
      state.isEnduserPriceListHistoryOpen = action.payload;
    },
    setIsAddLeadModalOpen: (state, action) => {
      state.isAddLeadModalOpen = action.payload;
    },
    setIsAddOrganisationModalOpen: (state, action) => {
      state.isAddOrganisationModalOpen = action.payload;
    },
    setIsAddLeaveModalOpen: (state, action) => {
      state.isAddLeaveModalOpen = action.payload;
    },
  },
});

export const { setIsModalOpen, setIsAddContactModalOpen, setModalPosition, setIsAddressTblPopupOpen, setIsContactPersonTblPopupOpen,
  setIsActivityTblPopupOpen, setIsDocumentTblDeletePopupOpen, setIsOpportunityTblPopupOpen, setIsOpportunityDeletePopupOpen, setIsCustomerEnduserTblPopupOpen,
  setIsCustomerEnduserTransferPopupOpen, setIsCustomerEUPriceListTblPopupOpen, setIsCustomerPriceTblPopupOpen, setIsDealPopupOpen, setIsPantryListTblPopupOpen,
  setIsCrmOrderTblPopupOpen, setIsAddEnduserModalOpen, setIsEnduserTIODeletePopupOpen, setIsEnduserPriceListHistoryOpen, setIsAddLeadModalOpen, setIsAddOrganisationModalOpen, setIsAddLeaveModalOpen } =
  modalSlice.actions;

export default modalSlice.reducer;

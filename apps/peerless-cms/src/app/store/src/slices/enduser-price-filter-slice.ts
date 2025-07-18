import { createSlice } from "@reduxjs/toolkit";

interface EnduserPriceFilterState{   
    selectedDistributor: any,
    isEUPriceQueryEnabled: boolean,
    isFilterBtnDisabled: boolean;
}

const initialState: EnduserPriceFilterState = {
    selectedDistributor: {},
    isEUPriceQueryEnabled: false,
    isFilterBtnDisabled: true,
};

export const enduserPriceFilterSlice = createSlice({
    name: 'enduserPriceFilter',
    initialState,
    reducers: {
      setEnduserPriceFilterDistributor: (state, action) => {
        state.selectedDistributor = action.payload;
      },
      setIsEnduserPriceFilterQueryEnabled: (state, action) => {        
        state.isEUPriceQueryEnabled = action.payload;
      },
      setIsEnduserPriceFilterBtnDisabled: (state, action) => {
        state.isFilterBtnDisabled = action.payload;
      },
    },
  });

  export const { setEnduserPriceFilterDistributor, setIsEnduserPriceFilterQueryEnabled, setIsEnduserPriceFilterBtnDisabled } =
  enduserPriceFilterSlice.actions;

export default enduserPriceFilterSlice.reducer;
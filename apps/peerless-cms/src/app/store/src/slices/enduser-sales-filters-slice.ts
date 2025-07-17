import { createSlice } from "@reduxjs/toolkit";

interface EnduserSalesFilterState{    
    year: any;
    period: any,
    isIncludeProductsWithNoSales: boolean,    
    isQueryEnabled: boolean,
    isFilterBtnDisabled: boolean;
    isFormSubmit: boolean;
}

const initialState: EnduserSalesFilterState = {
    year: {text: 'Loading...', value: ''},
    period: {text: 'Loading...', value: ''},
    isIncludeProductsWithNoSales: true,
    isQueryEnabled: false,
    isFilterBtnDisabled: true,
    isFormSubmit: false
};

export const enduserSalesFilterSlice = createSlice({
    name: 'enduserSalesFilter',
    initialState,
    reducers: {
      setEnduserSalesFilterYear: (state, action) => {
        state.year = action.payload;
      },
      setEnduserSalesFilterPeriod: (state, action) => {        
        state.period = action.payload;
      },
      setIsIncludeProductsWithNoSales: (state, action) => {
        state.isIncludeProductsWithNoSales = action.payload;
      },
      setIsQueryEnabled: (state, action) => {
        state.isQueryEnabled = action.payload;
      },
      setIsFilterBtnDisabled:(state, action) => {
        state.isFilterBtnDisabled = action.payload;
      },
      setTriggerEndUserSalesFormSubmit: (state, action) => {
        state.isFormSubmit = action.payload;
      }
    },
  });

  export const { setEnduserSalesFilterYear, setEnduserSalesFilterPeriod, setIsIncludeProductsWithNoSales, setIsQueryEnabled, setIsFilterBtnDisabled, setTriggerEndUserSalesFormSubmit } =
  enduserSalesFilterSlice.actions;

export default enduserSalesFilterSlice.reducer;
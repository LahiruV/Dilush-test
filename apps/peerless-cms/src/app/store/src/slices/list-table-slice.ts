import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/*----- Not in Use For the moment ------*/

interface ListTableState {
    selectedRowIndex: number | null;
}

const initialState: ListTableState = {
  selectedRowIndex: null,
};

export const listTableSlice = createSlice({
  name: 'listTableS',
  initialState,
  reducers: {
    setSelectedRowIndex: (state, action: PayloadAction<number | null>) => {
      state.selectedRowIndex = action.payload;
    },
  },
});

export const { setSelectedRowIndex } =
listTableSlice.actions;

export default listTableSlice.reducer;
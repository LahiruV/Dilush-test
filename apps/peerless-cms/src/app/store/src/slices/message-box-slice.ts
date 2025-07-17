import { createSlice } from "@reduxjs/toolkit";

export enum messageTypeEnum{
    Success = 1,
    Error = 2,
    Warning = 3
}

interface MessageBox{
    isVisible: boolean;
    messageType: messageTypeEnum;
    message: string;
}

interface MessageBoxState {
    message: MessageBox;
}

const initialState: MessageBoxState = {
    message: { isVisible: false, message: '', messageType: messageTypeEnum.Success },
};

export const messageBoxSlice = createSlice({
  name: 'messageBox',
  initialState,
  reducers: {
    showMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { showMessage } =
messageBoxSlice.actions;

export default messageBoxSlice.reducer;

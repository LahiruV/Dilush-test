import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
    isAuthenticated: boolean;
};

const initialState: AuthState = {
    isAuthenticated: true,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        }
    },
});

export const { setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;

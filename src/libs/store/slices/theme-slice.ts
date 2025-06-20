import { createSlice } from '@reduxjs/toolkit';

type ThemeState = {
    theme: 'light';
    themeButton: boolean;
};

const initialState: ThemeState = {
    theme: 'light',
    themeButton: true,
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: () => {

        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        setThemeButton: (state, action) => {
            state.themeButton = action.payload;
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

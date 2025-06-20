import { createSlice } from '@reduxjs/toolkit';
import { LoggedUser } from '@zenra/model';

type UserState = {
    loggedUser: LoggedUser;
};

const initialState: UserState = {
    loggedUser: {
        id: 0,
        name: '',
        email: '',
        phone: '',
        address: '',
        nic: '',
        password: '',
        profile: '',
        createdAt: '',
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoggedUser: (state, action) => {
            state.loggedUser = action.payload;
        }
    },
});

export const { setLoggedUser } = userSlice.actions;
export default userSlice.reducer;

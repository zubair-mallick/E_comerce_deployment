import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: null,
    loading: true
};
export const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        makeUserExist: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        makeUserNotExist: (state) => {
            state.loading = false;
            state.user = null;
        },
    }
});
export const { makeUserExist, makeUserNotExist } = userReducer.actions;

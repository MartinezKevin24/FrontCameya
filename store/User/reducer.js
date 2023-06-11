import { createSlice } from "@reduxjs/toolkit";

const initialState  = {
    data: null,
    token: null
}

export const LogIn = createSlice({
    name: "login",
    initialState: initialState,
    reducers: {
        insertData: (state, action) => {
          state.value = {
            ...state.value,
            data: action.payload.data,
            token: action.payload.token
          }
        },
        clearData: (state) => {
          state.value = {
            ...state.value,
            data: null,
            token: null
          }
        }
    }
})

export const { insertData, clearData } = LogIn.actions;

export default LogIn.reducer;
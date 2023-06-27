import { createSlice } from "@reduxjs/toolkit";

const initialState  = {
    data: null,
    token: null
}

export const AdminLogIn = createSlice({
    name: "adminlogin",
    initialState: initialState,
    reducers: {
        insertAdminData: (state, action) => {
          state.value = {
            ...state.value,
            data: action.payload.data,
            token: action.payload.token
          }
        },
        clearAdminData: (state) => {
          state.value = {
            ...state.value,
            data: null,
            token: null
          }
        }
    }
})

export const { insertAdminData, clearAdminData } = AdminLogIn.actions;

export default AdminLogIn.reducer;
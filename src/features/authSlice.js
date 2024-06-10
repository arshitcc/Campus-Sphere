import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    status : false,
    userData : null,
} 


const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {

        login : (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },

        // Even though we have access of action in parameters but it's of no use.
        logout : (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

export const {login, logout} = authSlice.actions
export default authSlice.reducer
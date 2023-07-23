import { createSlice } from "@reduxjs/toolkit";

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const authSlice = createSlice({
    name: 'auth',
    initialState: {email: '', token: userToken}, 
    reducers: {
        setCredentials: (state, action) => {
            const {message, email, token} = action.payload
            state.email = email
            state.token = token
            state.message = message
            localStorage.setItem('userToken', state.token)
        },
        logOut: (state, action) => {
            state.email = ''
            state.token = ''
            localStorage.removeItem('userToken')
        },
        getDataCredentials: (state, action) => {
            
        }
    }
})

export const {setCredentials, logOut} = authSlice.actions

export default authSlice.reducer

export const selectCurrentEmail = (state) => state.auth.email
export const selectCurrentToken = (state) => state.auth.token

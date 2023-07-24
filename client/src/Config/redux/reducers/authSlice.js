import { createSlice } from "@reduxjs/toolkit";
import jwtDecoder from "jwt-decode"

const initialState = {
  authTokens: localStorage.getItem("authTokens")? JSON.stringify(localStorage.getItem("authTokens")): null,
  user: localStorage.getItem('authTokens')? jwtDecoder(localStorage.getItem("authTokens")): null
}

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    setUserTokens: (state, action) => {
      state.authTokens = action.payload.authTokens
      state.user = action.payload.user
    },
    logoutUser: (state) => {
      state.authTokens = null
      state.user = null
      localStorage.removeItem("authToken")
    }
  }
})


export const {setUserTokens, logoutUser} = authSlice.actions

export default authSlice.reducer
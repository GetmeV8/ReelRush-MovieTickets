import {configureStore} from "@reduxjs/toolkit"
import authSlice from "../reducers/authSlice"


const store = configureStore({
    reducer:{
        user: authSlice
    }
})


export default store
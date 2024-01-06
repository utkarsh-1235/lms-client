import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: localStorage.getItem() || ,
    role: localStorage.getItem("role") ,
    data: localStorage.getItem() || {}


}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers
})

export default authSlice.reducer
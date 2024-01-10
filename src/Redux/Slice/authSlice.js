import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "" ,
    data: localStorage.getItem("data") || {}


}

export const createAccount = createAsyncThunk("/auth/signup",async(data)=>{
    try{
         const res = axiosInstance.post("user/register", data);
         toast.propmise(res,{
            loading: "Wait! Creating your Account",
            success: (data)=>{
                return data?.data?.message;
            },
            error: "failed to create account"
         })
         return (await res).data;
    }catch(err){
        toast.error(err?.response?.data?.message);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {}
})

export default authSlice.reducer
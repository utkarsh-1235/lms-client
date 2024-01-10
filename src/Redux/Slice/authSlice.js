import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"
import { json } from "react-router-dom"

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "" ,
    data: localStorage.getItem("data") || {}


}

export const createAccount = createAsyncThunk("/auth/signup",async(data)=>{
    try{
         const res = axiosInstance.post("user/register", data);
         toast.promise(res,{
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

export const authenticate = createAsyncThunk("/auth/login", async(data)=>{
    try{
        
        const res = await axiosInstance.post("user/login", data);
        console.log(res.data);
        if (res.data?.success) {
            toast.success(res.data?.message);
        } else {
            toast.error(res.data?.message);
        }
        // toast.promise(res,{
        //     loading: "Wait! authentication in progress...",
        //     success: (data)=>{
        //         return data?.data?.message;
        //     },
        //     error: "failed to authenticate"
        // })
        
        return (await res).data;
    }catch(err){
        toast.error(err?.response?.data?.message);
    }
})

export const logout = createAsyncThunk("/auth/logout",async()=>{
    try{
        const res = axiosInstance.get("user/logout");
        toast.promise(res,{
           loading: "Wait! Logging out",
           success: (data)=>{
               return data?.data?.message;
           },
           error: "failed to logged out"
        })
        return (await res).data;
    }
    catch(err){
        toast.error(err?.response?.data?.message);
    }
})
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
    
        .addCase(authenticate.fulfilled,(state, action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
        })
        .addCase(logout.fulfilled,(state)=>{
            localStorage.clear();
            state.data={};
            state.isLoggedIn=false;
            state.role=''
        })
    }
})

export default authSlice.reducer
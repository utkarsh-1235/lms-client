import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"


const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "" ,
    data: localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) : {}

}

export const createAccount = createAsyncThunk("/auth/signup",async(data)=>{
    try{
         const res = await axiosInstance.post("user/register", data);
         if (res.data?.success) {
            toast.success(res.data?.message);
        } else {
            toast.error(res.data?.message);
        }
         return res.data;
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
        
        return res.data;
    }catch(err){
        toast.error(err?.response?.data?.message);
    }
})

export const logout = createAsyncThunk("/auth/logout",async()=>{
    try{
        const res = await axiosInstance.get("user/logout");
        console.log(res.data);
        if (res.data?.success) {
            toast.success(res.data?.message);
        } else {
            toast.error(res.data?.message);
        }
        return res.data;
    }
    catch(err){
        toast.error(err?.response?.data?.message);
    }
})




const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action)=>{
            state.data = action.payload.data;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.role = action.payload.role;
        },
        clearUser: (state)=>{
            state.data = {};
            state.isLoggedIn = {};
            state.role = ""
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(authenticate.fulfilled,(state, action)=>{
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role
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



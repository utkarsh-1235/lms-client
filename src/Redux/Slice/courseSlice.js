import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk("/courses/get",async()=>{
    try{
        const res = await axiosInstance.get("/courses")
        console.log(res?.data);
        if(res?.data?.course.length > 0){
            toast.success("Course loaded successfully")
        }
        else if (res?.data?.courses?.length == 0) {
            toast.success("There is no any course");
        } else {
            toast.error(res.data?.message);
        }
    }catch(err){
        toast.error(err?.response?.data?.message)
    }
})
const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
    builder
    .addCase(getAllCourses.fulfilled, (state, action)=>{
        if(action.payload){
            console.log(action.payload);
            state.courseData = [...action.payload];
        }
    })
    }
})

export default courseSlice.reducer
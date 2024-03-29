

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        const response = axiosInstance.get("/courses");
        console.log(response?.data);
        toast.promise(response, {
            loading: "loading course data...",
            success: "Courses loaded successfully",
            error: "Failed to get the courses",
        });

        return (await response).data.courses;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
}); 

export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
    try {
        const response = axiosInstance.delete(`/courses/${id}`);
        toast.promise(response, {
            loading: "deleting course ...",
            success: "Courses deleted successfully",
            error: "Failed to delete the courses",
        });

        return (await response).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
}); 

export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
    try {
 
        const response = await axiosInstance.post("/courses", data)
        
        console.log(response);
        if (response.data?.success) {
            toast.success(response.data?.message);
        } else {
            toast.error(response.data?.message);
        }

        return response.data;

    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if(action.payload) {
                state.courseData = [...action.payload];
            }
        })
    }
});

export default courseSlice.reducer;
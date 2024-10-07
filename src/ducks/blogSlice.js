import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tags:[],
    title: null,
    description: null,
    thumbnail: null,
    categoryId:null ,
    authorId:null
};

export const blogSlice = createSlice({
  name: "blogSlice",
  initialState,
  reducers: {
    setBlogData:(state,{payload})=>{
      return payload;
    }, 
    resetBlogs:()=>initialState
  },
});

export const {resetBlogs,setBlogData} = blogSlice.actions;

export default blogSlice.reducer;

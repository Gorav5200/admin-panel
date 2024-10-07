import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content:"",
  topicId:"",

};

export const accelareaderSlice = createSlice({
  name: "accelareaderSlice",
  initialState,
  reducers: {
    setAccelareaderDetail: (state, { payload }) => {
      state.content = payload.content; 
      state.topicId = payload.topicId; 
    },
    resetAccelareader:()=>initialState
  },
});

export const {resetAccelareader,setAccelareaderDetail} = accelareaderSlice.actions;

export default accelareaderSlice.reducer;

import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
  expanded: null,
  activeEntityType:null,
  activeEntityTitle:null

};



export const drawerSlice = createSlice({
  name: "drawerSlice",
  initialState,
  reducers: {
    setExpanded: (state, action) => {
      state.expanded = action.payload;
    },
    setActiveEntityType: (state, action) => {
      state.activeEntityType = action.payload;
    },
    
    setActiveEntityTitle: (state, action) => {
      state.activeEntityTitle = action.payload;
    },
    
    resetDrawer:()=>initialState,
  },
  

});

export const { setExpanded, resetDrawer, setActiveEntityType, setActiveEntityTitle } =
  drawerSlice.actions;

export default drawerSlice.reducer;

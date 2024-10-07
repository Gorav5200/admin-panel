import { createSlice } from "@reduxjs/toolkit";
import { deleteCase } from "./commonActions";

const initialState = {
  errorStatus:{},
  mockPackageList: [],
  mockDetails: {
   title:"",
    price:"",
    startDate:null,
    expiryDate:null,
    highlights:"",
    isPublished:false,
    profile:"",
  },
  mockDescription:"",
  topFeatures:[{content:"",image:""}],
  viewMockDetails:{},
  activeView:0
};

export const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    setMockPackageList: (state = initialState, { payload }) => {
      const mocks = payload;
      return { ...state, mockPackageList: mocks };
    },

    setMockDetails: (state = initialState, { payload }) => {
      return {
        ...state,
        mockDetails: payload,
      };
    },

    setMockDescription: (state = initialState, { payload }) => {
      return { ...state, mockDescription: payload };
    },
    setTopFeatures: (state = initialState, { payload }) => {
      return { ...state, topFeatures: payload };
    },


    viewMockPackage: (state = initialState, { payload }) => {
      return { ...state, viewMockDetails: payload };
    },


    setErrors:(state,{payload})=>{
        state.errorStatus=payload;
    },

    setView:(state,{payload})=>{
       state.activeView = payload
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCase, (state, action) => {
      const indexToDelete = action.payload;
      state.mockList.splice(indexToDelete, 1);
    });
  },
  
});

export const {setMockPackageList,setMockDetails,setMockDescription,setTopFeatures,resetState,viewMockPackage,setErrors,setView} = packageSlice.actions;

export default packageSlice.reducer;

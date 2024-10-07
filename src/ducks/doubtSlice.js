import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doubtData: {},
  reviewDoubt: {
    detail:{},
    modalDetail: {
      status: false,
      doubtDetail: {},
      actions: {
        incorrect: {},
        correct: {},
      },
    },
  },
};

export const doubtSlice = createSlice({
  name: "doubtSlice",
  initialState,
  reducers: {
    setSpecificDoubtData: (state, { payload }) => {
      state.doubtData = payload;
    },
    setReviewDoubt: (state, { payload }) => {
    
      state.reviewDoubt.detail = payload;
    },
    setModalDetails: (state, { payload }) => {
     console.log("🚀 ~ payload:", payload)
     
    },


    resetDoubt: () => initialState,
  },
});

export const reviewDoubtDetail = (state)=> state.doubt.reviewDoubt;
export const { setSpecificDoubtData, setReviewDoubt, setModalActions } =
  doubtSlice.actions;

export default doubtSlice.reducer;

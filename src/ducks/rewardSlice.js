import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  referralDetails:{
    title: "",
    description: "",
    discountValue: "",
    earnValue: "",
    startDate: "",
    endDate: "",
    type: "",
    products: [],
    coins: "",
    points: "",
    thumbnail: "",
    coinCheck: false,
    pointCheck: false,
  },
  bundleDetails:{
    title: "",
    description: "",
    image: "",
    coinValue: "",
    bundleValue: "",
  },
  rewardsDetails:{
    title: "",
    description: "",
    isPublished:"",
    startDate: "",
    endDate: "",
    type: "",
    products: [],
    coins: "",
    thumbnail: "",

  },


};

export const rewardSlice = createSlice({
  name: "rewardSlice",
  initialState,
  reducers: {
    setReferralDetails: (state, { payload }) => {
   state.referralDetails=payload;
    },
    setBundleDetails: (state, { payload }) => {
   state.bundleDetails=payload;
    },
    setRewardsDetails: (state, { payload }) => {
     state.rewardsDetails=payload;
    },
    resetRewards:()=>initialState
  },
});

export const {resetRewards,setReferralDetails,setBundleDetails,setRewardsDetails} = rewardSlice.actions;

export default rewardSlice.reducer;

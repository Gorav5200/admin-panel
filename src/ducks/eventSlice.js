import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data:{
    title: null,
    date: null,
    startTime: null,
    endTime: null,
    mode: "online",
    modeType: null,
    groups:[],
    privacy: "members",
    invite: false,
    description: null,
    repeatEvents: false,
    repeatData: { frequency: "disable", endTime: null, endDate: null },
    publisherId: null,
    eventLink:null,
    hostId:null,
    thumbnail:"",
     session:1,
     status:"upcoming",
     sendInvite : true,

  },
};

export const eventSlice = createSlice({
  name: "eventSlice",
  initialState,
  reducers: {
    setEventData:(state,{payload})=>{
      state.data=payload
    },
    resetEvent:()=>initialState
  },
});

export const {resetEvent,setEventData} = eventSlice.actions;

export default eventSlice.reducer;

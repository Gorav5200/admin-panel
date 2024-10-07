import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  learnList: [],
  newLearn: {
    concepts: [],
    title: "",
    topic: "",
    subTopic:[],
    description: "",
    backgroundImage: "", 
    toppersReward:{first:"", second:"", third:""},
    paid:{status:false,charge:""},
    rewardCheck:true,
    coinCheck:false,
    pointCheck:false,
    coin:"",
    points:"",
  },
  learnTopicDetail:{}
};

export const learnSlice = createSlice({
  name: "learnSlice",
  initialState,
  reducers: {
    setLearnList: (state, action) => {
      state.learnList = action.payload;
    },
    setLearnTopicDetail: (state, action) => {
      state.learnTopicDetail = action.payload;
    },
    createLearn: (state, { payload }) => {
      state.newLearn = payload;
    },
    createPractice: (state, { payload }) => {
      state.newLearn.practice = payload;
    },
    createConcept: (state, { payload }) => {
      state.newLearn.concepts = payload;
    },
  
    removePractice: (state, { payload }) => {
      state.newLearn.practice = state.newLearn.practice.filter(
        (card) => card._id !== payload
      );
    },
    removeConcept: (state, { payload }) => {
      state.newLearn.concepts = state.newLearn.concepts.filter(
        (card) => card._id !== payload
      );
    },
    resetLearn:()=>initialState,
    
  },

});

export const {resetLearn,setLearnList,createLearn ,createPractice,createConcept,removePractice,removeConcept,setLearnTopicDetail,} = learnSlice.actions;

export default learnSlice.reducer;

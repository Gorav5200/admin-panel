import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  practiceQaList: [],
  newPracticeQa: {
    title: "",
    totalQuestions:"",
    topic: "",
    subTopics:[],
    subject:"",
    coin:"",
    points:"",
    description: "",
    toppersReward:{first:"", second:"", third:""},
    paid:{status:false,charge:""},
    rewards:false,
    coinCheck:false,
    pointCheck:false,
    questionList: [],
    isCommonTimer:false,
    commonTimer:"",
    timePerQuestion:null,
    difficultyLevel:"",
     rewardGrantChart: [
      {
        floorValue: "",
        multiplier: "",
      },
    ],
  },

};

export const practiceQa = createSlice({
  name: "practiceQa",
  initialState,
  reducers: {
    setPracticeQaList: (state, action) => {
      state.practiceQaList = action.payload;
    },
   
    createPracticeQa: (state, { payload }) => {
      state.newPracticeQa = payload;
    },
   
    createQuestionList: (state, { payload }) => {
      state.newPracticeQa.questionList = payload;
    },

  
    
    resetPracticeQa:()=>initialState,
    
  },

});

export const {setPracticeQaList,createPracticeQa,resetPracticeQa,createQuestionList} = practiceQa.actions;

export default practiceQa.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignmentList: [],
  newAssignment: {
    title: "",
    totalQuestions: Number,
    topic: "",
    subTopics: [],
    subject: "",
    submissionDeadline: "",
    coin: "",
    points: "",
    toppersReward: { first: "", second: "", third: "" },
    paid: { status: false, charge: "" },
    rewardCheck: false,
    coinCheck: false,
    pointCheck: false,
    questionList: [],
    isCommonTimer: true,
    commonTimer: "",
    rewardGrantChart: [
      {
        floorValue: "",
        multiplier: "",
      },
    ],
  },
  assignmentDetail: {},
};

export const assignmentSlice = createSlice({
  name: "assignmentSlice",
  initialState,
  reducers: {
    setAssignmentList: (state, action) => {
      state.assignmentList = action.payload;
    },
    setAssignmentDetail: (state, action) => {
      state.assignmentDetail = action.payload;
    },
    createAssignment: (state, { payload }) => {
      state.newAssignment = payload;
    },
    createQuestionList: (state, { payload }) => {
      state.newAssignment.questionList = payload;
    },
    
    resetAssignment:()=>initialState,
    
  },

});

export const {setAssignmentList,setAssignmentDetail,createAssignment,resetAssignment,createQuestionList} = assignmentSlice.actions;

export default assignmentSlice.reducer;

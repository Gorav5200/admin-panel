import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dailyQuizList: [],
  entityList: [],
  dailyQuizDetail: {
    title: "",
    entityType: "",
    date: null,
    sections: [],
    attemptAllowed: "",
    sectionsSelect: [],
    allowedModules: [
      "errorTracker",
      "viewSolutions",
      "mockComparision",
      "allMockAnalaysis",
    ],

    isToggleAllowed: true,

    markingType: "overall",
    commonTimer: null,

    isUnattemptedMarks: false,
    unattemptedNegativeMarks: Number,
    unattemptedThreshold: Number,
    isCalculatorAllowed: false,

    toppersReward: { first: "", second: "", third: "" },
    paid: { status: false, charge: "" },
    rewardCheck: true,
    coinCheck: false,
    pointCheck: false,
    coin: "",
    points: "",
    rewardGrantChart: [
      {
        floorValue: "",
        multiplier: "",
      },
    ],
  },
};

export const dailyQuizSlice = createSlice({
  name: "dailyQuizSlice",
  initialState,
  reducers: {
    setDailyQuiz: (state, { payload }) => {
      state.dailyQuizList = payload;
    },
    setDailyQuizDetail: (state, { payload }) => {
      state.dailyQuizDetail = payload;
    },
    setQuestionList: (state = initialState, { payload }) => {
      state.dailyQuizDetail.sections = payload;
    },

    resetDailyQuiz: () => initialState,
  },
});

export const {
  setDailyQuiz,
  setDailyQuizDetail,
  setQuestionList,
  resetDailyQuiz,
} = dailyQuizSlice.actions;

export default dailyQuizSlice.reducer;

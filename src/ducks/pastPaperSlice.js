import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pastPaperDetail: {
    title: "",
    price: "",
    entityType: "",
    startDate: null,
    startTime: null,
    endTime: null,
    sections: [],
    attemptAllowed: "",
    sectionsSelect: [],
    isPercentile: false,
    isWindowPeriod: false,
    isOnboarding: false,
    allowedModules: [
      "errorTracker",
      "viewSolutions",
      "mockComparision",
      "allMockAnalaysis",
    ],
    percentileId: null,
    isGoalTracker: false,
    isToggleAllowed: true,
    isScorePercentile: false,

    markingType: "overall",
    commonTimer: null,
    instruction_id: "",
    terms_id: "",
    isUnattemptedMarks: false,
    unattemptedNegativeMarks: Number,
    unattemptedThreshold: Number,
    isCalculatorAllowed: false,
    rewardGrantChart: [
      {
        floorValue: "",
        multiplier: "",
      },
    ],
  },
  examTips: {},
  entityList: [],
  selectedQuestionsList: [],
  pastPaperList: [],
  isRewardGrantChart: true,
};

export const pastPaperSlice = createSlice({
  name: "pastPaperSlice",
  initialState,
  reducers: {
    setPastPaperDetail: (state, { payload }) => {
      state.pastPaperDetail = payload;
    },

    setEntityList: (state, { payload }) => {
      state.entityList = payload;
    },
    setQuestionList: (state = initialState, { payload }) => {
      state.pastPaperDetail.sections = payload;
    },
    setPastPaperList: (state = initialState, { payload }) => {
      state.pastPaperList = payload;
    },

    resetPastPaper: () => initialState,
  },
});

export const {
  setPastPaperDetail,
  setEntityList,
  resetPastPaper,
  setQuestionList,
  setPastPaperList,
} = pastPaperSlice.actions;

export default pastPaperSlice.reducer;

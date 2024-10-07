import { createSlice } from "@reduxjs/toolkit";
import { deleteCase } from "./commonActions";

const initialState = {
  selectedQuestionsList: [],
  mockDetail: {
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
};

export const mockSlice = createSlice({
  name: "mocks",
  initialState,
  reducers: {
    createNewMock: (state = initialState, { payload }) => {
      // alert("16");
      const newMock = payload;

      return { ...state, mockDetail: newMock };
    },

    setMockDetail: (state, { payload }) => {
      state.mockDetail = payload;
    },
    setQuestionList: (state, { payload }) => {
      state.mockDetail.sections = payload;
    },
    setMockExamTips: (state = initialState, { payload }) => {
      return { ...state, examTips: payload.data };
    },
    resetState: () => initialState,
    editMock: (state = initialState, { payload }) => {
      const [index, updatedMockData] = payload;
      state.mockList = state.mockList.map((item, i) =>
        i === index ? updatedMockData : item
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCase, (state, action) => {
      const indexToDelete = action.payload;
      state.mockList.splice(indexToDelete, 1);
    });
  },
});

export const {
  addMock,
  createNewMock,
  setMockDetail,
  editMock,
  setMockExamTips,
  resetState,
  setQuestionList,
} = mockSlice.actions;

export default mockSlice.reducer;

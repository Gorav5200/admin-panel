import { createSlice } from "@reduxjs/toolkit";
// import { setActiveView } from "../commonActions";

const initialState = {
  moduleDetails: {
    title: "",
    entityType: "",
    subject: [],
    entity: "",
    description:"",
  },
  assignments: [],
  mockPackages: [],
  pastPapers: [],
  learn: [],
  practiceQa: [],
  activeView:"details",
  dailyQuiz:[]
};

export const addModule = createSlice({
  name: "addModule",
  initialState,
  reducers: {
    setModuleDetails: (state, { payload }) => {
      state.moduleDetails = payload;
    },
    setLearn: (state, { payload }) => {
      state.learn = payload;
    },
    setAssignments: (state, { payload }) => {
      state.assignments = payload;
    },
    setMockTests: (state, { payload }) => {
      state.mockPackages = payload;
    },
    setPastPapers: (state, { payload }) => {
      state.pastPapers = payload;
    },
    setPracticeQa: (state, { payload }) => {
      state.practiceQa = payload;
    },
    setActiveView: (state, { payload }) => {
      state.activeView = payload;
    },
    setDailyQuiz: (state, { payload }) => {
      state.dailyQuiz = payload;
    },
    resetAddModule: () => initialState,
  },
});

export const {
  setModuleDetails,
  setAssignments,
  setMockTests,
  setPastPapers,
  setPracticeQa,
  setActiveView,
  setDailyQuiz,
  resetAddModule,
  setLearn
} = addModule.actions;

export default addModule.reducer;

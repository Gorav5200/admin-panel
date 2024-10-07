import { createSlice } from "@reduxjs/toolkit";
// import { setActiveView } from "../commonActions";

const initialState = {
  viewDetails: {},
  createSpecificaton: {
    examDetail: {},
    syllabus: {},
    examTips: "",
    topColleges: {},
    eligibility: "",
    importantNews:[]
  },
  activeView: 0,
};

export const specificationSlice = createSlice({
  name: "specificationSlice",
  initialState,
  reducers: {
    viewSpecification: (state = initialState, { payload }) => {
      return {
        ...state,
        viewDetails: payload,
      };
    },
    setExamDetail: (initialState, { payload }) => {
      initialState.createSpecificaton.examDetail = payload;
    },
    setSyllabus: (initialState, { payload }) => {
      initialState.createSpecificaton.syllabus = payload;
    },
    setExamTips: (initialState, { payload }) => {
      initialState.createSpecificaton.examTips = payload;
    },
    setTopColleges: (initialState, { payload }) => {
      initialState.createSpecificaton.topColleges = payload;
    },
    setEligibility: (initialState, { payload }) => {
      initialState.createSpecificaton.eligibility = payload;
    },
    setImportantNews: (initialState, { payload }) => {
      initialState.createSpecificaton.importantNews = payload;
    },
    setActiveView: (initialState, { payload }) => {
      initialState.activeView = payload;
    },

    resetExamSpecification: () => initialState,

    // extraReducers: (builder) => {
    //   builder.addCase(setActiveView, (initialState, {payload }) =>
    //      initialState.activeView = payload // Corrected the way you update activeView
    //   );
    // },
  },
});

export const {
  viewSpecification,
  createSpecificaton,
  setExamDetail,
  setSyllabus,
  setExamTips,
  setTopColleges,
  setEligibility,
  resetExamSpecification,
  setActiveView,
  setImportantNews
} = specificationSlice.actions;

export default specificationSlice.reducer;

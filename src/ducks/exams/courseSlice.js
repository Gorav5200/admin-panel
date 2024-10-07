import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewDetail: {},
  courseDetail: {
    title: "",
    price: "",
    startDate: null,
    expiryDate: null,
    highlights: "",
    image: "",
    entityTypes: [],
  },
  learn: {
    modules: [],
  },
  learnDetails: "",
  groups: [],
  courseStructure: [],
  whyIquanta: "",
  courseDescription: "",
  courseType:[],
  topFeatures: [{ content: "", image: "" }],
  successStories: [{ content: "", image: "", name: "" }],
  activeView: "details",
  errorStatus: {},
};

export const courseSlice = createSlice({
  name: "courseSlice",
  initialState,
  reducers: {
    setActiveView: (state, { payload }) => {
      state.activeView = payload;
    },

    setViewDetail: (state = initialState, { payload }) => {
      return {
        ...state,
        viewDetail: payload,
      };
    },

    setLinkGroup: (state = initialState, { payload }) => {
      state.groups = payload;
    },

    setCourseDetail: (state = initialState, { payload }) => {
      return {
        ...state,
        courseDetail: payload,
      };
    },

    setcourseStructure: (state = initialState, { payload }) => {
      return {
        ...state,
        courseStructure: payload,
      };
    },
    setCourseDescription: (state = initialState, { payload }) => {
      return {
        ...state,
        courseDescription: payload,
      };
    },

    setWhyIquanta: (state = initialState, { payload }) => {
      return { ...state, whyIquanta: payload };
    },

    setTopFeatures: (state = initialState, { payload }) => {
      return { ...state, topFeatures: payload };
    },
    setSuccessStories: (state = initialState, { payload }) => {
      return { ...state, successStories: payload };
    },

    setModules: (state, { payload }) => {
      state.learn.modules = payload;
    },

    setLearnDetails: (state, { payload }) => {
      state.learnDetails = payload;
    },

    setErrors: (state, { payload }) => {
      state.errorStatus = payload;
    },

    resetCoursesState: () => initialState,
  },
});

export const {
  setActiveView,
  resetCoursesState,
  setViewDetail,
  setCourseDescription,
  setErrors,
  setWhyIquanta,
  setSuccessStories,
  setViewDetails,
  setCourseDetail,
  setLearnDetails,
  setTopFeatures,
  setcourseStructure,
  setLinkGroup,
  setModules,
} = courseSlice.actions;

export default courseSlice.reducer;

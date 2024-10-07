import { createSlice } from "@reduxjs/toolkit";
import { deleteCase } from "../commonActions";

const initialState = {
  classList: [],
  classDoubts: [],
  classDetails: {},
  contextData:[],
  newClass: {
    practice: [],
    concepts: [],
    title: "",
    teacher: "",
    startTime: null,
    endTime: null,
    topic: "",
    subTopics:[],
    startDate: null,
    description: "",
    groups:[],
    goLive:false,
    positiveMarks:"",
    negativeMarks:"",
    eventType:"appClass",
    privacy:"private",
    mode:"online",
    entityType:[],
    

  },
  activeStep:0
};

export const classSlice = createSlice({
  name: "classSlice",
  initialState,
  reducers: {
    setClassList: (state, { payload }) => {
      state.classList = payload;
    },

    setClassDetails: (state, { payload }) => {
      state.classDetails = payload;
    },
    createClass: (state, { payload }) => {
      state.newClass = { ...state.newClass, ...payload };
    },

    createPractice: (state, { payload }) => {
      state.newClass.practice = payload;
    },
    createConcept: (state, { payload }) => {
      state.newClass.concepts = payload;
    },
  
    removePractice: (state, { payload }) => {
      state.newClass.practice = state.newClass.practice.filter(
        (card) => card._id !== payload
      );
    },
    removeConcept: (state, { payload }) => {
      state.newClass.concepts = state.newClass.concepts.filter(
        (card) => card._id !== payload
      );
    },
    setActiveStep: (state, { payload }) => {
       state.activeStep=payload;
    },
    setContextData: (state, { payload }) => {
       state.contextData=payload;
    },

    resetClassState: () => initialState,
  },
});

export const {
  createClass,
  setClassDetails,
  setClassList,
  resetClassState,
  createPractice,
  createConcept,
  removePractice,
  removeConcept,
  addMedia,
  setActiveStep,
  setContextData,
} = classSlice.actions;

export default classSlice.reducer;
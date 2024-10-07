import { createSlice } from "@reduxjs/toolkit";
import { deleteCase } from "../commonActions";

const initialState = {
  subjectList: [],
  subjectDetail: {
    entity_type_id: "",
    subject_id: "",
    topic_id: "",
    subtopic_id: ""
    
  },
};

export const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    createNewSubject: (state, { payload }) => {
      const newSubject = payload;
      state.subjectList.push(newSubject);
      state.subjectDetail = initialState.subjectDetail;
    },

    setSubjectDetail: (state, { payload }) => {
      const index = payload;
      const subjectData = state.subjectList[index];
      state.subjectDetail = { ...subjectData };
    },

    editSubject: (state, { payload }) => {
      const [index, updatedSubjectData] = payload;
      state.subjectList = state.subjectList.map((item, i) =>
        i === index ? updatedSubjectData : item
      );
    },

    addSubject: (state) => {
      state.subjectDetail = initialState.subjectDetail;
    },

    setSubjectList: (state, { payload }) => {
      const subjectList = payload;
      state.subjectList = subjectList;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCase, (state, action) => {
      const indexToDelete = action.payload;
      state.subjectList.splice(indexToDelete, 1);
    });
  },
});

export const { addSubject, createNewSubject, setSubjectDetail, editSubject , setSubjectList } =
subjectSlice.actions;

export default subjectSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { deleteCase } from "./commonActions";

const initialState = {
  groupsList: {},
  teachers: [],
  moderators: [],
  admin:[],
  description: "",
  groupDetails: {},
};



export const groupSlice = createSlice({
  name: "groupSlice",
  initialState,
  reducers: {
    setGroupsList: (state, { payload }) => {
      state.groupsList = payload;
    },
    setDescription: (state, { payload }) => {
      state.description = payload;
    },
    setTeachers: (state, { payload }) => {
      state.teachers = payload;
    },
    setModerators: (state, { payload }) => {
      state.moderators = payload;
    },
    setAdmin: (state, { payload }) => {
      state.admin = payload;
    },
    setGroupDetails: (state, { payload }) => {
      state.groupDetails = payload;
    },
    resetGroupState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCase, (state, action) => {
      const indexToDelete = action.payload;
      state.teachers.splice(indexToDelete, 1);
    });
  },
});




export const {
  setTitle,
  setDescription,
  setTeachers,
  setModerators,
  setGroupDetails,
  setGroupsList,
  resetGroupState,
} = groupSlice.actions;

export default groupSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  examDetails: { examId: "", subjects: [] },
};

export const examSlice = createSlice({
  name: "examSlice",
  initialState,
  reducers: {
    setExamDetail: (state, { payload }) => {
      state.examDetails = payload;
    },
  },
});

export const { setExamDetail } = examSlice.actions;

export default examSlice.reducer;

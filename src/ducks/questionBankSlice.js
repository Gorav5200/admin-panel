import { createSlice } from "@reduxjs/toolkit";
import { deleteCase } from "./commonActions";

const initialState = {
  questionList: [],
  questionDetail: {
    qid: "1234",
    uid: "",
    entity_type_id: "",
    subject_id: "",
    topic_id: "",
    subtopic_id: [],
    difficulty_level: "",
    question: null,
    answer: null,
    options: [],
    explanations: "",
    video_link: "",
    video_data: "",
    allowed_for: [],
    marks: "",
    question_type: "",
    check: false,
    context: "",
  },
  searchData: { searchValue: "", selectedChips: [], queryParams: "" },
};

export const questionBankSlice = createSlice({
  name: "questionBank",
  initialState,
  reducers: {
    createNewQuestion: (state, { payload }) => {
      const newQuestion = payload;
      state.questionList.push(newQuestion);
      state.questionDetail = initialState.questionDetail;
    },

    setQuestionDetail: (state, { payload }) => {
      const index = payload;
      const questionData = state.questionList[index];
      state.questionDetail = { ...questionData };
    },

    editQuestion: (state, { payload }) => {
      const [index, updatedQuestionData] = payload;
      state.questionList = state.questionList.map((item, i) =>
        i === index ? updatedQuestionData : item
      );
    },

    addQuestion: (state, { payload }) => {
      state.questionDetail = payload;
    },

    editQuestion: (state, { payload }) => {
      const [index, updatedQuestionData] = payload;
      state.questionList = state.questionList.map((item, i) =>
        i === index ? updatedQuestionData : item
      );
    },
    setSearchData: (state, { payload }) => {
      state.searchData = payload;
    },
    setQuestionList: (state, { payload }) => {
      state.questionList = payload;
    },
    resetQuestionBank: (state, { payload }) => {
      //alert("resetQB");
      state.questionList = [];
      state.questionDetail = initialState.questionDetail;
      state.searchData = initialState.searchData;
    },
    resetQuestionList: (state, { payload }) => {
      //alert("question list");
      state.questionList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCase, (state, action) => {
      const indexToDelete = action.payload;
      state.questionList.splice(indexToDelete, 1);
    });
  },
});

export const {
  addQuestion,
  createNewQuestion,
  setQuestionDetail,
  editQuestion,
  setSearchData,
  setQuestionList,
  resetQuestionBank,
  resetQuestionList,
} = questionBankSlice.actions;

export default questionBankSlice.reducer;

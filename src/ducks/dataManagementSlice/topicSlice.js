import { createSlice } from "@reduxjs/toolkit";
import { deleteCase } from "../commonActions";

const initialState = {
  topicList: [],
  topicDetail: {
    
    entity_type_id: "",
    subject_id: "",
    topic_id: "",
    subtopic_id: ""
    
  },
};

export const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    createNewTopic: (state, { payload }) => {
      const newTopic = payload;
      state.topicList.push(newTopic);
      state.topicDetail = initialState.topicDetail;
    },

    setTopicDetail: (state, { payload }) => {
      const index = payload;
      const topicData = state.topicList[index];
      state.topicDetail = { ...topicData };
    },

    editTopic: (state, { payload }) => {
      const [index, updatedTopicData] = payload;
      state.topicList = state.topicList.map((item, i) =>
        i === index ? updatedTopicData : item
      );
    },

    addTopic: (state) => {
      state.topicDetail = initialState.topicDetail;
    },

    editTopic: (state, { payload }) => {
      const [index, updatedTopicData] = payload;
      state.topicList = state.topicList.map((item, i) =>
        i === index ? updatedTopicData : item
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCase, (state, action) => {
      const indexToDelete = action.payload;
      state.topicList.splice(indexToDelete, 1);
    });
  },
});

export const { addTopic, createNewTopic, setTopicDetail, editTopic } =
topicSlice.actions;

export default topicSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { deleteCase } from "../commonActions";

const initialState = {
  subTopicList: [],
  subTopicDetail: {
    
    entity_type_id: "",
    subject_id: "",
    topic_id: "",
    subTopic_id: ""
    
  },
};

export const subTopicSlice = createSlice({
  name: "subTopic",
  initialState,
  reducers: {
    createNewSubTopic: (state, { payload }) => {
      const newSubTopic = payload;
      state.subTopicList.push(newSubTopic);
      state.subTopicDetail = initialState.subTopicDetail;
    },

    setSubTopicDetail: (state, { payload }) => {
      const index = payload;
      const subTopicData = state.subTopicList[index];
      state.subTopicDetail = { ...subTopicData };
    },

    editSubTopic: (state, { payload }) => {
      const [index, updatedSubTopicData] = payload;
      state.subTopicList = state.subTopicList.map((item, i) =>
        i === index ? updatedSubTopicData : item
      );
    },

    addSubTopic: (state) => {
      state.subTopicDetail = initialState.subTopicDetail;
    },

    editSubTopic: (state, { payload }) => {
      const [index, updatedSubTopicData] = payload;
      state.subTopicList = state.subTopicList.map((item, i) =>
        i === index ? updatedSubTopicData : item
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCase, (state, action) => {
      const indexToDelete = action.payload;
      state.subTopicList.splice(indexToDelete, 1);
    });
  },
});

export const { addSubTopic, createNewSubTopic, setSubTopicDetail, editSubTopic } =
subTopicSlice.actions;

export default subTopicSlice.reducer;

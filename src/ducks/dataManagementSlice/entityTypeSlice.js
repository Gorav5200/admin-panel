import { createSlice } from "@reduxjs/toolkit";
import { deleteCase } from "../commonActions";

const initialState = {
  entityTypeList: [],
  entityTypeDetail: {
    
    entity_type_id: ""
    
    
  },
};

export const entityTypeSlice = createSlice({
  name: "entityType",
  initialState,
  reducers: {
    createNewEntityType: (state, { payload }) => {
      const newEntityType = payload;
      state.entityTypeList.push(newEntityType);
      state.entityTypeDetail = initialState.entityTypeDetail;
    },

    setEntityTypeDetail: (state, { payload }) => {
      const index = payload;
      const entityTypeData = state.entityTypeList[index];
      state.entityTypeDetail = { ...entityTypeData };
    },

    editEntityType: (state, { payload }) => {
      const [index, updatedEntityData] = payload;
      state.entityList = state.entityList?.map((item, i) =>
        i === index ? updatedEntityData : item
      );
    },

    addEntityType: (state) => {
      state.entityTypeDetail = initialState.entityTypeDetail;
    },

    editEntityType: (state, { payload }) => {
      const [index, updatedEntityTypeData] = payload;
      state.entityTypeList = state.entityTypeList.map((item, i) =>
        i === index ? updatedEntityTypeData : item
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCase, (state, action) => {
      const indexToDelete = action.payload;
      state.entityTypeList.splice(indexToDelete, 1);
    });
  },
});

export const { addEntityType, createNewEntityType, setEntityTypeDetail, editEntityType } =
entityTypeSlice.actions;

export default entityTypeSlice.reducer;

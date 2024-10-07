import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entityList: [],
  entityDetail: {
    entity_type_id: "",
  },
  entity: [],
};

export const entitySlice = createSlice({
  name: "entitySlice",
  initialState,
  reducers: {
    createNewEntity: (state, { payload }) => {
      const newEntity = payload;
      state.entityList.push(newEntity);
      state.entityDetail = initialState.entityDetail;
    },

    setEntityDetail: (state, { payload }) => {
      const index = payload;
      const entityData = state.entityList[index];
      state.entityDetail = { ...entityData };
    },

    editEntity: (state, { payload }) => {
      const [index, updatedEntityData] = payload;
      state.entityList = state.entityList.map((item, i) =>
        i === index ? updatedEntityData : item
      );
    },

    addEntity: (state) => {
      state.entityDetail = initialState.entityDetail;
    },

    editEntity: (state, { payload }) => {
      const [index, updatedEntityData] = payload;
      state.entityList = state.entityList.map((item, i) =>
        i === index ? updatedEntityData : item
      );
    },
    setEntity: (state, { payload }) => {
      state.entity = payload;
    },
  },
});


export const {
  addEntity,
  createNewEntity,
  setEntityDetail,
  editEntity,
  setEntity,
} = entitySlice.actions;

export default entitySlice.reducer;

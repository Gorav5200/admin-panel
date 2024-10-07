import { createSlice } from "@reduxjs/toolkit";
import { deleteCase } from "./commonActions";

const initialState = {
   selectedQuestionsList:[],
   mockDetail:{},
   examTips:{}
  }


export const examSlice = createSlice({
  name: "mocks",
  initialState,
  reducers: {
    createNewMock: (state=initialState, { payload }) => {
      const newMock = payload;
      //state.questionList.push(newQuestion);
      return {...state,mockDetail:newMock}
      
    },

    setMockDetail: (state=initialState, {payload}) => {
      // const index = payload.sindex;
      // const questions = payload.questions;
      //const mockData = state.mockList[index];
      //state.mockDetail.sections.splice(1,payload.sindex,payload.obj)
      //console.log("24",payload);
     
      return {...state,
           selectedQuestionsList:  [...state.selectedQuestionsList,payload.data]
          }
     // state.selectedQuestionsList =  {...state, selectedQuestionsList:[JSON.parse(...state.selectedQuestionsList),payload.data] }
      
    },
   
    setMockExamTips: (state=initialState, {payload}) => {
      
      return {...state,
           examTips:  payload.data
          }

    },
    resetState: () => initialState,
    editMock: (state, { payload }) => {
      const [index, updatedMockData] = payload;
      state.mockList = state.mockList.map((item, i) =>
        i === index ? updatedMockData : item
      );
    },

   
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCase, (state, action) => {
      const indexToDelete = action.payload;
      state.mockList.splice(indexToDelete, 1);
    });
  },
});

export const { resetState} =
examSlice.actions;

export default examSlice.reducer;
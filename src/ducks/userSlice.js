import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  userDetail: {
    profilePic: "",
    name: "",
    email: "",
    phone: "",
    dob: null,
    gender: null,
    languages: "",
    roles:[],
    exam: [],
  },
  userInfo:{}
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createNewUser: (state, { payload }) => {
      const newQuestion = payload;
      state.userList.push(newQuestion);
      state.userDetail = initialState.questionDetail;
    },

    setAddUser: (state, { payload }) => {
      state.userDetail =payload;
    },
    setUserInfo:(state,{payload})=>{
      state.userInfo =payload;
    },

    resetUser:()=>initialState
  },
});

export const  userDetail=(state)=>state.users.userInfo
export const { setAddUser, createNewUser,resetUser,setUserInfo} = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskDetail: {
    title: null,
    activities: [],
  },
  dailyStreakTaskDetail: {
    title: null,
    activities: [],
    description: null,
    taskId: "",
    rewardId: [],
    date: null,
  },
  taskList: [],
  rewardsList: [],
  activityList: [],
};

export const dailyStreakSlice = createSlice({
  name: "dailyStreakSlice",
  initialState,
  reducers: {
    setTaskDetail: (state, { payload }) => {
      state.taskDetail = payload;
    },
    setDailyStreakTaskDetail: (state, { payload }) => {
      state.dailyStreakTaskDetail = payload;
    },
    setTaskList: (state, { payload }) => {
      state.taskList = payload;
    },

    setRewardList: (state, { payload }) => {
      state.rewardsList = payload;
    },

    setActivityList: (state, { payload }) => {
      state.activityList = payload;
    },

    resetDailyStreak: () => initialState,
  },
});

export const {
  resetDailyStreak,
  setTaskList,
  setActivityList,
  setRewardList,
  setTaskDetail,
  setDailyStreakTaskDetail,
} = dailyStreakSlice.actions;

export default dailyStreakSlice.reducer;

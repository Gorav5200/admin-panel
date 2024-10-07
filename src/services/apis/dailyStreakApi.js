// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const dailyStreakApi = createApi({
  reducerPath: "dailyStreakApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
     
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getTaskList"],
  endpoints: (builder) => ({
    getTaskList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getTaskList"],
    }),

    getList: builder.query({
      query: (endpoint) => `${endpoint}`,
      
    }),
  

    getDailyStreakTask: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getDailyStreakTask"],
    }),


    getDailyStreakReward: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getDailyStreakTask"],
    }),

    create: builder.mutation({
      query: ({ endpoint,data }) => {
        return {
          url: endpoint,
          method: "POST",
          body: data,
          
        };
      },
      invalidatesTags: ["getDailyQuiz"],
    }),

    update: builder.mutation({
      query: ({ endpoint,updatedData }) => {
        return {
          url: endpoint,
          method: "PATCH",
          body: updatedData,
          
        };
      },
      invalidatesTags: ["getDailyQuiz"],
    }),


    // updateDailyQuiz: builder.mutation({
    //   query: ({ endpoint,updatedData }) => {
    //     return {
    //       url: endpoint,
    //       method: "PATCH",
    //       body: updatedData,
          
    //     };
    //   },
    //   invalidatesTags: ["getDailyQuiz"],
    // }),
    
  
    

 }),
});

export const {useGetDailyStreakRewardQuery,useGetDailyStreakTaskQuery,useGetTaskListQuery,useCreateMutation,useUpdateMutation,useGetListQuery} = dailyStreakApi;

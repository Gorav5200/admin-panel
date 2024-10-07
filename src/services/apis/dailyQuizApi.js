// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dailyQuizApi = createApi({
  reducerPath: "dailyQuizApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getDailyQuiz","getDailyQuizPackage"],
  endpoints: (builder) => ({
    getDailyQuiz: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getDailyQuiz"],
    }),

    getDailyQuizPackage: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getDailyQuizPackage"],
    }),

    createDailyQuiz: builder.mutation({
      query: ({ endpoint,data }) => {
        return {
          url: endpoint,
          method: "POST",
          body: data,
          
        };
      },
      invalidatesTags: ["getDailyQuiz"],
    }),
    updateDailyQuiz: builder.mutation({
      query: ({ endpoint,updatedData }) => {
        return {
          url: endpoint,
          method: "PATCH",
          body: updatedData,
          
        };
      },
      invalidatesTags: ["getDailyQuiz"],
    }),
    
  
    

 }),
});

export const {useGetDailyQuizQuery,useGetDailyQuizPackageQuery,useCreateDailyQuizMutation,useUpdateDailyQuizMutation} = dailyQuizApi;

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  //baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getQuestionList","questionDetail"],
  endpoints: (builder) => ({
    getQuestionList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getQuestionList"],
    }),

    getSingleQuestion: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags:["questionDetail"]
    }),
    getListData: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),

    getEntityList: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),

    deleteQuestion: builder.mutation({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getQuestionList"],
    }),

    addQuestion: builder.mutation({
      query: ({ endpoint, newUser }) => ({
        url: endpoint,
        method: "POST",
        body: newUser,
        formData: true
      }),
      invalidatesTags: ["getQuestionList"],
    }),

    updateQuestion: builder.mutation({
      query: ({ endpoint, updateQuestion }) => ({
        url: endpoint,
        method: "PATCH",
        body: updateQuestion,
      }),
      invalidatesTags: ["questionDetail"],
    }),
   
  }),
});

export const {
  useGetQuestionListQuery,
  useLazyGetQuestionListQuery,
  useGetSingleQuestionQuery,
  useDeleteQuestionMutation,
  useAddQuestionMutation,
  useUpdateQuestionMutation,
  useGetListDataQuery,
  useGetEntityListQuery
} = questionApi;

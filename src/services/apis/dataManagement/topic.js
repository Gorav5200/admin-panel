// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const topicApi = createApi({
  reducerPath: "topicApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getTopicList"],
  endpoints: (builder) => ({
    getTopicList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getTopicList"],
    }),

    getSingleTopic: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),
    getListData: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),

    getEntityList: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),

    deleteTopic: builder.mutation({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getTopicList"],
    }),

    addTopic: builder.mutation({
      query: ({ endpoint, newTopic }) => ({
        url: endpoint,
        method: "POST",
        body: newTopic,
      }),
      invalidatesTags: ["getTopicList"],
    }),

    updateTopic: builder.mutation({
      query: ({ endpoint, updateTopic }) => ({
        url: endpoint,
        method: "PATCH",
        body:updateTopic,
      }),
      invalidatesTags: ["getTopicList"],
    }),
   
  }),
});

export const {
  useGetTopicListQuery,
  useGetSingleTopicQuery,
  useDeleteTopicMutation,
  useAddTopicMutation,
  useUpdateTopicMutation,
  useGetListDataQuery,
  useGetEntityListQuery
} = topicApi;

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const subTopicApi = createApi({
  reducerPath: "subTopicApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getSubTopicList"],
  endpoints: (builder) => ({
    getSubTopicList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getSubTopicList"],
    }),

    getSingleSubTopic: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),
    getListData: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),

    deleteSubTopic: builder.mutation({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "DELETE",
      }),
      invalidatesTags: ({ success }) => {
        if (success) {
          return ["getSubTopicList"];
        }
      },
    }),

    addSubTopic: builder.mutation({
      query: ({ endpoint, newSubTopic }) => ({
        url: endpoint,
        method: "POST",
        body: newSubTopic,
      }),
      invalidatesTags: ({ success }) => {
        if (success) {
          return ["getSubTopicList"];
        }
      },
    }),

    updateSubTopic: builder.mutation({
      query: ({ endpoint, updateSubTopic }) => ({
        url: endpoint,
        method: "PATCH",
        body: updateSubTopic,
      }),
      invalidatesTags: ({ success }) => {
        if (success) {
          return ["getSubTopicList"];
        }
      },
    }),
  }),
});

export const {
  useGetSubTopicListQuery,
  useGetSingleSubTopicQuery,
  useDeleteSubTopicMutation,
  useAddSubTopicMutation,
  useUpdateSubTopicMutation,
  useGetListDataQuery,
} = subTopicApi;

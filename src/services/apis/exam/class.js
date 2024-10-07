// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const classApi = createApi({
  reducerPath: "classApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  //baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getClassList", "classDetail", "classDoubts", "getCalenderList"],
  endpoints: (builder) => ({
    getClassList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getClassList"],
    }),
    getCalenderList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getCalenderList"],
    }),
    getCalenderDetail: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getCalenderList"],
    }),
    getClassDoubts: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["classDoubts"],
    }),

    getMembers: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),

    getClassDetail: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["classDetail"],
    }),

    deleteContext: builder.mutation({
      query: ({ endpoint }) => ({
        url: endpoint,
        method: "DELETE",
      }),
    }),

    linkClass: builder.mutation({
      query: ({ endpoint, updatedData }) => ({
        url: endpoint,
        method: "POST",
        body: updatedData,
      }),
      invalidatesTags: ["getClassList"],
    }),

    updateClass: builder.mutation({
      query: ({ endpoint, updatedData }) => ({
        url: endpoint,
        method: "PATCH",
        body: updatedData,
        headers: {
          "content-type": "application/json",
        },
      }),
      invalidatesTags: ["classDetail"],
    }),

    createClass: builder.mutation({
      query: ({ endpoint, newClass }) => ({
        url: endpoint,
        method: "POST",
        body: newClass,
      }),
      invalidatesTags: ["getClassList"],
    }),

    createConcept: builder.mutation({
      query: ({ endpoint, newData }) => ({
        url: endpoint,
        method: "POST",
        body: newData,
      }),
    }),
    createPractice: builder.mutation({
      query: ({ endpoint, newData }) => ({
        url: endpoint,
        method: "POST",
        body: newData,
      }),
    }),
    updateContext: builder.mutation({
      query: ({ endpoint, updatedData }) => ({
        url: endpoint,
        method: "PATCH",
        body: updatedData,
        headers: {
          "content-type": "application/json",
        },
      }),
      // invalidatesTags: ["classDetail"],
    }),
  }),
});

export const {
  useGetClassListQuery,
  useGetClassDetailQuery,
  useLazyGetClassDetailQuery,
  useLinkClassMutation,
  useCreateClassMutation,
  useUpdateClassMutation,
  useGetMembersQuery,
  useGetClassDoubtsQuery,
  useCreateConceptMutation,
  useCreatePracticeMutation,
  useDeleteContextMutation,
  useUpdateContextMutation,
  useGetCalenderListQuery,
  useLazyGetCalenderDetailQuery,
} = classApi;
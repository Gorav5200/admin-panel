// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Define a service using a base URL and expected endpoints
export const subjectApi = createApi({
  reducerPath: "subjectApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getSubjectList"],
  endpoints: (builder) => ({
    getSubjectList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getSubjectList"],
    }),
    getSubject: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getSubjectList"],
    }),

    getSingleSubject: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),
    getListData: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),

    getEntityList: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),

    deleteSubject: builder.mutation({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getSubjectList"],
    }),

    addSubject: builder.mutation({
      query: ({ endpoint, newSubject }) => ({
        url: endpoint,
        method: "POST",
        body: newSubject,
      }),
      invalidatesTags: ["getSubjectList"],
    }),

    updateSubject: builder.mutation({
      query: ({ endpoint, updateSubject }) => ({
        url: endpoint,
        method: "PATCH",
        body: updateSubject,
      }),
      invalidatesTags:(result)=>{
        if(result?.success){
          return  ["getSubjectList"]
        }
      },
    }),
   
  }),
});

export const {
useLazyGetSubjectQuery,
  useGetSubjectListQuery,

  useLazyGetSubjectListQuery,
  useGetSingleSubjectQuery,
  useDeleteSubjectMutation,
  useAddSubjectMutation,
  useUpdateSubjectMutation,
  useGetListDataQuery,
  useGetEntityListQuery
} = subjectApi;

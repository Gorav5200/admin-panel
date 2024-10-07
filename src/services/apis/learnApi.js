// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const learnApi = createApi({
  reducerPath: "learnApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getLearnList","getLearnPackage"],
  endpoints: (builder) => ({
    getLearnList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getLearnList"],
    }),
    getLearnPackage: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getLearnPackage"],
    }),
    getLearnPackageDetail: builder.query({
      query: (endpoint) => `${endpoint}`,
      
    }),

    createPackage: builder.mutation({
      query: ({ endpoint, newPackage }) => {
        return {
          url: endpoint,
          method: "POST",
          body: newPackage,
          
        };
      },
      invalidatesTags: [],
    }),

    updatePackage: builder.mutation({
      query: ({ endpoint, updatedData }) => {
        return {
          url: endpoint,
          method: "PATCH",
          body: updatedData,
          
        };
      },
      invalidatesTags: [],
    }),

    updateLearnTopic: builder.mutation({
      query: ({ endpoint, updatedData }) => {
        return {
          url: endpoint,
          method: "PATCH",
          body: updatedData,
          
        };
      },
      invalidatesTags: [],
    }),

    createLearnTopic: builder.mutation({
      query: ({ endpoint,newLearn }) => {
        return {
          url: endpoint,
          method: "POST",
          body: newLearn,
          
        };
      },
      invalidatesTags: [],
    }),
  }),
});

export const {
 useGetLearnListQuery,
 useCreatePackageMutation,
 useGetLearnPackageQuery,
 useCreateLearnTopicMutation,
 useUpdatePackageMutation,
 useGetLearnPackageDetailQuery,
 useUpdateLearnTopicMutation,
} = learnApi;

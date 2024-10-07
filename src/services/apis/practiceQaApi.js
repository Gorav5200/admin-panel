// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const practiceQaApi = createApi({
  reducerPath: "practiceQaApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getPracticeQa","getPackage"],
  endpoints: (builder) => ({
    getPracticeQa: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getPracticeQa"],
    }),

    getPracticeQaPackage: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getPackage"],
    }),

    createPracticeQa: builder.mutation({
      query: ({ endpoint, data }) => {
        return {
          url: endpoint,
          method: "POST",
          body: data,
          
        };
      },
      invalidatesTags: ["getPracticeQa"],
    }),
    updatePracticeQa: builder.mutation({
      query: ({ endpoint, updatedData }) => {
        return {
          url: endpoint,
          method: "PATCH",
          body: updatedData,
          
        };
      },
      invalidatesTags: [],
    }),

    createPackage: builder.mutation({
      query: ({ endpoint,data }) => {
        return {
          url: endpoint,
          method: "POST",
          body: data,
          
        };
      },
      invalidatesTags: [],
    }),
  }),
});

export const {useGetPracticeQaQuery,useGetPracticeQaPackageQuery,useCreatePackageMutation,useCreatePracticeQaMutation,useUpdatePracticeQaMutation} = practiceQaApi;

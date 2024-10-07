// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pastPaperApi = createApi({
  reducerPath: "pastPaperApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getPastPaper","getPackage"],
  endpoints: (builder) => ({
    getPastPaper: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getPastPaper"],
    }),
    getPastPaperPackage: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getPackage"],
    }),

    createPackage: builder.mutation({
      query: ({ endpoint, newPackage }) => {
        return {
          url: endpoint,
          method: "POST",
          body: newPackage,
          
        };
      },
      invalidatesTags: ["getPackage"],
    }),

    createPastPaper: builder.mutation({
      query: ({ endpoint,data }) => {
        return {
          url: endpoint,
          method: "POST",
          body: data,
          
        };
      },
      invalidatesTags: ["getPastPaper"],
    }),
    updatePastPaper: builder.mutation({
      query: ({ endpoint,updatedData }) => {
        return {
          url: endpoint,
          method: "PATCH",
          body: updatedData,
          
        };
      },
      invalidatesTags: ["getPastPaper"],
    }),
  }),
});

export const {useGetPastPaperPackageQuery,useGetPastPaperQuery,useCreatePackageMutation,useCreatePastPaperMutation,useUpdatePastPaperMutation} = pastPaperApi;

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const termsApi = createApi({
  reducerPath: "termsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getTermsList"],
  endpoints: (builder) => ({
    getTermsList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getTermsList"],
    }),

    getSingleTerms: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),
    getListData: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),

    getEntityList: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),

    deleteTerms: builder.mutation({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getTermsList"],
    }),

    addTerms: builder.mutation({
      query: ({ endpoint, data }) => ({
        url: endpoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getTermsList"],
    }),

    updateTerms: builder.mutation({
      query: ({ endpoint, updateTopic }) => ({
        url: endpoint,
        method: "PATCH",
        body: JSON.stringify(updateTopic),
      }),
      invalidatesTags: ["getTermsList"],
    }),
  }),
});

export const {
  useGetTermsListQuery,
  useGetSingleTermsQuery,
  useDeleteTermsMutation,
  useAddTermsMutation,
  useUpdateTermsMutation,
  useGetListDataQuery,
  useGetEntityListQuery,
} = termsApi;

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const percentileApi = createApi({
  reducerPath: "percentileApi",
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
 baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getPercentileApiList"],
  endpoints: (builder) => ({
    getPercentileList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getPercentileApiList"],
    }),

    getSinglePercentile: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),
    getListData: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),

    getEntityList: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),

    deletePercentile: builder.mutation({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getPercentileList"],
    }),

    addPercentile: builder.mutation({
      query: ({ endpoint, newTopic }) => ({
        url: endpoint,
        method: "POST",
        body: newTopic,
        // headers: {
        //   'Content-Type': `multipart/form-data`,
        // },
      }),
      invalidatesTags: ["getPercentileList"],
    }),

    updatePercentile: builder.mutation({
      query: ({ endpoint, updateTopic }) => ({
        url: endpoint,
        method: "PATCH",
        body: JSON.stringify(updateTopic),
      }),
      invalidatesTags: ["getPercentileList"],
    }),
   
  }),
});

export const {
  useGetPercentileListQuery,
  useGetSinglePercentileQuery,
  useDeletePercentileMutation,
  useAddPercentileMutation,
  useUpdatePercentileMutation,
  useGetListDataQuery,
  useGetEntityListQuery
} = percentileApi;

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const instructionsApi = createApi({
  reducerPath: "instructionsApi",
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getInstructionsList"],
  endpoints: (builder) => ({
    getInstructionsList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getInstructionsList"],
    }),

    getSingleInstructions: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),
    getListData: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),

    getEntityList: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),

    deleteInstructions: builder.mutation({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getInstructionsList"],
    }),

    addInstructions: builder.mutation({
      query: ({ endpoint, data }) => ({
        url: endpoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getInstructionsList"],
    }),

    updateInstructions: builder.mutation({
      query: ({ endpoint, data }) => ({
        url: endpoint,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["getInstructionsList"],
    }),
  }),
});

export const {
  useGetInstructionsListQuery,
  useGetSingleInstructionsQuery,
  useDeleteInstructionsMutation,
  useAddInstructionsMutation,
  useUpdateInstructionsMutation,
  useGetListDataQuery,
  useGetEntityListQuery,
} = instructionsApi;

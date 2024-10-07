// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const entityApi = createApi({
  reducerPath: "entityApi",
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["Entity"],
  endpoints: (builder) => ({
    getEntityList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["Entity"],
    }),

    getSingleEntity: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),
    getListData: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),

    getEntityList: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),

    deleteEntity: builder.mutation({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Entity"],
    }),

    addEntity: builder.mutation({
      query: ({ endpoint, newEntity }) => ({
        url: `${endpoint}`,
        method: "POST",
        body: newEntity
      }),
      invalidatesTags: ["Entity"],
    }),

    updateEntity: builder.mutation({
      query: ({ endpoint, updateEntity }) => ({
        url: `${endpoint}`,
        method: "PATCH",
        body:updateEntity,
      }),
      invalidatesTags: ["Entity"],
    }),
   
  }),
});

export const {
  useGetSingleEntityQuery,
  useDeleteEntityMutation,
  useAddEntityMutation,
  useUpdateEntityMutation,
  useGetListDataQuery,
  useGetEntityListQuery
} = entityApi;

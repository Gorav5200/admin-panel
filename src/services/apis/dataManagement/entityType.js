// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const entityTypeApi = createApi({
  reducerPath: "entityType",
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["EntityType"],
  endpoints: (builder) => ({
    getEntityTypeList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["EntityType"],
    }),

    getSingleEntityType: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),
   
   
    getEntitySubCategory: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),
    

    deleteEntity: builder.mutation({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EntityType"],
    }),

    addEntityType: builder.mutation({
      query: ({ endpoint, newEntityType }) => ({
        url: endpoint,
        method: "POST",
        body: newEntityType,
      }),
      invalidatesTags: ["EntityType"],
    }),
    addEntity: builder.mutation({
      query: ({ endpoint, data }) => ({
        url: endpoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["EntityType"],
    }),

    updateEntity: builder.mutation({
      query: ({ endpoint, updateEntityType }) => ({
        url: endpoint,
        method: "PATCH",
        body: JSON.stringify(updateEntityType),
      }),
      invalidatesTags: ["EntityType"],
    }),
   
  }),
});

export const {
  useGetSingleEntityTypeQuery,
  useDeleteEntityTypeMutation,
  useAddEntityTypeMutation,
 useUpdateEntityMutation,
  useGetEntityTypeListQuery,
  useGetEntitySubCategoryQuery,
  useAddEntityMutation,
} = entityTypeApi;

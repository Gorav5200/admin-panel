  // Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const specificationApi = createApi({
  reducerPath: "specificationApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getSpecification","specificationDetail"],
  endpoints: (builder) => ({
    getSpecification: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getSpecification"],
    }),

    getSpecificationById: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["courseDetail"],
    }),
    
    updateSpecification: builder.mutation({
      query: ({ endpoint, updatedData }) => ({
        url: endpoint,
        method: "PATCH",
        body:updatedData,
        headers: {
          'content-type': 'application/json',
      },
      }),
      invalidatesTags: ["courseDetail"],
    }),


    createSpecification: builder.mutation({
      query: ({ endpoint, data }) => ({
        url: endpoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getSpecification"],
    }),

 

  }),
});

export const {
useCreateSpecificationMutation,useGetSpecificationQuery,useGetSpecificationByIdQuery,useUpdateSpecificationMutation
} = specificationApi;
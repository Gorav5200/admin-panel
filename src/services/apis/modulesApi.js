// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const modulesApi = createApi({
  reducerPath: "modulesApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  //baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getModules","getLearnPackage"],
  endpoints: (builder) => ({
    getModules: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getModules"],
    }),
    getModulesbyId: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getModules"],
    }),

    createModule: builder.mutation({
      query: ({ endpoint, data }) => {
        return {
          url: endpoint,
          method: "POST",
          body: data,
          
        };
      },
      invalidatesTags: [],
    }),

    updateModule: builder.mutation({
      query: ({ endpoint, updatedData }) => {
        return {
          url: endpoint,
          method: "PATCH",
          body: updatedData,
          
        };
      },
      invalidatesTags: [],
    }),


   
  }),
});

export const {
useGetModulesQuery,useGetModulesbyIdQuery,useCreateModuleMutation,useUpdateModuleMutation
} = modulesApi;

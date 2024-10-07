// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const mocksApi = createApi({
  reducerPath: "mocks",
  //baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getMockList","mockDetail"],
  endpoints: (builder) => ({
    getMockList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getMockList"],
    }),
   createMock: builder.mutation({
      query: ({ endpoint, data }) => ({
        url: endpoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getMockList"],
    }),

    updateMock: builder.mutation({
      query: ({ endpoint, updatedData }) => ({
        url: endpoint,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["mockDetail"],
    }),


    getMockTest: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getMockList"],
    }),

    
    getMockPackages: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getMockPackage"],
    }),

   
    
    getMockTestDetail: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["mockDetail"],
    }),
    

    addMockPackage: builder.mutation({
      query: ({ endpoint, newPackage }) => ({
        url: endpoint,
        method: "POST",
        body: newPackage,
      }),
      invalidatesTags: ["getMockPackage"],
    }),

    editMockPackage: builder.mutation({
      query: ({ endpoint, newPackage }) => ({
        url: endpoint,
        method: "PATCH",
        body: newPackage,
      }),
      invalidatesTags: ["getMockPackage"],
    }),


   
  }),
});

export const {
  useGetMockListQuery,
  useLazyGetMockListQuery,
  useCreateMockMutation,
  useUpdateMockMutation,
  useGetMockPackagesQuery,
  useAddMockPackageMutation,
  useGetMockTestQuery,
  useGetMockTestDetailQuery,
  useEditMockPackageMutation,
} = mocksApi;

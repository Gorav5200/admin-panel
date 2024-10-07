// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commonApi = createApi({
  reducerPath: "commonApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getNotes", "getVideo", "getGroups", "getTeachers", "getProducts"],
  endpoints: (builder) => ({
    fetchNotes: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getNotes"],
    }),
    getVideo: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getVideo"],
    }),
    getTeachers: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getTeachers"],
    }),

    getProducts: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getProducts"],
    }),
    getData: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),
    handlePatchRequest: builder.mutation({
      query: ({ endpoint, data }) => {
        return {
          url: endpoint,
          method: "PATCH",
          body: data,
        };
      },
  
    }),
  }),
});

export const {
  useFetchNotesQuery,
  useGetVideoQuery,
  useGetTeachersQuery,
  useGetProductsQuery,
  useGetDataQuery,
  useLazyGetVideoQuery,
  useLazyFetchNotesQuery,
  useHandlePatchRequestMutation,
} = commonApi;

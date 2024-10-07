// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const assignmentApi = createApi({
  reducerPath: "assignmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
 // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  
  tagTypes: ["getAssignmentList"],
  endpoints: (builder) => ({
    getAssignmentList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getAssignmentList"],
    }),

    

 }),
});

export const {
 useGetAssignmentListQuery,
} = assignmentApi;
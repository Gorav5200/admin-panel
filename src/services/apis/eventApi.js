// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getEventList","getEventById"],
  endpoints: (builder) => ({
    getEventList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getEventList"],
    }),
   
    getEventById: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getEventById"],
    }),
   
    createEvent: builder.mutation({
        query: ({ endpoint, data }) => ({
          url: endpoint,
          method: "POST",
          body: data,
        }),
   
      }),
    updateEvent: builder.mutation({
        query: ({ endpoint, updatedData }) => ({
          url: endpoint,
          method: "PATCH",
          body: updatedData,
        }),
   
      }),
    

 }),
});

export const {useGetEventListQuery,useCreateEventMutation,useLazyGetEventByIdQuery,useUpdateEventMutation} = eventApi;

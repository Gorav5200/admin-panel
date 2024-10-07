import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const accelareaderApi = createApi({
  reducerPath: "accelareaderApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getAccelareader", "getAccelareaderById"],
  endpoints: (builder) => ({
    getAccelareader: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getAccelareader"],
    }),
    getAccelareaderById: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getAccelareaderById"],
    }),

    createAccelareader: builder.mutation({
      query: ({ endpoint, data }) => {
        return {
          url: endpoint,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["getAccelareader"],
    }),

    updateAccelareader: builder.mutation({
      query: ({ endpoint, updatedData }) => {
        return {
          url: endpoint,
          method: "PATCH",
          body: updatedData,
        };
      },
      invalidatesTags: ["getAccelareaderById"],
    }),
  }),
});

export const {
  useCreateAccelareaderMutation,
  useGetAccelareaderQuery,
  useGetAccelareaderByIdQuery,
  useUpdateAccelareaderMutation,
} = accelareaderApi;

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const faqApi = createApi({
  reducerPath: "faqApi",
   baseQuery: fetchBaseQuery({baseUrl:process.env.REACT_APP_BASE_URL } ),
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getQuestionList"],
  endpoints: (builder) => ({
    getFaqList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["faqList"],
    }),

    getSingleFaq: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),
    
    getCategories: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),
    

   

    deleteFaq: builder.mutation({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faqList"],
    }),

    addFaq: builder.mutation({
      query: ({ endpoint, newUser }) => ({
        url: endpoint,
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["faqList"],
    }),

    editFaq: builder.mutation({
      query: ({ endpoint, updateQuestion }) => ({
        url: endpoint,
        method: "PATCH",
        body: updateQuestion,
      }),
      invalidatesTags: ["faqList"],
    }),
  }),
});

export const {
  useAddFaqMutation,
  useDeleteFaqMutation,
  useEditFaqMutation,
  useGetSingleFaqQuery,
  useGetFaqListQuery,
  useGetCategoriesQuery
} = faqApi;

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getReferralList", "getBundleList", "getTagsList"],
  endpoints: (builder) => ({
    getBlogList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getReferralList"],
    }),

    getBlogById: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: [""],
    }),

    CreateBlog: builder.mutation({
      query: ({ endpoint, data }) => {
        return {
          url: endpoint,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["getReferralList"],
    }),
    updateBlog: builder.mutation({
      query: ({ endpoint, updatedData }) => {
        return {
          url: endpoint,
          method: "PATCH",
          body: updatedData,
        };
      },
      invalidatesTags: [""],
    }),
    // tags Section
    getTagsList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getTagsList"],
    }),

    useHandleDelete: builder.mutation({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "DELETE",
      }),

    }),

    createTag: builder.mutation({
      query: ({ endpoint, data }) => {
        return {
          url: endpoint,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["getTagsList"],
    }),
    //get categories

    getSelectList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getTagsList"],
    }),
  }),
});

export const {
 useGetBlogListQuery,
 useGetBlogByIdQuery,
 useCreateBlogMutation,
 useUpdateBlogMutation,
 useCreateTagMutation,
 useGetTagsListQuery,
 useGetSelectListQuery,
 useUseHandleDeleteMutation
} = blogsApi;

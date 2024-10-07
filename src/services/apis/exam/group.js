// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const groupsApi = createApi({
  reducerPath: "groupsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  //baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getGroupList", "getMembers", "getGroupDoubts", "getGroupById"],
  endpoints: (builder) => ({
    getGroupList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getGroupList"],
    }),
    getGroupByEntityType: builder.mutation({
      query: ({ endpoint, data }) => ({
        url: endpoint,
        method: "POST",
        body: data,
      }),
      
    }),

    getGroupById: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getGroupById"],
    }),
    getGroupDoubts: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getGroupDoubts"],
    }),

    getMembers: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getMembers"],
    }),

    linkGroup: builder.mutation({
      query: ({ endpoint, updatedData }) => ({
        url: endpoint,
        method: "POST",
        body: updatedData,
      }),
      // invalidatesTags: ["getGroupList"],
    }),

    updateField: builder.mutation({
      query: ({ endpoint, updatedData }) => ({
        url: endpoint,
        method: "PATCH",
        body: updatedData,
        headers: {
          "content-type": "application/json",
        },
      }),
      // invalidatesTags: ["getGroupList"],
    }),

    createGroup: builder.mutation({
      query: ({ endpoint, newGroup }) => ({
        url: endpoint,
        method: "POST",
        body: newGroup,
      }),
      invalidatesTags: ["getGroupList"],
    }),

    handleActions: builder.mutation({
      query: ({ endpoint, data }) => ({
        url: endpoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ({ success }) => {
        if (success) {
          return ["getGroupById"];
        }
      },
    }),
  
  }),
});

export const {
  useGetGroupListQuery,
  useLazyGetGroupListQuery,
  useGetGroupByIdQuery,
useGetGroupByEntityTypeMutation,
  useCreateGroupMutation,
  useUpdateFieldMutation,
  useGetMembersQuery,
  useLazyGetMembersQuery,
  useGetGroupDoubtsQuery,
  useLinkGroupMutation,
useHandleActionsMutation,

} = groupsApi;

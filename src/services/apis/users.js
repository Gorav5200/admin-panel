import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getUsers"],
  endpoints: (builder) => ({
    getUserList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: (result) =>
        result ? [{ type: "getUsers", id: result.id }] : [], // Modify this based on your API response
    }),

    getAuthorities: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),

    getSingleUser: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: (result) =>
        result ? [{ type: "SingleUser", id: result.id }] : [],
    }),

    deleteUser: builder.mutation({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "DELETE",
    
      }),
      invalidatesTags: (result) => {
        if (result.success) {
          return ["getUsers"];
        }
      },
    }),

    userBlockActions: builder.mutation({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "POST",
      }),
      invalidatesTags: (result) => {
        if (result.success) {
          return ["getUsers"];
        }
      }, // Modify this based on your invalidation logic
    }),

    handleMultiDelete: builder.mutation({
      query: ({ endpoint, data }) => {
        return {
          url: endpoint,
          method: "DELETE",
          body: data,
        };
      },
      invalidatesTags: (result) => {
        if (result.success) {
          return ["getUsers"];
        }
      },
    }),

    userRolesUpdate: builder.mutation({
      query: ({ endpoint, data }) => {
        return {
          url: endpoint,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "getUsers", id: "all" }],
    }),

    addUser: builder.mutation({
      query: ({ endpoint, newUser }) => {
        //console.log('New User Data:', newUser);  // Log the newUser object
        return {
          url: endpoint,
          method: "POST",
          body: newUser,
          // formData: true,d
        };
      },
      invalidatesTags: [{ type: "getUsers", id: "all" }],
    }),

    updateUser: builder.mutation({
      query: ({ endpoint, updatedData }) => {
        //console.log('New User Data:', updatedData);  // Log the updatedData object
        return {
          url: endpoint,
          method: "PATCH",
          body: updatedData,
        };
      },
    }),
  }),
});

export const {
  useGetUserListQuery,
  useGetAuthoritiesQuery,
  useAddUserMutation,
  useGetSingleUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUserBlockActionsMutation,
  useUserRolesUpdateMutation,
  useHandleMultiDeleteMutation,
} = usersApi;

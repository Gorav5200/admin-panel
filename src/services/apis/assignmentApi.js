// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const assignmentApi = createApi({
  reducerPath: "assignmentApi",
  //baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
   baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getAssignment","getAssignmentPackage"],
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getAssignment"],
    }),

    createAssignment: builder.mutation({
      query: ({ endpoint,newLearn }) => {
        return {
          url: endpoint,
          method: "POST",
          body: newLearn,
          
        };
      },
      invalidatesTags: [],
    }),
    updateAssignment: builder.mutation({
      query: ({ endpoint,updatedData }) => {
        return {
          url: endpoint,
          method: "PATCH",
          body: updatedData,
          
        };
      },
      invalidatesTags: [],
    }),

    getAssignmentPackage: builder.query({
        query: (endpoint) => `${endpoint}`,
        providesTags: ["getAssignmentPackage"],
      }),
  
    createAssignmentPackage: builder.mutation({
        query: ({ endpoint, newData }) => {
          return {
            url: endpoint,
            method: "POST",
            body: newData,
          };
        },
        invalidatesTags: [],
    }),
  }),
});

export const {
 useGetAssignmentPackageQuery,
 useCreateAssignmentMutation,
useGetAssignmentsQuery,
 useCreateAssignmentPackageMutation,
 useUpdateAssignmentMutation
} = assignmentApi;

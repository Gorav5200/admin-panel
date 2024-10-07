// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getCourses","courseDetail"],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getCourses"],
    }),

    getCoursesById: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["courseDetail"],
    }),
    
    updateCourse: builder.mutation({
      query: ({ endpoint, updatedData }) => ({
        url: endpoint,
        method: "PATCH",
        body:updatedData,
        headers: {
          'content-type': 'application/json',
      },
      }),
      invalidatesTags: ["courseDetail"],
    }),


    createCourse: builder.mutation({
      query: ({ endpoint, newCourse }) => ({
        url: endpoint,
        method: "POST",
        body: newCourse,
      }),
      invalidatesTags: ["getCourses"],
    }),

    linkCourse: builder.mutation({
      query: ({ endpoint, updatedData }) => ({
        url: endpoint,
        method: "POST",
        body:updatedData,
      }),
     
    }),

  }),
});

export const {
useGetCoursesByIdQuery,useGetCoursesQuery,useCreateCourseMutation,useUpdateCourseMutation,useLinkCourseMutation
} = courseApi;
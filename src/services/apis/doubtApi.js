// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doubtApi = createApi({
  reducerPath: "doubtApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getDoubtList", "getDoubtById"],
  endpoints: (builder) => ({

    //===========================GET DOUBT LIST=======================================================//
    getDoubtList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getDoubtList", ],
    }),
    getReviewList: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),
    getDoubtSolverList: builder.query({
      query: (endpoint) => `${endpoint}`,
   
    }),
    getSolutionById: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getDoubtList", "getDoubtById"],
    }),
//=========================================FOR GET THE PARTICULAR SOLVE IS ALREAdy ACCEPTED==============//
    getSolutionInfo: builder.query({
      query: (endpoint) => `${endpoint}`,
    }),

    //======================================FOR ADD DOUBT SOLVER INFO=======================================//
    addDoubtSolverInfo: builder.mutation({
      query: ({ endpoint, updatedData }) => ({
        url: endpoint,
        method: "PATCH",
        body: updatedData,
      }),
    }),

    //======================================FOR UPLOAD THE SOLUTION======================================  //
    uploadDoubtSolution: builder.mutation({
      query: ({ endpoint, data }) => ({
        url: endpoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result.success) {
          return ["getDoubtList"];
        }
      },
    }),

    //==FOR IGNORED OR PASSED ACTIONS REQUEST AND ALSO USED IN TO SOLVE REQUEST FOR GETTING THE DATA FOR TIMER===  //
    updateRequestStatus: builder.mutation({
      query: ({ endpoint, data }) => ({
        url: endpoint,
        method: "PATCH",
        body: data,
      }),
    }),

    handleCorrectIncorrect: builder.mutation({
      query: ({ endpoint, data }) => ({
        url: endpoint,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetDoubtSolverListQuery,
  useGetSolutionByIdQuery,
  useLazyGetSolutionByIdQuery,
  useGetDoubtListQuery,
  useAddDoubtSolverInfoMutation,
  useUpdateRequestStatusMutation,
  useUploadDoubtSolutionMutation,
  useGetSolutionInfoQuery,
  useHandleCorrectIncorrectMutation,
  useGetReviewListQuery,
} = doubtApi;

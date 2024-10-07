// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rewardsApi = createApi({
  reducerPath: "rewardsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCAL_URL }),
  tagTypes: ["getReferralList", "getBundleList"],
  endpoints: (builder) => ({
    getReferralList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getReferralList"],
    }),

    getReferralById: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: [""],
    }),

    createReferral: builder.mutation({
      query: ({ endpoint, data }) => {
        return {
          url: endpoint,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["getReferralList"],
    }),
    updateReferral: builder.mutation({
      query: ({ endpoint, updatedData }) => {
        return {
          url: endpoint,
          method: "PATCH",
          body: updatedData,
        };
      },
      invalidatesTags: [],
    }),

    getBundleList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getBundleList"],
    }),

    createBundle: builder.mutation({
      query: ({ endpoint, data }) => {
        return {
          url: endpoint,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["getBundleList"],
    }),
    updateBundle: builder.mutation({
      query: ({ endpoint, updatedData }) => {
        return {
          url: endpoint,
          method: "PATCH",
          body: updatedData,
        };
      },
      invalidatesTags: (result)=>{
if(result.success){
  return ["getRewardList"];
}
      },
    }),

    getRewardList: builder.query({
      query: (endpoint) => `${endpoint}`,
      providesTags: ["getRewardList"],
    }),

    createReward: builder.mutation({
      query: ({ endpoint, data }) => {
        return {
          url: endpoint,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["getRewardList"],
    }),
    updateReward: builder.mutation({
      query: ({ endpoint, updatedData }) => {
        return {
          url: endpoint,
          method: "PATCH",
          body: updatedData,
        };
      },
      invalidatesTags: [],
    }),
  }),
});

export const {
  useCreateReferralMutation,
  useUpdateReferralMutation,
  useGetReferralByIdQuery,
  useGetReferralListQuery,
  useCreateBundleMutation,
  useUpdateBundleMutation,
  useGetBundleListQuery,
  useGetRewardListQuery,
  useCreateRewardMutation,
  useUpdateRewardMutation,
} = rewardsApi;

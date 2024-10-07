import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import  Cookies  from 'universal-cookie';
// import request from "../utilities/request";
const cookies = new Cookies();
const token = cookies.get('token');
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BASE_URL}/admin/v1/auth/` }),
  endpoints: (builder) => ({
    adminSignUp: builder.mutation({
      query: ({name,email,phoneNumber}) => ({
        url: 'invite/admin',
        method: 'POST',
        body: { name,email,phoneNumber }, 
        headers: {
          'Content-type': 'application/json',
        },
      }),
    }),
    adminLoginEmail: builder.mutation({
      query: ({email,password}) => ({
        url: 'login/email',
        method: 'POST',
        body: {email,password}, 
       
        
      }),
    }),
    adminLoginPhone: builder.mutation({
      query: ({phoneNumber}) => ({
        url: 'sendOtp',
        method: 'POST',
        body: {phoneNumber:`+91${phoneNumber}`}, 
        
       
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({phoneNumber,otp}) => ({
        url: 'verifyOtp',
        method: 'POST',
        body: {phoneNumber:`+91${phoneNumber}`,otp}, 
       
      }),
    }),
    changePassword: builder.mutation({
      query: ({oldPassword,newPassword}) => ({
        url: 'change/password',
        method: 'POST',
        body: {oldPassword,newPassword}, 
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    requestResetPassword: builder.mutation({
      query: ({email}) => ({
        url: 'resetpassword',
        method: 'POST',
        body: {email}, 
       
        
      }),
    }),
    verifyEmail: builder.mutation({
      query: ({email,token}) => ({
        url: `verify/${email}/${token}`,
        method: 'GET',
       
      
      
      }),
    }),
    resetPassword: builder.mutation({
      query: ({email,newPassword,confirmPassword}) => ({
        url: `verify/${email}`,
        method: 'POST',
        body: {newPassword,confirmPassword}, 
       
       
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
      }),
    }),
  }),
});

export const {  useAdminSignUpMutation,
  useAdminLoginEmailMutation,useAdminLoginPhoneMutation,useVerifyOtpMutation,useRequestResetPasswordMutation,useVerifyEmailMutation,useResetPasswordMutation
  } = authApi;





  

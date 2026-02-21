import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  tagTypes: ["Admin"],
  endpoints: (builder) => ({
    createAdmin: builder.mutation<void, AdminCreadentials>({
      query: (credentials) => ({
        url: "api/create-admin",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Admin"],
    }),
    sendEmail: builder.mutation<void, EmailData>({
      query: (emailData) => ({
        url: "api/contact",
        method: "POST",
        body: emailData,
      }),
    }),
  }),
});

export const { useCreateAdminMutation, useSendEmailMutation } = adminApi;

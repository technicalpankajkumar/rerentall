
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../services/supabase';
import { logOut, setCredentials } from '../store/feature/auth/slice';

export const rtkApi = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      async queryFn({ email, password }) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error };
        return { data };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setCredentials(data));
      },
    }),
    register: builder.mutation({
      async queryFn({ email, password }) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) return { error };
        return { data };
      },
    }),
    forgotPassword: builder.mutation({
      async queryFn({ email }) {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) return { error };
        return { data };
      },
    }),
    logout: builder.mutation({
      async queryFn(_, _queryApi, _extraOptions, _baseQuery) {
        const { error } = await supabase.auth.signOut();
        if (error) return { error };
        return { data: true };
      },
      async onQueryStarted(_, { dispatch }) {
        dispatch(logOut());
      },
    }),
    getUser: builder.query({
      async queryFn() {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) return { error };
        return { data: user };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useGetUserQuery,
} = rtkApi;


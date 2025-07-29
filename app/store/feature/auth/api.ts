import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { api } from '../../api';
import { setCredentials } from './slice';

export const authRtkApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: { ...credentials },
      }),
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const { accessToken, refreshToken, user, role, data: extraData } = data;

          // Store tokens securely
          await SecureStore.setItemAsync('accessToken', accessToken);
          await SecureStore.setItemAsync('refreshToken', refreshToken);

          // Store user info
          const userData = { user, role, data: extraData };
          await AsyncStorage.setItem('user', JSON.stringify(userData));

          // Dispatch to Redux
          dispatch(setCredentials({ accessToken, user, role, data: extraData }));
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authRtkApi;

// app/store/slices/authSlice.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

const initialState = {
  user: null,
  session: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, session } = action.payload;
      state.user = user;
      state.session = session;

      SecureStore.setItemAsync('supabase_token', session.access_token);
      AsyncStorage.setItem('supabase_user', JSON.stringify(user));
    },
    logOut: (state) => {
      state.user = null;
      state.session = null;
      SecureStore.deleteItemAsync('supabase_token');
      AsyncStorage.removeItem('supabase_user');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state:any) => state.auth.user;
export const selectCurrentSession = (state:any) => state.auth.session;

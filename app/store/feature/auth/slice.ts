import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

interface AuthState {
  token: string | null;
  user: any;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, user, role, data } = action.payload;
      const userData = { user, role, data };

      state.token = accessToken;
      state.user = userData;

      // Store in secure storage
      SecureStore.setItemAsync('accessToken', accessToken);
      AsyncStorage.setItem('user', JSON.stringify(userData));
    },
    logOut: (state) => {
      state.token = null;
      state.user = null;

      SecureStore.deleteItemAsync('accessToken');
      AsyncStorage.removeItem('user');
    },
    setUser: (state, action) => {
      state.user = action.payload;
      AsyncStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

export const { setCredentials, logOut, setUser } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;

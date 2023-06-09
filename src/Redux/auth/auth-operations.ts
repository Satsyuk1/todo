import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User, UserInfo } from "../../Types/auth";
import { AuthSlice } from "./authSlice";

axios.defaults.baseURL = "https://todo-bogdan-back.fly.dev/api";

const token = {
  set(token: string | null) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.Authorization = "";
  },
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData: Omit<User, "_id">, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<{
        token: string | null;
        user: UserInfo;
      }>("/users/register", userData);

      token.set(data.token);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: Pick<User, "email" | "password">, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<{
        token: string | null;
        user: UserInfo;
      }>("/users/login", userData);

      token.set(data.token);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut",
  async (_, { rejectWithValue }) => {
    try {
      token.unset();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as {
      auth: AuthSlice;
    };
    const persistToken = state.auth.token;

    if (persistToken === null) {
      return rejectWithValue("");
    }
    token.set(persistToken);

    try {
      const { data } = await axios.get<{
        token: string | null;
        user: UserInfo;
      }>("/users/current");

      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as {
        auth: AuthSlice;
      };

      const { isFetchingCurrentUser } = state.auth;
      if (isFetchingCurrentUser) {
        return false;
      }
    },
  }
);

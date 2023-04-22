import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Todo, TodoInfo } from "../../Types/todo";
import { TodosSlice } from "./todosSlice";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<Todo[]>(`/todos`);
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
        todos: TodosSlice;
      };

      const { isLoading } = state.todos;
      if (isLoading) {
        return false;
      }
    },
  }
);

export const updateStatusTodo = createAsyncThunk(
  "todos/updateStatusTodo",
  async (newStatus: { _id: string; done: boolean }, { rejectWithValue }) => {
    const { _id, done } = newStatus;
    try {
      await axios.patch(`/todos/${_id}/done`, {
        done,
      });

      return { _id, done };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (newTodo: TodoInfo, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<Todo>("/todos", newTodo);
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
        todos: TodosSlice;
      };

      const { isLoading } = state.todos;
      if (isLoading) {
        return false;
      }
    },
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (_id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/todos/${_id}`);
      return _id;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as {
        todos: TodosSlice;
      };

      const { isLoading } = state.todos;
      if (isLoading) {
        return false;
      }
    },
  }
);

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async (
    { _id, title }: { _id: string; title: string },
    { rejectWithValue }
  ) => {
    try {
      await axios.put(`/todos/${_id}`, { title });
      return { _id, title };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as {
        todos: TodosSlice;
      };

      const { isLoading } = state.todos;
      if (isLoading) {
        return false;
      }
    },
  }
);

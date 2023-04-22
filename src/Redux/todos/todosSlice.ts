import { createSlice, isAnyOf, SerializedError } from "@reduxjs/toolkit";
import { Todo } from "../../Types/todo";
import {
  addTodo,
  deleteTodo,
  editTodo,
  fetchTodos,
  updateStatusTodo,
} from "./todos-operations";

export type TodosSlice = {
  items: Todo[];
  isLoading: boolean;
  error: SerializedError | null;
};

const initialState: TodosSlice = {
  items: [],
  isLoading: false,
  error: null,
};

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    clearTodos(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) =>
    builder

      .addCase(fetchTodos.fulfilled, (state, { payload }) => {
        if (payload) {
          state.items = payload;
        }
      })
      .addCase(updateStatusTodo.fulfilled, (state, { payload }) => {
        state.items.forEach((todo) => {
          if (todo._id === payload?._id) {
            todo.done = payload.done;
          }
        });
      })

      .addCase(addTodo.fulfilled, (state, { payload }) => {
        if (payload) {
          state.items.push(payload);
        }
      })
      .addCase(deleteTodo.fulfilled, (state, { payload }) => {
        state.items = [
          ...state.items.filter((contact) => contact._id !== payload),
        ];
      })
      .addCase(editTodo.fulfilled, (state, { payload }) => {
        state.items.forEach((todo) => {
          if (todo._id === payload?._id) {
            todo.title = payload.title;
          }
        });
      })
      .addMatcher(isAnyOf(fetchTodos.pending, addTodo.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(fetchTodos.fulfilled, addTodo.fulfilled), (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(fetchTodos.rejected, addTodo.rejected),
        (state, { error }) => {
          state.isLoading = false;
          state.error = error;
        }
      ),
});

export default testsSlice.reducer;
export const { clearTodos } = testsSlice.actions;

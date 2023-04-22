import { RootState } from "../store";

export const selectTodos = (state: RootState) => state.todos.items;
export const selectIsLoading = (state: RootState) => state.todos.isLoading;
export const selectError = (state: RootState) => state.todos.error;

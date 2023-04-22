import { createSlice } from "@reduxjs/toolkit";
import { Categorie } from "../../Types/categorie";
import { addCategorie, fetchCategories } from "./categories-operations";

export type CategoriesSlice = {
  items: Categorie[];
};

const initialState: CategoriesSlice = {
  items: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategories(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        if (payload) {
          state.items = payload;
        }
      })

      .addCase(addCategorie.fulfilled, (state, { payload }) => {
        if (payload) {
          state.items.push(payload);
        }
      }),
});

export default categoriesSlice.reducer;
export const { clearCategories } = categoriesSlice.actions;

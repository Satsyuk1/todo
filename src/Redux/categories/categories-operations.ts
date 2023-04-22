import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Categorie, CategorieInfo } from "../../Types/categorie";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<Categorie[]>(`/categories`);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addCategorie = createAsyncThunk(
  "categories/addCategorie",
  async (newCategorie: CategorieInfo, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<Categorie>("/categories", newCategorie);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

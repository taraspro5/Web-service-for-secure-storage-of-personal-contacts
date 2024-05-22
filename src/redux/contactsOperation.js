import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://dyplom-backend.onrender.com";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get("/api/contacts/");
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, { rejectWithValue }) => {
    try {
      const result = await axios.post("/api/contacts/", contact);
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.delete(`/api/contacts/${id}`);
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, name, email, phone }, { rejectWithValue }) => {
    try {
      const result = await axios.put(`/api/contacts/${id}`, {
        name,
        email,
        phone,
      });
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateContactStatusFavorite = createAsyncThunk(
  "contacts/updateContactStatusFavorite",
  async ({ id, favorite }, { rejectWithValue }) => {
    try {
      const result = await axios.patch(`/api/contacts/${id}/favorite`, {
        favorite: !favorite,
      });
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

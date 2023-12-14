import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  records: [],
  isLoading: false,
  error: null,
};

export const fetchRecords = createAsyncThunk(
  "records/fetchRecords",
  async (_, { getState }) => {
    const res = await axios("http://localhost:3001/records", {
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });
    return res.data;
  }
);

export const createRecord = createAsyncThunk(
  "records/createRecord",
  async (newRecord, { getState }) => {
    const res = await axios.post("http://localhost:3001/records", newRecord, {
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });
    return res.data;
  }
);

export const editRecord = createAsyncThunk(
  "records/editRecord",
  async ({ newRecord, _id }, { getState }) => {
    const res = await axios.put(
      `http://localhost:3001/records/${_id}`,
      newRecord,
      {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      }
    );
    console.log("HIII!");
    return res.data;
  }
);

export const deleteRecord = createAsyncThunk(
  "records/deleteRecord",
  async (id, { getState }) => {
    const res = await axios.delete(`http://localhost:3001/records/${id}`, {
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });
    return id;
  }
);

export const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRecords.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRecords.fulfilled, (state, action) => {
      state.isLoading = false;
      state.records = action.payload;
    });
    builder.addCase(fetchRecords.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(createRecord.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createRecord.fulfilled, (state, action) => {
      state.isLoading = false;
      state.records.push(action.payload);
    });
    builder.addCase(createRecord.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteRecord.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteRecord.fulfilled, (state, action) => {
      state.isLoading = false;
      state.records = state.records.filter(
        (record) => record._id !== action.payload
      );
    });
    builder.addCase(deleteRecord.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(editRecord.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editRecord.fulfilled, (state, action) => {
      state.isLoading = false;
      state.records = state.records.map((record) => {
        return record._id === action.payload ? action.payload : record;
      });
    });
    builder.addCase(editRecord.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default recordsSlice.reducer;

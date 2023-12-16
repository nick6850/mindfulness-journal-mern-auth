import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: localStorage.getItem("token") || "",
  records: [],
  isLoading: false,
  error: null,
  success: false,
};

export const fetchRecords = createAsyncThunk(
  "authAndRecords/fetchRecords",
  async () => {
    const res = await axios("http://localhost:3001/records", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // Sort records by date in descending order
    const sortedRecords = res.data.sort(
      (a, b) =>
        new Date(b.recordDate).getTime() - new Date(a.recordDate).getTime()
    );

    return sortedRecords;
  }
);

export const createRecord = createAsyncThunk(
  "authAndRecords/createRecord",
  async (newRecord) => {
    const res = await axios.post("http://localhost:3001/records", newRecord, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const editRecord = createAsyncThunk(
  "authAndRecords/editRecord",
  async ({ newRecord, _id }) => {
    const res = await axios.put(
      `http://localhost:3001/records/${_id}`,
      newRecord,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(res.data);
    return res.data;
  }
);

export const deleteRecord = createAsyncThunk(
  "authAndRecords/deleteRecord",
  async (id) => {
    const res = await axios.delete(`http://localhost:3001/records/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return id;
  }
);

export const login = createAsyncThunk(
  "authAndRecords/login",
  async ({ email, password }) => {
    const res = await axios.post("http://localhost:3001/users/login", {
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
    return res.data.token;
  }
);

export const register = createAsyncThunk(
  "authAndRecords/register",
  async ({ email, password }) => {
    const res = await axios.post("http://localhost:3001/users/register", {
      email,
      password,
    });
    return res.data;
  }
);

export const authAndRecords = createSlice({
  name: "authAndRecords",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = "";
      state.records = [];
      state.success = false;
    },
  },
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
      const newRecord = action.payload;

      const insertIndex = state.records.findIndex(
        (record) =>
          new Date(record.recordDate).getTime() <
          new Date(newRecord.recordDate).getTime()
      );

      if (insertIndex !== -1) {
        state.records.splice(insertIndex, 0, newRecord);
      } else {
        state.records.push(newRecord);
      }
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
        return record._id === action.payload._id ? action.payload : record;
      });
    });
    builder.addCase(editRecord.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.error = "Wrong credentials";
    });
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(register.rejected, (state) => {
      state.isLoading = false;
      state.error = "Invalid login or password";
    });
  },
});

export const { logout } = authAndRecords.actions;
export default authAndRecords.reducer;

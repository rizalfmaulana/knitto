import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

/*
for ip address user your metro ip address
**/

export const loginUser = createAsyncThunk(
  "/api/login",
  async (userData, thunkApi) => {
    try {
      const data = await axios.post(
        "http://192.168.1.5:8081/api/login",
        userData,
        config
      );

      return data;
    } catch (error: any) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

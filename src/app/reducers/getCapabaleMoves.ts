import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCapabaleMoves = createAsyncThunk(
  "pokemon/evolution",
  async (id, { getState, dispatch }) => {}
);

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPokemonAreas = createAsyncThunk(
  "pokemon/evolution",
  async (id, { getState, dispatch }) => {}
);

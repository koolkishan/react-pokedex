import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPokemonEvolution = createAsyncThunk(
  "pokemon/evolution",
  async (id, { getState, dispatch }) => {}
);

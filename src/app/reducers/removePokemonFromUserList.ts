import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDoc, doc } from "firebase/firestore";
import { pokemonListRef } from "../../utils/firebaseConfig";

export const removePokemonFromUserList = createAsyncThunk(
  "pokemon/remove",
  async ({ id }: any, { getState }) => {
    try {
      await deleteDoc(doc(pokemonListRef, id));
      return { id };
    } catch (err) {
      console.log(err);
    }
  }
);
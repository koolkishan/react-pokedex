import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { pokemonListRef } from "../../utils/firebaseConfig";
import { getUserPokemons } from "./getUserPokemons";
import { setToast } from "../slices/AppSlice";

export const addPokemonToList = createAsyncThunk(
  "pokemon/addPkemon",
  async (pokemon: any, { getState, dispatch }) => {
    try {
      const {
        app: {
          userInfo: { email },
        },
        pokemon: { userPokemons },
      }: any = getState();

      const index = userPokemons.findIndex((userPokemon: any, index: any) => {
        return userPokemon.name === pokemon.name;
      });
      if (index === -1) {
        await addDoc(pokemonListRef, {
          pokemon,
          email,
        });
        await dispatch(getUserPokemons());
        dispatch(setToast(`${pokemon.name} added to your collection.`));
      } else {
        dispatch(setToast(`${pokemon.name} already part of your collection.`));
      }
    } catch (err) {
      console.log({ err });
    }
  }
);

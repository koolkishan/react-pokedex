import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc } from "firebase/firestore";
import { pokemonListRef } from "../../utils/firebaseConfig";
import { getUserPokemons } from "./getUserPokemons";
import { setToast } from "../slices/AppSlice";
import {
  pokemonStatsType,
  pokemonTypeInterface,
  userPokemonsType,
} from "../../utils/types";
import { RootState } from "../store";

export const addPokemonToList = createAsyncThunk(
  "pokemon/addPkemon",
  async (
    pokemon: {
      id: number;
      name: string;
      types: pokemonTypeInterface[] | string[];
      stats?: pokemonStatsType[];
    },
    { getState, dispatch }
  ) => {
    try {
      const {
        app: { userInfo },
        pokemon: { userPokemons },
      } = getState() as RootState;
      if (!userInfo?.email) {
        return dispatch(
          setToast("Please login in order to add pokemon to your collection.")
        );
      }
      const index = userPokemons.findIndex((userPokemon: userPokemonsType) => {
        return userPokemon.name === pokemon.name;
      });
      if (index === -1) {
        let types: string[] = [];
        if (!pokemon.stats) {
          pokemon.types.forEach((type: any) =>
            types.push(Object.keys(type).toString())
          );
        } else {
          types = pokemon.types as string[];
        }
        await addDoc(pokemonListRef, {
          pokemon: { id: pokemon.id, name: pokemon.name, types },
          email: userInfo.email,
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

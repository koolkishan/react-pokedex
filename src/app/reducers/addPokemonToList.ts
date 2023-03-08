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
        app: { userInfo },
        pokemon: { userPokemons },
      }: any = getState();
      if (!userInfo?.email) {
        return dispatch(
          setToast("Please login in order to add pokemon to your collection.")
        );
      }
      const index = userPokemons.findIndex((userPokemon: any, index: any) => {
        return userPokemon.name === pokemon.name;
      });
      if (index === -1) {
        let types: any = [];
        if (!pokemon.stats) {
          pokemon.types.forEach((type: any) =>
            types.push(Object.keys(type).toString())
          );
        } else {
          types = pokemon.types;
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

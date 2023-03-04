import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, query, where } from "firebase/firestore";
import { pokemonListRef } from "../../utils/firebaseConfig";
export const getUserPokemons = createAsyncThunk(
  "pokemon/userList",
  async (args, { getState }: any) => {
    const {
      app: {
        userInfo: { email },
      },
    }: any = getState();
    const firestoreQuery = query(pokemonListRef, where("email", "==", email));
    const fetchedPokemons = await getDocs(firestoreQuery);
    if (fetchedPokemons.docs.length) {
      const userPokemons: any = [];
      fetchedPokemons.forEach(async (pokemon) => {
        const pokemons = await pokemon.data().pokemon;
        userPokemons.push({ ...pokemons, firebaseId: pokemon.id });
      });
      return userPokemons;
    }
    return [];
  }
);

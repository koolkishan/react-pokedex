// @ts-nocheck

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { defaultImages, images, pokemonTypes } from "../../utils";

export const getPokemonsData = createAsyncThunk(
  "pokemon/randomPokemon",
  async (pokemons: { name: string; url: string }[]) => {
    const pokemonsData = [];
    for await (const pokemon of pokemons) {
      const data: any = await axios.get(pokemon.url);
      const types = data.data.types.map(
        ({ type: { name } }: { type: { name: string } }) => ({
          [name]: pokemonTypes[name],
        })
      );
      let image = images[data.data.id];
      if (!image) {
        image = defaultImages[data.data.id];
      }
      if (image) {
        pokemonsData.push({
          name: pokemon.name,
          id: data.data.id,
          image,
          types,
        });
      }
    }
    return pokemonsData;
  }
);

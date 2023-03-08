// @ts-nocheck

import { useCallback, useEffect, useState } from "react";
import Info from "../components/Info";
import PokemonContainer from "../components/PokemonContainer";
import Wrapper from "../sections/Wrapper";
import { useParams } from "react-router-dom";
import { defaultImages, images } from "../utils";
import { extractColors } from "extract-colors";
import axios from "axios";
import Evolution from "./Pokemon/Evolution";
import Locations from "./Pokemon/Locations";
import CapableMoves from "./Pokemon/CapableMoves";
import Description from "./Pokemon/Description";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCurrentPokemon } from "../app/slices/PokemonSlice";
function Pokemon() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const currentPokemonTab = useAppSelector(
    ({ app: { currentPokemonTab } }) => currentPokemonTab
  );
  const [pokemonData, setPokemonData] = useState<any>(undefined);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const getPokemonInfo = useCallback(
    async (image) => {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${params.id}`
      );
      const { data: dataEncounters } = await axios.get(
        data.location_area_encounters
      );
      // const { data: dataMoves } = await axios.get(data.capableMoves);
      const moves = [];
      const encounters = [];
      let evolutionLevel = 0;
      const evolution = [];
      dataEncounters.forEach((encounter) => {
        console.log(encounter);
        encounters.push(
          encounter.location_area.name.toUpperCase().split("-").join(" ")
        );
      });
      console.log({ encounters });
      const stats = await data.stats.map(({ stat, base_stat }) => ({
        name: stat.name,
        value: base_stat,
      }));
      dispatch(
        setCurrentPokemon({
          id: data.id,
          name: data.name,
          types: data.types.map(({ type: { name } }) => name),
          image,
          stats,
          encounters,
          evolutionLevel,
          evolution,
        })
      );
      setIsDataLoading(false);
    },
    [params.id]
  );

  useEffect(() => {
    const imageElemet = document.createElement("img");
    imageElemet.src = images[params.id];
    const options = {
      pixels: 10000,
      distance: 1,
      splitPower: 10,
      colorValidator: (red, green, blue, alpha = 255) => alpha > 250,
      saturationDistance: 0.2,
      lightnessDistance: 0.2,
      hueDistance: 0.083333333,
    };
    const getColor = async () => {
      const color = await extractColors(imageElemet.src, options);
      const root = document.documentElement;
      root.style.setProperty("--accent-color", color[0].hex.split('"')[0]);
    };
    getColor();
    let image = images[params.id];
    if (!image) {
      image = defaultImages[params.id];
    }

    getPokemonInfo(image);
  }, [params.id, getPokemonInfo]);

  return (
    <div>
      {!isDataLoading && (
        <>
          {currentPokemonTab === "description" && <Description />}
          {currentPokemonTab === "evolution" && <Evolution />}
          {currentPokemonTab === "locations" && <Locations />}
          {currentPokemonTab === "moves" && <CapableMoves />}
        </>
      )}
    </div>
  );
}

export default Wrapper(Pokemon);

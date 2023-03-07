// @ts-nocheck

import { useCallback, useEffect, useState } from "react";
import Info from "../components/Info";
import PokemonContainer from "../components/PokemonContainer";
import Wrapper from "../sections/Wrapper";
import { useParams } from "react-router-dom";
import { defaultImages, images } from "../utils";
import { extractColors } from "extract-colors";
import axios from "axios";
function Pokemon() {
  const params = useParams();
  const [pokemonData, setPokemonData] = useState<any>(undefined);
  const getPokemonInfo = useCallback(async () => {
    const data = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${params.id}`
    );
  }, [params.id]);

  useEffect(() => {
    // if (params.id) {
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
    setPokemonData({
      image,
    });

    getPokemonInfo();
  }, [params.id, getPokemonInfo]);

  return (
    <div>
      <Info />
      {pokemonData && <PokemonContainer image={pokemonData.image} />}
    </div>
  );
}

export default Wrapper(Pokemon);

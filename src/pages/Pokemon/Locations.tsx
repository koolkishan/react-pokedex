import React from "react";
import { useAppSelector } from "../../app/hooks";

function Locations() {
  const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );
  return <div>Locations</div>;
}

export default Locations;

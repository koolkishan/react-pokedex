import React from "react";
import { useAppSelector } from "../../app/hooks";

function Evolution() {
  const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );
  return <div>Evolution</div>;
}

export default Evolution;

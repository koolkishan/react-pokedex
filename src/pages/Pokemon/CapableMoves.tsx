import React from "react";
import { useAppSelector } from "../../app/hooks";

function CapableMoves() {
  const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );
  return <div>CapableMoves</div>;
}

export default CapableMoves;

import React from "react";
import { IoGitCompare } from "react-icons/io5";
import { FaTrash, FaPlus } from "react-icons/fa";
import { addToCompare, setCurrentPokemon } from "../app/slices/PokemonSlice";
import { useAppDispatch } from "../app/hooks";
import { removePokemonFromUserList } from "../app/reducers/removePokemonFromUserList";
import { useLocation, useNavigate } from "react-router-dom";
import { setPokemonTab, setToast } from "../app/slices/AppSlice";
import { addPokemonToList } from "../app/reducers/addPokemonToList";
function PokemonCardGrid({ pokemons }: any) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="pokemon-card-grid-container">
      <div className="pokemon-card-grid">
        {pokemons &&
          pokemons.length &&
          pokemons?.map((data: any) => {
            return (
              <div key={data.id} className="pokemon-card">
                <div className="pokemon-card-list">
                  {location.pathname.includes("/pokemon") ? (
                    <FaPlus
                      className="plus"
                      onClick={() => dispatch(addPokemonToList(data))}
                    />
                  ) : location.pathname.includes("/search") ? (
                    <FaPlus
                      className="plus"
                      onClick={() => dispatch(addPokemonToList(data))}
                    />
                  ) : (
                    <FaTrash
                      className="trash"
                      onClick={async () => {
                        await dispatch(
                          removePokemonFromUserList({ id: data.firebaseId })
                        );
                        dispatch(setToast("Pokemon Removed Successfully."));
                      }}
                    />
                  )}
                </div>
                <div className="pokemon-card-compare">
                  <IoGitCompare
                    onClick={() => {
                      dispatch(addToCompare(data));
                      dispatch(
                        setToast(
                          `${data.name} has been added to compare queue.`
                        )
                      );
                    }}
                  />
                </div>
                <h3 className="pokemon-card-title">{data.name}</h3>
                <img
                  src={data.image}
                  alt=""
                  className="pokemon-card-image"
                  loading="lazy"
                  onClick={() => {
                    dispatch(setPokemonTab("description"));
                    dispatch(setCurrentPokemon(undefined));
                    navigate(`/pokemon/${data.id}`);
                  }}
                />
                <div className="pokemon-card-types">
                  {data.types.map((type: any, index: number) => {
                    const keys = Object.keys(type);

                    return (
                      <div className="pokemon-card-types-type" key={index}>
                        <img
                          src={type[keys[0]].image}
                          alt="pokemon type"
                          className="pokemon-card-types-type-image"
                          loading="lazy"
                        />
                        <h6 className="pokemon-card-types-type-text">
                          {keys[0]}
                        </h6>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PokemonCardGrid;

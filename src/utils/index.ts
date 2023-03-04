// @ts-nocheck
export { debounce } from "./debounce";
export { pokemonTypes } from "./pokemonTypes";

const cache = {};

function importAll(r) {
  r.keys().forEach((key) => (cache[key] = r(key)));
}
// Note from the docs -> Warning: The arguments passed to require.context must be literals!
// importAll(require.context("../assets/pokemons", false, /\.(png|jpe?g|svg)$/));
importAll(
  require.context(
    "../assets/sprites-master/sprites/pokemon/other/home",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

export const images = {};
Object.entries(cache).map((module: any) => {
  let key = module[0].split("");
  key.splice(0, 2);
  key.splice(-4, 4);
  images[[key.join("")]] = module[1];
});

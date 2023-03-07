// @ts-nocheck
const fetchImages = (context: string) => {
  const images = {};
  const cache = {};
  function importAll(r) {
    r.keys().forEach((key) => (cache[key] = r(key)));
  }
  importAll(context);
  Object.entries(cache).map((module: any) => {
    let key = module[0].split("");
    key.splice(0, 2);
    key.splice(-4, 4);
    images[[key.join("")]] = module[1];
  });
  return images;
};

export const images = fetchImages(
  require.context(
    "../assets/sprites-master/sprites/pokemon/other/home",
    false,
    /\.(png|jpe?g|svg)$/
  )
);
export const defaultImages = fetchImages(
  require.context(
    "../assets/sprites-master/sprites/pokemon",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

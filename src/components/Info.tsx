import React, { useEffect } from "react";

export default function Info({ data }: any) {
  useEffect(() => {
    const progressBars = document.querySelectorAll("progress");
    progressBars.forEach((progressBar) => {
      progressBar.style.width = "10rem";
    });
  }, []);
  console.log({ data }, "tata");
  return (
    <>
      <div className="details">
        <h1 className="name">{data.name}</h1>
        <h3>Type: {data.types.join(" - ")}</h3>
        <h3>Evolution: 1</h3>
        <button>See next evolution</button>
      </div>
      <div className="stats">
        <ul>
          {data.stats.map((stat: any) => {
            return (
              <li>
                {stat.name}: {stat.value}
                <progress max={100} value={stat.value} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="battle-stats">
        <ul>
          <li>Strengths: Ground, Rock, Water</li>
          <li>Weakness: Flying, Poison, Bug, Steel, Fire</li>
          <li>Resistant: Ground, Water, Grass, Electric</li>
          <li>Vulnerable: Flying, Poison, Bug, Fire, Ice</li>
        </ul>
        <button>Add Pokemon</button>
      </div>
    </>
  );
}

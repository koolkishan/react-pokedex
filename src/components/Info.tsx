import React, { useEffect } from "react";
import { pokemonTypes } from "../utils";

export default function Info({ data }: any) {
  useEffect(() => {
    const progressBars = document.querySelectorAll("progress");
    progressBars.forEach((progressBar) => {
      progressBar.style.width = "10rem";
    });
  }, []);
  const createStatsArray = (types: any, statType: string) => {
    const statsSet = new Set();
    types.forEach((type: any) => {
      // @ts-ignore
      pokemonTypes[type][statType].forEach((stat: any) => {
        if (!statsSet.has(stat)) {
          statsSet.add(stat[0].toUpperCase() + stat.slice(1));
        }
      });
    });
    return Array.from(statsSet);
  };
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
        {
          <ul>
            <li>
              <span>Strengths:</span>
              <span>{createStatsArray(data.types, "strength").join(", ")}</span>
            </li>
            <li>
              <span>Weakness:</span>
              <span>{createStatsArray(data.types, "weakness").join(", ")}</span>
            </li>
            <li>
              <span>Resistant:</span>
              <span>
                {createStatsArray(data.types, "resistance").join(", ")}
              </span>
            </li>
            <li>
              <span>Vulnerable:</span>
              <span>
                {createStatsArray(data.types, "vulnerable").join(", ")}
              </span>
            </li>
          </ul>
        }
        <button>Add Pokemon</button>
      </div>
    </>
  );
}

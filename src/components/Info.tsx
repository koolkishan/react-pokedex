import React, { useEffect } from "react";

export default function Info() {
  useEffect(() => {
    const progressBars = document.querySelectorAll("progress");
    progressBars.forEach((progressBar) => {
      progressBar.style.width = "10rem";
    });
  }, []);
  return (
    <>
      <div className="details">
        <h1 className="name">Bulbasaur</h1>
        <h3>Type: Grass - Poison</h3>
        <h3>Evolution: 1</h3>
        <button>See next evolution</button>
      </div>
      <div className="stats">
        <ul>
          <li>
            HP: 45
            <progress max={100} value={45} />
          </li>
          <li>
            Attack: 49 <progress max={100} value={49} />
          </li>
          <li>
            Defense: 45 <progress max={100} value={45} />
          </li>
          <li>
            Speed: 45 <progress max={100} value={45} />
          </li>
          <li>
            Special Defense: 65 <progress max={100} value={65} />
          </li>
          <li>
            Special Attack: 65 <progress max={100} value={65} />
          </li>
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

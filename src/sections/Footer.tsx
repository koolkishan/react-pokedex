import React from "react";
import { useLocation } from "react-router-dom";
import { MdOutlinePowerSettingsNew } from "react-icons/md";

export default function Footer() {
  const location = useLocation();
  return (
    <footer>
      <div className="block"></div>
      <div className="data">
        {location.pathname.includes("/pokemon") && (
          <ul>
            <li className="active">Description</li>
            <li>Evolution</li>
            <li>Catching</li>
            <li>Capable Moves</li>
          </ul>
        )}
      </div>
      <div className="block">
        <MdOutlinePowerSettingsNew />
      </div>
    </footer>
  );
}

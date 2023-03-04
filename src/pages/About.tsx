import React from "react";
import Wrapper from "../sections/Wrapper";
import avatarImage from "../assets/kishan.jpeg";
import { FaYoutube, FaGithub, FaLinkedin } from "react-icons/fa";

function About() {
  return (
    <div className="profile">
      <img src={avatarImage} alt="" className="profile-image" />
      <h1 className="profile-text">Hi I am kishan Sheth</h1>
      <h2 className="profile-text">The creator of this awesome pokedex</h2>
      <h4 className="profile-text">
        This project is created for youtube tutorial for my channel Kishan Sheth
      </h4>
      <div className="profile-links">
        <a href="https://github.com/koolkishan">
          <FaGithub />
        </a>
        <a href="https://www.youtube.com/c/KishanSheth21">
          <FaYoutube />
        </a>
        <a href="https://www.linkedin.com/in/koolkishan/">
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}

export default Wrapper(About);

import React from "react";
import { Link } from "react-router-dom";
import ball from "../../assets/pokeball.png";
import css from "./nav.module.css";

export const Nav = () => {
  return (
    <div className={css.navbar}>
      <img className={css.logo} src={ball} alt="pokemon ball" />

      <div className={css.teamslink}>
        <Link to="/my-teams">My Team</Link>
      </div>
    </div>
  );
};

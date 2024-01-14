import React, { useState } from "react";
import ball from "../../assets/pokeball.png";
import css from "./nav.module.css";

export const Nav = () => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={css.navbar}>
      <img className={css.logo} src={ball} alt="pokemon ball" />

      <div className={css.teamslink}>
        <a href="/">My Team</a>
      </div>
    </div>
  );
};

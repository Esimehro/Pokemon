import React, { useEffect, useState } from "react";
import none from "../../assets/no_team.png";
import myTeams from "./myteam.module.css";
import { Link, useNavigate } from "react-router-dom";
import home from "../Home/home.module.css";

const MyTeams = () => {
  const [team, setTeam] = useState([]);
  const navigate = useNavigate();

  const handleCardClick = (url) => {
    const id = url.split("/").reverse()[1];
    navigate(`/pokemons/${id}`);
  };

  useEffect(() => {
    let savedTeam = localStorage.getItem("pokemonTeam");
    try {
      savedTeam = JSON.parse(savedTeam);
      console.log(savedTeam)
      if(savedTeam) setTeam(savedTeam);
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
    <div className={myTeams.team_container}>
      {team.length > 0 ? (
        team.map((card, index) => (
          <div
            className={home.game_card_container}
            key={card.id}
            onClick={() => handleCardClick("/pokemons/" + card.id + "/")}
          >
            <Link
              key={card.id}
              to={"/pokemons/" + card.id}
            >
              <div className={home.game_card}>
                <h2 className={home.name}>{card.name}</h2>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className={myTeams.no_teams}>
          <img src={none} alt="No Teams" />
          <h3>No Pokemon added to the team.</h3>
          <Link to="/">
            Choose Pokemon
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyTeams;

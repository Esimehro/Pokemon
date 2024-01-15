import React from "react";
import none from "../../assets/no_team.png";
import myTeams from "./myteam.module.css";
import { Link } from "react-router-dom";
import { usePokemonContext } from "../PokemonContext";
import { useLocation } from "react-router-dom";

const MyTeams = () => {
    const location = useLocation();
  const selectedPokemonCards = location?.state?.selectedPokemonCards || [];
//   const { selectedPokemonCards } = usePokemonContext();

  return (
    <div className={myTeams.container}>
      {selectedPokemonCards.length > 0 ? (
        selectedPokemonCards.slice(0, 6).map((card, index) => (
          <div key={index} className={myTeams.team_card}>
            <h3>{card.name}</h3>
            <h4>Abilities:</h4>
            <ul>
              {card.abilities.map((ability, i) => (
                <li key={i}>{ability}</li>
              ))}
            </ul>
            <h4>Moves:</h4>
            <ul>
              {card.moves.map((move, i) => (
                <li key={i}>{move}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div className={myTeams.no_teams}>
          <img src={none} alt="No Teams" />
          <h3>No Pokemon added to the team.</h3>
          <Link to= "/">
            Choose Pokemon
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyTeams;


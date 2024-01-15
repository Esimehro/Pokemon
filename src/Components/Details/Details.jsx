import React, { useState, useEffect } from "react";
import details from "./details.module.css";
import { useParams } from "react-router";
import { useNavigate, Link } from "react-router-dom";
import { usePokemonContext } from "../PokemonContext";

const Details = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [abilities, setAbilities] = useState([" "]);
  const [moves, setMoves] = useState([" "]);
  const [experiences, setExperiences] = useState([]);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [stats, setStats] = useState([]);
  const [sprites, setSprites] = useState({});
  const [types, setTypes] = useState([]);
  // const [selectedPokemonCards, setSelectedPokemonCards] = useState([]);

  const { addPokemonToTeam } = usePokemonContext();
  const { id } = useParams();
  const navigate = useNavigate();
 

  const fetchDetails = async () => {
    try {
      const responseDetails = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      if (!responseDetails.ok) {
        throw new Error(`HTTP error! Status: ${responseDetails.status}`);
      }

      const pokemonDetails = await responseDetails.json();
      console.log(pokemonDetails);


      const abilities = pokemonDetails.abilities.map(
        (ability) => ability.ability.name
      );
      const moves = pokemonDetails.moves.map((move) => move.move.name);
      const experiences = [pokemonDetails.base_experience];
      const height = pokemonDetails.height;
      const weight = pokemonDetails.weight;
      const stats = pokemonDetails.stats;
      const sprites = pokemonDetails.sprites;
      const types = pokemonDetails.types;

      setAbilities(abilities);
      setMoves(moves);
      setExperiences(experiences);
      setHeight(height);
      setWeight(weight);
      setStats(stats);
      setSprites(sprites);
      setTypes(types);
    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleAddToTeam = () => {
    if (selectedCard !== null) {
      const selectedPokemon = data[selectedCard];
      addPokemonToTeam({
        name: selectedPokemon.name,
        abilities,
        moves,
        experiences,
      });
      
      console.log("Added to team!");
    console.log("Before navigation");
    navigate("/my-teams");
    console.log("After navigation")
    }
  };


  return (
    <div className={details.game_card_back}>
      <div className={details.game_btn}>
        <button className={details.add_btn} onClick={handleAddToTeam}>
          Add to Team
        </button>
        
        <Link to="/" className={details.back_btn}>
          Home
        </Link>
      </div>

      <div className={details.game_details}>
        <div className={details.details}>
          <h3>Abilities:</h3>
          <ul className={details.list}>
            {abilities.map((ability, i) => (
              <li key={i}>{ability}</li>
            ))}
          </ul>
        </div>

        <div className={details.details}>
          <h3>Moves:</h3>
          <ul className={details.list}>
            {moves.map((move, i) => (
              <li key={i}>{move}</li>
            ))}
          </ul>
        </div>

        <div className={details.details}>
          <h3>Base Experience:</h3>
          <p>{experiences}</p>
        </div>

        <div className={details.details}>
          <h3>Height:</h3>
          <p>{height}</p>
        </div>

        <div className={details.details}>
          <h3>Weight:</h3>
          <p>{weight}</p>
        </div>

        <div className={details.details}>
          <h3>Stats:</h3>
          <ul className={details.list}>
            {stats.map((stat, i) => (
              <li key={i}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>

        <div className={details.details}>
          <h3>Sprites:</h3>
          <img src={sprites.front_default} alt="Pokemon Sprite" />
        </div>

        <div className={details.details}>
          <h3>Types:</h3>
          <ul className={details.list}>
            {types.map((type, i) => (
              <li key={i}>{type.type.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;

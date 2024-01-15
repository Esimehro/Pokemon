import React, { useState, useEffect, useRef } from "react";
import details from "./details.module.css";
import { useParams } from "react-router";

const Details = () => {
  const [pokemon, setPokemon] = useState(null);
  const [abilities, setAbilities] = useState([" "]);
  const [moves, setMoves] = useState([" "]);
  const [experiences, setExperiences] = useState([]);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [stats, setStats] = useState([]);
  const [sprites, setSprites] = useState({});
  const [types, setTypes] = useState([]);
  const [team, setTeam] = useState([]);
  const firstTime = useRef(true);

  const { id } = useParams();


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

      setPokemon({
        id,
        name: pokemonDetails.name,
        url: pokemonDetails.url
      });
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

  useEffect(() => {
    let savedTeam = localStorage.getItem("pokemonTeam");
    try {
      savedTeam = JSON.parse(savedTeam);
      if (savedTeam) setTeam(savedTeam);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (team) {
      if (firstTime.current) {
        firstTime.current = false;
      } else {
        try {
          const rawTeam = JSON.stringify(team);
          localStorage.setItem("pokemonTeam", rawTeam);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [team]);

  const handleAddToTeam = () => {
    if (pokemon !== null) {
      const exists = team.find(p => p.id == pokemon.id);
      if (!exists && team.length < 6) {
        const newTeam = [...team];
        newTeam.push(pokemon);
        setTeam(newTeam);
      }
    }
  };

  const handleRemoveFromTeam = () => {
    if (pokemon !== null) {
      const newTeam = team.filter(p => p.id != id);
      setTeam(newTeam);
    }
  };

  return (
    <div className={details.game_card_back}>
      <div className={details.game_btn}>
        {
          team.find(p => p.id == id) ? (
            <button className={details.add_btn} onClick={handleRemoveFromTeam}>
              Remove from Team
            </button>
          ) : (
            <button className={details.add_btn} onClick={handleAddToTeam}>
              Add to Team
            </button>
          )
        }
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

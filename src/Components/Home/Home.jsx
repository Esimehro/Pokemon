import React, { useState, useEffect } from "react";
import home from "./home.module.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const actualData = await response.json();
        console.log(actualData.results);
        setData(actualData.results);
        setError(null);
      } catch (error) {
        setError(error.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCardClick = (url) => {
    const id = url.split("/").reverse()[1];
    console.log("Selected ID:", id);
    setSelectedCard(id);
    navigate(`/pokemons/${id}`);
  };

  return (
    <div className={home.container}>
      <input
        className={home.inputfield}
        type="search"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      
      <div className={home.card_container}>
        {error && (
          <div>{`There is a problem fetching the data - ${error}`}</div>
        )}
        {data &&
          data
            .filter((result) =>
              result.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((results, index) => {
              return (
                <div
                  className={home.game_card_container}
                  key={results.url}
                  onClick={() => handleCardClick(results.url)}
                >
                  <Link
                    key={results.url}
                    to={"/pokemons/" + results.url.split("/").reverse()[1]}
                  >
                    <div className={home.game_card}>
                      <h2 className={home.name}>{results.name}</h2>
                    </div>
                  </Link>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Home;

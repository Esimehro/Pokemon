import React, { useState, useEffect } from "react";
import home from "./home.module.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData.results);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setData(null);
        setDetails(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCardClick = (index) => {
    setSelectedCard(selectedCard === index ? null : index);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
                  onClick={() => handleCardClick(index)}
                >
                  <div className={home.game_card}>
                    <h2 className={home.name}>{results.name}</h2>
                  </div>

                  <div className={home.game_card_back}>
                    <div className={home.details}>
                      <p>Details of the card go here...</p>
                      <button
                        className={home.add_btn}
                        onClick={() => alert("Add button clicked")}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Home;

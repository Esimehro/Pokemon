import React, { createContext, useContext, useState } from "react";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [selectedPokemonCards, setSelectedPokemonCards] = useState([]);

  const addPokemonToTeam = (pokemon) => {
    if (selectedPokemonCards.length < 6) {
      setSelectedPokemonCards((prevCards) => [...prevCards, pokemon]);
    }
  };

  return (
    <PokemonContext.Provider value={{ selectedPokemonCards, addPokemonToTeam }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  return useContext(PokemonContext);
};

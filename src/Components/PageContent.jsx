import React, { useState } from "react";
import { Nav } from "./Nav/Nav";
import Home from "./Home/Home";
import MyTeams from "./Teams/MyTeams";
import Details from "./Details/Details";
import NotFound from "./NotFound/NotFound";
import { Route, Routes } from "react-router-dom";

const PageContent = () => {
  return (
    <div className="page-content">
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/my-teams' element={<MyTeams />} />
        <Route path='/pokemons/:id' element={<Details />} />
        {/* * - wildcard */}
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
};

export default PageContent;

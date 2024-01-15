import React, { useState } from "react";
import { Nav } from "./Nav/Nav";
import Home from "./Home/Home";

const PageContent = () => {
  return (
    <div className="page-content">
      <Nav />
      <Home />
    </div>
  );
};

export default PageContent;

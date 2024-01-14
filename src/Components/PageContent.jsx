import React, { useState } from "react";
import { Nav } from "./Nav/Nav";
import Home from "./Home/Home";

const PageContent = () => {
  return (
    <div>
      <Nav />
      <Home />
    </div>
  );
};

export default PageContent;

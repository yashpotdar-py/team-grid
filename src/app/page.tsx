"use client";

import React, { useState } from "react";
import Timer from "./components/Timer";
import Grid from "./components/Grid";

const HomePage: React.FC = () => {
  const [activeCellCount, setActiveCellCount] = useState(0);

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <h1 className="heading">
        Techathon <span className="highlight">'25</span>
      </h1>
      <Timer />
      <Grid onActiveCellChange={setActiveCellCount} />
      <div className="active-count-main">
        {`Number of teams that have checked in: ${activeCellCount}`}
      </div>
    </div>
  );
};

export default HomePage;

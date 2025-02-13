"use client";

import React, { useState, useEffect } from "react";

interface GridProps {
  onActiveCellChange: (count: number) => void;
}

interface Team {
  teamNumber: number;
  teamName: string;
  teamImage?: string;
  problemStatement: string;
}

const Grid: React.FC<GridProps> = ({ onActiveCellChange }) => {
  const [activeTeams, setActiveTeams] = useState<Team[]>([]);

  const fetchActiveTeams = () => {
    fetch("/api/handleCell")
      .then((response) => response.json())
      .then((data) => {
        setActiveTeams(data.activeTeams);
        onActiveCellChange(data.activeTeams.length);
      });
  };

  useEffect(() => {
    // Fetch the active teams initially
    fetchActiveTeams();

    // Set up polling to fetch active teams every 5 seconds
    const intervalId = setInterval(fetchActiveTeams, 500);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [onActiveCellChange]);

  const cells = Array.from({ length: 320 }, (_, i) => ({
    number: i + 1,
    name: `Team ${i + 1}`,
    image: `/images/team${i + 1}.png`, // Optional image path
  }));

  const formatNumber = (num: number) => {
    return `#${num.toString().padStart(3, "0")}`;
  };

  const toggleCellState = (number: number) => {
    const activeTeam = activeTeams.find((team) => team.teamNumber === number);
    if (activeTeam) {
      // Send DELETE request to make the cell inactive
      fetch("/api/handleCell", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamNumber: number }),
      })
        .then((response) => response.json())
        .then((data) => {
          setActiveTeams(data.activeTeams);
          onActiveCellChange(data.activeTeams.length);
        });
    } else {
      // Send POST request to make the cell active
      fetch("/api/handleCell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamNumber: number,
          teamName: `Team ${number}`,
          problemStatement: "",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setActiveTeams(data.activeTeams);
          onActiveCellChange(data.activeTeams.length);
        });
    }
  };

  useEffect(() => {
    onActiveCellChange(activeTeams.length);
  }, [activeTeams, onActiveCellChange]);

  return (
    <div className="grid-container">
      {cells.map((cell) => {
        const activeTeam = activeTeams.find(
          (team) => team.teamNumber === cell.number
        );
        return (
          <div
            key={cell.number}
            className={`grid-cell ${activeTeam ? "active" : "inactive"}`}
            // onClick={() => toggleCellState(cell.number)}
          >
            {activeTeam && activeTeam.teamImage && (
              <img src={activeTeam.teamImage} alt={activeTeam.teamName} />
            )}
            <div className="team-name">
              {activeTeam ? activeTeam.teamName : cell.name}
            </div>
            <div className="team-number">{formatNumber(cell.number)}</div>
            {activeTeam && (
              <div className="problem-statement">
                {activeTeam.problemStatement}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;

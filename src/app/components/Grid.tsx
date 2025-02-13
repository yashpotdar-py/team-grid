"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface GridProps {
  onActiveCellChange: (count: number) => void;
}

interface Team {
  teamNumber: number;
  teamName: string;
  teamImage?: string;
  problemStatement: string;
  teamState: string;
}

const Grid: React.FC<GridProps> = ({ onActiveCellChange }) => {
  const [activeTeams, setActiveTeams] = useState<Team[]>([]);

  const fetchActiveTeams = () => {
    fetch("/api/handleCell")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setActiveTeams(data.activeTeams);
        onActiveCellChange(data.activeTeams.length);
      })
      .catch((error) => {
        console.error("Failed to fetch active teams:", error);
      });
  };

  useEffect(() => {
    // Fetch the active teams initially
    fetchActiveTeams();

    // Set up polling to fetch active teams every 5 seconds
    const intervalId = setInterval(fetchActiveTeams, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchActiveTeams, onActiveCellChange]);

  const cells = Array.from({ length: 320 }, (_, i) => ({
    number: i + 1,
    name: `Team ${i + 1}`,
  }));

  const formatNumber = (num: number) => {
    return `#${num.toString().padStart(3, "0")}`;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
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
          >
            {activeTeam && activeTeam.teamImage && isValidUrl(activeTeam.teamImage) && (
              <Image
                src={activeTeam.teamImage}
                alt={activeTeam.teamName}
                width={100}
                height={100}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
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

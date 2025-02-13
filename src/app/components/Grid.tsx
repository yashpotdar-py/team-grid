"use client";

import React, { useState, useEffect } from "react";

interface GridProps {
  onActiveCellChange: (count: number) => void;
}

const Grid: React.FC<GridProps> = ({ onActiveCellChange }) => {
  const [activeCells, setActiveCells] = useState<number[]>([]);

  const cells = Array.from({ length: 320 }, (_, i) => ({
    number: i + 1,
    name: `Team ${i + 1}`,
    image: `/images/team${i + 1}.png`, // Optional image path
  }));

  const formatNumber = (num: number) => {
    return `#${num.toString().padStart(3, '0')}`;
  };

  const toggleCellState = (number: number) => {
    setActiveCells((prev) =>
      prev.includes(number) ? prev.filter((n) => n !== number) : [...prev, number]
    );
  };

  useEffect(() => {
    onActiveCellChange(activeCells.length);
  }, [activeCells, onActiveCellChange]);

  return (
    <div className="grid-container">
      {cells.map((cell) => (
        <div
          key={cell.number}
          className={`grid-cell ${activeCells.includes(cell.number) ? "active" : "inactive"}`}
          onClick={() => toggleCellState(cell.number)}
        >
          {/* <img src={cell.image} alt={cell.name} /> */}
          <div className="team-name">{cell.name}</div>
          <div className="team-number">{formatNumber(cell.number)}</div>
        </div>
      ))}
    </div>
  );
};

export default Grid;
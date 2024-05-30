// src/components/Board.js
import React, { useState } from 'react';
import Column from './Column';
import './Board.css';

const initialColumns = [
  { id: 1, title: 'To do', cards: ['Project planning', 'Kickoff meeting', 'test'] },
  { id: 2, title: 'In Progress', cards: ['sdfsdf', 'fsdf'] },
  { id: 3, title: 'Done', cards: [] },
  { id: 4, title: 'Staging', cards: [] }
];

const Board = ({ onCardClick }) => {
  const [columns, setColumns] = useState(initialColumns);

  const addCard = (columnId, cardText) => {
    setColumns(columns.map(column => {
      if (column.id === columnId) {
        return { ...column, cards: [...column.cards, cardText] };
      }
      return column;
    }));
  };

  return (
    <div className="board">
      {columns.map(column => (
        <Column key={column.id} column={column} onCardClick={onCardClick} addCard={addCard} />
      ))}
    </div>
  );
};

export default Board;

import React from 'react';
import Column from './Column';
import './Board.css';

const Board = () => {
  const columns = [
    { id: 1, title: 'To do', cards: ['Project planning', 'Kickoff meeting', 'test'] },
    { id: 2, title: 'In Progress', cards: ['sdfsdf', 'fsdf'] },
    { id: 3, title: 'Done', cards: [] },
    { id: 4, title: 'Staging', cards: [] },
  ];
//   Namaste I am Rudraprasad Mohapatra

  return (
    <div className="board">
      {columns.map((column) => (
        <Column key={column.id} title={column.title} cards={column.cards} />
      ))}
    </div>
  );
};

export default Board;

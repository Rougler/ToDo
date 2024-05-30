// src/components/Board.js
import React, { useState } from 'react';
import './Board.css';

const initialData = [
  { id: 1, title: 'Project planning', listTitle: 'To do' },
  { id: 2, title: 'Kickoff meeting', listTitle: 'To do' },
  { id: 3, title: 'sdfsdf', listTitle: 'In Progress' },
  { id: 4, title: 'fsdf', listTitle: 'In Progress' },
];

const Board = ({ onCardClick }) => {
  const [cards] = useState(initialData);

  return (
    <div className="board">
      {['To do', 'In Progress', 'Done', 'Staging'].map((listTitle) => (
        <div key={listTitle} className="list">
          <h3>{listTitle}</h3>
          {cards
            .filter((card) => card.listTitle === listTitle)
            .map((card) => (
              <div
                key={card.id}
                className="card"
                onClick={() => onCardClick(card)}
              >
                {card.title}
              </div>
            ))}
          <button className="add-card">+ Add a card</button>
        </div>
      ))}
    </div>
  );
};

export default Board;

import React, { useState } from 'react';
import Card from './Card.js';
import './Column.css';

const Column = ({ title, cards }) => {
  const [newCardText, setNewCardText] = useState('');
  const [cardList, setCardList] = useState(cards);

  const addCard = () => {
    if (newCardText.trim()) {
      setCardList([...cardList, newCardText]);
      setNewCardText('');
    }
  };

  return (
    <div className="column">
      <h2>{title}</h2>
      {cardList.map((card, index) => (
        <Card key={index} text={card} />
      ))}
      <div className="add-card">
        <input 
          type="text" 
          value={newCardText} 
          onChange={(e) => setNewCardText(e.target.value)} 
          placeholder="Add a card" 
        />
        <button onClick={addCard}>Add</button>
      </div>
    </div>
  );
};

export default Column;

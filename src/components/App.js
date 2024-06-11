import React, { useState } from 'react';
import CardDetailTitle from './CardDetailTitle';
import './App.css';

// Simulated API call function
const updateCard = async (cardId, updatedData) => {
  // Simulate an API request with a timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Card ${cardId} updated with`, updatedData);
      resolve();
    }, 1000);
  });
};

const App = () => {
  const [card, setCard] = useState({
    id: 1,
    title: 'Sample Card Title',
    description: 'This is a sample card description.',
  });

  const handleUpdateCard = async (cardId, updatedData) => {
    await updateCard(cardId, updatedData);
    setCard((prevCard) => ({
      ...prevCard,
      ...updatedData,
    }));
  };

  return (
    <div className="app">
      <CardDetailTitle card={card} updateCard={handleUpdateCard} />
      {/* Include other components like CardDetailBody */}
    </div>
  );
};

export default App;

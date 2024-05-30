import React, { useState } from 'react';
import Board from './components/Board';
import CardDetail from './components/CardDetail';
import './App.css';

function App() {
  const [selectedCard, setSelectedCard] = useState(null);

  const openCardDetail = (card) => {
    setSelectedCard(card);
  };

  const closeCardDetail = () => {
    setSelectedCard(null);
  };

  return (
    <div className="App">
      <Board onCardClick={openCardDetail} />
      {selectedCard && (
        <CardDetail card={selectedCard} onClose={closeCardDetail} />
      )}
    </div>
  );
}

export default App;

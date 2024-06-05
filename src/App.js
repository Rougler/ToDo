import React, { useState } from 'react';
import Board from './components/Board';
import CardDetail from './components/CardDetail';
import Sidebar from './components/sidebar.js'; // Import Sidebar component
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
      <Sidebar /> {/* Add Sidebar component */}
      <div className="main-content">
        <Board onCardClick={openCardDetail} />
        {selectedCard && (
          <CardDetail card={selectedCard} onClose={closeCardDetail} />
        )}
      </div>
    </div>
  );
}

export default App;

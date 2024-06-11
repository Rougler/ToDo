import React, { useState } from 'react';
import './Board.css';
import AddListForm from './AddListForm';
import DeleteColumn from './DeleteColumn';
import CardDetail from './CardDetail'; // Import the CardDetail component

const initialData = [
  { id: 1, title: 'Project planning', listTitle: 'To do' },
  { id: 2, title: 'Kickoff meeting', listTitle: 'To do' },
  { id: 3, title: 'sdfsdf', listTitle: 'In Progress' },
  { id: 4, title: 'fsdf', listTitle: 'In Progress' },
];

const initialLists = ['To do', 'In Progress', 'Done', 'Staging'];

const Board = () => {
  const [cards, setCards] = useState(initialData);
  const [lists, setLists] = useState(initialLists);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [selectedList, setSelectedList] = useState('');
  const [selectedCard, setSelectedCard] = useState(null); // State to manage the selected card for details

  const addCard = (listTitle) => {
    if (newCardTitle.trim()) {
      const newCard = {
        id: cards.length + 1,
        title: newCardTitle,
        listTitle: listTitle,
      };
      setCards([...cards, newCard]);
      setNewCardTitle('');
      setSelectedList('');
    }
  };

  const addList = (newListTitle) => {
    if (!lists.includes(newListTitle)) {
      setLists([...lists, newListTitle]);
    }
  };

  const deleteList = (listTitle) => {
    setLists(lists.filter((list) => list !== listTitle));
    setCards(cards.filter((card) => card.listTitle !== listTitle));
  };

  const handleMoveCard = (cardId, newListTitle, newPosition) => {
    const cardIndex = cards.findIndex(card => card.id === cardId);
    const updatedCard = { ...cards[cardIndex], listTitle: newListTitle };
    const updatedCards = cards.filter(card => card.id !== cardId);
    updatedCards.splice(newPosition - 1, 0, updatedCard);
    setCards(updatedCards);
  };

  return (
    <div className="board">
      {lists.map((listTitle) => (
        <div key={listTitle} className="list">
          <div className="list-header">
            <DeleteColumn listTitle={listTitle} onDelete={deleteList} />
            <h3>{listTitle}</h3>
          </div>
          {cards
            .filter((card) => card.listTitle === listTitle)
            .map((card) => (
              <div
                key={card.id}
                className="card"
                onClick={() => setSelectedCard(card)} // Set the selected card for details
              >
                {card.title}
              </div>
            ))}
          <div className="add-card-section">
            {selectedList === listTitle && (
              <textarea
                placeholder="Card title"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addCard(listTitle);
                  }
                }}
              />
            )}
            <button
              className="add-card"
              onClick={() =>
                selectedList === listTitle
                  ? addCard(listTitle)
                  : setSelectedList(listTitle)
              }
            >
              + Add a card
            </button>
          </div>
        </div>
      ))}
      <AddListForm onAddList={addList} />

      {selectedCard && (
        <CardDetail
          card={selectedCard}
          lists={lists}
          onMove={handleMoveCard}
          onClose={() => setSelectedCard(null)} // Close the CardDetail modal
        />
      )}
    </div>
  );
};

export default Board;

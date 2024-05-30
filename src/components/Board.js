import React, { useState } from 'react';
import './Board.css';

const initialData = [
  { id: 1, title: 'Project planning', listTitle: 'To do' },
  { id: 2, title: 'Kickoff meeting', listTitle: 'To do' },
  { id: 3, title: 'sdfsdf', listTitle: 'In Progress' },
  { id: 4, title: 'fsdf', listTitle: 'In Progress' },
];

const initialLists = ['To do', 'In Progress', 'Done', 'Staging'];

const Board = ({ onCardClick }) => {
  const [cards, setCards] = useState(initialData);
  const [lists, setLists] = useState(initialLists);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [selectedList, setSelectedList] = useState('');
  const [newListTitle, setNewListTitle] = useState('');

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

  const addList = () => {
    if (newListTitle.trim() && !lists.includes(newListTitle)) {
      setLists([...lists, newListTitle]);
      setNewListTitle('');
    }
  };

  return (
    <div className="board">
      {lists.map((listTitle) => (
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
          <div className="add-card-section">
            {selectedList === listTitle && (
              <input
                type="text"
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
      <div className="list add-new-list">
        <h3>Add Another List</h3>
        <input
          type="text"
          placeholder="New list title"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
        />
        <button onClick={addList}>Add List</button>
      </div>
    </div>
  );
};

export default Board;


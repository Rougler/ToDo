import React, { useState } from 'react';
import './Board.css';
import AddListForm from './AddListForm';
import DeleteColumn from './DeleteColumn';
import CardDetail from './CardDetail';

const initialData = [
  { id: 1, title: 'Project planning', listTitle: 'To do', coverColor: '' },
  { id: 2, title: 'Kickoff meeting', listTitle: 'To do', coverColor: '' },
  { id: 3, title: 'sdfsdf', listTitle: 'In Progress', coverColor: '' },
  { id: 4, title: 'fsdf', listTitle: 'In Progress', coverColor: '' },
];

const initialLists = ['To do', 'In Progress', 'Done', 'Staging'];

const Board = () => {
  const [cards, setCards] = useState(initialData);
  const [lists, setLists] = useState(initialLists);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [selectedList, setSelectedList] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  const addCard = (listTitle) => {
    if (newCardTitle.trim() === '') return;

    const newCard = {
      id: cards.length + 1,
      title: newCardTitle,
      listTitle,
      coverColor: '',
    };

    setCards([...cards, newCard]);
    setNewCardTitle('');
    setSelectedList('');
  };

  const deleteCard = (cardId) => {
    setCards(cards.filter((card) => card.id !== cardId));
    setSelectedCard(null);
  };

  const moveCard = (cardId, newListTitle, newPosition) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, listTitle: newListTitle } : card
    );
    setCards(updatedCards);
  };

  const saveTitle = (cardId, newTitle) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, title: newTitle } : card
    );
    setCards(updatedCards);
  };

  const saveCoverColor = (cardId, newColor) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, coverColor: newColor } : card
    );
    setCards(updatedCards);
  };

  return (
    <div className="board">
      {lists.map((listTitle, index) => (
        <div key={index} className="list">
          <DeleteColumn listTitle={listTitle} />
          <div className="list-header">
            <h3>{listTitle}</h3>
          </div>
          <div className="cards">
            {cards.filter((card) => card.listTitle === listTitle).map((card) => (
              <div
                key={card.id}
                className="card"
                onClick={() => setSelectedCard(card)}
                style={{ backgroundColor: card.coverColor }}
              >
                {card.title}
              </div>
            ))}
          </div>
          <AddListForm
            listTitle={listTitle}
            addCard={addCard}
            newCardTitle={newCardTitle}
            setNewCardTitle={setNewCardTitle}
            setSelectedList={setSelectedList}
          />
        </div>
      ))}
      {selectedCard && (
        <CardDetail
          card={selectedCard}
          lists={lists}
          onMove={moveCard}
          onClose={() => setSelectedCard(null)}
          onSaveTitle={saveTitle}
          onDelete={deleteCard}
          onSaveCoverColor={saveCoverColor}
        />
      )}
    </div>
  );
};

export default Board;

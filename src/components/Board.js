import React, { useState, useEffect, useRef } from 'react';
import './Board.css';
import AddListForm from './AddListForm';
import DeleteColumn from './DeleteColumn';
import CardDetail from './CardDetail';

const initialData = [
  { id: 1, title: 'Project planning', listTitle: 'To do', coverColor: '', checked: false },
  { id: 2, title: 'Kickoff meeting', listTitle: 'To do', coverColor: '', checked: false },
  { id: 3, title: 'sdfsdf', listTitle: 'In Progress', coverColor: '', checked: false },
  { id: 4, title: 'fsdf', listTitle: 'In Progress', coverColor: '', checked: false },
];

const initialLists = ['To do', 'In Progress', 'Done', 'Staging'];

const Board = () => {
  const [cards, setCards] = useState(initialData);
  const [lists, setLists] = useState(initialLists);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [selectedList, setSelectedList] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (textareaRef.current && !textareaRef.current.contains(event.target)) {
        if (newCardTitle.trim() === '') {
          setSelectedList('');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [newCardTitle]);

  const addCard = (listTitle) => {
    if (newCardTitle.trim() === '') return;

    const newCard = {
      id: cards.length + 1,
      title: newCardTitle,
      listTitle: listTitle,
      coverColor: '',
      checked: false,
    };

    setCards([...cards, newCard]);
    setNewCardTitle('');
    setSelectedList('');
  };

  const deleteCard = (cardId) => {
    setCards(cards.filter((card) => card.id !== cardId));
    setSelectedCard(null);
  };

  const moveCard = (cardId, newListTitle) => {
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

  const addList = (listTitle) => {
    if (listTitle.trim() === '') return;
    setLists([...lists, listTitle]);
  };

  const deleteList = (listTitle) => {
    setLists(lists.filter((list) => list !== listTitle));
    setCards(cards.filter((card) => card.listTitle !== listTitle));
  };

  const handleMoveCard = (cardId, newListTitle) => {
    moveCard(cardId, newListTitle);
  };

  const handleDeleteCard = (cardId) => {
    deleteCard(cardId);
  };

  const handleSaveTitle = (cardId, newTitle) => {
    saveTitle(cardId, newTitle);
  };

  const handleSaveCoverColor = (cardId, newColor) => {
    saveCoverColor(cardId, newColor);
  };

  const handleCopyCard = (card) => {
    const newCard = { ...card, id: cards.length + 1, title: `${card.title} (Copy)` };
    const index = cards.findIndex(c => c.id === card.id);
    const updatedCards = [
      ...cards.slice(0, index + 1),
      newCard,
      ...cards.slice(index + 1)
    ];
    setCards(updatedCards);
  };

  const handleCheckboxToggle = (cardId) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, checked: !card.checked } : card
    );
    setCards(updatedCards);
  };

  return (
    <div className="board">
      {lists.map((listTitle, index) => (
        <div key={index} className="list">
          <div className="list-header">
            <h3>{listTitle}</h3>
            <DeleteColumn listTitle={listTitle} onDelete={deleteList} />
          </div>
          <div className="cards">
            {cards.filter((card) => card.listTitle === listTitle).map((card) => (
              <div
                key={card.id}
                className="card"
                onClick={() => setSelectedCard(card)}
                style={{ backgroundColor: card.coverColor }}
              >
                <div className="checkbox-wrapper-12">
                  <div className="cbx">
                    <input
                      type="checkbox"
                      id={`cbx-${card.id}`}
                      checked={card.checked}
                      onChange={() => handleCheckboxToggle(card.id)}
                    />
                    <label htmlFor={`cbx-${card.id}`}></label>
                    <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
                      <path d="M2 8.36364L6.23077 12L13 2"></path>
                    </svg>
                  </div>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <filter id="goo-12">
                        <feGaussianBlur result="blur" stdDeviation="4" in="SourceGraphic"></feGaussianBlur>
                        <feColorMatrix result="goo-12" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" mode="matrix" in="blur"></feColorMatrix>
                        <feBlend in2="goo-12" in="SourceGraphic"></feBlend>
                      </filter>
                    </defs>
                  </svg>
                </div>
                <span onClick={() => setSelectedCard(card)}>
                  {card.title}
                </span>
              </div>
            ))}
          </div>
          <div className="add-card-section">
            {selectedList === listTitle && (
              <textarea
                ref={textareaRef}
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
              + Add Task
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
          onClose={() => setSelectedCard(null)}
          onDelete={handleDeleteCard}
          onSaveTitle={handleSaveTitle}
          onSaveCoverColor={handleSaveCoverColor}
          onCopyCard={handleCopyCard}
        />
      )}
    </div>
  );
};

export default Board;

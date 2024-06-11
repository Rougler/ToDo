import React, { useState } from 'react';
import './CardDetail.css';
import MoveCard from './MoveCard'; // Import the MoveCard component
import BasicDateRangePicker from './Date'; // Import the date picker component

const CardDetail = ({ card, lists, onMove, onClose, onSaveTitle }) => { // Add onSaveTitle prop
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showMoveCard, setShowMoveCard] = useState(false); // State to manage the visibility of MoveCard modal
  const [showDatePicker, setShowDatePicker] = useState(false); // State to manage the visibility of date picker
  const [showChecklist, setShowChecklist] = useState(false); // State to manage the visibility of checklist
  const [checklistItems, setChecklistItems] = useState([]);
  const [newChecklistItem, setNewChecklistItem] = useState('');

  const [isEditingTitle, setIsEditingTitle] = useState(false); // State to manage edit mode for the title
  const [title, setTitle] = useState(card.title); // State for the card title

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker); // Toggle the visibility state of the date picker
  };

  const toggleChecklist = () => {
    setShowChecklist(!showChecklist); // Toggle the visibility state of the checklist
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setChecklistItems([...checklistItems, { text: newChecklistItem, completed: false }]);
      setNewChecklistItem('');
    }
  };

  const handleToggleChecklistItem = (index) => {
    const updatedItems = checklistItems.map((item, i) => 
      i === index ? { ...item, completed: !item.completed } : item
    );
    setChecklistItems(updatedItems);
  };

  const handleDeleteChecklistItem = (index) => {
    const updatedItems = checklistItems.filter((_, i) => i !== index);
    setChecklistItems(updatedItems);
  };

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleSaveTitle = () => {
    onSaveTitle(card.id, title); // Call the onSaveTitle callback with the updated title
    setIsEditingTitle(false);
  };

  return (
    <div className="modal-one">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        
        <div className="title-section">
          {isEditingTitle ? (
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h2>{title}</h2>
          )}
          {isEditingTitle ? (
            <button onClick={handleSaveTitle}>Save</button>
          ) : (
            <button onClick={handleEditTitle}>Edit</button>
          )}
        </div>

        <div className="description">
          <h3>Description</h3>
          <textarea
            placeholder="Add a more detailed description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="sidebar">
          <h3>Add to card</h3>
          <div className='sidebar-button'>
            <button onClick={toggleChecklist}>Checklist</button>
            <button onClick={toggleDatePicker}>Dates</button> {/* Call toggleDatePicker on button click */}
            {showDatePicker && (
              <div className="date-picker-popup"> {/* Wrap the date picker in a div with a class for styling */}
                <BasicDateRangePicker />
              </div>
            )} {/* Render date picker if showDatePicker is true */}
            <button>Attachment</button>
            <button>Custom Fields</button>
          </div>

          {showChecklist && (
            <div className="checklist">
              <h3>Checklist</h3>
              {checklistItems.map((item, index) => (
                <div key={index} className="checklist-item">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleToggleChecklistItem(index)}
                  />
                  <input
                    type="text"
                    value={item.text}
                    readOnly
                  />
                  <button onClick={() => handleDeleteChecklistItem(index)}>Delete</button>
                </div>
              ))}
              <div className="checklist-item">
                <input
                  type="text"
                  placeholder="Add an item"
                  value={newChecklistItem}
                  onChange={(e) => setNewChecklistItem(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddChecklistItem();
                    }
                  }}
                />
                <button onClick={handleAddChecklistItem}>Add</button>
              </div>
            </div>
          )}

          <h3>Automation</h3>
          <div className='sidebar-button'>
            <button>Add button</button>
          </div>

          <h3>Actions</h3>
          <div className='sidebar-button'>
            <button onClick={() => setShowMoveCard(true)}>Move</button> {/* Add onClick event */}
            <button>Archive</button>
            <button>Share</button>
          </div>
        </div>
      </div>
      {showMoveCard && (
        <MoveCard
          card={card}
          lists={lists}
          onMove={(cardId, newListTitle, newPosition) => {
            onMove(cardId, newListTitle, newPosition);
            setShowMoveCard(false); // Close the MoveCard modal after moving the card
          }}
          onClose={() => setShowMoveCard(false)} // Close the MoveCard modal
        />
      )}
    </div>
  );
};

export default CardDetail;

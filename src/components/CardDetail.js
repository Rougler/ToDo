import React, { useState } from 'react';
import './CardDetail.css';
import MoveCard from './MoveCard';
import ResponsiveDateRangePickers from './Date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPaperclip } from '@fortawesome/free-solid-svg-icons';

const CardDetail = ({ card, lists, onMove, onClose, onSaveTitle }) => {
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showMoveCard, setShowMoveCard] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [checklistItems, setChecklistItems] = useState([]);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [attachments, setAttachments] = useState([]);
  const [showAttachmentInput, setShowAttachmentInput] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleChecklist = () => {
    setShowChecklist(!showChecklist);
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
    onSaveTitle(card.id, title);
    setIsEditingTitle(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachments([...attachments, { name: file.name, file }]);
    }
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
            <FontAwesomeIcon icon={faEdit} onClick={handleEditTitle} className="edit-icon" />
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
            <button onClick={toggleDatePicker}>Dates</button>
            {showDatePicker && (
              <div className="date-picker-popup">
                <ResponsiveDateRangePickers />
              </div>
            )}
            <button onClick={() => setShowAttachmentInput(!showAttachmentInput)}>Attachment</button>
            {showAttachmentInput && (
              <div className="attachment-input">
                <input type="file" onChange={handleFileUpload} />
              </div>
            )}
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
            <button onClick={() => setShowMoveCard(true)}>Move</button>
            <button>Archive</button>
            <button>Share</button>
          </div>
        </div>

        {attachments.length > 0 && (
          <div className="attachments">
            <h3>Attachments</h3>
            {attachments.map((attachment, index) => (
              <div key={index} className="attachment">
                <FontAwesomeIcon icon={faPaperclip} />
                <span>{attachment.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {showMoveCard && (
        <MoveCard
          card={card}
          lists={lists}
          onMove={(cardId, newListTitle, newPosition) => {
            onMove(cardId, newListTitle, newPosition);
            setShowMoveCard(false);
          }}
          onClose={() => setShowMoveCard(false)}
        />
      )}
    </div>
  );
};

export default CardDetail;

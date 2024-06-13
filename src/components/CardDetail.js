import React, { useState, useEffect } from 'react';
import './CardDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import MoveCard from './MoveCard';
import ResponsiveDateRangePickers from './Date';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const CardDetail = ({ card, lists, onMove, onClose, onSaveTitle, onDelete }) => {
  const [description, setDescription] = useState(card.description || '');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showMoveCard, setShowMoveCard] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [checklistItems, setChecklistItems] = useState([]);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

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

  const handleDeleteCard = () => {
    onDelete(card.id);
  };

  const handleEditDescription = () => {
    setIsEditingDescription(true);
  };

  const handleSaveDescription = () => {
    card.description = description; // Save the description to the card
    setIsEditingDescription(false);
  };

  const handleCancelEdit = () => {
    setDescription(card.description || '');
    setIsEditingDescription(false);
  };

  useEffect(() => {
    setDescription(card.description || '');
  }, [card]);

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
            <h2>
              {title}
              <FontAwesomeIcon
                icon={faEdit}
                className="edit-icon"
                onClick={handleEditTitle}
              />
            </h2>
          )}
          {isEditingTitle && (
            <button onClick={handleSaveTitle}>Save</button>
          )}
        </div>

        <div className="description">
          <h3>Description</h3>
          {isEditingDescription ? (
            <div>
              <ReactQuill
                value={description}
                onChange={setDescription}
                modules={{
                  toolbar: [
                    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                    [{size: []}],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image', 'video'],
                    ['clean']
                  ],
                }}
              />
              <button onClick={handleSaveDescription}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <div>
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
              <button onClick={handleEditDescription}>Edit</button>
            </div>
          )}
        </div>

        <div className="sidebar">
          <h3>Add to card</h3>
          <div className='sidebar-button'>
            <a onClick={toggleChecklist}><FontAwesomeIcon icon={faEdit} /> Checklist</a>
            <a onClick={toggleDatePicker}><FontAwesomeIcon icon={faEdit} /> Dates</a>
            {showDatePicker && (
              <div className="date-picker-popup">
                <ResponsiveDateRangePickers />
              </div>
            )}
            <a><FontAwesomeIcon icon={faEdit} /> Attachment</a>
            <a><FontAwesomeIcon icon={faEdit} /> Cover</a>
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

          <h3>Actions</h3>
          <div className='sidebar-button'>
            <a onClick={() => setShowMoveCard(true)}><FontAwesomeIcon icon={faEdit} /> Move</a>
            <a onClick={handleDeleteCard}><FontAwesomeIcon icon={faEdit} /> Delete</a>
            <a><FontAwesomeIcon icon={faEdit} /> Share</a>
          </div>
        </div>
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


// srk
// src/components/CardDetail.js
import React, { useState } from 'react';
import './CardDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
<<<<<<< HEAD
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

const CardDetail = ({ card, lists, onMove, onClose }) => {
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showMoveCard, setShowMoveCard] = useState(false); // State to manage the visibility of MoveCard modal
  const [showDatePicker, setShowDatePicker] = useState(false); // State to manage the visibility of date picker
=======
import {
  faEye, faCheckSquare, faClock, faPaperclip, faMapMarkerAlt, faImage,
  faUser, faTags, faTrashAlt, faList, faAlignLeft, faComments, faEdit
} from '@fortawesome/free-solid-svg-icons';
import MoveCard from './MoveCard';
import ResponsiveDateRangePickers from './Date';

const CardDetail = ({ card, lists, onMove, onClose, onSaveTitle, onDelete }) => {
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


  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

<<<<<<< HEAD
=======
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

>>>>>>> 232a45d876749275fd433d8af10c1efcccb96d3a
  return (
    <div className="modal-one">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
<<<<<<< HEAD
        <h2>{card.title}</h2>
=======

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
>>>>>>> 232a45d876749275fd433d8af10c1efcccb96d3a

        <div className="description">
          <h3><FontAwesomeIcon icon={faAlignLeft} /> Description</h3>
          <textarea
            placeholder="Add a more detailed description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="sidebar">
          <h3>Add to card</h3>
          <div className='sidebar-button'>
<<<<<<< HEAD
            
            <button>Checklist</button>
            <button onClick={toggleDatePicker}>Dates</button> {/* Call toggleDatePicker on button click */}
=======
            <a onClick={toggleChecklist}><FontAwesomeIcon icon={faCheckSquare} /> Checklist</a>
            <a onClick={toggleDatePicker}><FontAwesomeIcon icon={faClock} /> Dates</a>
>>>>>>> 232a45d876749275fd433d8af10c1efcccb96d3a
            {showDatePicker && (
              <div className="date-picker-popup">
                <ResponsiveDateRangePickers />
              </div>
<<<<<<< HEAD
            )} {/* Render date picker if showDatePicker is true */}
            <button>Attachment</button>
            
            <button>Custom Fields</button>
=======
            )}
            <a><FontAwesomeIcon icon={faPaperclip} /> Attachment</a>

            <a><FontAwesomeIcon icon={faImage} /> Cover</a>

>>>>>>> 232a45d876749275fd433d8af10c1efcccb96d3a
          </div>


<<<<<<< HEAD
          <h3>Automation</h3>
          <div className="sidebar-button">
            <button>Add button</button>
          </div>

          <h3>Actions</h3>
          <div className="sidebar-button">
            <button>Move</button>
            <button>Copy</button>
            <button>Make template</button>
            <button>Archive</button>
            <button>Share</button>
          </div>
        </div>
      </div>
=======

          <h3>Actions</h3>
          <div className='sidebar-button'>
            <a onClick={() => setShowMoveCard(true)}><FontAwesomeIcon icon={faTags} /> Move</a>
            <a onClick={handleDeleteCard}><FontAwesomeIcon icon={faTrashAlt} /> Delete</a>
            <a><FontAwesomeIcon icon={faPaperclip} /> Share</a>
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
>>>>>>> 232a45d876749275fd433d8af10c1efcccb96d3a
    </div>
  );
};

export default CardDetail;

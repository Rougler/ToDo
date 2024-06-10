// src/components/CardDetail.js
import React, { useState } from 'react';
import './CardDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

const CardDetail = ({ card, onClose }) => {
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title); // Initialize with card title

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Here you might want to add a function to save the updated title to your backend or state management
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div className="modal-one">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={handleChange}
              className="title-input"
            />
          ) : (
            title
          )}
          {isEditing ? (
            <FontAwesomeIcon icon={faSave} className="edit-icon" onClick={handleSaveClick} />
          ) : (
            <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={handleEditClick} />
          )}
        </h2>

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
          <div className="sidebar-button">
            <button>Members</button>
            <button>Labels</button>
            <button>Checklist</button>
            <button>Dates</button>
            <button>Attachment</button>
            <button>Cover</button>
            <button>Custom Fields</button>
          </div>

          <h3>Power-Ups</h3>
          <div className="sidebar-button">
            <button>Add Power-Ups</button>
          </div>

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
    </div>
  );
};

export default CardDetail;

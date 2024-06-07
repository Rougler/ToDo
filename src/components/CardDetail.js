// src/components/CardDetail.js
import React, { useState } from 'react';
import './CardDetail.css';

const CardDetail = ({ card, onClose }) => {
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

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
        <h2>{card.title}</h2>
        

        

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
          <button>Members</button>
          <button>Labels</button>
          <button>Checklist</button>
          <button>Dates</button>
          <button>Attachment</button>
          <button>Cover</button>
          <button>Custom Fields</button>
          </div>

          <h3>Power-Ups</h3>
          <div className='sidebar-button'>
          <button>Add Power-Ups</button>
          </div>

          <h3>Automation</h3>
          <div className='sidebar-button'>
          <button>Add button</button>
          </div>

          <h3>Actions</h3>
          <div className='sidebar-button'>
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


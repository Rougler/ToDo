import React, { useState } from 'react';
import './CardDetail.css';
import ResponsiveDateRangePickers from "./Date.js";

const CardDetail = ({ card, onClose }) => {
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false); // New state to handle date picker visibility

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker); // Toggle the visibility state
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
            <button>Checklist</button>
            <button onClick={toggleDatePicker}>Dates</button> {/* Call toggleDatePicker on button click */}
            {showDatePicker && (
              <div className="date-picker-popup"> {/* Wrap the date picker in a div with a class for styling */}
                <ResponsiveDateRangePickers />
              </div>
            )} {/* Render date picker if showDatePicker is true */}
            <button>Attachment</button>
            <button>Custom Fields</button>
          </div>
          <h3>Automation</h3>
          <div className='sidebar-button'>
            <button>Add button</button>
          </div>

          <h3>Actions</h3>
          <div className='sidebar-button'>
            <button>Move</button>
            <button>Archive</button>
            <button>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;

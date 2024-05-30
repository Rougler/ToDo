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
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{card.title}</h2>
        <p><strong>in list {card.listTitle}</strong></p>

        <div className="notifications">
          <button>Watch</button>
        </div>

        <div className="description">
          <h3>Description</h3>
          <textarea
            placeholder="Add a more detailed description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="activity">
          <h3>Activity</h3>
          <div className="comments">
            {comments.map((comment, index) => (
              <div key={index} className="comment">
                <span className="comment-author">NS</span>
                <p>{comment}</p>
              </div>
            ))}
          </div>
          <textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button onClick={handleAddComment}>Add Comment</button>
        </div>

        <div className="sidebar">
          <h3>Add to card</h3>
          <button>Members</button>
          <button>Labels</button>
          <button>Checklist</button>
          <button>Dates</button>
          <button>Attachment</button>
          <button>Cover</button>
          <button>Custom Fields</button>

          <h3>Power-Ups</h3>
          <button>Add Power-Ups</button>

          <h3>Automation</h3>
          <button>Add button</button>

          <h3>Actions</h3>
          <button>Move</button>
          <button>Copy</button>
          <button>Make template</button>
          <button>Archive</button>
          <button>Share</button>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;

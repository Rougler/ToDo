import React, { useState } from 'react';
import './CardDetail.css';
import MoveCard from './MoveCard'; // Import the MoveCard component
import BasicDateRangePicker from './Date'; // Import the date picker component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye, faCheckSquare, faClock, faPaperclip, faMapMarkerAlt, faImage,
  faUser, faTags, faTrashAlt, faList, faAlignLeft, faComments, faEdit
} from '@fortawesome/free-solid-svg-icons';

const CardDetail = ({ card, lists, onMove, onClose, onSaveTitle, onDelete }) => {
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showMoveCard, setShowMoveCard] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showAttachment, setShowAttachment] = useState(false); // State for showing attachment section
  const [checklistItems, setChecklistItems] = useState([]);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [attachments, setAttachments] = useState([]);

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

  const toggleAttachment = () => {
    setShowAttachment(!showAttachment);
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

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setAttachments([...attachments, ...files]);
  };

  const handleDeleteAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
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
            <a onClick={toggleChecklist}><FontAwesomeIcon icon={faCheckSquare} /> Checklist</a>
            <a onClick={toggleDatePicker}><FontAwesomeIcon icon={faClock} /> Dates</a>
            {showDatePicker && (
              <div className="date-picker-popup"> {/* Wrap the date picker in a div with a class for styling */}
                <BasicDateRangePicker />
              </div>
            )}
            <a onClick={toggleAttachment}><FontAwesomeIcon icon={faPaperclip} /> Attachment</a>
            <a><FontAwesomeIcon icon={faImage} /> Cover</a>
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

          {showAttachment && (
            <div className="attachment">
              <h3>Attach a file</h3>
              <input
                type="file"
                onChange={handleFileChange}
                multiple
              />
              {attachments.map((attachment, index) => (
                <div key={index} className="attachment-item">
                  <span>{attachment.name}</span>
                  <button onClick={() => handleDeleteAttachment(index)}>Delete</button>
                </div>
              ))}
            </div>
          )}

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
    </div>
  );
};

export default CardDetail;

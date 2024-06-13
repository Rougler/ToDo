import React, { useState } from 'react';
import './CardDetail.css';
import ClickOutsideWrapper from './ClickOutsideWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye, faCheckSquare, faClock, faPaperclip, faMapMarkerAlt, faImage,
  faUser, faTags, faTrashAlt, faList, faAlignLeft, faComments, faEdit
} from '@fortawesome/free-solid-svg-icons';
import MoveCard from './MoveCard';
import DateRangePicker from './date-modal';

const colors = [
  '#f2d600', '#ff9f1a', 'rgb(255 121 103)', '#c377e0',
  'rgb(111 202 255)', '#00c2e0', '#51e898', '#ff78cb',
];

const CardDetail = ({ card, lists, onMove, onClose, onSaveTitle, onDelete, onSaveCoverColor }) => {
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
  const [showCoverOptions, setShowCoverOptions] = useState(false);

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

  const handleCoverColorChange = (color) => {
    onSaveCoverColor(card.id, color);
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
              <div className="date-picker-popup">
                <ClickOutsideWrapper onClose={() => setShowDatePicker(false)}>
                  <DateRangePicker />
                </ClickOutsideWrapper>
              </div>
            )}
            <a><FontAwesomeIcon icon={faPaperclip} /> Attachment</a>
            <a><FontAwesomeIcon icon={faMapMarkerAlt} /> Location</a>
            <a><FontAwesomeIcon icon={faTags} /> Custom Fields</a>
            <a onClick={() => setShowCoverOptions(!showCoverOptions)}><FontAwesomeIcon icon={faImage} /> Cover</a>
            {showCoverOptions && (
              <div className="cover-options">
                <div className="cover-colors">
                  {colors.map((color) => (
                    <div
                      key={color}
                      className="color-option"
                      style={{ backgroundColor: color }}
                      onClick={() => handleCoverColorChange(color)}
                    ></div>
                  ))}
                </div>
              </div>
            )}
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
            <a onClick={() => setShowMoveCard(true)}><FontAwesomeIcon icon={faTags} /> Move</a>
            <a onClick={handleDeleteCard}><FontAwesomeIcon icon={faTrashAlt} /> Delete</a>
            <a><FontAwesomeIcon icon={faPaperclip} /> Share</a>
          </div>
        </div>
      </div>
      {showMoveCard && (
        <ClickOutsideWrapper onClose={() => setShowMoveCard(false)}> {/* Use ClickOutsideWrapper here */}
          <div className="move-card-popup"> {/* Add a class for styling */}
            <MoveCard
              card={card}
              lists={lists}
              onMove={(cardId, newListTitle, newPosition) => {
                onMove(cardId, newListTitle, newPosition);
                setShowMoveCard(false);
              }}
              onClose={() => setShowMoveCard(false)}
            />
          </div>
        </ClickOutsideWrapper>
      )}
    </div>
  );
};

export default CardDetail;

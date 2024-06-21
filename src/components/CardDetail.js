// CardDetail.js
import React, { useState } from 'react';
import './CardDetail.css';
import OutsideClickHandler from './OutsideClickHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckSquare, faClock, faPaperclip, faImage,
  faTags, faTrashAlt, faAlignLeft, faEdit, faDownload, faCopy
} from '@fortawesome/free-solid-svg-icons';
import MoveCard from './MoveCard';
import DateRangePicker from './date-modal';

const colors = [
  '#f2d600', '#ff9f1a', 'rgb(255 121 103)', '#c377e0',
  'rgb(111 202 255)', '#00c2e0', '#51e898', '#ff78cb',
];

const CardDetail = ({ card, lists, onMove, onClose, onSaveTitle, onDelete, onSaveCoverColor, onCopyCard, onSaveTags }) => {
  const [description, setDescription] = useState('');
  const [newComment, setNewComment] = useState('');
  const [showMoveCard, setShowMoveCard] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showAttachment, setShowAttachment] = useState(false);
  const [checklistItems, setChecklistItems] = useState([]);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [showCoverOptions, setShowCoverOptions] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim()) {
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

  const handleCoverColorChange = (color) => {
    onSaveCoverColor(card.id, color);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setAttachments([...attachments, ...files]);
  };

  const handleDeleteAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleDownloadAttachment = (file) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyCard = () => {
    onCopyCard(card);
    onClose();
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag]);
      setNewTag('');
      setShowTagInput(false);
      onSaveTags(card.id, [...tags, newTag]);
    }
  };

  return (
    <div className="modal-one">
      <OutsideClickHandler onClose={onClose}>
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
                  <OutsideClickHandler onClose={() => setShowDatePicker(false)}>
                    <DateRangePicker />
                  </OutsideClickHandler>
                </div>
              )}
              <a onClick={toggleAttachment}><FontAwesomeIcon icon={faPaperclip} /> Attachment</a>
              <a onClick={() => setShowCoverOptions(!showCoverOptions)}><FontAwesomeIcon icon={faImage} /> Cover</a>
              <a onClick={() => setShowTagInput(!showTagInput)}><FontAwesomeIcon icon={faTags} /> Tag</a>
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

            {showTagInput && (
              <div className="tags">
                <h3><FontAwesomeIcon icon={faTags} /> Tags</h3>
                <div className="tag-list">
                  {tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                  <input
                    type="text"
                    placeholder="Add a tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddTag();
                      }
                    }}
                  />
                  <button onClick={handleAddTag}>Add +</button>
                </div>
              </div>
            )}

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
                <h3><FontAwesomeIcon icon={faPaperclip} /> Attach a file</h3>
                <input type="file" onChange={handleFileChange} multiple />
                {attachments.map((file, index) => (
                  <div key={index} className="attachment-item">
                    <span>{file.name}</span>
                    <div className="attachment-actions">
                      <button onClick={() => handleDownloadAttachment(file)}><FontAwesomeIcon icon={faDownload} /></button>
                      <button onClick={() => handleDeleteAttachment(index)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <h3>Actions</h3>
            <div className='sidebar-button'>
              <a onClick={() => setShowMoveCard(true)}><FontAwesomeIcon icon={faTags} /> Move</a>
              <a onClick={handleDeleteCard}><FontAwesomeIcon icon={faTrashAlt} /> Delete</a>
              <a onClick={handleCopyCard}><FontAwesomeIcon icon={faCopy} /> Copy
                {/* Copy */}
              </a>
              <a><FontAwesomeIcon icon={faPaperclip} /> Share</a>
            </div>
          </div>
        </div>
        {showMoveCard && (
          <OutsideClickHandler onClose={() => setShowMoveCard(false)}>
            <div className="move-card-popup">
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
          </OutsideClickHandler>
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default CardDetail;

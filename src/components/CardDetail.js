import React, { useState, useEffect } from 'react';
import './CardDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OutsideClickHandler from './OutsideClickHandler';
import MoveCard from './MoveCard';
import ResponsiveDateRangePickers from './Date';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import {
  faEye, faCheckSquare, faClock, faPaperclip, faMapMarkerAlt, faImage,
  faUser, faTags, faTrashAlt, faList, faAlignLeft, faComments, faEdit, faDownload, faCopy
} from '@fortawesome/free-solid-svg-icons';
import DateRangePicker from './date-modal';

const CardDetail = ({
  card,
  lists,
  onMove,
  onClose,
  onSaveTitle,
  onDelete,
  onCopyCard,
  onSaveCoverColor,
}) => {
  const [description, setDescription] = useState(card.description || '');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showMoveCard, setShowMoveCard] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showAttachment, setShowAttachment] = useState(false);
  const [checklistItems, setChecklistItems] = useState([]);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(card.title || '');
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [showCoverOptions, setShowCoverOptions] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const colors = [
    '#f2d600',
    '#ff9f1a',
    'rgb(255 121 103)',
    '#c377e0',
    'rgb(111 202 255)',
    '#00c2e0',
    '#51e898',
    '#ff78cb',
  ];

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

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setAttachments([...attachments, ...files]);
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

  const handleCoverColorChange = (color) => {
    onSaveCoverColor(card.id, color);
    setShowCoverOptions(false);
  };

  const handleDeleteAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setDescription(card.description || '');
    setTitle(card.title || '');
    setChecklistItems(card.checklistItems || []);
    setComments(card.comments || []);
    setAttachments(card.attachments || []);
  }, [card]);

  return (
    <div className="modal-one">
      <OutsideClickHandler onClose={onClose}>
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>

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
            {isEditingTitle && <button className='save-button' onClick={handleSaveTitle}>Save</button>}
          </div>

          <div className="description">
            <div className="description-header">
              <h3>Description</h3>
              {!isEditingDescription && (
                <button className="edit-button" onClick={handleEditDescription}>
                  Edit
                </button>
              )}
            </div>
            {isEditingDescription ? (
              <div>
                <ReactQuill
                  value={description}
                  onChange={setDescription}
                  modules={{
                    toolbar: [
                      [{ header: '1' }, { header: '2' }, { font: [] }],
                      [{ size: [] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link', 'image', 'video'],
                      ['clean'],
                    ],
                  }}
                />
                <button className="save-button" onClick={handleSaveDescription}>Save</button>
                <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{ __html: description }}
                ></div>
              </div>
            )}
          </div>

          <div className="sidebar">
            <h3>Add to card</h3>
            <div className="sidebar-button">
              <a onClick={toggleChecklist}>
                <FontAwesomeIcon icon={faCheckSquare} /> Checklist
              </a>
              <a onClick={toggleDatePicker}>
                <FontAwesomeIcon icon={faClock} /> Dates
              </a>
              {showDatePicker && (
                <div className="date-picker-popup">
                  <ResponsiveDateRangePickers />
                </div>
              )}
              
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
              <a onClick={toggleAttachment}><FontAwesomeIcon icon={faPaperclip} /> Attachment</a>
              {showAttachment && (
                <div className="attachment">
                  <h3>
                    <FontAwesomeIcon icon={faPaperclip} /> Attach a file
                  </h3>
                  <input type="file" onChange={handleFileChange} multiple />
                  {attachments.map((file, index) => (
                    <div key={index} className="attachment-item">
                      <span>{file.name}</span>
                      <div className="attachment-actions">
                        <button onClick={() => handleDownloadAttachment(file)}>
                          <FontAwesomeIcon icon={faDownload} />
                        </button>
                        <button onClick={() => handleDeleteAttachment(index)}>
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </div>
                    </div>
                  ))}
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
                    <input type="text" value={item.text} readOnly />
                    <button onClick={() => handleDeleteChecklistItem(index)}>
                      Delete
                    </button>
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

            <div className="actions">
              <h3>Actions</h3>
              <div className="sidebar-button">
                <a onClick={() => setShowMoveCard(true)}>
                  <FontAwesomeIcon icon={faList} /> Move
                </a>
                <a onClick={handleDeleteCard}>
                  <FontAwesomeIcon icon={faTrashAlt} /> Delete
                </a>
                <a onClick={handleCopyCard}>
                  <FontAwesomeIcon icon={faCopy} /> Copy
                </a>
                <a>
                  <FontAwesomeIcon icon={faPaperclip} /> Share
                </a>
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
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default CardDetail;

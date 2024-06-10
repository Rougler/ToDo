import React, { useState } from 'react';
import './MoveCard.css';

const MoveCard = ({ card, lists, onMove, onClose }) => {
  const [selectedBoard, setSelectedBoard] = useState('sahil');
  const [selectedList, setSelectedList] = useState(lists[0]);
  const [selectedPosition, setSelectedPosition] = useState(1);

  const handleMove = () => {
    onMove(card.id, selectedList, selectedPosition);
    onClose();
  };

  return (
    <div className="modal-move">
      <div className="modal-content-move">
        <span className="close" onClick={onClose}>&times;</span>
        <h3>Select destination</h3>
        <div>
          <label>List</label>
          <select value={selectedList} onChange={(e) => setSelectedList(e.target.value)}>
            {lists.map(list => (
              <option key={list} value={list}>{list}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Position</label>
          <select value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)}>
            {[...Array(10).keys()].map(pos => (
              <option key={pos + 1} value={pos + 1}>{pos + 1}</option>
            ))}
          </select>
        </div>
        <button onClick={handleMove}>Move</button>
      </div>
    </div>
  );
};

export default MoveCard;

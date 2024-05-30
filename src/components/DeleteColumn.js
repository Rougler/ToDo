import React, { useState } from 'react';
import './DeleteColumn.css';


const DeleteColumn = ({ listTitle, onDelete }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDelete = () => {
    onDelete(listTitle);
    setIsConfirming(false);
  };

  return (
    <div className="delete-column">
      {isConfirming && (
        <div className="delete-confirmation-overlay">
          <div className="delete-confirmation">
            <p>Are you sure you want to delete this list?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setIsConfirming(false)}>No</button>
          </div>
        </div>
      )}
      <button className='closer' onClick={() => setIsConfirming(true)}>X</button>
    </div>
  );
};

export default DeleteColumn;

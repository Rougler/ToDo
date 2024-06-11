import React from 'react';
import './Modal.css';
import ResponsiveDateRangePickers from "./Date.js";

const Datemodal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close" onClick={onClose}>&times;</span>
        <ResponsiveDateRangePickers />
      </div>
    </div>
  );
};

export default Datemodal;

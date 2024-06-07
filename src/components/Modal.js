import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ showModal, handleClose, addTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("On-going");
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ taskName, taskStatus, assignedTo });
    handleClose();
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal-overlay-card">
      <div className="modal-card">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Name:</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Task Status:</label>
            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
            >
              <option value="On-going">On-going</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="form-group">
            <label>Assigned To:</label>
            <input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Task</button>
          <button type="button" onClick={handleClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;

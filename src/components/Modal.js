import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import "./Modal.css";
import { colors } from "@mui/material";

const Modal = ({ showModal, handleClose, addTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("On-going");
  const [assignedTo, setAssignedTo] = useState([]);
  const modalRef = useRef(null);

  const options = [
    { value: "John", label: "John" },
    { value: "Alice", label: "Alice" },
    { value: "Bob", label: "Bob" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, handleClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert assignedTo to an array of names
    const assignedToNames = assignedTo.map((person) => person.label);
    addTask({ taskName, taskStatus, assignedTo: assignedToNames });
    handleClose();
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal-overlay-card">
      <div className="modal-card" ref={modalRef}>
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
            <Select
              isMulti
              options={options}
              value={assignedTo}
              onChange={setAssignedTo}
            />
          </div>
          <button type="submit">Add Task</button>
          <button type="button" className="cancel" onClick={handleClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;

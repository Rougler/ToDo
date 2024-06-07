import React, { useState } from "react";
import Modal from "./Modal";

const TaskManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  const users = [
    { name: "Nitesh Saw", email: "n.saw@bourntec.com" },
    { name: "Sk. Sahil Ullah", email: "s.sahil@domain.com" },
    // Add more users as needed
  ];

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Add Task</button>
      <Modal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        addTask={addTask}
        users={users}
      />
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.taskName} - {task.assignedTo}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;

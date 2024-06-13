import React, { useState } from "react";
import "./dashboard.css";
import SimpleBarChart from "./BarChart.js";
import StraightAnglePieChart from "./PieChart.js";
import Modal from "./Modal.js";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([
    {
      taskName: "To-Do Application",
      taskStatus: "On-going",
<<<<<<< HEAD
      assignedTo: ["Swati", "Nitish", "SK Bains", "Bishes", "Subrat"], // Convert string to array
=======
      assignedTo: ["Swati", "Nitish", "SK Bains", "Bitnes", "Subrat"],
>>>>>>> 6e833ba682f908dcbca90451ef7c03b9086ae091
    },
    {
      taskName: "Cloud OptGen",
      taskStatus: "On-going",
<<<<<<< HEAD
      assignedTo: ["Swati", "Nitish", "SK Bains", "Bishes", "Subrat"], // Convert string to array
=======
      assignedTo: ["Swati", "Nitish", "SK Bains", "Bitnes", "Subrat"],
>>>>>>> 6e833ba682f908dcbca90451ef7c03b9086ae091
    },
    {
      taskName: "CSPM",
      taskStatus: "Completed",
<<<<<<< HEAD
      assignedTo: ["Swati", "Nitish", "SK Bains", "Bishes", "Subrat"], // Convert string to array
=======
      assignedTo: ["Swati", "Nitish", "SK Bains", "Bitnes", "Subrat"],
>>>>>>> 6e833ba682f908dcbca90451ef7c03b9086ae091
    },
  ]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const taskStatusCounts = () => {
    const counts = {
      "On-going": 0,
      "Completed": 0,
    };

    tasks.forEach((task) => {
      counts[task.taskStatus] += 1;
    });

    return counts;
  };

  return (
    <>
      <div className="dashboard">
        <h1>Detailed Dashboard</h1>
        <div className="charts">
          <div className="chart pie-chart">
            <StraightAnglePieChart data={taskStatusCounts()} />
          </div>
          <div className="chart bar-chart">
            <SimpleBarChart tasks={tasks} />
          </div>
        </div>
        <div className="task-section">
          <div className="add-task">
            <button className="add-task-button" onClick={handleShowModal}>+</button>
            <span className="text">Add Task</span>
          </div>
          <table className="task-table">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Task Status</th>
                <th>Assigned to</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.taskName}</td>
                  <td className={task.taskStatus.toLowerCase().replace(" ", "-")}>{task.taskStatus}</td>
                  <td>{task.assignedTo.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal showModal={showModal} handleClose={handleCloseModal} addTask={addTask} />
    </>
  );
};

export default Dashboard;

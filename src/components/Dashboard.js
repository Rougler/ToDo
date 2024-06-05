import React from "react";
import "./dashboard.css";
import Sidebar from "./sidebar";
import SimpleBarChart from "./BarChart.js";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <h1>Detailed Dashboard</h1>
        <div className="charts">
          <div className="chart pie-chart">
            <img src="path_to_pie_chart_image" alt="Pie Chart" />
          </div>
          <div className="chart bar-chart">
            <SimpleBarChart />
          </div>
        </div>
        <div className="task-section">
          <div className="add-task">
            <button className="add-task-button">+</button>
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
              <tr>
                <td>To-Do Application</td>
                <td className="ongoing">On-going</td>
                <td>Swati, Nitish, SK Bains, Bitnes, Subrat</td>
              </tr>
              <tr>
                <td>Cloud OptGen</td>
                <td className="ongoing">On-going</td>
                <td>Swati, Nitish, SK Bains, Bitnes, Subrat</td>
              </tr>
              <tr>
                <td>CSPM</td>
                <td className="completed">Completed</td>
                <td>Swati, Nitish, SK Bains, Bitnes, Subrat</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

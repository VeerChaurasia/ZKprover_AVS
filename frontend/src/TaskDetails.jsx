import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskDetails.css';

const TaskDetails = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTaskDetails();
    const interval = setInterval(fetchTaskDetails, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchTaskDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5001/task-details');
      console.log("Received task details:", response.data);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching task details:', error);
    }
  };

  return (
    <div className="task-details">
      <h2>Task Details</h2>
      <table>
        <thead>
          <tr>
            <th>Task Index</th>
            <th>Transaction Hash</th>
            <th>Created At</th>
            <th>Status</th>
            <th>A</th>
            <th>B</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.taskIndex}</td>
              <td>{task.transactionHash}</td>
              <td>{task.createdAt}</td>
              <td>{task.status}</td>
              <td>{task.a}</td>
              <td>{task.b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskDetails;
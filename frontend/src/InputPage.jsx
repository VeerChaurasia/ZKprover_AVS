import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './InputPage.css';

const InputPage = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Processing...');
    setIsSuccess(false);
    try {
      const response = await fetch('http://localhost:5001/create-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ a: parseInt(a), b: parseInt(b) }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`Task created successfully. Transaction hash: ${data.transactionHash}`);
        setIsSuccess(true);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while creating the task');
    }
  };

  const handleTaskDetailsClick = () => {
    navigate('/task-details');
  };

  return (
    <div className='main'>
      <div className="input-page">
        <h2>Input Page</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="a">Value A:</label>
            <input
              type="number"
              id="a"
              value={a}
              onChange={(e) => setA(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="b">Value B:</label>
            <input
              type="number"
              id="b"
              value={b}
              onChange={(e) => setB(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create Task</button>
        </form>
        {message && (
          <p className={`message ${isSuccess ? 'success' : 'error'}`}>{message}</p>
        )}
        <div className="button-container">
          <Link to="/">
            <button className="back-button">Back to Wallet Connect</button>
          </Link>
          <button className="task-details-button" onClick={handleTaskDetailsClick}>
            Task Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputPage;
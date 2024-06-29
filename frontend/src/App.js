// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WalletConnect from './walletconnect';
import InputPage from './InputPage';
import TaskDetails from './TaskDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WalletConnect />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/task-details" element={<TaskDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
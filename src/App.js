import React from 'react';
import logo from './logo.svg';
import './App.css';
import Img from 'react-image';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to React
        </p>
      </header>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
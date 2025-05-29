import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import './App.css';
import ReactiveTitle from './Components/ReactiveTitle';
import CreateUser from './Pages/account/CreateUser';
import Login from './Pages/account/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <ReactiveTitle />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<CreateUser />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
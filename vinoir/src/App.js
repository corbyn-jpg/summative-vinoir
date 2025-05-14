import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
   <Router>
      <div className="App">

        <main>
          <Routes>
            <Route index element={<Home />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;

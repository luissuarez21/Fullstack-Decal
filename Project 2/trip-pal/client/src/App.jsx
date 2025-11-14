import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import TripsList from './pages/TripsList';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/" className="nav-logo">TripPal</Link>
          <ul className="nav-menu">
            <li><Link to="/">Create Trip</Link></li>
            <li><Link to="/trips">All Trips</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trips" element={<TripsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

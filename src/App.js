import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HotelHome from './components/HotelHome';
import HotelList from './components/HotelList';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', textAlign: 'center', backgroundColor: '#007bff' }}>
        <Link to="/" style={{ color: '#fff', margin: '0 1rem', textDecoration: 'none' }}>
          Inicio
        </Link>
        <Link to="/hoteles" style={{ color: '#fff', margin: '0 1rem', textDecoration: 'none' }}>
          Hoteles
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<HotelHome />} />
        <Route path="/hoteles" element={<HotelList />} />
      </Routes>
    </Router>
  );
}

export default App;


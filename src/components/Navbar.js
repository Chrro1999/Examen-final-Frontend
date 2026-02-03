import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🎬 Movies Manager
        </Link>

        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">Inicio</Link>
          </li>
          <li>
            <Link to="/directors" className="navbar-link">Directores</Link>
          </li>
          <li>
            <Link to="/movies" className="navbar-link">Películas</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

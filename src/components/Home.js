import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <h1>🎬 Gestor de Películas y Directores</h1>
                <p className="hero-subtitle">
                    Administra tu coleccion de peliculas y directores
                </p>
            </div>

            <div className="features-section">
                <div className="feature-card">
                    <div className="feature-icon">🎥</div>
                    <h2>Directores</h2>
                    <p>Gestionas informacion de directores de cine</p>
                    <div className="feature-actions">
                        <Link to="/directors" className="btn btn-primary">
                            Ver Directores
                        </Link>
                        <Link to="/directors/new" className="btn btn-secondary">
                            Agregar Directores
                        </Link>
                    </div>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">🍿</div>
                    <h2>Peliculas</h2>
                    <p>Gestiona tu coleccion de peliculas</p>
                    <div className="feature-actions">
                        <Link to="/movies" className="btn btn-primary">
                            Ver Peliculas
                        </Link>
                        <Link to="/movies/new" className="btn btn-secondary">
                            Agregar Peliculas
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

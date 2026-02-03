import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllDirectors, deleteDirector, searchDirectors } from '../services/directorService';
import '../styles/List.css';

const DirectorList = () => {
    const [directors, setDirectors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadDirectors();
    }, []);

    const loadDirectors = async () => {
        try {
            setLoading(true);
            const data = await getAllDirectors();
            setDirectors(data.results || data);
            setError(null);
        } catch (err) {
            setError('Error al cargar los directores');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar al director ${name}?`)) {
            try {
                await deleteDirector(id);
                loadDirectors();
            } catch (err) {
                alert('Error al eliminar el director');
                console.error(err);
            }
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            try {
                setLoading(true);
                const data = await searchDirectors(searchTerm);
                setDirectors(data.results || data);
            } catch (err) {
                setError('Error al buscar directores');
            } finally {
                setLoading(false);
            }
        } else {
            loadDirectors();
        }
    };

    if (loading) return <div className="loading">Cargando directores...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="list-container">
            <div className="list-header">
                <h1>Directores</h1>
                <Link to="/directors/new" className="btn btn-primary">
                    + Agregar Director
                </Link>
            </div>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Buscar directores..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="btn btn-secondary">
                    Buscar
                </button>
                {searchTerm && (
                    <button
                        type="button"
                        onClick={() => { setSearchTerm(''); loadDirectors(); }}
                        className="btn btn-secondary"
                    >
                        Limpiar
                    </button>
                )}
            </form>

            {directors.length === 0 ? (
                <div className="empty-state">
                    <p>No se encontraron directores.</p>
                    <Link to="/directors/new" className="btn btn-primary">
                        Agregar tu primer director
                    </Link>
                </div>
            ) : (
                <div className="grid">
                    {directors.map((director) => (
                        <div key={director.id} className="card">
                            <div className="card-header">
                                <h3>{director.name}</h3>
                                <span className="badge">{director.movies_count || 0} películas</span>
                            </div>
                            <div className="card-body">
                                {director.nationality && (
                                    <p><strong>Nacionalidad:</strong> {director.nationality}</p>
                                )}
                                {director.birth_date && (
                                    <p><strong>Fecha de Nacimiento:</strong> {new Date(director.birth_date).toLocaleDateString()}</p>
                                )}
                                {director.biography && (
                                    <p className="truncate">{director.biography}</p>
                                )}
                            </div>
                            <div className="card-actions">
                                <Link to={`/directors/${director.id}`} className="btn btn-info">
                                    Ver Detalles
                                </Link>
                                <Link to={`/directors/edit/${director.id}`} className="btn btn-warning">
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(director.id, director.name)}
                                    className="btn btn-danger"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DirectorList;
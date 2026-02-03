import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllMovies, deleteMovie, searchMovies, getMoviesByGenre } from '../services/movieService';
import '../styles/List.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await getAllMovies();
      setMovies(data.results || data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las películas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm('¿Estás seguro de eliminar la película ' + title + '?')) {
      try {
        await deleteMovie(id);
        loadMovies();
      } catch (err) {
        alert('Error al eliminar la película');
      }
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (searchTerm.trim()) {
        const data = await searchMovies(searchTerm);
        setMovies(data.results || data);
      } else {
        await loadMovies();
      }
    } catch (err) {
      setError('Error en la búsqueda');
    } finally {
      setLoading(false);
    }
  };

  const handleGenreFilter = async (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    try {
      setLoading(true);
      if (genre) {
        const data = await getMoviesByGenre(genre);
        setMovies(data.results || data);
      } else {
        await loadMovies();
      }
    } catch (err) {
      setError('Error al filtrar');
    } finally {
      setLoading(false);
    }
  };

  const genres = [...new Set(movies.map(m => m.genre))];

  if (loading) return <div className="loading">Cargando películas...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="list-container">
      <div className="list-header">
        <h1>🎞️ Películas</h1>
        <Link to="/movies/new" className="btn btn-primary">+ Agregar Película</Link>
      </div>

      <div className="filters-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Buscar película..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn btn-secondary">Buscar</button>
          {searchTerm && (
            <button type="button" onClick={() => { setSearchTerm(''); loadMovies(); }} className="btn btn-secondary">Limpiar</button>
          )}
        </form>
        <select value={selectedGenre} onChange={handleGenreFilter} className="genre-select">
          <option value="">Todos los géneros</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {movies.length === 0 ? (
        <div className="empty-state">
          <p>No hay películas registradas</p>
          <Link to="/movies/new" className="btn btn-primary">Agregar la primera</Link>
        </div>
      ) : (
        <div className="grid">
          {movies.map((movie) => (
            <div key={movie.id} className="card movie-card">
              <div className="card-header">
                <h3>{movie.title}</h3>
                <span className="badge badge-genre">{movie.genre}</span>
              </div>
              <div className="card-body">
                <p><strong>Director:</strong> {movie.director_name || 'Desconocido'}</p>
                <p><strong>Año:</strong> {movie.release_year}</p>
                {movie.duration_minutes && <p><strong>Duración:</strong> {movie.duration_minutes} min</p>}
                {movie.rating && <p><strong>Rating:</strong> ⭐ {movie.rating}/10</p>}
                {movie.synopsis && <p className="truncate">{movie.synopsis}</p>}
              </div>
              <div className="card-actions">
                <Link to={'/movies/' + movie.id} className="btn btn-info">Ver Detalle</Link>
                <Link to={'/movies/edit/' + movie.id} className="btn btn-warning">Editar</Link>
                <button onClick={() => handleDelete(movie.id, movie.title)} className="btn btn-danger">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
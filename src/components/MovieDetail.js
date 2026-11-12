// src/components/MovieDetail.js
import React, { useCallback, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMovieById } from '../services/movieService';
import '../styles/Detail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMovie = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMovieById(id);
      setMovie(data);
    } catch (err) {
      setError('Error al cargar la película');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadMovie();
  }, [loadMovie]);

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div className="error">Película no encontrada</div>;

  return (
    <div className="detail-container">
      <div className="detail-header">
        <h1>🎞️ {movie.title}</h1>
        <span className="badge badge-genre">{movie.genre}</span>
      </div>

      <div className="detail-content">
        <div className="detail-info">
          <div className="detail-item">
            <span className="detail-label">Director</span>
            <span className="detail-value">
              <Link to={`/directors/${movie.director}`}>{movie.director_name}</Link>
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Año de Estreno</span>
            <span className="detail-value">{movie.release_year}</span>
          </div>
          {movie.duration_minutes && (
            <div className="detail-item">
              <span className="detail-label">Duración</span>
              <span className="detail-value">{movie.duration_minutes} minutos</span>
            </div>
          )}
          {movie.rating && (
            <div className="detail-item">
              <span className="detail-label">Rating</span>
              <span className="detail-value rating-value">⭐ {movie.rating} / 10</span>
            </div>
          )}
        </div>

        {movie.synopsis && (
          <div className="detail-synopsis">
            <h3>Sinopsis</h3>
            <p>{movie.synopsis}</p>
          </div>
        )}
      </div>

      <div className="detail-actions">
        <Link to={`/movies/edit/${movie.id}`} className="btn btn-warning">
          ✏️ Editar
        </Link>
        <Link to="/movies" className="btn btn-secondary">
          ← Volver a películas
        </Link>
      </div>
    </div>
  );
};

export default MovieDetail;
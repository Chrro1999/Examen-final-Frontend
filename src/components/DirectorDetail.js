import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDirectorById } from '../services/directorService';
import '../styles/Detail.css';

const DirectorDetail = () => {
  const { id } = useParams();
  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDirector();
  }, [id]);

  const loadDirector = async () => {
    try {
      setLoading(true);
      const data = await getDirectorById(id);
      setDirector(data);
    } catch (err) {
      setError('Error al cargar el director');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!director) return <div className="error">Director no encontrado</div>;

  return (
    <div className="detail-container">
      <div className="detail-header">
        <h1>🎥 {director.name}</h1>
        {director.nationality && (
          <span className="badge">{director.nationality}</span>
        )}
      </div>

      <div className="detail-content">
        <div className="detail-info">
          {director.birth_date && (
            <div className="detail-item">
              <span className="detail-label">Fecha de Nacimiento</span>
              <span className="detail-value">
                {new Date(director.birth_date).toLocaleDateString()}
              </span>
            </div>
          )}
          <div className="detail-item">
            <span className="detail-label">Películas</span>
            <span className="detail-value">{director.movies_count || 0}</span>
          </div>
        </div>

        {director.biography && (
          <div className="detail-synopsis">
            <h3>Biografía</h3>
            <p>{director.biography}</p>
          </div>
        )}

        {/* Lista de películas del director */}
        {director.movies && director.movies.length > 0 && (
          <div className="detail-related">
            <h3>🎞️ Sus Películas</h3>
            <div className="related-grid">
              {director.movies.map(movie => (
                <div key={movie.id} className="related-card">
                  <h4>{movie.title}</h4>
                  <p><strong>Año:</strong> {movie.release_year}</p>
                  <p><strong>Género:</strong> {movie.genre}</p>
                  {movie.rating && <p>⭐ {movie.rating}/10</p>}
                  <Link to={`/movies/${movie.id}`} className="btn btn-info">
                    Ver Detalle
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="detail-actions">
        <Link to={`/directors/edit/${director.id}`} className="btn btn-warning">
          ✏️ Editar
        </Link>
        <Link to="/directors" className="btn btn-secondary">
          ← Volver a directores
        </Link>
      </div>
    </div>
  );
};

export default DirectorDetail;
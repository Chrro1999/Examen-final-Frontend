import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createMovie, getMovieById, updateMovie } from '../services/movieService';
import { getAllDirectors } from '../services/directorService';
import '../styles/Form.css';

const MovieForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        director: '',
        release_year: '',
        synopsis: '',
        duration_minutes: '',
        reating: ''
    });
    const [directors, setDirectors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadDirectors();
        if (isEditMode) {
            loadMovie();
        }
    }, [id]);

    const loadDirectors = async () => {
        try {
            const data = await getAllDirectors();
            setDirectors(data.results || data);
        } catch (err) {
            console.error('Error al cargar los directores', err);
        }
    };

    const loadMovie = async () => {
        try {
            setLoading(true);
            const data = await getMovieById(id);
            setFormData({
                title: data.title || '',
                genre: data.genre || '',
                director: data.director || '',
                release_year: data.release_year || '',
                synopsis: data.synopsis || '',
                duration_minutes: data.duration_minutes || '',
                reating: data.reating || ''
            });
        } catch (err) {
            setError('Error al cargar la película');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            alert('El título es obligatorio');
            return;
        }
        if (!formData.director) {
            alert('El director es obligatorio');
            return;
        }

        //preparar datos par enviar
        const movieData = {
            ...formData,
            director: parseInt(formData.director),
            release_year: parseInt(formData.release_year),
            duration_minutes: formData.duration_minutes ? parseInt(formData.duration_minutes) : null,
            reating: formData.reating ? parseFloat(formData.reating) : null
        };

        try {
            setLoading(true);
            if (isEditMode) {
                await updateMovie(id, movieData);
            } else {
                await createMovie(movieData);
            }
            navigate('/movies');
        } catch (err) {
            setError('Error al guardar la película');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <div className="loading">Cargando...</div>;

    return (
        <div className="form-container">
            <div className="form-header">
                <h1>{isEditMode ? 'Editar Película' : 'Nueva Película'}</h1>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlfor="title">Título:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Ej: Inception"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="genre">Género:</label>
                        <input
                            type="text"
                            id="genre"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            required
                            placeholder="Ej: Ciencia Ficción"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="director">Director:</label>
                        <select
                            id="director"
                            name="director"
                            value={formData.director}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Selecciona un director --</option>
                            {directors.map(dir => (
                                <option key={dir.id} value={dir.id}>{dir.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="release_year">Año de Lanzamiento:</label>
                        <input
                            type="number"
                            id="release_year"
                            name="release_year"
                            value={formData.release_year}
                            onChange={handleChange}
                            required
                            min="1888"
                            max={new Date().getFullYear()}
                            placeholder="Ej: 2010"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="duration_minutes">Duración (minutos):</label>
                        <input
                            type="number"
                            id="duration_minutes"
                            name="duration_minutes"
                            value={formData.duration_minutes}
                            onChange={handleChange}
                            min="1"
                            placeholder="Ej: 148"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="reating">Calificación:</label>
                        <input
                            type="number"
                            id="reating"
                            name="reating"
                            value={formData.reating}
                            onChange={handleChange}
                            min="0"
                            max="10"
                            step="0.1"
                            placeholder="Ej: 8.8"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="synopsis">Sinopsis:</label>
                    <textarea
                        id="synopsis"
                        name="synopsis"
                        value={formData.synopsis}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Escribe una breve sinopsis de la película"
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : (isEditMode ? 'Actualizar Película' : 'Crear Película')}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/movies')}
                        className="btn btn-secondary"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MovieForm;


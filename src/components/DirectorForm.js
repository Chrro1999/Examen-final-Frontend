import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDirector, getDirectorById, updateDirector } from '../services/directorService';
import '../styles/Form.css';

const DirectorForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        name: '',
        nationality: '',
        birth_date: '',
        biography: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            loadDirector();
        }
    }, [id]);

    const loadDirector = async () => {
        try {
            setLoading(true);
            const data = await getDirectorById(id);
            setFormData({
                name: data.name || '',
                nationality: data.nationality || '',
                birth_date: data.birth_date || '',
                biography: data.biography || ''
            });
        } catch (err) {
            setError('Error al cargar el director');
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

        if (!formData.name.trim()) {
            alert('El nombre es obligatorio');
            return;
        }

        console.log('Enviando:', formData);

        try {
            setLoading(true);
            if (isEditMode) {
                await updateDirector(id, formData);
            } else {
                await createDirector(formData);
            }
            navigate('/directors');
        } catch (err) {
            setError('Error al guardar el director');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !isEditMode) return <div className="loading">Cargando...</div>;

    return (
        <div className="form-container">
            <div className="form-header">
                <h1>{isEditMode ? 'Editar Director' : 'Crear Director'}</h1>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder= "Ejemplo: Steven Spielberg"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="birth_date">Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        id="birth_date"
                        name="birth_date"
                        value={formData.birth_date}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="biography">Biografía:</label>
                    <textarea
                        id="biography"
                        name="biography"
                        value={formData.biography}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Escribe una breve biografía del director"
                    />
                </div>

                <div className="form-actions">
                    <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={loading}>

                        {loading ? 'Guardando...' : (isEditMode ? 'Actualizar Director' : 'Crear Director')}
                    </button>
                    <button 
                        type="button"
                        onClick={() => navigate('/directors')}
                        className="btn btn-secondary"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DirectorForm;
                    





            
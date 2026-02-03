import api from './api';

const MOVIES_ENDPOINT = '/movies/';

export const getAllMovies = async () => { //obtener todas las peliculas
    const response = await api.get(MOVIES_ENDPOINT);
    return response.data;
};

export const getMovieById = async (id) => { //obtener una pelicula por id
    const response = await api.get(`${MOVIES_ENDPOINT}${id}/`);
    return response.data;
};

export const createMovie = async (movieData) => { //crear una pelicula
    const response = await api.post(MOVIES_ENDPOINT, movieData);
    return response.data;
};

export const updateMovie = async (id, movieData) => { //actualizar una pelicula
    const response = await api.put(`${MOVIES_ENDPOINT}${id}/`, movieData);
    return response.data;
};

export const pathMovie = async (id, movieData) => { //parcial actualizar una pelicula
    const response = await api.patch(`${MOVIES_ENDPOINT}${id}/`, movieData);
    return response.data;
};

export const deleteMovie = async (id) => { //eliminar una pelicula
    const response = await api.delete(`${MOVIES_ENDPOINT}${id}/`);
    return response.data;
};

export const getMoviesByGenre = async (genre) => { //obtener peliculas por genero
    const response = await api.get(MOVIES_ENDPOINT, {
        params: { genre }
    });
    return response.data;
};

export const getMoviesByDirector = async (directorId) => { //obtener peliculas por director
    const response = await api.get(MOVIES_ENDPOINT, {
        params: { director: directorId }
    });
    return response.data;
};

export const getMoivesByYear = async (year) => { //obtener peliculas por año
    const response = await api.get(MOVIES_ENDPOINT, {
        params: { year }
    });
    return response.data;
};

export const searchMovies = async (searchTerm) => { //buscar peliculas
    const response = await api.get(MOVIES_ENDPOINT, {
        params: { search: searchTerm }
    });
    return response.data;
};

export const getRecentMovies = async (limit = 10) => { //obtener peliculas recientes
    const response = await api.get(`${MOVIES_ENDPOINT}recent/`, {
        params: { limit }
    });
    return response.data;
};

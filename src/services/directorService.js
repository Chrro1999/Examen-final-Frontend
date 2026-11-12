import api from './api';

const DIRECTORS_ENDPOINT = '/directors/';

export const getAllDirectors = async () => {
    try {
        const response = await api.get(DIRECTORS_ENDPOINT);
        return response.data;
    } catch (error) {
        console.error('Error fetching directors:', error);
        throw error;
    }
};

export const getDirectorById = async (id) => {
    try {
        const response = await api.get(`${DIRECTORS_ENDPOINT}${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching director ${id}:`, error);
        throw error;
    }
};

export const createDirector = async (directorData) => {
    try {
        const response = await api.post(DIRECTORS_ENDPOINT, directorData);
        return response.data;
    } catch (error) {
        console.error('Error creating director:', error.response?.data || error.message);
        throw error;
    }
};

export const updateDirector = async (id, directorData) => {
    try {
        const response = await api.put(`${DIRECTORS_ENDPOINT}${id}/`, directorData);
        return response.data;
    } catch (error) {
        console.error(`Error updating director ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

export const patchDirector = async (id, directorData) => {
    try {
        const response = await api.patch(`${DIRECTORS_ENDPOINT}${id}/`, directorData);
        return response.data;
    } catch (error) {
        console.error(`Error patching director ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

export const deleteDirector = async (id) => {
    try {
        const response = await api.delete(`${DIRECTORS_ENDPOINT}${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting director ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

export const getDirectorMovies = async (id) => {
    try {
        const response = await api.get(`${DIRECTORS_ENDPOINT}${id}/movies/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching movies for director ${id}:`, error);
        throw error;
    }
};

export const searchDirectors = async (searchTerm) => {
    try {
        const response = await api.get(DIRECTORS_ENDPOINT, {
            params: { search: searchTerm }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching directors:', error);
        throw error;
    }
};
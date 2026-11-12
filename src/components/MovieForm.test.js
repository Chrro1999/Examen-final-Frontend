import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MovieForm from './MovieForm';
import { createMovie } from '../services/movieService';
import { getAllDirectors } from '../services/directorService';

jest.mock('../services/movieService', () => ({
  createMovie: jest.fn(),
  getMovieById: jest.fn(),
  updateMovie: jest.fn(),
}));

jest.mock('../services/directorService', () => ({
  getAllDirectors: jest.fn(),
}));

test('saves a movie rating using the API rating field', async () => {
  getAllDirectors.mockResolvedValue([{ id: 1, name: 'Christopher Nolan' }]);
  createMovie.mockResolvedValue({});

  render(
    <MemoryRouter initialEntries={['/movies/new']}>
      <Routes>
        <Route path="/movies/new" element={<MovieForm />} />
      </Routes>
    </MemoryRouter>
  );

  await screen.findByRole('option', { name: 'Christopher Nolan' });
  fireEvent.change(screen.getByLabelText('Título:'), {
    target: { value: 'Inception' },
  });
  fireEvent.change(screen.getByLabelText('Género:'), {
    target: { value: 'Ciencia ficción' },
  });
  fireEvent.change(screen.getByLabelText('Director:'), {
    target: { value: '1' },
  });
  fireEvent.change(screen.getByLabelText('Año de Lanzamiento:'), {
    target: { value: '2010' },
  });
  fireEvent.change(screen.getByLabelText('Calificación:'), {
    target: { value: '8.8' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Crear Película' }));

  await waitFor(() => {
    expect(createMovie).toHaveBeenCalledWith(
      expect.objectContaining({ rating: 8.8 })
    );
  });
  expect(createMovie.mock.calls[0][0]).not.toHaveProperty('reating');
});

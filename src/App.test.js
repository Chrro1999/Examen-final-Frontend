import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the movie manager home page', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /gestor de películas y directores/i })
  ).toBeInTheDocument();
});

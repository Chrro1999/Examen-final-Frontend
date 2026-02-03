import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import DirectorList from './components/DirectorList';
import DirectorDetail from './components/DirectorDetail';
import DirectorForm from './components/DirectorForm';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import MovieForm from './components/MovieForm';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/directors" element={<DirectorList />} />
            <Route path="/directors/new" element={<DirectorForm />} />
            <Route path="/directors/:id" element={<DirectorDetail />} />
            <Route path="/directors/edit/:id" element={<DirectorForm />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movies/new" element={<MovieForm />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/movies/edit/:id" element={<MovieForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

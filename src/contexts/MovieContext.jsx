import React, { createContext, useState, useEffect } from 'react';

const MovieContext = createContext();

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadMovies = async () => {
      // Starts loading
      setLoading(true);
      try {
        // Api calling for the data, initially page is 1
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`);
        const data = await response.json();
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setHasMore(data.results.length > 0);
      } catch (error) {
        // If something goes wrong, we can see error in console.error and alert
        console.error('Error fetching data:', error);
        alert('Error fetching data:', error);
      }
      // End Loading
      setLoading(false);
    };

    loadMovies();
  }, [page]);

  const filteredMovies = movies
  .filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
  .filter((movie, index, self) => 
    index === self.findIndex(m => m.id === movie.id)
  );

  return (
    <MovieContext.Provider value={{ movies: filteredMovies, loading, hasMore, setPage, setSearchTerm }}>
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContext, MovieProvider };
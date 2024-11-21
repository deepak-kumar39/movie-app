import React, { useContext, useRef, useCallback } from 'react';
import { MovieContext, MovieProvider } from './contexts/MovieContext';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';
import './index.css';
import Spinner from './components/CustomSpinner';

const MovieList = () => {
  const { movies, loading, hasMore, setPage } = useContext(MovieContext);
  const observer = useRef();

  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, setPage]);

  return (
    <div className="movie-list">
      {movies.map((movie, index) => {
        if (movies.length === index + 1) {
          return <div ref={lastMovieElementRef} key={movie.id}><MovieCard movie={movie} /></div>;
        } else {
          return <MovieCard movie={movie} />;
        }
      })}
      {loading && <Spinner/>}
    </div>
  );
};

const App = () => (
  <MovieProvider>
    <div className="app">
      <h1>Movie List</h1> 
      <div className='input'>
       <SearchBar />
      </div>
      <MovieList />
    </div>
  </MovieProvider>
);

export default App;
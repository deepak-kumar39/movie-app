import React, { useState } from 'react';


const MovieCard = ({ movie }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded)
    }

    // To handle accessibility using keyboard
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Prevents the default scrolling behavior for the Space key
            handleClick();
        }
    };

    return (
        <>
            <div className={`movie-card ${isExpanded ? 'expanded' : ''}`}>
                <div
                    onClick={handleClick}
                    className="movie-card-header"
                    role="button"
                    aria-expanded={isExpanded}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                >
                    <h2>{movie.title}</h2>
                    <span>{isExpanded ? '▲' : '▼'}</span>
                </div>

                {isExpanded && (
                    <div className="movie-card-content">
                        {movie.poster_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={movie.title}
                                className="movie-poster"
                            />
                        )}
                        <div className="movie-details">
                            <p><strong>Title:</strong> {movie.title}</p>
                            {movie.release_date && (
                                <p><strong>Release Year:</strong> {new Date(movie.release_date).getFullYear()}</p>
                            )}
                            {movie.original_language && (
                                <p style={{ textTransform: "uppercase" }}><strong>Language:</strong> {movie.original_language}</p>
                            )}
                            { 
                                <p><strong>Plot:</strong> {movie.plot ? movie?.plot :"Plot not available"}</p>
                            }
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default MovieCard;



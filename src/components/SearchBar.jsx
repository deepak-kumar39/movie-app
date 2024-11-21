import React, { useContext,useRef } from 'react';
import { MovieContext } from '../contexts/MovieContext';

const SearchBar = () => {
  const { setSearchTerm } = useContext(MovieContext);
  const debounceRef = useRef(null);

  const handleSearchChange = (e) => {
    // Clear the previous debounce timeout if there is one
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set a new debounce timeout to update the search term after 500ms
    debounceRef.current = setTimeout(() => {
      setSearchTerm(e.target.value);
    }, 500); // Adjust debounce time as needed
  };


  return (
    <input
      type="text"
      placeholder="Search movies..."
      onChange={handleSearchChange}
      className="input-search"
    />
  );
};

export default SearchBar;
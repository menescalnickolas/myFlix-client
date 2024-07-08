import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      // Fetch search results from your API or data source
      fetch(`https://testflix2-2b11acffaf24.herokuapp.com/movies/search/${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then((response) => response.json())
        .then((data) => setResults(data))
        .catch((error) => console.error("Error fetching search results:", error));
    }
  }, [query]);

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      {results.length > 0 ? (
        <ul>
          {results.map((movie) => (
            <li key={movie._id}>{movie.Title}</li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};
import React from 'react';
import axios from 'axios';

export const FavoriteMovies = ({ movies, user }) => {
  const handleAddFavorite = (movie) => {
    axios.post(`/users/${user.Username}/movies/${movie._id}`)
      .then(response => {
        console.log(response.data);

      setIsFavorite(!isFavorite);
      setUser(updatedUser);
      })
      .catch(error => {
        console.error("There was an error adding the movie to favorites!", error);
      });
  };

  // Ensure movies and user.FavoriteMovies are properly initialized
  if (!movies || !Array.isArray(movies)) {
    return <div>No movies to display</div>;
  }

  if (!user || !user.FavoriteMovies) {
    return <div>User data is not available</div>;
  }

  const handleRemoveFavorite = (movie) => {
    axios.delete(`/users/${user.Username}/movies/${movie._id}`)
      .then(response => {
        console.log(response.data);
        // Optionally, update the UI or the state to reflect the removal of the favorite movie
      })
      .catch(error => {
        console.error("There was an error removing the movie from favorites!", error);
      });
  };

  return (
    <div>
      <h2>Your Favorite Movies</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            {movie.title}
            {user.FavoriteMovies.includes(movie._id) ? (
              <button onClick={() => handleRemoveFavorite(movie._id)}>Remove from Favorites</button>
            ) : (
              <button onClick={() => handleAddFavorite(movie._id)}>Add to Favorites</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

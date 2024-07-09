import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import axios from 'axios';

export const FavoriteMovies = ({ movies, user, onToggleFavorite }) => {
 
  const favoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie._id));

 /*
  // Ensure movies and user.FavoriteMovies are properly initialized
  if (!movies || !Array.isArray(movies)) {
    return <div>No movies to display</div>;
  }

  if (!user || !user.FavoriteMovies) {
    return <div>User data is not available</div>;
  }

  const [storedToken] = useState(localStorage.getItem("token") || "");
  const [favMovies, setFavMovies] = useState(user.FavoriteMovies);

  const handleRemoveFavorite = async (movieId) => {
    try {
      const response = await fetch(`https://testflix2-2b11acffaf24.herokuapp.com/users/${encodeURIComponent(user.Username)}/movies/${encodeURIComponent(movieId)}`, 
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        }
      });

      if (response.ok) {
        console.log("Removed from favorites:", movieId);
        setFavMovies(favMovies.filter(id => id !== movieId));
        window.location.reload();
      } else {
        console.error("Failed to remove from favorites");
      }
    } catch (error) {
      console.error("An error occurred while removing from favorites:", error);
    }
  };

  const favoriteMoviesList = movies.filter(movie => favMovies.includes(movie._id));

  */ 

  return (
    <div>
      {favoriteMovies.length > 0 ? (
        favoriteMovies.map(movie => (
          <MovieCard className="h-100"
            key={movie._id}
            movie={movie}
            user={user}
            onToggleFavorite={onToggleFavorite}
          />
        ))
      ) : (
        <p>No favorite movies yet.</p>
      )}
    </div>
  );
};
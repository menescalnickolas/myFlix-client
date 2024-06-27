import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://testflix2-2b11acffaf24.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map( movie => {
          return {
            id: movie.key,
            title: movie.Title,
            year: movie.Year,
            synopsis: movie.Synopsis,
            genre: movie.Genre,
            director: movie.Director 
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);

  //Checks if there's a user logged in
  if (!user) {
    return <LoginView />;
  }

  if (selectedMovie) {
    return (<MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}/>
  );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
    {movies.map((movie) => (
      <MovieCard 
        key={movie.id}
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
      />
    ))}
  </div>
  );
};
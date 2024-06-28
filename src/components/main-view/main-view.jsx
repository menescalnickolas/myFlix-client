import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://testflix2-2b11acffaf24.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
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
  }, [token]);

  //Checks if there's a user logged in
  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
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
    <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
  </div>
  );
};
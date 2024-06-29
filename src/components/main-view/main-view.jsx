import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  useEffect(() => {

    fetch("https://testflix2-2b11acffaf24.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map( movie => {
          return {
            id: movie.key,
            image: movie.Image,
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


  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
        <LoginView onLoggedIn={(user) => setUser(user)} />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}> 
        <MovieView 
        movie={selectedMovie} 
        onBackClick={() => setSelectedMovie(null)} />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
         {movies.map((movie) => (
      <Col key={movie.id} md={3} className="mb-5">
      <MovieCard 
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
      />
      </Col>
    ))}
    <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </>
      )}
    </Row>
  );
};
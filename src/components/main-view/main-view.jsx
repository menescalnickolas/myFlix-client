import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";


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
    <BrowserRouter>
    <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route path="/signup" element={
            <>
            {user ? (
              <Navigate to="/" />
            ) : (
              <Col md={5}>
                <SignupView />
              </Col>
            )}
            </>
          }>
          </Route>
          <Route path="/login" element={
            <>
            {user ? (
              <Navigate to="/" />
            ) : (
              <Col md={5}>
                <LoginView onLoggedIn={(user) => setUser(user)} />
              </Col>
            )}
            </>
          }>
          </Route>

          <Route path="/movies/:movieId" element={
            <>
            {!user ? (
              <Navigate to="/login" replace />
            ) : movies.length === 0 ? (
              <Col>The list is empty!</Col>
            ) : (
              <Col md={8}>
                <MovieView movies={movies} />
              </Col>
            )}
            </>
          }>
          </Route>

          <Route path="/" element={
            <>
            {!user ? (
              <Navigate to="/login" replace />
            ) : movies.length === 0 ? (
              <Col>The list is empty!</Col>
            ) : (
              <>
              {movies.map((movie) => (
                <Col className="mb-4" key={movie.id} md={3}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
              </>
            )}
            </>
          }>
          </Route>
        </Routes>
        </Row>
    </BrowserRouter>
  );
};
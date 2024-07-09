import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import "./main-view.scss";



export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const storedToken = localStorage.getItem("token");

  let storedUser;
  try {
    storedUser = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    storedUser = null;
  }

  useEffect(() => {
    if (storedToken) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {

    fetch("https://testflix2-2b11acffaf24.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map(movie => {
          return {
            _id: movie._id,
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

  const handleToggleFavorite = async (movieId) => {
    if (!user || !token) return;

    const isFavorite = user.FavoriteMovies.includes(movieId);
    const method = isFavorite ? "DELETE" : "POST";

    try {
      const response = await fetch(`https://testflix2-2b11acffaf24.herokuapp.com/users/${encodeURIComponent(user.Username)}/movies/${encodeURIComponent(movieId)}`, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error("Failed to update favorite movies");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("There was an error toggling the favorite status!", error);
    }
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }}
        setFilteredMovies={setFilteredMovies}
        movies={movies}
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
                  {filteredMovies.length > 0
                    ? //Render filtered movies if there are any
                    filteredMovies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard
                          movie={movie}
                          user={user}
                          onToggleFavorite={handleToggleFavorite}
                        />
                      </Col>
                    )) : //Render all movies if no filtering is applied
                    movies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard
                          movie={movie}
                          user={user}
                          onToggleFavorite={handleToggleFavorite}
                        />
                      </Col>
                    ))}
                </>
              )}
            </>
          }>
          </Route>
          {user && (
            <Route
              path="/profile"
              element={<ProfileView user={user} movies={movies} token={token} onToggleFavorite={handleToggleFavorite}/>}
            />
          )}
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
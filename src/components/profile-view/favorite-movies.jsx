import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Container, Row, Col } from "react-bootstrap";
import "./favorite-movies.scss";

export const FavoriteMovies = ({ movies, user, onToggleFavorite }) => {

  const favoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie._id));

  return (
    <Container>
      <Row className="favorite-movies justify-content-center">
          {favoriteMovies.length > 0 ? (
            favoriteMovies.map(movie => (
            <Col key={movie._id} md={3} className="mb-4">
                <MovieCard className="h-100"
                  key={movie._id}
                  movie={movie}
                  user={user}
                  onToggleFavorite={onToggleFavorite}
                />
                </Col>
            ))
          ) : (
            <p>No favorite movies yet.</p>
          )}
      </Row>
    </Container>
  );
};
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import "./movie-card.scss";

export const MovieCard = ({ movie, user, onToggleFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);


  useEffect(() => {
    if (user && user.FavoriteMovies && user.FavoriteMovies.includes(movie._id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [user, movie._id]);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();  // Prevent the link from being followed
    console.log("Star clicked!");
    onToggleFavorite(movie._id);
  }
  
  return (
  <Link to={`/movies/${encodeURIComponent(movie._id)}`} className="link">
    <Card className="h-100" style={{ cursor: "pointer" }}>
      <Card.Img variant="top" src={movie.image} className="h-100"/>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.year}</Card.Text>
      </Card.Body>
      <Button variant="link" onClick={handleToggleFavorite}>
            <FontAwesomeIcon icon={isFavorite ? solidStar : regularStar} />
          </Button>
    </Card>
    </Link>
  );
};


MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string,
    synopsis: PropTypes.string,
    genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string
    })
  }).isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  }).isRequired,
};
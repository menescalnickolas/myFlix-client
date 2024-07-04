import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

export const MovieCard = ({ movie, user, setUser }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [storedToken, setStoredToken] = useState(
    localStorage.getItem("token") || ""
  );

  useEffect(() => {
    if (user && user.FavoriteMovies && user.FavoriteMovies.includes(movie._id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [user, movie._id]);

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();  // Prevent the link from being followed
    console.log("Star clicked!");
  
    try {
      let response;
      if (isFavorite) {
        response = await fetch(`/users/${encodeURIComponent(user.Username)}/movies/${encodeURIComponent(movie._id)}`, 
      {
        method: "DELETE",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          }
      }
      );
        console.log("Removed from favorites:", response.data);
      } else {
        response = await fetch(`/users/${encodeURIComponent(user.Username)}/movies/${encodeURIComponent(movie._id)}`,
        {
          method: "POST",
            headers: {
              Authorization: `Bearer ${storedToken}`,
            }
        }
      );
        console.log("Added to favorites:", response.data);
      }
      const updatedUser = await response.json();
      setIsFavorite(!isFavorite);
      setUser(updatedUser);  // Update user state with the response data
    } catch (error) {
      console.error("There was an error toggling the favorite status!", error);
    }
  };
  
  return (
  <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
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
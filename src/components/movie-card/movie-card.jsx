import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";


export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card onClick={() => onMovieClick(movie)} className="h-100" style={{ cursor: "pointer" }}>
      <Card.Img variant="top" src={movie.image} className="h-100"/>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.year}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    year: PropTypes.string,
    synopsis: PropTypes.string,
    /*image: PropTypes.node,*/
    genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string
    })
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
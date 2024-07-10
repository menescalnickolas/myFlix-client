import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container, Button } from "react-bootstrap";
import "./movie-view.scss";


export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

  return (
    <Container>
      <div className="movie-view">
        <Row>
          <div className="col">
            <img src={movie.image} alt={movie.title} />
          </div>
          <div className="col">
            <div className="movie-title">
              <h2>{movie.title}</h2>
            </div>
            <div>
              <h6>{movie.genre.Name} ({movie.year}) </h6>
            </div>
            <div>
              <span>Directed by </span>
              <span>{movie.director.Name}</span>
            </div>
            <div className="synopsis">
              <p>{movie.synopsis}</p>
            </div>
          </div>
        </Row>
        <Row>
          <div className="col-11"></div>
          <div className="col-1">
            <Link to={`/`}>
              <Button className="back-button" variant="light" style={{ cursor: "pointer" }}>Back</Button>
            </Link>
          </div>
        </Row>


      </div>
    </Container>

  );
};



import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";


export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId); 

  return (
    <div>
      <div>
      <img src={movie.image} alt={movie.title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Year: </span>
        <span>{movie.year}</span>
      </div>
      <div>
        <span>Synopsis: </span>
        <span>{movie.synopsis}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.Name}</span>
      </div>
      <Link to={`/`}>
      <button className="back-button" style={{ cursor: "pointer"}}>Back</button>
      </Link>
      
    </div>
  );
};



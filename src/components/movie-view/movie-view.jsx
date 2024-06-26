
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
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
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};



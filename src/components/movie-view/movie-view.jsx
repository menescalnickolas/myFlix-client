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
        <span>Year: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>Year: </span>
        <span>{movie.director}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
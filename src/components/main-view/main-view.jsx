import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {id: 1, title: "Challengers"},
    {id: 2, title: "Easy A"},
    {id: 3, title: "Clue"}
  ]);

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => {
        <MovieCard />
      })}
    </div>
  );
};
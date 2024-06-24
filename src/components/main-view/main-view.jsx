import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {id: 1, title: "Challengers", year: "2024", synopsis:"", genre: "", director: ""},
    {id: 2, title: "Easy A", year: "2010", synopsis:"", genre: "", director: ""},
    {id: 3, title: "Clue", year: "1985", synopsis:"", genre: "", director: ""}
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (<MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}/>
  );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
    {movies.map((movie) => (
      <MovieCard 
        key={movie.id}
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
      />
    ))}
  </div>
  );
};
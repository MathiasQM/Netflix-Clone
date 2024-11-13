import { Movie } from "../types";
import MovieCard from "./MovieCard";

export default function MovieList({
  movies,
  lastMovieRef,
}: {
  movies: Movie[];
  lastMovieRef: (node: HTMLDivElement) => void;
}) {
  return (
    <div className="px-12 pt-4 space-y-8">
      <div>
        <p className="text-black text-2xl font-semibold p-4">Popular shows</p>
      </div>
      <div className="flex flex-wrap gap-2 justify-around">
        {movies.map((movie, index) => (
          <MovieCard movie={movie} key={movie._id} lastMovieRef={movies.length === index + 1 ? lastMovieRef : null} />
        ))}
      </div>
    </div>
  );
}

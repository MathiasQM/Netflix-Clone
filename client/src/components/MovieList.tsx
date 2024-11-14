import { Movie } from "../types";
import MovieCard from "./MovieCard";

export default function MovieList({
  movies,
  listTitle,
  lastMovieRef,
}: {
  movies: Movie[];
  listTitle: string;
  lastMovieRef?: (node: HTMLDivElement) => void;
}) {
  return (
    <div className="px-12 pt-4 space-y-8">
      <div>
        <p className={`${listTitle === "My List" ? "text-white" : "text-black"} text-2xl font-semibold p-4`}>
          {listTitle}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 justify-around">
        {movies.map((movie, index) => (
          <MovieCard
            movie={movie}
            key={movie._id}
            lastMovieRef={movies.length === index + 1 && lastMovieRef ? lastMovieRef : null}
          />
        ))}
      </div>
    </div>
  );
}

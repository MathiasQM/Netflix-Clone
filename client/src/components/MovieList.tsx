import { Movie } from "../types";
import MovieCard from "./MovieCard";

export default function MovieList({ movies }: { movies: Movie[] }) {
  return (
    <div className="px-12 pt-4 space-y-8">
      <div>
        <p className="text-black text-2xl font-semibold p-4">Popular shows</p>
      </div>
      <div className="flex flex-wrap gap-2 justify-between">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  );
}

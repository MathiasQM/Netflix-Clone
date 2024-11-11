import MovieCard from "./MovieCard";

export default function MovieList() {
  return (
    <div className="px-12 pt-4 space-y-8">
      <div>
        <p className="text-black text-2xl font-semibold p-4">Popular shows</p>
      </div>
      <div className="grid grid-cols gap-2">
        <MovieCard />
      </div>
    </div>
  );
}

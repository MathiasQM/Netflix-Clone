import Billboard from "../components/Billboard";
import MovieList from "../components/MovieList";
import NavBar from "../components/NavBar";
import useMoviesList from "../hooks/useMoviesList";

export default function BrowsePage() {
  const { data, loading, error } = useMoviesList();
  console.log(data, loading, error);
  return (
    <div className="">
      <NavBar />
      <Billboard />
      <div className="pb-5 ">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {data && <MovieList movies={data} />}
      </div>
    </div>
  );
}

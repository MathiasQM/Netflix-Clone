import NavBar from "../components/NavBar";
import MovieList from "../components/MovieList";
import LoadingCards from "../components/LoadingCards";
import useMyList from "../hooks/useMyList";
import { useParams } from "react-router-dom";

export default function MyList() {
  const params = useParams();

  const { data: movies, loading, error } = useMyList(params.id);
  console.log(movies);

  return (
    <div className="pt-20 bg-black/90">
      <NavBar />
      <div className="pb-5">
        {error && <p>{error}</p>}
        {movies && <MovieList movies={movies} listTitle="My List" />}
        {loading ? <LoadingCards /> : null}
      </div>
    </div>
  );
}
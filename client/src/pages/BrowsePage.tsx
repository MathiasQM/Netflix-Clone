import { useState, useRef, useCallback } from "react";
import Billboard from "../components/Billboard";
import MovieList from "../components/MovieList";
import NavBar from "../components/NavBar";
import useMoviesList from "../hooks/useMoviesList";
import LoadingCards from "../components/LoadingCards";

export default function BrowsePage() {
  const [offset, setOffset] = useState(0);

  const { data, loading, error, hasMore } = useMoviesList(offset);

  const observer = useRef<null | IntersectionObserver>(null);

  const lastMovieRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset(offset + 12);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  return (
    <div className="">
      <NavBar />
      <Billboard />
      <div className="pb-5 ">
        {error && <p>{error}</p>}
        {data && <MovieList movies={data} lastMovieRef={lastMovieRef} listTitle="My List" />}
        {loading ? <LoadingCards /> : null}
      </div>
    </div>
  );
}

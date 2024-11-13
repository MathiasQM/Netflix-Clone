import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import { Movie } from "../types";
import { useNavigate } from "react-router-dom";

const MovieCard = ({
  movie,
  lastMovieRef,
}: {
  movie: Movie;
  lastMovieRef: ((node: HTMLDivElement) => void) | null;
}) => {
  const { poster, title, plot, genres, runtime, _id } = movie;

  const navigate = useNavigate();

  return (
    <div
      ref={lastMovieRef}
      className="group bg-zinc-400 rounded-md col-span relative h-[24vw] min-w-[200px] min-h-[300px] w-[24%]"
    >
      <img
        src={poster}
        alt={title}
        draggable={false}
        className="
        absolute
        top-0
        cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        rounded-md
        delay-300
        w-full
        h-full
      "
      />
      <div
        className="
        opacity-0
        transition
        duration-200
        invisible
        md:visible
        delay-300
        w-[300px]
        group-hover:opacity-100
      "
      >
        <div
          className="
          z-10
          p-2
          lg:p-4
          absolute
          w-full
          h-full
          transition
          duration-200
          shadow-md
          rounded-b-md
          delay-300
        group-hover:bg-black/60
          rounded-md
          overflow-hidden
          "
        >
          <div className="flex flex-row items-center gap-3">
            <button
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              onClick={() => navigate(`/movies/watch/${_id}`)}
            >
              <PlayIcon className="text-black w-4 lg:w-6" />
            </button>
            <div className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
              <ChevronDownIcon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
            </div>
          </div>
          <p className="text-white font-semibold mt-4 text-2xl mb-3">{title}</p>
          <p className="text-gray-400 text-sm">{plot}</p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{runtime} Minutes</p>
          </div>
          <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
            <p>{genres.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

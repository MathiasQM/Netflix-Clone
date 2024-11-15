import { PlusIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { PlayIcon } from "@heroicons/react/24/solid";
import { Movie } from "../types";
import { useMatch, useNavigate } from "react-router-dom";
import useMyList from "../hooks/useMyList";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const MovieCard = ({
  movie,
  removeFromMyList,
  lastMovieRef,
}: {
  movie: Movie;
  removeFromMyList: (id: string) => void;
  lastMovieRef: ((node: HTMLDivElement) => void) | null;
}) => {
  const match = useMatch("/browse/movies/mylist/:id");

  // Check if you're currently on `/browse/movies/mylist/:id`
  const isOnMyListPage = Boolean(match);

  const { poster, title, plot, genres, runtime, _id } = movie;

  const { user } = useSelector((state: RootState) => state.user.value);
  const { addToMyList } = useMyList(user.id);

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
              onClick={() => navigate(`/browse/movies/watch/${_id}`)}
            >
              <PlayIcon className="text-black w-4 lg:w-6" />
            </button>

            {isOnMyListPage ? (
              <button
                onClick={() => removeFromMyList(_id)}
                className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
              >
                <TrashIcon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
              </button>
            ) : (
              <button
                onClick={() => addToMyList(_id)}
                className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
              >
                <PlusIcon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
              </button>
            )}
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

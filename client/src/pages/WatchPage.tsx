import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import useMovie from "../hooks/useMovie";
import { useNavigate, useParams } from "react-router-dom";

export default function WatchPage() {
  const params = useParams();

  const navigate = useNavigate();

  const { data, loading, error } = useMovie(params.id);

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>{error}</p>;

  const { title, poster, fullplot, runtime, year } = data;

  return (
    <div className="h-screen w-screem bg-black">
      <nav className="fixed w-full p-4 z-10 flex items-center gap-80 bg-black/80 ">
        <ArrowLeftIcon
          className="w-10 text-white cursor-pointer hover:opacity-80 transition"
          onClick={() => navigate("/browse")}
        />
        <p className="text-white text-3xl font-bold">
          <span className="font-light">Watching:</span> {title}
        </p>
      </nav>
      <div className="w-full h-full flex justify-center items-center gap-5 p-32">
        <img
          src={poster}
          alt={title}
          draggable={false}
          className="
        cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        rounded-md
        delay-300
        w-auto
        h-1/2
      "
        />
        <div className="flex flex-col gap-3">
          <p className="text-[orange]">
            In a real enviroment the movie would be loaded here. But i do not have the rights ;O
          </p>
          <h1 className="text-white text-4xl font-bold">{title}</h1>
          <div className="flex gap-2">
            <span className="text-white bg-zinc-600 px-2 py-1 rounded-sm text-sm">{runtime} Minutes</span>
            <span className="text-white bg-zinc-600 px-4 py-1 rounded-sm text-sm">{year}</span>
            {/* <span className="text-white bg-zinc-600 px-4 py-1 rounded-sm text-sm">{imdb.rating} / 10</span> */}
          </div>
          <p className="text-white">{fullplot}</p>
          {/* <p className="text-white">{genres.join(", ")}</p> */}
        </div>
      </div>
      {/* <iframe
        className="h-full w-full"
        src="https://www.youtube.com/embed/46l2HlRQHk8?si=dbQWf13pjXYVz2mR?autoplay=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe> */}
    </div>
  );
}

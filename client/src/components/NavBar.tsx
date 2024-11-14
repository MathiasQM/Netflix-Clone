import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const tabs = ["Home", "Series", "Films", "New & Popular", "Browse by Languages"];

export default function NavBar() {
  const { user, isLoading } = useSelector((state: RootState) => state.user.value);
  const [showBg, setShowBg] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 600) {
        setShowBg(true);
      } else {
        setShowBg(false);
      }
    });
  }, []);
  return (
    <nav className="w-full fixed z-40 top-0">
      <div className={`px-16 flex items-center ${showBg ? "bg-black/80" : ""}`}>
        <img className="h-24" src="https://loodibee.com/wp-content/uploads/Netflix-logo.png" alt="logo" />
        <div className="flex gap-7 ml-8 mr-auto">
          {tabs.map((tab) => (
            <div key={tab} className="text-white hover:text-gray-500 cursor-pointer">
              <p>{tab}</p>
            </div>
          ))}
        </div>
        {user && !isLoading && (
          <div className="flex gap-5">
            <div className="text-white hover:text-gray-500 cursor-pointer ml-auto">
              <p onClick={() => navigate(`/browse/movies/mylist/${user.id}`)}>My List</p>
            </div>
            <div className="text-white hover:text-gray-500 cursor-pointer ml-auto">
              <p onClick={logout}>Logout</p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

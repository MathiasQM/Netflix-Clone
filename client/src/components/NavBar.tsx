import { useEffect, useState } from "react";

const tabs = ["Home", "Series", "Films", "New & Popular", "My List", "Browse by Languages"];

export default function NavBar() {
  const [showBg, setShowBg] = useState(false);
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
    <nav className="w-full fixed z-40">
      <div className={`px-16 flex items-center ${showBg ? "bg-black/80" : ""}`}>
        <img className="h-24" src="https://loodibee.com/wp-content/uploads/Netflix-logo.png" alt="logo" />
        <div className="flex gap-7 ml-8">
          {tabs.map((tab) => (
            <div key={tab} className="text-white hover:text-gray-500 cursor-pointer">
              <p>{tab}</p>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

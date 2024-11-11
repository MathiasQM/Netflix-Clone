export default function HomeBanner() {
  return (
    <div className="h-screen w-screen relative">
      <img
        className="w-full h-full"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/61b94313-a53b-4a73-b973-7632aafc9d8f/web_tall_panel/DK-en-20241104-TRIFECTA-perspective_52e081ea-cc80-4f4d-ae56-c1d6693f9ab0_large.jpg"
        alt=""
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full bg-black/40 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white font-bold text-5xl">Unlimited movies, TV shows and more! </h1>
          <p className="text-white text-3xl mt-3">Watch anywhere, Cancel anytime</p>
          <div className="mt-8">
            <a href="/login" className="bg-red-700 mt-8 text-white p-4 px-16 text-lg rounded font-semibold">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

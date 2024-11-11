import Input from "../components/Input";
import NavBar from "../components/NavBar";

export default function LoginPage() {
  return (
    <div className="relative bg-black/50 h-screen w-screen">
      <NavBar />
      <div className="flex justify-center items-center h-full">
        <div className="bg-black/70 p-16 self-center mt-2 w-full max-w-md rounded-md">
          <h2 className="text-white text-4xl mb-8 font-semibold">Sign in</h2>
          <form className="flex flex-col gap-4" action="">
            <Input />
            <input type="submit" className="bg-red-400 py-3 text-white rounded-md  w-full mt-10 hover:bg-red-700" />
            <p className="text-neutral-500 mt-12">
              <span className="text-white ml-1 hover:underline cursor-pointer">First time using Netflix?</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

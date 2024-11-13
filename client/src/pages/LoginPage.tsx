import { useState } from "react";
import Input from "../components/Input";
import NavBar from "../components/NavBar";

enum Variant {
  SIGN_UP,
  LOG_IN,
}
export default function LoginPage() {
  const [variant, setVariant] = useState(Variant.LOG_IN);

  return (
    <div className="relative bg-black/50 h-screen w-screen">
      <NavBar />
      <div className="flex justify-center items-center h-full">
        <div className="bg-black/70 p-16 self-center mt-2 w-full max-w-md rounded-md">
          <h2 className="text-white text-4xl mb-8 font-semibold">
            {variant === Variant.SIGN_UP ? "Sign in" : "Log In"}
          </h2>
          <form className="flex flex-col gap-4" action="">
            {variant === Variant.SIGN_UP && <Input id="username" type="text" label="Name" />}
            <Input id="email" type="email" label="Email Address" />
            <Input id="password" type="password" label="Password" />
            <input type="submit" className="bg-red-400 py-3 text-white rounded-md  w-full mt-10 hover:bg-red-700" />
          </form>
          {variant === Variant.LOG_IN ? (
            <p className="text-neutral-500 mt-12" onClick={() => setVariant(Variant.SIGN_UP)}>
              <span className="text-white ml-1 hover:underline cursor-pointer">First time using Netflix?</span>
            </p>
          ) : (
            <p className="text-neutral-500 mt-12" onClick={() => setVariant(Variant.LOG_IN)}>
              <span className="text-white ml-1 hover:underline cursor-pointer">Already have an account?</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

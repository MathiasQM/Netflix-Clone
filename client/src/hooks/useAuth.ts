import axios from "axios";

const useAuth = () => {
  const login = async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post("http://localhost:8080/auth/login", {
      email,
      password,
    });
    return response.data;
  };
  const signUp = async ({ email, password, name }: { email: string; password: string; name: string }) => {
    console.log(email, password, name);
    const response = await axios.post("http://localhost:8080/auth/signup", {
      email,
      password,
      name,
    });
    console.log(response);
    return response.data;
  };
  const fetchUser = () => {};

  return { signUp, login, fetchUser };
};

export default useAuth;

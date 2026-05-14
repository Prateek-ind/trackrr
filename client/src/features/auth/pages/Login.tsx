import { useState, type ChangeEvent } from "react";
import Input from "../../shared/components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(loginData);
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message, { cause: error });
      throw new Error("Something went wrong while login!!!", { cause: error });
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-white">
      <div className="max-w-lg p-6 border border-zinc-400 rounded-md">
        <h2 className="text-xl mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input placeholder="Email" name="email" onChange={handleChange} />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-indigo-500 px-2 py-1 rounded-md text-white hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-slate-500">
          If you dont have an account{" "}
          <Link to={"/register"} className="underline">
            {" "}
            click here
          </Link>{" "}
          to create.
        </p>
      </div>
    </section>
  );
};

export default Login;

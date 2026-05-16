import { useState, type ChangeEvent } from "react";

import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Register = () => {
  const [registerData, seRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    seRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await registerUser(registerData);
      navigate("/");
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message, { cause: error });
      throw new Error("Something went wrong while login!!!", { cause: error });
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-white">
      <div className="max-w-lg p-6 border border-zinc-400 rounded-md">
        <h2 className="text-xl mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          <Input placeholder="Email" name="email" onChange={handleChange} />
          <Input
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            className="bg-indigo-500 px-2 py-1 rounded-md text-white hover:bg-indigo-700"
          >
            Register
          </Button>
        </form>
        <p className="mt-6 text-slate-500">
          If you have an account{" "}
          <Link to={"/login"} className="underline">
            {" "}
            click here
          </Link>{" "}
          to login.
        </p>
      </div>
    </section>
  );
};

export default Register;

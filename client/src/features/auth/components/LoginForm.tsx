import React, { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const LoginForm = () => {
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
    <form onSubmit={handleSubmit} className="my-4">
      <Input placeholder="Email" name="email" onChange={handleChange} className="mb-4 py-6"/>
      <Input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        className="mb-4 py-6"
      />
      <div className="flex items-center justify-between mb-4">
        <label className="text-xs text-text-secondary flex items-center gap-1"><input type="checkbox"/> Remember me</label>
      <Link className="text-sm font-bold text-brand-purple" to={"/"}>Forgot Password?</Link>
      </div>
      <Button
        type="submit"
        className="w-full bg-indigo-500 px-6 py-6 rounded-md text-white hover:bg-brand-purple-hover transition cursor-pointer"
      >
        Sign in <ArrowRight/>
      </Button>
      
    </form>
  );
};

export default LoginForm;

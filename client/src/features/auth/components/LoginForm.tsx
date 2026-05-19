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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      await login(loginData);
      navigate("/dashboard");
    } catch (error: any) {
      if (error instanceof Error)
        setIsLoading(false)
        setError(error.message || "Login failed, try again.");
      throw new Error(error.message, { cause: error });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="my-4">
      <Input
        placeholder="Email"
        name="email"
        onChange={handleChange}
        className="mb-4 py-6"
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        className="mb-4 py-6"
      />
      <div className="flex items-center justify-between mb-4">
        <label className="text-xs text-text-secondary flex items-center gap-1">
          <input type="checkbox" /> Remember me
        </label>
        <Link className="text-sm font-bold text-brand-purple" to={"/"}>
          Forgot Password?
        </Link>
      </div>
      {error && <p className="text-xs text-status-rejected">{error}</p>}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full py-6 bg-brand-purple hover:bg-brand-purple-hover text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="flex items-center justify-center gap-2">
          {isLoading ? "Signing in..." : "Sign in"}
          {!isLoading && <ArrowRight size={16} />}
        </span>
      </Button>
    </form>
  );
};

export default LoginForm;

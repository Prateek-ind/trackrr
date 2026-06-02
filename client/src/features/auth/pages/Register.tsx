import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { Input } from "@/components/ui/input";
import Logo from "@/features/shared/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import AuthNavbar from "../components/AuthNavbar";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await registerUser(registerData);
      navigate("/");
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message, { cause: error });
      throw new Error("Something went wrong while registering!", {
        cause: error,
      });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-dark-900">
      {/* Glow */}
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-purple/20 blur-3xl" />

      {/* Theme toggle */}
      {/* <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div> */}
      <AuthNavbar/>

      <div className="relative z-10 w-full max-w-md px-6 mt-20">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Logo />
          <h1 className="text-3xl font-extrabold text-brand-purple">Trackrr</h1>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold tracking-tight text-text-primary mb-2">
            Create account
          </h2>
          <p className="text-sm text-text-muted">
            Start tracking your job applications today.
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-dark-border bg-dark-800 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">
                Username
              </label>
              <Input
                placeholder="e.g. prateek_kumar"
                name="username"
                onChange={handleChange}
                value={registerData.username}
                className="bg-dark-900 border-dark-border text-text-primary placeholder:text-text-muted focus:border-brand-purple"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">
                Email
              </label>
              <Input
                placeholder="you@example.com"
                name="email"
                type="email"
                onChange={handleChange}
                value={registerData.email}
                className="bg-dark-900 border-dark-border text-text-primary placeholder:text-text-muted focus:border-brand-purple"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">
                Password
              </label>
              <Input
                placeholder="Min. 8 characters"
                name="password"
                type="password"
                onChange={handleChange}
                value={registerData.password}
                className="bg-dark-900 border-dark-border text-text-primary placeholder:text-text-muted focus:border-brand-purple"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-purple py-3 text-sm font-semibold text-white transition-all hover:bg-brand-purple-hover mt-2"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-sm text-text-secondary text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-brand-purple hover:text-brand-purple-hover transition-all"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;

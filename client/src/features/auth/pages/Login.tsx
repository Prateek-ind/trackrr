import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Logo from "@/features/shared/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import AuthNavbar from "../components/AuthNavbar";

const Login = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-dark-900">
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-purple/20 blur-3xl" />

      {/* <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div> */}
      <AuthNavbar/>

      <div className="relative z-10 w-full max-w-md px-6 mt-20">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Logo />
          <h1 className="text-3xl font-extrabold text-brand-purple">Trackrr</h1>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold tracking-tight text-text-primary mb-2">
            Welcome back
          </h2>
          <p className="text-sm text-text-muted">
            The career management tool for professionals.
          </p>
        </div>

        <div className="rounded-2xl border border-dark-border bg-dark-800 p-8 shadow-2xl">
          <LoginForm />

          <p className="mt-6 text-sm text-text-secondary text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-brand-purple hover:text-brand-purple-hover transition-all"
            >
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;

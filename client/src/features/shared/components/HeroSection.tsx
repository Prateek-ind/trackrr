
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-2 items-center gap-12 px-6">
      <div className="space-y-6">
        <div className="space-y-8">
          <h1 className="text-6xl font-bold leading-tight text-slate-900">
            Track Your Job Applications Smarter
          </h1>
          <p className="max-w-xl text-lg text-slate-500">
            Organize applications, monitor interview progress, and stay on top
            of every opportunity in one place.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link to={"/register"}>
            <button className="rounded-xl bg-indigo-600 px-6 py-3  font-medium text-white hover:bg-indigo-700 transition cursor-pointer">
              Get Started
            </button>
          </Link>
          <button className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-100 transition cursor-pointer">
            Learn More
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="h-100 w-full rounded-3xl border border-slate-200 bg-white shadow-sm">
          Dashboard Preview
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

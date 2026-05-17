import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-dark-border/40 bg-dark-900/50 backdrop-blur-md">
      <div className="mx-auto h-16 max-w-6xl flex items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <h2 className="text-2xl font-bold text-brand-purple">Trackrr</h2>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="rounded-lg border border-dark-border/60 bg-dark-800/40 px-4 py-2 text-sm font-medium text-text-primary transition-all hover:border-brand-purple/40 hover:bg-dark-700/40"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-brand-purple px-4 py-2 text-sm font-medium text-white transition-all hover:bg-brand-purple-hover"
          >
            Get Started
          </Link>

          <ThemeToggle />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
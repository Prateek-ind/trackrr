import { ThemeToggle } from "@/components/ThemeToggle";
import Logo from "@/features/shared/components/Logo";
import { Link } from "react-router-dom";


const AuthNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-dark-border/40 bg-dark-900/50 backdrop-blur-md">
      <div className="mx-auto h-16 max-w-7xl flex items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <h2 className="text-2xl font-bold text-brand-purple">Trackrr</h2>
        </Link>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">

          

          <ThemeToggle />
        </div>

      </div>
    </nav>
  );
};

export default AuthNavbar;
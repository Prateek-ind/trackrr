import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const DashboardNavbar = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto h-16 max-w-6xl flex items-center justify-between px-6">
        <Link to={"/"}>
          <h2 className="text-2xl text-indigo-700 font-bold">Trackrr</h2>
        </Link>
        <div className="flex items-center gap-4">
          <Link to={"/"}>
            <button
              className="px-4 py-2 text-sm font-medium border border-slate-300 rounded-md text-slate-600 hover:text-slate-900 hover:border-slate-500 transition cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;

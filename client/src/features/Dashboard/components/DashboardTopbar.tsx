import { useAuth } from "../../../hooks/useAuth";
import { useState, type ChangeEvent } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

import Search from "@/features/shared/components/Search";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import useDebounce from "@/hooks/useDebounce";

const DashboardTopbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const { logout } = useAuth();
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const debouncedValue = useDebounce(searchInput);

  const onSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const results = debouncedValue.trim()
    ? jobs.filter(
        (job) =>
          job.role.toLowerCase().includes(debouncedValue.toLowerCase()) ||
          job.company.toLowerCase().includes(debouncedValue.toLowerCase()),
      )
    : [];
  console.log(results);

  return (
    <nav className=" w-full h-16 px-6 border-b border-dark-border bg-white dark:bg-dark-900 flex items-center justify-between">
      <div className="relative w-72">
        <Search searchInput={searchInput} onSearchInput={onSearchInput} />
        {debouncedValue.trim() && (
          <div className="absolute top-full  w-full bg-dark-800 border-b border-x border-dark-border rounded-b-lg shadow-lg z-50 overflow-hidden">
            {results.length > 0 ? (
              <>
                {results.slice(0, 5).map((job) => (
                  <Link
                    key={job._id}
                    to={`/dashboard/applications/${job._id}`}
                    onClick={() => setSearchInput("")}
                    className="flex items-center justify-between px-4 py-3 hover:bg-dark-700 transition-colors border-b border-dark-border last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-text-primary">{job.role}</p>
                      <p className="text-xs text-text-muted">{job.company}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      job.status === "offer" ? "text-green-400 bg-green-400/10" :
                      job.status === "interview" ? "text-blue-400 bg-blue-400/10" :
                      job.status === "rejected" ? "text-red-400 bg-red-400/10" :
                      "text-brand-purple bg-brand-purple/10"
                    }`}>
                      {job.status}
                    </span>
                  </Link>
                ))}
                {results.length > 5 && (
                  <Link
                    to="/dashboard/applications"
                    onClick={() => setSearchInput("")}
                    className="block px-4 py-3 text-xs text-center text-text-muted hover:text-brand-purple transition-colors"
                  >
                    View all {results.length} results →
                  </Link>
                )}
              </>
            ) : (
              <p className="px-4 py-3 text-sm text-text-muted">No applications found.</p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-dark-border bg-dark-800 text-text-muted transition-all hover:border-brand-purple/40 hover:text-text-primary">
          <Bell size={16} />
        </button> */}

        <ThemeToggle />

        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-lg border border-dark-border bg-dark-800 px-3 py-2 text-sm font-medium text-text-secondary transition-all hover:border-status-rejected/40 hover:text-status-rejected"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default DashboardTopbar;

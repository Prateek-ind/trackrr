import { useAuth } from "../../../hooks/useAuth";
import { useState, type ChangeEvent } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Search, Bell } from "lucide-react";

const DashboardTopbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const { logout } = useAuth();

  const onSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <nav className="w-full h-16 px-6 border-b border-dark-border bg-slate-50 dark:bg-dark-900 flex items-center justify-between">
      <div className="relative w-72">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          type="text"
          placeholder="Search applications..."
          name="search"
          value={searchInput}
          onChange={onSearchInput}
          className="w-full rounded-lg border border-dark-border bg-dark-800 py-2 pl-9 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-purple focus:outline-none transition-all"
        />
      </div>

      <div className="flex items-center gap-3">
        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-dark-border bg-dark-800 text-text-muted transition-all hover:border-brand-purple/40 hover:text-text-primary">
          <Bell size={16} />
        </button>

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

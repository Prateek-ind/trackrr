import { useAuth } from "../../../hooks/useAuth";
import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";

const DashboardTopbar = () => {
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  const onSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  return (
    <nav className="w-full h-20 px-6 border-b dark:border-slate-700 border-slate-200 bg-white dark:bg-dark-900 flex items-center justify-between">
      <div>
        <Input
          type="text"
          placeholder="search"
          name="search"
          onChange={onSearchInput}
          className="dark:bg-slate-950
            border-slate-200
            dark:border-slate-700
            text-slate-200
            placeholder:text-slate-500
            focus:outline-none
            focus-visible:ring-indigo-400
            focus-visible:border-indigo-400"
        />
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button
          className="
            bg-brand-purple
            text-slate-200
            hover:bg-brand-purple-hover
            hover:text-white
            rounded-md"
            onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default DashboardTopbar;

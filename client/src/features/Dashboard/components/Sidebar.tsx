import { Link, useLocation } from "react-router-dom";
import Logo from "@/features/shared/components/Logo";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  PlusCircle,
  BarChart2,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";

const sidebarOptions = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  {
    name: "Applications",
    path: "/dashboard/applications",
    icon: BriefcaseBusiness,
  },
  { name: "Add Job", path: "/dashboard/add-job", icon: PlusCircle },
  { name: "Analytics", path: "/dashboard/analytics", icon: BarChart2 },
  { name: "Profile", path: "/dashboard/profile", icon: UserRound },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-dark-border bg-dark-800">
      <div className="flex items-center justify-center gap-2   p-6">
        <Logo />
        <h2 className="text-2xl font-bold text-brand-purple">Trackrr</h2>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {sidebarOptions.map(({ name, path, icon: Icon }) => {
          const isActive = pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-brand-purple/10 text-brand-purple"
                    : "text-text-secondary hover:bg-dark-700 hover:text-text-primary"
                }`}
            >
              <Icon size={18} />
              {name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-dark-border p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-secondary transition-all hover:bg-dark-700 hover:text-status-rejected">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

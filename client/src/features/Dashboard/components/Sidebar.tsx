import { Link } from "react-router-dom";

const sidebarOptions = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Applications",
    path: "/dashboard/applications",
  },
  {
    name: "Add Job",
    path: "/dashboard/add-job",
  },
  {
    name: "Analytics",
    path: "/dashboard/analytics",
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
  },
];

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 border-r border-slate-200 bg-white">

      <nav className="flex flex-col p-4">
        {sidebarOptions.map((option) => (
          <Link
            key={option.path}
            to={option.path}
            className="
              rounded-xl
              px-4
              py-3
              text-sm
              font-medium
              text-slate-700
              transition
              hover:bg-slate-100
            "
          >
            {option.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

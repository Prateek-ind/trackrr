import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../../layouts/RootLayout";
import Dashboard from "../../features/Dashboard/pages/Dashboard";
import Login from "../../features/auth/pages/Login";
import Register from "../../features/auth/pages/Register";
import Homepage from "../../features/shared/pages/Homepage";
import ProtectedRoute from "../../features/shared/components/ProtectedRoute";
import DashboardLayout from "../../layouts/DashboardLayout";
import Applications from "../../features/Applications/pages/Applications";
import AddJob from "../../features/Add Job/Pages/AddJob";
import Analytics from "../../features/Analytics/Pages/Analytics";
import Profile from "../../features/Profile/pages/Profile";
import Settings from "../../features/Settings/pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "applications",
        element: <Applications/>
      },
      {
        path: "add-job",
        element: <AddJob/>
      },
      {
        path: "analytics",
        element: <Analytics/>
      },
      {
        path: "Profile",
        element: <Profile/>
      },
      {
        path: "settings",
        element: <Settings/>
      }
    ],
  },
]);

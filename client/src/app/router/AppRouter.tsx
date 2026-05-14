import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../../layouts/RootLayout";
import Dashboard from "../../features/jobs/pages/Dashboard";
import Login from "../../features/auth/pages/Login";
import Register from "../../features/auth/pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

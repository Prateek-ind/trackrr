import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../features/shared/components/Navbar";
import { useEffect } from "react";

const RootLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <main className="w-full max-h-screen bg-dark-900">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default RootLayout;

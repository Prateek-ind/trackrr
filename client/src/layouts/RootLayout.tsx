import { Outlet } from "react-router-dom";
import Navbar from "../features/shared/components/Navbar";


const RootLayout = () => {
  return (
    <main className="w-full max-h-screen bg-dark-900">
      <Navbar/>
      <Outlet />
    </main>
  );
};

export default RootLayout;

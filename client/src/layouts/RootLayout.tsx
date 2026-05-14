import { Outlet } from "react-router-dom";


const RootLayout = () => {
  return (
    <main className="w-full max-h-screen bg-slate-50">
      <Outlet />
    </main>
  );
};

export default RootLayout;

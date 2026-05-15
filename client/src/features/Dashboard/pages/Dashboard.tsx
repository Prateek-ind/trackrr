import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <section className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Track and manage your applications.</p>
        </div>

        <div>Stats</div>
      </main>
    </section>
  );
};

export default Dashboard;

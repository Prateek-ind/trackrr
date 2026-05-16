
import StatsCard from "../components/StatsCard";

const Dashboard = () => {
  return (
    <section className="flex bg-slate-50 dark:bg-dark-900 min-h-screen">
    

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-300">Track and manage your applications.</p>
        </div>

        <div><StatsCard/></div>
      </main>
    </section>
  );
};

export default Dashboard;

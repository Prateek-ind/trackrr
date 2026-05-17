import StatsCard from "../components/StatsCard";

const Dashboard = () => {
  return (
    <main className="flex-1 p-8 bg-dark-900 min-h-screen">

     
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">
          Welcome back, Prateek 👋
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Here's what's happening with your job search today.
        </p>
      </div>

      
      <StatsCard />

    </main>
  );
};

export default Dashboard;
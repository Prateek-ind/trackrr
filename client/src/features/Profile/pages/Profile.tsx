import { Button } from "@/components/ui/button";
import AnalyticsStatsCards from "@/features/Analytics/components/StatsCards";
import LiveActivity from "@/features/Dashboard/components/LiveActivity";
import StatsCard from "@/features/Dashboard/components/StatsCard";

import { LuArrowRight } from "react-icons/lu";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <section className="w-full flex-1 p-8  bg-white dark:bg-dark-900 min-h-screen">
      <div className="max-w-4xl p-6 bg-dark-800 rounded-md ">
        <div className="w-full flex items-center gap-4">
          <div className="w-46 h-32 border border-dark-border rounded-full p-2">
            <img src="" alt="profile picture" />
            <button>
              <input type="file" />
            </button>
          </div>
          <div className="w-full">
            <p>Name: </p>
            <p>Role</p>
            <p>Location</p>
            <p>Email</p>
            <p>Linkdedin</p>
          </div>
          <div>
            <Button>Edit Profile</Button>
            <Button>New Application</Button>
          </div>
        </div>
        <br />

        <div>
          <h3>Profile summary</h3>
          <p>Summary</p>
        </div>
        <div className="">
          <div className="w-full flex items-center justify-between ">
            <h2>Performance Summary</h2>{" "}
            <Link to={"/dashboard"}>
              Full report <LuArrowRight />
            </Link>
          </div>
          <StatsCard />
        </div>
        <div className="grid grid-cols-2">
          <LiveActivity />
        </div>
      </div>
    </section>
  );
};

export default Profile;

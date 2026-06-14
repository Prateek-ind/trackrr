import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/api/user";
import { Mail, MapPin, Phone, Link2, AtSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Loading from "@/features/shared/components/Loading";
import Error from "@/features/shared/components/Error";
import DetailItem from "../components/DetailItem";

const Profile = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchUser,
  });
  const user = data?.user;

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message ?? "Something went wrong"} />;
  if (!user) return <p>Profile not found.</p>;

  return (
    <section className="w-full max-w-4xl p-8 mb-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-text-primary">Profile</h2>
          <p className="text-sm font-medium text-text-secondary">
            Your personal and professional details
          </p>
        </div>
        <Button
          className="bg-brand-purple text-text-primary  hover:bg-brand-purple-hover cursor-pointer"
          onClick={() => navigate("/dashboard/profile/edit")}
        >
          Edit Profile
        </Button>
      </div>

      <div className="rounded-2xl border border-dark-border bg-dark-800 shadow-lg p-6 space-y-8">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center text-2xl font-bold text-brand-purple">
            {user.name?.[0]?.toUpperCase() || user.username?.[0]?.toUpperCase()}
          </div>

          <div>
            <h3 className="text-xl font-bold text-text-primary">
              {user.name || user.username}
            </h3>
            <p className="text-sm text-text-muted">@{user.username}</p>
          </div>
        </div>

        {/* Contact details */}
        <div className="grid grid-cols-2 gap-6">
          <DetailItem icon={Mail} label="Email" value={user.email} />
          <DetailItem icon={Phone} label="Phone" value={user.phone} />
          <DetailItem icon={MapPin} label="Location" value={user.location} />
          <DetailItem icon={Link2} label="LinkedIn" value={user.linkedin} />
        </div>

        {/* Bio */}
        {user.bio && (
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase mb-2">
              Bio
            </p>
            <p className="max-h-64 text-sm text-text-secondary leading-relaxed whitespace-pre-wrap overflow-y-auto">
              {user.bio}
            </p>
          </div>
        )}

        {/* Skills */}
        {user.skills?.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase mb-2">
              Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, i) => (
                <span
                  key={i}
                  className="rounded-full border border-dark-border bg-dark-900 px-3 py-1 text-sm text-text-secondary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {user.currentJobDetails && (
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase mb-2">
              Current Job Details
            </p>
            <p className="max-h-96 text-sm text-text-secondary leading-relaxed whitespace-pre-wrap overflow-y-auto">
              {user.currentJobDetails}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;

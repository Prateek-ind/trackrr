import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-28 text-center bg-dark-900">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-5xl font-bold text-text-primary">
          Don't let your dream job slip away
        </h2>

        <p className="mt-6 text-text-muted">
          Join thousands of job seekers using Trackrr to organize applications,
          prepare for interviews, and land offers faster.
        </p>

        <button
          className="mt-10 bg-brand-purple text-white px-8 py-4 rounded-xl cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Create Your Free Account
        </button>
      </div>
    </section>
  );
};

export default CTASection;

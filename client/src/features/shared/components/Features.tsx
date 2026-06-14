import {
  LuBriefcase,
  LuChartColumn,
  LuNotebookPen,
  LuSearch,
  LuBell,
  LuShield,
} from "react-icons/lu";

const features = [
  {
    title: "Application Tracking",
    description:
      "Track every application from Applied to Offer in one organized dashboard.",
    icon: LuBriefcase,
  },
  {
    title: "Analytics Dashboard",
    description:
      "Visualize response rates, interviews, offers, and application trends.",
    icon: LuChartColumn,
  },
  {
    title: "Interview Notes",
    description:
      "Keep company research, preparation notes, and feedback in one place.",
    icon: LuNotebookPen,
  },
  {
    title: "Smart Search",
    description:
      "Instantly find any application using powerful filters and search.",
    icon: LuSearch,
  },
  {
    title: "Live activity updates",
    description: "Never miss an important activity update.",
    icon: LuBell,
  },
  {
    title: "Secure Workspace",
    description:
      "Your job search data stays private, secure, and accessible anywhere.",
    icon: LuShield,
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className=" min-h-screen mx-auto bg-dark-900 px-6 pb-12"
    >
      <div className="pt-12 flex flex-col items-center justify-between gap-4">
        <p className="text-brand-purple text-xs uppercase font-semibold">
          Features
        </p>
        <h2 className="text-text-primary text-3xl font-bold">
          Everything you need to land the job
        </h2>
        <p className="max-w-xl text-text-secondary text-center">
          Stop using messy spreadSheets. Trackrr gives you a professional-grade
          command center for your journey.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-7xl">
          {features.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-xl border border-dark-border bg-dark-800 p-6 w-96 space-y-4"
            >
              <Icon size={24} />
              <h3 className="font-semibold text-lg text-text-primary">
                {title}
              </h3>

              <p className="mt-3 text-text-muted">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

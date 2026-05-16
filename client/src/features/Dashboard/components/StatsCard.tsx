const statsCards = [
  { heading: "Total Applications", value: 10 },
  { heading: "Interviews", value: 2},
  { heading: "Offers", value: 0},
  { heading: "Rejections", value: 4},
];

const StatsCard = () => {
  return (
    <div className=" flex items-center gap-4">
      {statsCards.map((card) => (
        <div key={card.heading} className="w-full max-w-48 space-y-4 border border-slate-400 p-4 rounded-md">
          <h2 className="font-medium text-md">{card.heading}</h2>
          <p>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;

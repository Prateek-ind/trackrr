interface PillProps {
  value: string;
  variants: Record<string, string>;
}

const Pill = ({ value, variants }: PillProps) => {
  return (
    <div
      className={`rounded-full px-6 py-1 text-sm font-medium w-fit h-8 ${
        variants[value] || "bg-gray-200 text-gray-700"
      }`}
    >
      {value}
    </div>
  );
};

export default Pill;

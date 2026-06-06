interface PillProps {
  value: string;
  variants: Record<string, string>;
}

const Pill = ({ value, variants }: PillProps) => {
  return (
    <div
      className={`mt-1 text-sm px-3 py-0.5 rounded-full font-medium text-center my-auto ${
        variants[value] || "bg-gray-200 text-gray-700"
      }`}
    >
      {value}
    </div>
  );
};

export default Pill;

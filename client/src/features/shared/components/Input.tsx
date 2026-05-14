import type { ChangeEvent } from "react";

type InputProps = {
  type?: string;
  placeholder: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ type = "text", placeholder, name, onChange }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      className="w-full px-4 py-1.5 border border-slate-200 focus:outline-none focus:border-gray-400 rounded-xl transition"
    />
  );
};

export default Input;

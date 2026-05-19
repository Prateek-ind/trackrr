import { Input } from "@/components/ui/input";
import type { LucideIcon } from "lucide-react";

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: LucideIcon;
  type?: string;
}

const FormField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  type = "text",
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary uppercase tracking-wide">
        {Icon && <Icon size={14} />}
        <p>{label}</p>
      </div>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="py-6 border border-dark-border bg-dark-900 text-text-primary placeholder:text-text-muted focus:border-brand-purple"
      />
    </div>
  );
};

export default FormField;

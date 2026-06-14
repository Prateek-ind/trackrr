import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { JobPriority } from "@/types/job.types";

interface StatusSelectProps {
  value: JobPriority | "all";
  onChange: (val: JobPriority | "all") => void;
}

const PriorityFilter = ({ value, onChange }: StatusSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full px-6 py-2 cursor-pointer">
        <SelectValue placeholder="Job Priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PriorityFilter;

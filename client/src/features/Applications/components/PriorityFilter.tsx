import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { JobPriority, JobStatus } from "@/types/job.types";

type filterValue = JobPriority | "all";

interface StatusSelectProps {
  value: filterValue;
  onChange: (val: JobStatus) => void;
}

const PriorityFilter = ({ value, onChange }: StatusSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full px-6 py-2">
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

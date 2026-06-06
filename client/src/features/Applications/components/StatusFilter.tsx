import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { JobStatus } from "@/types/job.types";

type filterValue =  JobStatus | "all"

interface StatusSelectProps {
  value: filterValue ;
  onChange: (val: JobStatus) => void;
}

const StatusFilter = ({ value, onChange }: StatusSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full px-6 py-2">
        <SelectValue placeholder="Job Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="applied">Applied</SelectItem>
          <SelectItem value="interview">Interview</SelectItem>
          <SelectItem value="assessment">Assessment</SelectItem>
          <SelectItem value="offer">Offer</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StatusFilter;

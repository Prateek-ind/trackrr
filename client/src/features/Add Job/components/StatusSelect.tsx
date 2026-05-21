import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { JobStatus } from "@/types/job.types";

interface StatusSelectProps {
  value: JobStatus;
  onChange: (val: JobStatus) => void;
}

const StatusSelect = ({value, onChange}: StatusSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full py-6">
        <SelectValue placeholder="Job Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
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

export default StatusSelect;

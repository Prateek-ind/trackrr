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
  loading: boolean
  onChange: (val: JobStatus) => void;
}

const StatusChange = ({value, onChange, loading}: StatusSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange} disabled={loading}>
      <SelectTrigger className="w-fit mx-auto px-6">
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

export default StatusChange;

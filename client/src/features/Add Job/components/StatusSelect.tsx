import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StatusSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-full py-6">
        <SelectValue placeholder="Job Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="applied">Applied</SelectItem>
          <SelectItem value="interviewed">Interviewed</SelectItem>
          <SelectItem value="selected">Selected</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StatusSelect;

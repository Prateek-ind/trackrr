import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface TogglePriorityProps {
  value: string;
  onChange: (val: string) => void;
}

export function TogglePriority({ value, onChange }: TogglePriorityProps) {
  return (
    <ToggleGroup
      type="single"
      size="lg"
      variant="outline"
      spacing={2}
      value={value}
      onValueChange={(val) => val && onChange(val)}
    >
      <ToggleGroupItem
        value="low"
        aria-label="Toggle top"
        className="px-6 data-[state=on]:bg-brand-purple data-[state=on]:text-white data-[state=on]:border-border/40 text-text-muted border-dark-border"
      >
        Low
      </ToggleGroupItem>
      <ToggleGroupItem
        value="medium"
        aria-label="Toggle bottom"
        className="px-6 data-[state=on]:bg-brand-purple data-[state=on]:text-white data-[state=on]:border-border/40 text-text-muted border-dark-border"
      >
        Medium
      </ToggleGroupItem>
      <ToggleGroupItem
        value="high"
        aria-label="Toggle left"
        className="px-6 data-[state=on]:bg-brand-purple data-[state=on]:text-white data-[state=on]:border-border/40 text-text-muted border-dark-border"
      >
        High
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

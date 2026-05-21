import { Input } from "@/components/ui/input";
import { SearchX } from "lucide-react";
import type { ChangeEvent } from "react";


interface SearchProps {
  searchInput: string ;
  onSearchInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ searchInput, onSearchInput }: SearchProps) => {
  return (
    <div className="relative w-72">
      <SearchX
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
      />
      <Input
        type="text"
        placeholder="Search applications..."
        name="search"
        value={searchInput}
        onChange={onSearchInput}
        className="w-full rounded-lg border border-dark-border bg-dark-800 py-2 pl-9 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-purple focus:outline-none transition-all"
      />
    </div>
  );
};

export default Search;

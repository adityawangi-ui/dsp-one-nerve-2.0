import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  onClearFilters: () => void;
  resultCount: number;
  totalCount: number;
}

export const FilterBar = ({
  searchQuery,
  onSearchChange,
  location,
  onLocationChange,
  type,
  onTypeChange,
  onClearFilters,
  resultCount,
  totalCount,
}: FilterBarProps) => {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search decisions..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 bg-background border-border"
            />
          </div>

          <Select value={location} onValueChange={onLocationChange}>
            <SelectTrigger className="w-full sm:w-[180px] bg-background">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="L002">L002</SelectItem>
              <SelectItem value="L004">L004</SelectItem>
              <SelectItem value="L005">L005</SelectItem>
              <SelectItem value="L009">L009</SelectItem>
              <SelectItem value="L015">L015</SelectItem>
              <SelectItem value="L017">L017</SelectItem>
              <SelectItem value="L018">L018</SelectItem>
              <SelectItem value="L020">L020</SelectItem>
            </SelectContent>
          </Select>

          <Select value={type} onValueChange={onTypeChange}>
            <SelectTrigger className="w-full sm:w-[200px] bg-background">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="preventive">Preventive Transfer</SelectItem>
              <SelectItem value="reactive">Reactive Transfer</SelectItem>
              <SelectItem value="optimization">Optimization</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={onClearFilters} className="whitespace-nowrap">
            Clear Filters
          </Button>
        </div>

        <div className="text-sm text-muted-foreground whitespace-nowrap">
          Showing <span className="font-semibold text-foreground">{resultCount}</span> of{" "}
          <span className="font-semibold text-foreground">{totalCount}</span> decisions
        </div>
      </div>
    </div>
  );
};

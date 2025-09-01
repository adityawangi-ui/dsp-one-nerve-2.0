import { useState } from "react";
import { Search, Bell, ChevronDown, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export const TopNavigation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches] = useState([
    "Show me APAC demand trends",
    "Supply shortages in Europe",
    "Forecast accuracy by region",
    "Inventory levels Q4"
  ]);

  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Left: Branding */}
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Autonomous Plan Orchestrator</h1>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-2xl mx-8 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Ask me anything about your operations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-10 bg-surface border-border focus:border-primary focus:ring-primary"
          />
        </div>
        
        {/* Search Suggestions */}
        {searchQuery.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-[var(--shadow-elevated)] z-50">
            <div className="p-2">
              <div className="text-xs text-muted-foreground mb-2 px-2">Recent searches</div>
              {recentSearches
                .filter(search => search.toLowerCase().includes(searchQuery.toLowerCase()))
                .slice(0, 4)
                .map((search, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-2 py-2 text-sm hover:bg-muted rounded text-foreground"
                    onClick={() => setSearchQuery(search)}
                  >
                    {search}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-destructive text-destructive-foreground">
              3
            </Badge>
          </Button>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Preferences</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
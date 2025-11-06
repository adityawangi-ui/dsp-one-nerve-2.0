import { ChevronDown, User, Settings, Brain, EuroIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export const TopNavigation = () => {
  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Left: Branding */}
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Brain className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="relative">
          <h1 className="text-2xl font-playfair font-bold gradient-text">One Nerve</h1>
        </div>
      </div>


      {/* Right: Actions */}
      <div className="flex items-center space-x-2">
        {/* Value Meter */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm shadow-md">
          <EuroIcon className="h-4 w-4 text-primary" />
          <div className="text-right">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Value Meter</div>
            <div className="text-lg font-bold gradient-text">12.4M</div>
          </div>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">Alex Hales</div>
                <div className="text-xs text-muted-foreground">Supply Planner</div>
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
import { useState } from "react";
import { TopNavigation } from "./TopNavigation";
import { MainSidebar } from "./MainSidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <TopNavigation />
      
      <div className="flex flex-1 w-full">
        <MainSidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
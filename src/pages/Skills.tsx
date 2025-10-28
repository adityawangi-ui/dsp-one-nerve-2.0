import { MainLayout } from "@/components/layout/MainLayout";

export default function Skills() {
  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-background to-muted/20 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
              Skills
            </h1>
            <p className="text-muted-foreground">
              Manage and configure AI skills and capabilities
            </p>
          </div>
          
          {/* Content placeholder */}
          <div className="bg-card rounded-2xl shadow-elegant border border-border/50 p-12 text-center animate-fade-in">
            <p className="text-muted-foreground">Content coming soon...</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Video, FileText, Brain, ArrowLeft } from "lucide-react";

export default function LearningHub() {
  const navigate = useNavigate();
  const activeAgents = ["Learning Agent", "Process Audit Agent"];

  return (
    <MainLayout>
      <div className="space-y-6 p-8 animate-fade-in">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-4xl font-bold">Learning Agent Hub</h1>
        </div>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Active Agents:</span>
            {activeAgents.map((agent) => (
              <Badge key={agent} variant="secondary">{agent}</Badge>
            ))}
          </div>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <Video className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">How-to Videos</h3>
            <p className="text-muted-foreground">Interactive tutorials</p>
          </Card>
          <Card className="p-6">
            <FileText className="h-8 w-8 text-success mb-4" />
            <h3 className="text-xl font-semibold mb-2">Best Practices</h3>
            <p className="text-muted-foreground">Process documentation</p>
          </Card>
          <Card className="p-6">
            <Brain className="h-8 w-8 text-warning mb-4" />
            <h3 className="text-xl font-semibold mb-2">RCA Walkthroughs</h3>
            <p className="text-muted-foreground">Root cause analysis guides</p>
          </Card>
          <Card className="p-6">
            <BookOpen className="h-8 w-8 text-destructive mb-4" />
            <h3 className="text-xl font-semibold mb-2">Decision Narratives</h3>
            <p className="text-muted-foreground">Explain agent recommendations</p>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

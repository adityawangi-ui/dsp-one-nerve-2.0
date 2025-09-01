import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export const ComingSoon = ({ title, description }: ComingSoonProps) => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center space-x-2"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </Button>
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold mb-2">{title}</h1>
        {description && (
          <p className="text-muted-foreground max-w-md mx-auto">{description}</p>
        )}
      </div>
    </div>
  );
};
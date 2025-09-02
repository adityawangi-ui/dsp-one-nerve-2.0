import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Pin, FlaskConical } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "ai";
  timestamp: Date;
  agents?: string[];
}

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}>
      <div className={`max-w-[85%] ${isUser ? "max-w-[70%]" : ""}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-blue-50 text-slate-900 ml-auto"
              : "bg-white border border-border text-slate-900"
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
          
          {/* Agent Attribution */}
          {message.agents && message.agents.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {message.agents.map((agent) => (
                <Badge key={agent} variant="secondary" className="text-xs">
                  {agent}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Message Actions and Timestamp */}
        <div className={`flex items-center mt-1 ${isUser ? "justify-end" : "justify-between"}`}>
          <span className="text-xs text-muted-foreground">
            {format(message.timestamp, "HH:mm")}
          </span>
          
          {!isUser && (
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Copy className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Pin className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <FlaskConical className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
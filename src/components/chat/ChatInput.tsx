import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, Paperclip } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-end space-x-2 bg-white border-2 border-slate-200 rounded-2xl p-2 focus-within:border-primary transition-colors">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your planning operations..."
            className="flex-1 border-0 bg-transparent resize-none min-h-[44px] max-h-[120px] focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-400"
            rows={1}
          />
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600"
          >
            <Mic className="h-4 w-4" />
          </Button>
          
          <Button
            type="submit"
            size="sm"
            className="h-8 w-8 p-0 bg-primary hover:bg-primary/90"
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};
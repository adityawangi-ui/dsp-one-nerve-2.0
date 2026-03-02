import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic, Send, Plus, Settings } from "lucide-react";
import { AgenticGenerativeUI } from "@/components/chat/AgenticGenerativeUI";

export default function PromptBox() {
  const [inputValue, setInputValue] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  const submit = () => {
    if (inputValue.trim()) setChatOpen(true);
  };

  return (
    <>
      <div className="frosted-glass breathing-border rounded-2xl border-2 border-primary/30 shadow-[var(--shadow-glow)]">
        <div className="flex items-center gap-3 pl-4 pr-3 py-2.5">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10" title="Quick Actions">
              <Plus className="h-4 w-4 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10" title="Settings">
              <Settings className="h-4 w-4 text-primary" />
            </Button>
          </div>
          <Input
            placeholder="Hi, How can I help you?…"
            className="flex-1 h-10 text-sm border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => { if (e.key === "Enter") submit(); }}
          />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10" title="Voice Input">
              <Mic className="h-4 w-4 text-primary" />
            </Button>
            <Button size="icon" className="h-9 w-9 rounded-xl bg-primary hover:bg-primary/90 shadow-md" onClick={submit}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <AgenticGenerativeUI
        isOpen={chatOpen}
        onClose={() => { setChatOpen(false); setInputValue(""); }}
        initialQuery={inputValue}
      />
    </>
  );
}

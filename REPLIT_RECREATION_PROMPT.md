# Replit Recreation Prompt — "One Nerve" Supply Chain Planning Platform

## REPLIT SETUP INSTRUCTIONS

1. Create a new Replit using the **React + TypeScript (Vite)** template
2. Install these dependencies in the Replit Shell:
```bash
npm install react-router-dom@^6.30 recharts@^2.15 lucide-react@^0.462 @tanstack/react-query@^5.83 sonner@^1.7 date-fns@^3.6 embla-carousel-react@^8.6 react-resizable-panels@^2.1 vaul@^0.9 cmdk@^1.1 input-otp@^1.4 zod@^3.25 react-hook-form@^7.61 @hookform/resolvers@^3.10 tailwind-merge@^2.6 tailwindcss-animate@^1.0 class-variance-authority@^0.7 clsx@^2.1 next-themes@^0.3 react-day-picker@^8.10 @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip
```
3. Initialize shadcn/ui:
```bash
npx shadcn@latest init
```
   - Style: Default
   - Base color: Slate
   - CSS variables: Yes
4. Add all shadcn/ui components:
```bash
npx shadcn@latest add accordion alert alert-dialog aspect-ratio avatar badge breadcrumb button calendar card carousel chart checkbox collapsible command context-menu dialog drawer dropdown-menu form hover-card input input-otp label menubar navigation-menu pagination popover progress radio-group resizable scroll-area select separator sheet sidebar skeleton slider sonner switch table tabs textarea toast toggle toggle-group tooltip
```
5. Configure `vite.config.ts`:
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```
6. Ensure `tsconfig.json` has path alias:
```json
{
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] },
    "baseUrl": "."
  }
}
```
7. Create `src/lib/utils.ts`:
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## 1. DESIGN SYSTEM (src/index.css + tailwind.config.ts)

### Fonts
Import in `index.html` `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### src/index.css — COMPLETE CSS
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 210 20% 98%;
    --foreground: 220 20% 14%;
    --surface: 210 15% 96%;
    --surface-secondary: 210 12% 94%;
    --border: 214 20% 88%;
    --border-light: 214 16% 92%;
    --card: 0 0% 100%;
    --card-foreground: 220 20% 14%;
    --popover: 0 0% 100%;
    --popover-foreground: 220 20% 14%;
    --primary: 211 90% 42%;
    --primary-foreground: 0 0% 100%;
    --primary-muted: 211 70% 55%;
    --primary-glow: 199 80% 50%;
    --secondary: 210 15% 94%;
    --secondary-foreground: 220 20% 14%;
    --success: 152 60% 42%;
    --success-foreground: 0 0% 100%;
    --warning: 38 92% 50%;
    --warning-foreground: 0 0% 100%;
    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 100%;
    --critical: 0 72% 51%;
    --critical-bg: 0 80% 96%;
    --critical-border: 0 60% 85%;
    --medium: 27 96% 54%;
    --medium-bg: 30 80% 96%;
    --medium-border: 30 60% 85%;
    --low: 152 60% 42%;
    --low-bg: 152 50% 95%;
    --low-border: 152 40% 82%;
    --info: 211 90% 42%;
    --info-bg: 211 60% 96%;
    --info-border: 211 50% 85%;
    --new: 45 93% 50%;
    --new-bg: 45 80% 95%;
    --new-border: 45 60% 82%;
    --assigned: 152 60% 42%;
    --assigned-bg: 152 50% 95%;
    --assigned-border: 152 40% 82%;
    --agent-process: 211 90% 42%;
    --agent-utility: 280 70% 55%;
    --agent-foundation: 152 60% 42%;
    --text-primary: 220 20% 14%;
    --text-secondary: 215 15% 50%;
    --muted: 210 15% 94%;
    --muted-foreground: 215 15% 50%;
    --accent: 211 60% 96%;
    --accent-foreground: 211 90% 35%;
    --input: 214 20% 88%;
    --ring: 211 90% 42%;
    --radius: 0.75rem;
    --glass-bg: 0 0% 100% / 0.85;
    --glass-border: 211 90% 42% / 0.12;
    --glass-blur: 16px;
    --gradient-primary: linear-gradient(135deg, hsl(211 90% 42%), hsl(199 80% 50%));
    --gradient-subtle: linear-gradient(180deg, hsl(0 0% 100%), hsl(210 20% 98%));
    --gradient-card: linear-gradient(135deg, hsl(0 0% 100%), hsl(210 15% 97%));
    --gradient-warm: linear-gradient(135deg, hsl(0 0% 100%), hsl(210 15% 96%));
    --gradient-greeting: linear-gradient(120deg, hsl(211 90% 42%), hsl(199 80% 50%), hsl(152 60% 42%));
    --gradient-neon: linear-gradient(90deg, hsl(211 90% 42%), hsl(199 80% 50%));
    --gradient-danger: linear-gradient(90deg, hsl(0 72% 51%), hsl(27 96% 54%));
    --shadow-elegant: 0 20px 50px -15px hsl(220 20% 14% / 0.08);
    --shadow-card: 0 1px 3px hsl(220 20% 14% / 0.06), 0 1px 2px hsl(220 20% 14% / 0.04);
    --shadow-elevated: 0 4px 12px -2px hsl(220 20% 14% / 0.08);
    --shadow-glow: 0 0 20px hsl(211 90% 42% / 0.08);
    --shadow-intense: 0 8px 24px -4px hsl(220 20% 14% / 0.1);
    --shadow-neon: 0 0 10px hsl(211 90% 42% / 0.1);
    --shadow-danger: 0 0 12px hsl(0 72% 51% / 0.15);
    --sidebar-background: 211 30% 18%;
    --sidebar-foreground: 210 15% 75%;
    --sidebar-primary: 211 90% 55%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 211 25% 24%;
    --sidebar-accent-foreground: 0 0% 100%;
    --sidebar-border: 211 25% 25%;
    --sidebar-ring: 211 90% 42%;
  }
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground font-inter; }
}

@layer utilities {
  .section-card {
    @apply bg-card rounded-xl border border-border p-5;
    box-shadow: var(--shadow-card);
    backdrop-filter: blur(8px);
  }
  .glass-card {
    background: hsl(var(--glass-bg));
    border: 1px solid hsl(var(--glass-border));
    backdrop-filter: blur(var(--glass-blur));
  }
  .tech-glow { box-shadow: var(--shadow-neon); }
  .tech-border { border: 1px solid hsl(211 90% 42% / 0.15); }
  .gradient-mesh {
    background:
      radial-gradient(ellipse at 20% 0%, hsl(211 90% 42% / 0.04) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 100%, hsl(199 80% 50% / 0.03) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, hsl(152 60% 42% / 0.02) 0%, transparent 60%),
      hsl(var(--background));
  }
  .font-mono-tech { font-family: 'JetBrains Mono', monospace; }
}

@layer components {
  .kpi-card {
    @apply bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02];
    box-shadow: var(--shadow-card);
  }
  .kpi-card:hover {
    box-shadow: var(--shadow-neon);
    border-color: hsl(199 89% 48% / 0.3);
  }
  .agent-status { @apply inline-flex items-center px-2 py-1 rounded-full text-xs font-medium; }
  .agent-status.healthy { @apply bg-success/10 text-success; }
  .agent-status.warning { @apply bg-warning/10 text-warning; }
  .agent-status.error { @apply bg-destructive/10 text-destructive; }
  .agent-process { @apply bg-[hsl(var(--agent-process))] text-white; }
  .agent-utility { @apply bg-[hsl(var(--agent-utility))] text-white; }
  .agent-foundation { @apply bg-[hsl(var(--agent-foundation))] text-white; }
  .gradient-primary { background: var(--gradient-primary); }
  .gradient-subtle { background: var(--gradient-subtle); }
  .hover-lift {
    @apply transition-all duration-300 hover:translate-y-[-3px];
    &:hover { box-shadow: var(--shadow-intense); }
  }
  .chat-message { @apply max-w-[85%] rounded-lg px-4 py-2 mb-3; }
  .chat-message.user { @apply bg-primary text-primary-foreground ml-auto; }
  .chat-message.ai { @apply bg-muted text-foreground mr-auto; }
  .gradient-text {
    background: var(--gradient-greeting);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .frosted-glass {
    background: hsl(var(--glass-bg));
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  .breathing-border { animation: breathing 3s ease-in-out infinite; }
  @keyframes breathing {
    0%, 100% { box-shadow: 0 0 0 0 hsl(199 89% 48% / 0.3), 0 0 20px -2px hsl(199 89% 48% / 0.15); }
    50% { box-shadow: 0 0 0 3px hsl(199 89% 48% / 0.15), 0 0 30px 0 hsl(199 89% 48% / 0.25); }
  }
  @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
  @keyframes aurora-sweep {
    0% { background-position: -200% center; opacity: 0; }
    20% { opacity: 0.6; } 50% { opacity: 0.8; } 80% { opacity: 0.6; }
    100% { background-position: 200% center; opacity: 0; }
  }
  .aurora-shimmer { position: relative; display: inline-block; }
  .aurora-shimmer::before {
    content: ''; position: absolute; top: -2px; left: -10%; right: -10%; bottom: -2px;
    background: linear-gradient(90deg, transparent 0%, transparent 30%, hsl(199 89% 48% / 0.4) 45%, hsl(185 90% 48% / 0.5) 50%, hsl(199 89% 48% / 0.4) 55%, transparent 70%, transparent 100%);
    background-size: 200% 100%; animation: aurora-sweep 7s ease-in-out infinite;
    border-radius: 4px; pointer-events: none; z-index: -1; filter: blur(8px);
  }
  .card-shimmer { position: relative; overflow: hidden; }
  .card-shimmer::before {
    content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, hsl(199 89% 48% / 0.08), transparent);
    animation: shimmer 4s infinite;
  }
  .misty-bg { background: hsl(var(--background)); }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 4px hsl(142 71% 45% / 0.4); }
    50% { box-shadow: 0 0 12px hsl(142 71% 45% / 0.7), 0 0 24px hsl(142 71% 45% / 0.3); }
  }
  .pulse-glow-green { animation: pulse-glow 2s ease-in-out infinite; }
  @keyframes pulse-glow-red {
    0%, 100% { box-shadow: 0 0 4px hsl(0 72% 51% / 0.4); }
    50% { box-shadow: 0 0 12px hsl(0 72% 51% / 0.7), 0 0 24px hsl(0 72% 51% / 0.3); }
  }
  .pulse-glow-red { animation: pulse-glow-red 2s ease-in-out infinite; }
  @keyframes pulse-glow-amber {
    0%, 100% { box-shadow: 0 0 4px hsl(38 92% 50% / 0.4); }
    50% { box-shadow: 0 0 12px hsl(38 92% 50% / 0.7), 0 0 24px hsl(38 92% 50% / 0.3); }
  }
  .pulse-glow-amber { animation: pulse-glow-amber 2s ease-in-out infinite; }
  @keyframes scan-line { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
  .scan-line::after {
    content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(90deg, transparent 0%, hsl(199 89% 48% / 0.03) 50%, transparent 100%);
    animation: scan-line 8s linear infinite; pointer-events: none;
  }
  @keyframes ticker-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .ticker-scroll { animation: ticker-scroll 30s linear infinite; }
  @keyframes risk-detect {
    0% { border-color: hsl(0 72% 51% / 0.8); box-shadow: 0 0 0 0 hsl(0 72% 51% / 0.4); }
    50% { border-color: hsl(0 72% 51% / 0.4); box-shadow: 0 0 15px 0 hsl(0 72% 51% / 0.2); }
    100% { border-color: hsl(0 72% 51% / 0.8); box-shadow: 0 0 0 0 hsl(0 72% 51% / 0.4); }
  }
  .risk-detect-pulse { animation: risk-detect 2s ease-in-out infinite; position: relative; }
  .risk-detect-pulse td { border-top: 1px solid hsl(0 72% 51% / 0.6); border-bottom: 1px solid hsl(0 72% 51% / 0.6); }
  .risk-detect-pulse td:first-child { border-left: 2px solid hsl(0 72% 51% / 0.8); }
  .risk-detect-pulse td:last-child { border-right: 2px solid hsl(0 72% 51% / 0.8); }
  @keyframes count-flash {
    0% { color: hsl(var(--foreground)); }
    25% { color: hsl(199 89% 48%); text-shadow: 0 0 10px hsl(199 89% 48% / 0.5); }
    100% { color: hsl(var(--foreground)); }
  }
  .count-flash { animation: count-flash 1s ease-out; }
  .neon-text { text-shadow: 0 0 7px hsl(199 89% 48% / 0.5), 0 0 20px hsl(199 89% 48% / 0.2); }
  .neon-text-green { text-shadow: 0 0 7px hsl(142 71% 45% / 0.5), 0 0 20px hsl(142 71% 45% / 0.2); }
  .neon-text-red { text-shadow: 0 0 7px hsl(0 72% 51% / 0.5), 0 0 20px hsl(0 72% 51% / 0.2); }
  .neon-text-amber { text-shadow: 0 0 7px hsl(38 92% 50% / 0.5), 0 0 20px hsl(38 92% 50% / 0.2); }
  .data-row-hover { @apply transition-all duration-200; }
  .data-row-hover:hover { background: hsl(199 89% 48% / 0.04) !important; box-shadow: inset 3px 0 0 hsl(199 89% 48%); }
  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .animate-fade-in { animation: fade-in 0.3s ease-out; }
  .animate-slide-up { animation: slide-up 0.4s ease-out; }
  .glass-panel {
    background: hsl(0 0% 100% / 0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border: 1px solid hsl(211 90% 42% / 0.1);
  }
}
```

### tailwind.config.ts — COMPLETE
```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: { center: true, padding: '2rem', screens: { '2xl': '1400px' } },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        playfair: ['Playfair Display', 'serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        surface: 'hsl(var(--surface))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))', muted: 'hsl(var(--primary-muted))', glow: 'hsl(var(--primary-glow))' },
        success: { DEFAULT: 'hsl(var(--success))', foreground: 'hsl(var(--success-foreground))' },
        warning: { DEFAULT: 'hsl(var(--warning))', foreground: 'hsl(var(--warning-foreground))' },
        agent: { process: 'hsl(var(--agent-process))', utility: 'hsl(var(--agent-utility))', foundation: 'hsl(var(--agent-foundation))' },
        critical: { DEFAULT: 'hsl(var(--critical))', bg: 'hsl(var(--critical-bg))', border: 'hsl(var(--critical-border))' },
        medium: { DEFAULT: 'hsl(var(--medium))', bg: 'hsl(var(--medium-bg))', border: 'hsl(var(--medium-border))' },
        low: { DEFAULT: 'hsl(var(--low))', bg: 'hsl(var(--low-bg))', border: 'hsl(var(--low-border))' },
        info: { DEFAULT: 'hsl(var(--info))', bg: 'hsl(var(--info-bg))', border: 'hsl(var(--info-border))' },
        'new-sev': { DEFAULT: 'hsl(var(--new))', bg: 'hsl(var(--new-bg))', border: 'hsl(var(--new-border))' },
        assigned: { DEFAULT: 'hsl(var(--assigned))', bg: 'hsl(var(--assigned-bg))', border: 'hsl(var(--assigned-border))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))', foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))', 'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))', 'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))', ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)' },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'pulse-subtle': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.7' } },
        'slide-in-right': { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

---

## 2. DATA MODEL (src/data/riskData.ts)

### RiskRow Interface
```typescript
export interface RiskRow {
  riskId: number;
  gtin: number;
  mrdr: number;
  mrdrDescription: string;
  msoCountry: string; // DE, FR, IT, ES, NL, PL
  site: string;
  su: string;
  riskType: "Out Of Stock" | "Below RS";
  severity: string; // "S 1" through "S 6"
  priority: string; // "P 1", "P 2", "P 3"
  riskHorizon: "Short" | "Med" | "Long";
  segmentation: "A" | "B" | "C" | "D" | "I";
  startedOnWeek: string;
  endedOnWeek: string;
  riskInDays: number;
  stockCS: number;
  expectedLossCases: number;
  expectedLossValue: number;
  nextAvailableDate: string;
  botReasonCode: string;
  plannerReasonCode: string;
  comments: string;
  assignedTo: string;
  insights: string;
  promoFlag: "Y" | "N";
  typeCode: "Standard" | "Repack" | "Component";
  repackDependency: "Y" | "N";
  category: "Personal Care" | "Home Care" | "Foods" | "Refreshment";
  status: "Open" | "Closed";
  uom: "CS" | "EA" | "KG" | "L" | "PAL";
  isNew?: boolean;
}
```

Create **15 mock rows** with European MSO countries (DE, FR, IT, ES, NL, PL). Include duplicate MRDRs (e.g., MRDR 50001 appears 3 times, 50003 appears 2 times, 50009 appears 2 times) to support parent/child drill-through aggregation in the table.

### Column Definitions
Export `allColumns` array with ~30 column definitions covering all RiskRow fields.

### Filter Options
Export `filterOptions` object with arrays for: `market`, `category`, `smallC`, `mrpController`, `plant`, `riskType`, `severity`, `priority`, `status`, `country`, `assignedTo`.

### Alert Rows Data
Export `alertRows` array: Total Risks (1281), Past Due (234), Assigned to Me (67) — each with `label`, `value`, `severity`, `pct`, `tooltip`.

### Donut Data
Export `donutData` for severity donut chart: Critical (47, red), Medium (156, orange), Low (89, green).

---

## 3. ROUTING (src/App.tsx)

### All Routes
```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 21 Routed pages:
<Route path="/" element={<Landing />} />
<Route path="/agentic-console" element={<AgenticConsole />} />
<Route path="/dap-workspace" element={<DAPWorkspace />} />
<Route path="/reports" element={<Reports />} />
<Route path="/data-config" element={<DataConfiguration />} />
<Route path="/ai-response" element={<AIResponse />} />
<Route path="/risk-alert" element={<RiskAlert />} />
<Route path="/deep-dive-diagnostics" element={<DeepDiveDiagnostics />} />
<Route path="/scenario-studio" element={<ScenarioStudio />} />
<Route path="/recommendation-summary" element={<RecommendationSummary />} />
<Route path="/execution-closure" element={<ExecutionClosure />} />
<Route path="/insights-home" element={<InsightsHome />} />
<Route path="/diagnostics-analytics" element={<DiagnosticsAnalytics />} />
<Route path="/predictive-analytics" element={<PredictiveAnalytics />} />
<Route path="/reporting-studio" element={<ReportingStudio />} />
<Route path="/inventory-optimizer" element={<InventoryOptimizer />} />
<Route path="/waste-optimizer" element={<WasteOptimizer />} />
<Route path="/capacity-rebalancer" element={<CapacityRebalancer />} />
<Route path="/learning-hub" element={<LearningHub />} />
<Route path="/risk-monitor" element={<RiskOverview />} />
<Route path="/risk-analysis" element={<RiskAnalysisWorkflow />} />

// 10 Unrouted demo pages (create but not in nav — accessed via internal links):
// /risk-landing → RiskLanding
// /risk-detail → RiskDetail
// /mitigation-scenarios → MitigationScenarios
// /scenario-comparison → ScenarioComparison
// /risk-resolution → RiskResolution
// /execution-tracker → ExecutionTracker
// /learning-feedback → LearningFeedback
// /orchestration-console → OrchestrationConsole
// /risk-os-home → RiskOSHome
// /risk-monitor-alt → RiskMonitor (alternative risk page)

<Route path="*" element={<NotFound />} />
```

Wrap with `QueryClientProvider`, `TooltipProvider`, `Toaster`, `Sonner`.

---

## 4. LAYOUT & NAVIGATION

### MainLayout (src/components/layout/MainLayout.tsx)
- Wraps most pages (except RiskOverview, RiskAnalysisWorkflow, and unrouted demo flow)
- Contains `<TopNavigation />` (sticky top) + `<MainSidebar />` (left) + `<main>` (content)
- Sidebar is collapsible with state toggle

### TopNavigation (src/components/layout/TopNavigation.tsx)
- Left: Brain icon (lucide) in primary rounded box + "One Nerve" title with `.gradient-text` + Playfair Display font
- Right: Value Meter (€12.4M with EuroIcon), Learning Hub button (→ /learning-hub), User dropdown menu (Alex Hales, Supply Planner) with Profile/Preferences/Sign out items

### MainSidebar (src/components/layout/MainSidebar.tsx)
- Dark sidebar using `--sidebar-*` CSS variables
- 5 nav items with NavLink active states:
  1. Home (Home icon) → `/`
  2. Agentic Process Console (Workflow icon) → `/agentic-console`
  3. DAP Workspace (Target icon) → `/dap-workspace`
  4. Reports & Insights (FileText icon) → `/reports`
  5. Data & Configuration (Database icon) → `/data-config`
- Collapsible: shows icons only when collapsed, full labels when expanded
- Active state: `bg-sidebar-primary text-sidebar-primary-foreground`
- Header: "COMMAND CONSOLE" title with ChevronLeft/ChevronRight toggle button

### AIChatPanel (src/components/layout/AIChatPanel.tsx)
- Floating chat FAB (bottom-right corner) → opens AI Copilot chat panel
- Fixed position, 396px wide, 600px tall
- Minimizable, closable
- Pre-populated with Orchestrator AI welcome messages
- Each AI message can have action buttons (View Details, Simulate Impact, Adjust Forecast)
- Chat input with send button

---

## 5. DETAILED PAGE SPECIFICATIONS

### 5.1 Landing Page (`/`)
**Uses MainLayout. ~691 lines. The main home page.**

**Key Features:**
- **Planning Health KPIs**: Configurable KPI cards at top. Each shows: label, value, suffix, target, trend (up/down arrow with percentage), badge (On Track/At Risk/Critical), and one-line insight. KPIs:
  - Case Fill Rate (97.2%, target 98%)
  - Forecast Accuracy (94.1%, target 95%)
  - Inventory Days (32d, target 30d)
  - OTIF (96.8%, target 97%)
  - Waste % (1.2%, target 1.5%)
  - Bias (0.8%)
- **KPI Settings Dialog**: Gear icon opens dialog where users can toggle KPI visibility, edit labels/values/targets, reorder via drag handle, add/delete KPIs
- **Context Cards Grid** (3 columns): Each card has icon, title, description, "Explore" link:
  1. Risk Intelligence → `/risk-monitor`
  2. Demand Planning → `/insights-home`
  3. Scenario Studio → `/scenario-studio`
  4. Execution Tracker → `/execution-closure`
  5. Reports & Analytics → `/reports`
  6. Capacity Planning → `/capacity-rebalancer`
- **Generative AI Prompt Box**: Bottom section with text input ("What would you like to plan or explore today?"), microphone icon, send button. Uses `AgenticGenerativeUI` component that simulates AI responses with typing animation, generates charts/metrics/tables dynamically based on input keywords

### 5.2 Agentic Console (`/agentic-console`)
Uses MainLayout. Contains `KPICard`, `AgentCard`, `RecommendationCard` dashboard components. Same structure as OrchestrationConsole (see 6.8).

### 5.3 DAP Workspace (`/dap-workspace`)
**Decision Intelligence Platform. Uses MainLayout.**
- **Module Selection**: Grid of `ModuleCard` components:
  1. Inventory Transfers (Active, with pending count)
  2. Production Planning (Coming Soon)
  3. Demand Shaping (Coming Soon)
  4. Network Optimization (Coming Soon)
- **KPI Strip**: 4x `KPIMetricCard`: Total Decisions (247), Inventory Savings ($2.1M), Service Risk Reduction ($3.8M), Acceptance Rate (73%)
- **FilterBar**: Search input, Location dropdown (L002-L020), Type dropdown (Preventive/Reactive/Optimization), Clear Filters, result count
- **DecisionTable**: Full-width table: Recommendation, Type, From Location, To Location, Inventory Savings, Service Risk Reduction, Truck Number, Pallets, Calendar Day, Actions (Accept/Dismiss/Modify)
- **DecisionDetailDialog**: Full-screen dialog (95vw × 90vh):
  - Left panel (400px): Decision summary, reasoning, truck details, action buttons
  - Right panel: 6 tabs — Transfer (SKU table + stock projection chart), Impact (before/after inventory), Logistics (route map), Alternative Summary (4 alternatives scored), Alternative Analysis (detailed comparison), Learning (historical accuracy chart)

### 5.4 Reports (`/reports`)
Uses MainLayout. Report categories page with links to sub-pages.

### 5.5 Data Configuration (`/data-config`)
Uses MainLayout. Configuration management interface.

### 5.6 AI Response (`/ai-response`)
Uses MainLayout. AI-generated analysis response with agent collaboration timeline.

### 5.7 Risk Alert (`/risk-alert`)
Uses MainLayout. Alert detail page: severity, probability, business impact, recommended actions.

### 5.8 Deep Dive Diagnostics (`/deep-dive-diagnostics`)
Uses MainLayout. Multi-panel diagnostic view: root cause analysis, impact assessment, historical pattern matching.

### 5.9 Scenario Studio (`/scenario-studio`)
Uses MainLayout. **~300+ lines.**
- Side-by-side scenario comparison using `RadarChart` and `BarChart` from recharts
- 3 pre-built scenarios with metrics: Service Level, Cost Impact, TO Saved, OSA Impact, Execution Speed, Risk Score
- Editable parameters per scenario
- "Compare" view with overlay charts

### 5.10 Recommendation Summary (`/recommendation-summary`)
Uses MainLayout. Summary of AI recommendations with approval workflow, selected scenario details, approval chain.

### 5.11 Execution & Closure (`/execution-closure`)
Uses MainLayout. **Vertical approval workflow.**
- Multi-step approval chain: L1 Planner → Operations Manager → Finance → SC Director
- Each step: status (Approved/Pending/Rejected), approver name, timestamp
- SAP action simulation: MD04, CO02, VL01N transaction codes
- Action items table with status tracking
- Completion summary with KPI impact

### 5.12 Insights Home (`/insights-home`)
Uses MainLayout. Dashboard with insight cards, trend charts, AI-generated insights. Links to sub-pages.

### 5.13 Diagnostics Analytics (`/diagnostics-analytics`)
Uses MainLayout. Analytics dashboard with recharts visualizations for risk diagnostics.

### 5.14 Predictive Analytics (`/predictive-analytics`)
Uses MainLayout. Predictive models with confidence intervals, forecast accuracy charts.

### 5.15 Reporting Studio (`/reporting-studio`)
Uses MainLayout. Report builder: template selection, parameter configuration, preview.

### 5.16 Inventory Optimizer (`/inventory-optimizer`)
Uses MainLayout. Safety stock optimization: DOH analysis, reorder points, what-if simulations.

### 5.17 Waste Optimizer (`/waste-optimizer`)
Uses MainLayout. Waste reduction: expiry tracking, markdown optimization, sustainability metrics.

### 5.18 Capacity Rebalancer (`/capacity-rebalancer`)
Uses MainLayout. Plant capacity planning: utilization charts, overflow routing, constraint optimization.

### 5.19 Learning Hub (`/learning-hub`)
Uses MainLayout. Knowledge base: training modules, best practices, AI model performance tracking.

### 5.20 Risk Overview / Risk AI Dashboard (`/risk-monitor`) — **THE PRIMARY PAGE**
**Standalone page (NO MainLayout). Most complex page.**

**Page Component:** `RiskOverview.tsx`

**Composition:**
```
RiskOverview
├── Header: Shield icon + "Risk AI" title + Live badge + timestamp
├── Breadcrumb: Home > Risk AI
├── NotificationBell (top-right)
├── BarChart3 button → opens VisualCentre overlay
├── AlertsSection
├── UnifiedFilters
├── DetailedRiskTable
├── InsightsPanel (sliding panel)
├── RiskAnalysisPanel (sliding panel)
├── RiskAIAgent (side panel AI copilot)
└── VisualCentre (full-screen overlay)
```

#### AlertsSection (src/components/risk-os/AlertsSection.tsx)
3-column layout:
- **Left (40%)**: Alert rows (Total Risks, Past Due, Assigned to Me) as mini cards with severity dots, icons, values, percentage bars. Hover tooltip
- **Center (30%)**: Donut chart (Critical/Medium/Low) with inner total, legends
- **Right (30%)**: KPI cards — Total Risks (1,281), Value at Risk (€2.4M +8%), Volume (6,955 CS)

#### UnifiedFilters (src/components/risk-os/UnifiedFilters.tsx)
- **Dropdown filters**: Market, Category, Small C, MRP Controller, Plant, Risk Type, Severity, Priority, Status, Country, Assigned To
- **Loss Range slider**: 0 to 890K
- **Search input**
- **Manage button**: Popover with checkboxes to show/hide filters
- **Save View**: Dialog to name/save filter state to localStorage
- **Saved Views dropdown**: Load, refresh, delete
- **Reset All button**
- Active filter count badge
- Export `FilterState` interface and `defaultFilters` constant

#### DetailedRiskTable (src/components/risk-os/DetailedRiskTable.tsx)
**~800+ lines. Most complex component.**

Features:
- **Frozen columns** (sticky left): Risk ID, Insights/Analyse icon button, MRDR, MRDR Description, MSO Country, UOM — with precise `left` offset calculations matching exact widths using `MRDR_FROZEN_WIDTHS` mapping
- **MRDR column**: Parent rows have chevron icon, child rows have empty spacer for alignment
- **Scrollable columns**: All remaining ~25 columns scroll horizontally
- **View modes**: MRDR View (groups by MRDR with expandable parent/child), GTIN View (groups by GTIN)
- **Parent rows**: Aggregated rows with expand/collapse. Show combined metrics
- **Child rows**: Individual risk items under parent
- **Insights icon button**: Uses `insights-analyse-icon.png` image (generate a blue analysis/chart icon, transparent PNG). Clicking opens InsightsPanel
- **Inline editing**: Double-click on Planner Reason Code, Comments, Assigned To to edit
- **Reason Code dropdowns**: Bot Reason Code and Planner Reason Code with predefined options (R01-R08)
- **Status badges**: "Below RS" (orange/amber) and "Out of Stock" (red) with standardized widths
- **Sorting**: Click column headers to sort asc/desc
- **Pagination**: Configurable rows per page (10, 25, 50, 100)
- **Add Risk button**: Dialog to manually add new risk rows
- **Column visibility toggle**
- **Global UOM conversion dropdown**: After MSO Country column

#### InsightsPanel (src/components/risk-os/InsightsPanel.tsx)
**95% width sliding panel from right. ~460 lines.**

Left sidebar (w-56): Navigation with 8 sections.
Right content: Scrollable.

8 Sections:
1. **Exception Daily/Weekly CTP**: Toggle daily/weekly. Bar chart (Demand vs Supply). Full CTP table: Planned Demand, Total Supply, Balance, Replenishment Stock, Max Stock, Below RS QTY, OOS QTY, AboveMax QTY
2. **Stock Info / Inventory**: Pie chart (Unrestricted/Restricted/Blocked/Quarantine). Stock table with VF Code, Alt MRDR, stocks, dates, DR%
3. **DOH (Day & Quantity)**: Composed bar+line chart. DOH KPI boxes. Data table
4. **Forecast / Promo Details**: Grouped bar chart (Baseline vs Promo). Bias indicators
5. **STO Data (Top 5)**: Table: PO No, Open PO Qty, Delivery Date, Shipment No, Delivery Number
6. **Production Data**: Bar chart (qty) + Line chart (CCU%). Table: Next Production Week, Produced In, Quantity, CCU%
7. **Master Data**: Wide table: Material Desc, EAN, Site, Country, Category, Factory, Type, UOM, Segment, MRP, Repack, Pack Size, Planner, Master Scheduler
8. **Projected DR%**: Line chart projections. Traffic light status table

#### RiskAnalysisPanel (src/components/risk-os/RiskAnalysisPanel.tsx)
**95% width sliding panel. 3 tabs:**

1. **Insights & Data** (`InsightsDataTab`): Summarized risk analysis with charts and KPIs
2. **Recommendations** (`ScenarioSimulatorTab`): 3 AI-generated mitigation scenario cards with name, description, cost, success probability, trade-offs. Radar chart comparison. "Select & Approve" → Approval Dialog → "Proceed to Workflow" → LastMileExecution
3. **Conversations** (`ConversationsTab`): Chat threads per risk with multiple participants, reply functionality, AI assistant messages

**LastMileExecution component**: Multi-step approval workflow with SAP integration simulation. Steps: L1 Planner → Operations Manager → Finance → SC Director. Approve/reject per step + automated SAP actions.

#### RiskAIAgent (src/components/risk-os/RiskAIAgent.tsx)
**Right-edge AI copilot panel. ~391 lines.**
- Collapsed: Vertical tab on right edge with "AI Copilot" text, Bot icon, green pulse dot
- Expanded: 480px wide panel with:
  - Chat with markdown rendering (bold, tables)
  - AI Confidence badges
  - Streaming text animation (character by character)
  - 6 suggested actions: Show demand spike drivers, Simulate warehouse rebalance, Compare mitigation scenarios, Explain this risk, Show top 5 risks by loss, What is the total value at risk?
  - Chat history sidebar: saved conversations, share, delete
  - Follow-up suggestions after each response
  - Thinking animation with bouncing dots

**AI Responses (mock, keyword-matched):**
- "demand spike" → Demand Spike Analysis, confidence 94%
- "rebalance" → Warehouse Rebalance Simulation with DC transfers
- "compare scenario" → Scenario Comparison table
- "explain risk" → Risk Explanation with root cause
- "top loss" → Top 5 Risks ranked by loss
- "value at risk" → Total value summary
- "critical risk" / "next week action" → Plant-level critical risk analysis with agentic reasoning chain

#### NotificationBell (src/components/risk-os/NotificationBell.tsx)
- Bell icon with unread count badge
- Dropdown with notification items (risk updates from team)
- Each notification: title, message, sender, timestamp, read/unread dot
- Inline reply input per notification
- Pop-out button → opens draggable floating chat window (360×420px)
- Draggable chat: header with drag handle, message list, input, AI auto-reply
- "Go to Conversations" button

#### VisualCentre (src/components/visual-centre/VisualCentre.tsx)
**Full-screen overlay. ~614 lines.**
- **Prompt bar**: Text input + chart type selector (Auto/Bar/Line/Pie) + Generate button
- **Empty state**: Sparkles icon + suggestion chips (Risk by country, Loss by category, etc.)
- **Generated results**: Grid of 2-4 chart cards. Each card: chart type badge, Pin/Unpin toggle, dropdown (Edit Query, Share, Download, Delete)
- **Selected chart panel**: Expanded view with Edit Query, Share, Delete
- **Edit Query Dialog**: Textarea → Regenerate
- **Share Dialog**: Email input + message textarea
- **History section**: Previous queries with mini chart previews, Restore/Delete

#### OrchestratorPanel (src/components/risk-os/OrchestratorPanel.tsx)
Collapsible panel showing AI agent pipeline:
- 5 agents: Demand, Inventory, Risk, Scenario, Logistics
- Status: completed/running/queued/idle with animated dots
- Pipeline visualization with colored dots connected by lines
- Auto-progression simulation

#### SituationPanel (src/components/risk-os/SituationPanel.tsx)
Global risk situation awareness strip:
- 6-column grid: Global Risk Level, Active Risks, Revenue at Risk, Critical Markets, Open Items, Mitigation Rate
- Each metric: icon, label, value with neon glow
- Live ticker bar: infinite scroll with risk event messages (emoji + text)

### 5.21 Risk Analysis Workflow (`/risk-analysis`)
**Standalone page (no MainLayout).**
- Query params: `?riskId=1001&tab=insights-data`
- Own top nav with Risk AI System branding
- Same 3 tabs as RiskAnalysisPanel
- Same approval dialog and LastMileExecution flow
- Back button → `/risk-monitor`

---

## 6. UNROUTED PAGES (India-focused demo flow)

### 6.1 RiskLanding (`RiskLanding.tsx`)
Risk Intelligence Center with Risk Inbox:
- 3 risk cards (Clear Shampoo 400ml, Dove Soap Bar 100g, Surf Excel 1kg)
- Each: SKU name, location, type badge (OOS/Below RS), probability, severity, impact (₹ Cr), status
- Right panel: DOH Projection gauge, Social Sentiment badge, Analytics Agent quote
- Click → `/risk-detail`

### 6.2 RiskDetail (`RiskDetail.tsx`)
Risk 360° View:
- 2-column: Analytics Agent panel (demand surge, sell-out +23%, DOH 5 days) + Risk Identification Agent panel (severity/probability bars, ₹5.4 Cr impact)
- DOH Projection bar chart (9 weeks, color-coded)
- "Generate Mitigation" → `/mitigation-scenarios`

### 6.3 MitigationScenarios (`MitigationScenarios.tsx`)
Agentic Workspace:
- AI prompt input + 4-agent processing animation
- 3 scenario cards: Inter-DC Rebalance (₹1.3L), Pull Forward Production (₹6L), Temporary Substitution (₹2.6L)
- "Compare Scenarios" → `/scenario-comparison`

### 6.4 ScenarioComparison (`ScenarioComparison.tsx`)
Side-by-side comparison:
- 3 scenarios × 7 KPIs with color-coded values
- "AI Recommended" badge on Scenario 1
- AI Recommendation panel explaining optimal choice
- "Approve Scenario" → `/risk-resolution`

### 6.5 RiskResolution (`RiskResolution.tsx`)
Risk Resolution Presentation:
- Hero: Scenario 1, 96% service, ₹1.3L cost, ₹5.4 Cr saved
- "What Changed": Chennai DC receiving, Bangalore DC sending — before/after
- DOH Recovery Curve: 6-week chart
- Cost Breakdown: Transport ₹0.8L, Handling ₹0.3L, Admin ₹0.2L, ROI 4,154%
- "Execute Solution" → `/execution-tracker`

### 6.6 ExecutionTracker (`ExecutionTracker.tsx`)
Last Mile Execution:
- Progress bar (N/4 steps)
- 4 auto-advancing steps (2s each): SAP STO, KNX Re-simulation, Transport Booking, Notifications
- Each: system icon, action, status badge, timestamp
- Completion: "DC transfer committed, OOS risk resolved"
- "View Learning Insights" → `/learning-feedback`

### 6.7 LearningFeedback (`LearningFeedback.tsx`)
Learning & Feedback Loop:
- Success summary: OOS avoided, 96% service, ₹5.4 Cr saved
- Root Cause Learning + Model Updates (Probability, Risk Scoring, Buffer all "Updated")
- Similar Pattern Analysis: 3 KPI cards
- Proactive Recommendations
- Navigation: Back to Risk Inbox, Return to Home

### 6.8 OrchestrationConsole (`OrchestrationConsole.tsx`)
Process Console (uses MainLayout):
- "Hello, Alex 👋" greeting with gradient text
- 5 KPI cards: Service Level 94.2%, Forecast Accuracy 87.8%, Inventory Turns 12.4x, OTIF 89.6%, Exceptions Pending 27
- 5 AgentCards: Demand, Supply, Promo, Capacity, Cost — each with status, insight, drill-down
- 3 RecommendationCards with impact, confidence, urgency, actions

### 6.9 RiskOSHome (`RiskOSHome.tsx`)
Risk AI splash (no MainLayout):
- ShieldAlert icon in gradient box
- "Risk AI" title + description
- 3 feature cards: Real-time Monitoring, Analytics & Insights, European Coverage
- "Open Risk Overview" → `/risk-monitor/risk-overview`

### 6.10 RiskMonitor (`RiskMonitor.tsx`)
**Alternative risk monitor (~426 lines, uses MainLayout):**
- Header: Shield + "Risk AI" + NotificationBell + Connected badge
- Alerts card (3 cols): 6 alert rows, Donut chart + Value at Risk, 5-week stacked bar chart
- Filters: Country, Category, Risk Type, Status, Planner, Loss slider, Reset
- Risk Table: 8-row sortable table
- AI Chat FAB: "Risk Champ" chat panel (380×480px) with pre-set questions and auto-reply

---

## 7. SHARED REUSABLE COMPONENTS

### Dashboard Components (src/components/dashboard/)

#### KPICard
Props: `title, value, unit, trend: {direction, value, period}, target: {value, status}, status: healthy|warning|critical, subtitle`
- Gradient card, 3xl bold value, trend arrow, target display, hover glow

#### AgentCard
Props: `name, type: process|utility|foundation, status: healthy|warning|error, insight, lastUpdate, exceptionCount, icon, onDrillDown`
- 300px min-width, agent type color box, status icons, "Drill Down" button

#### RecommendationCard
Props: `title, description, impact: {metric, value, direction}, confidence, urgency: low|medium|high, source, actions[]`
- Lightbulb icon, urgency badge, impact metric, confidence, action buttons

### Risk Analysis Components (src/components/risk-analysis/)

#### InsightsDataTab — Summarized risk data with KPIs and charts
#### ScenarioSimulatorTab — 3 scenario cards, radar chart, approval flow
#### ConversationsTab — Per-risk chat threads with AI assistant
#### LastMileExecution — Multi-step approval + SAP simulation
#### ApprovalWorkflowTab — Approval chain UI
#### OutcomeEvaluationTab — Outcome metrics display
#### PlannerInputTab — Planner input form

### Decision Intelligence Components (src/components/decision-intelligence/)
#### ModuleCard — Module selection card with status badge
#### KPIMetricCard — Compact KPI metric display
#### FilterBar — Search + dropdowns + clear filters
#### DecisionTable — Full decision recommendation table
#### DecisionDetailDialog — 95vw detail dialog with 6 tabs

### Chat Components (src/components/chat/)
#### AgenticGenerativeUI — Landing page AI with chart/metric/table generation
#### ChatInput — Text input with send button
#### MessageBubble — User/AI message display
#### EmptyState — Empty chat placeholder
#### QuickActions — Suggested action chips

### UI Components (src/components/ui/)
#### ComingSoon — Back button + centered title/description for placeholder pages
#### GenerativeChat — Full-screen generative UI with keyword-matched chart generation

---

## 8. ASSET REQUIREMENTS

### insights-analyse-icon.png
Generate a **blue analysis/chart icon** (transparent PNG, ~40×40px) used as the "Insights & Analyse" action button in the risk table. Stylized bar chart or data analysis symbol in primary blue color. Place in `src/assets/`.

---

## 9. KEY IMPLEMENTATION NOTES

1. **All colors must use semantic tokens** — never hardcode colors in components
2. **Frozen columns in DetailedRiskTable** use `position: sticky` with calculated `left` offsets matching exact column widths via `MRDR_FROZEN_WIDTHS` mapping
3. **MRDR column alignment**: Parent rows have chevron in `w-3` span; child rows have empty `w-3` spacer
4. **Chart styling**: All recharts use theme tokens. Tooltip `contentStyle` uses `hsl(var(--popover))` background
5. **Animations**: CSS keyframes only (no framer-motion). slide-in-right, fade-in, slide-up
6. **State management**: React useState/useMemo only. No external state library
7. **localStorage**: Only for saved filter views in UnifiedFilters
8. **Mock data**: All client-side mock. No backend/API calls
9. **Status badges**: Consistent semantic colors — success (green), warning (amber), destructive (red), primary (blue)
10. **The Risk AI page (`/risk-monitor`) is the crown jewel** — full sliding panels, AI copilot, visual centre, notifications, and comprehensive table must all work
11. **No Lovable-specific dependencies** — do not use `lovable-tagger` or any Lovable-specific packages
12. **Replit port**: Vite dev server should bind to `0.0.0.0` for Replit's webview to work

---

## 10. BUILD CONFIGURATION

- **Vite** with `@vitejs/plugin-react-swc`
- **TypeScript** (relaxed — `strict: false`, `noImplicitAny: false`)
- **Path alias**: `@/` → `src/`
- **PostCSS**: tailwindcss + autoprefixer
- **All shadcn/ui components** installed via CLI
- **Key dependencies**: recharts, react-router-dom, @tanstack/react-query, sonner, date-fns, lucide-react, all @radix-ui packages

---

## 11. FILE STRUCTURE SUMMARY

```
src/
├── assets/
│   └── insights-analyse-icon.png
├── components/
│   ├── chat/
│   │   ├── AgenticGenerativeUI.tsx
│   │   ├── ChatInput.tsx
│   │   ├── EmptyState.tsx
│   │   ├── MessageBubble.tsx
│   │   └── QuickActions.tsx
│   ├── dashboard/
│   │   ├── AgentCard.tsx
│   │   ├── KPICard.tsx
│   │   └── RecommendationCard.tsx
│   ├── decision-intelligence/
│   │   ├── DecisionDetailDialog.tsx
│   │   ├── DecisionTable.tsx
│   │   ├── FilterBar.tsx
│   │   ├── KPIMetricCard.tsx
│   │   └── ModuleCard.tsx
│   ├── layout/
│   │   ├── AIChatPanel.tsx
│   │   ├── MainLayout.tsx
│   │   ├── MainSidebar.tsx
│   │   └── TopNavigation.tsx
│   ├── risk-analysis/
│   │   ├── ApprovalWorkflowTab.tsx
│   │   ├── ConversationsTab.tsx
│   │   ├── InsightsDataTab.tsx
│   │   ├── InsightsTab.tsx
│   │   ├── LastMileExecution.tsx
│   │   ├── OutcomeEvaluationTab.tsx
│   │   ├── PlannerInputTab.tsx
│   │   └── ScenarioSimulatorTab.tsx
│   ├── risk-os/
│   │   ├── AlertsSection.tsx
│   │   ├── DetailedRiskTable.tsx
│   │   ├── InsightsPanel.tsx
│   │   ├── NotificationBell.tsx
│   │   ├── OrchestratorPanel.tsx
│   │   ├── RiskAIAgent.tsx
│   │   ├── RiskAnalysisPanel.tsx
│   │   ├── RiskOSLayout.tsx
│   │   ├── SituationPanel.tsx
│   │   └── UnifiedFilters.tsx
│   ├── ui/ (all shadcn components)
│   └── visual-centre/
│       └── VisualCentre.tsx
├── data/
│   └── riskData.ts
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   └── utils.ts
├── pages/
│   ├── AIResponse.tsx
│   ├── AgenticConsole.tsx
│   ├── CapacityRebalancer.tsx
│   ├── DAPWorkspace.tsx
│   ├── DataConfiguration.tsx
│   ├── DeepDiveDiagnostics.tsx
│   ├── DiagnosticsAnalytics.tsx
│   ├── ExecutionClosure.tsx
│   ├── ExecutionTracker.tsx
│   ├── InsightsHome.tsx
│   ├── InventoryOptimizer.tsx
│   ├── Landing.tsx
│   ├── LearningFeedback.tsx
│   ├── LearningHub.tsx
│   ├── MitigationScenarios.tsx
│   ├── NotFound.tsx
│   ├── OrchestrationConsole.tsx
│   ├── PredictiveAnalytics.tsx
│   ├── RecommendationSummary.tsx
│   ├── ReportingStudio.tsx
│   ├── Reports.tsx
│   ├── RiskAlert.tsx
│   ├── RiskAnalysisWorkflow.tsx
│   ├── RiskDetail.tsx
│   ├── RiskLanding.tsx
│   ├── RiskMonitor.tsx
│   ├── RiskOSHome.tsx
│   ├── RiskOverview.tsx
│   ├── RiskResolution.tsx
│   ├── ScenarioComparison.tsx
│   ├── ScenarioStudio.tsx
│   └── WasteOptimizer.tsx
├── App.tsx
├── App.css
├── index.css
├── main.tsx
└── vite-env.d.ts
```

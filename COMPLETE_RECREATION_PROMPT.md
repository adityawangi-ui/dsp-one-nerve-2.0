# Complete Recreation Prompt — "One Nerve" Supply Chain Planning Platform

Build a **React + TypeScript + Vite + Tailwind CSS + shadcn/ui** enterprise supply chain planning platform called **"One Nerve"**. Use `recharts` for all charts, `lucide-react` for icons, `react-router-dom` for routing, `@tanstack/react-query`, `sonner` for toasts, and all standard shadcn/ui components.

---

## 1. DESIGN SYSTEM (index.css + tailwind.config.ts)

### Fonts
Import Inter (300-900) and JetBrains Mono (400-600) from Google Fonts.

### CSS Variables (HSL format, NO hex)
```
:root {
  --background: 210 20% 98%;
  --foreground: 220 20% 14%;
  --surface: 210 15% 96%;
  --surface-secondary: 210 12% 94%;
  --border: 214 20% 88%;
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
  --medium: 27 96% 54%;
  --low: 152 60% 42%;
  --info: 211 90% 42%;
  --new: 45 93% 50%;
  --assigned: 152 60% 42%;
  --agent-process: 211 90% 42%;
  --agent-utility: 280 70% 55%;
  --agent-foundation: 152 60% 42%;
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
  --gradient-greeting: linear-gradient(120deg, hsl(211 90% 42%), hsl(199 80% 50%), hsl(152 60% 42%));
  --gradient-neon: linear-gradient(90deg, hsl(211 90% 42%), hsl(199 80% 50%));
  --gradient-danger: linear-gradient(90deg, hsl(0 72% 51%), hsl(27 96% 54%));
  --shadow-card: 0 1px 3px hsl(220 20% 14% / 0.06), 0 1px 2px hsl(220 20% 14% / 0.04);
  --shadow-elevated: 0 4px 12px -2px hsl(220 20% 14% / 0.08);
  --shadow-glow: 0 0 20px hsl(211 90% 42% / 0.08);
  --shadow-intense: 0 8px 30px -8px hsl(220 20% 14% / 0.15);
  --shadow-neon: 0 0 15px hsl(211 90% 42% / 0.2);
}
```

Also include a `.dark` theme with inverted values (dark backgrounds, light text).

### Custom CSS Classes
- `.gradient-text` — `background: var(--gradient-primary); -webkit-background-clip: text; color: transparent;`
- `.glass-panel` — frosted glass with backdrop-blur and border
- `.section-card` — `bg-card rounded-xl border border-border p-5 shadow-[var(--shadow-card)]`
- `.tech-glow` — box-shadow neon glow using primary color
- `.neon-text` — text-shadow glow
- `.misty-bg` — subtle radial gradient background
- `.gradient-mesh` — animated gradient mesh background
- `.scan-line` — animated horizontal scan line overlay
- `.ticker-scroll` — horizontal infinite scroll animation
- `.hover-lift` — translateY(-4px) on hover with shadow
- `.animate-fade-in` — opacity 0→1 with translateY
- `.animate-slide-in-right` — translateX(100%) → 0
- `.animate-slide-up` — translateY(20px) → 0
- `.pulse-glow-green`, `.pulse-glow-red`, `.pulse-glow-amber` — colored pulsing box-shadows
- `.risk-detect-pulse` — red pulse animation for risk detection
- `.font-mono-tech` — JetBrains Mono font family
- `.agent-status.healthy` / `.warning` / `.error` — colored agent badges
- `.agent-process`, `.agent-utility`, `.agent-foundation` — colored agent type backgrounds
- Severity background classes: `.bg-critical`, `.bg-medium`, `.bg-low`, `.bg-info`, `.bg-new`, `.bg-assigned` using CSS variables

### Tailwind Config Extensions
Add all custom colors to tailwind config: `surface`, `success`, `warning`, `critical`, `medium`, `low`, `info`, `assigned`, `agent-process`, `agent-utility`, `agent-foundation`, `primary-muted`, `primary-glow`.

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
```typescript
export const allColumns: ColumnDef[] = [
  // ~30 columns including: riskId, gtin, mrdr, site, mrdrDescription, msoCountry, su,
  // riskType, severity, priority, status, uom, riskHorizon, segmentation, promoFlag,
  // typeCode, repackDependency, category, startedOnWeek, endedOnWeek, riskInDays,
  // stockCS, expectedLossCases, expectedLossValue, nextAvailableDate,
  // botReasonCode, plannerReasonCode, comments, assignedTo, insights
];
```

### Filter Options
Export `filterOptions` object with arrays for: `market`, `category`, `smallC`, `mrpController`, `plant`, `riskType`, `severity`, `priority`, `status`, `country`, `assignedTo`.

### Alert Rows Data
Export `alertRows` array with items: Total Risks (1281), Past Due (234), Assigned to Me (67) — each with `label`, `value`, `severity`, `pct`, `tooltip`.

### Donut Data
Export `donutData` for severity donut chart: Critical (47, red), Medium (156, orange), Low (89, green).

---

## 3. LAYOUT & NAVIGATION

### MainLayout (`src/components/layout/MainLayout.tsx`)
- Wraps all pages except standalone ones
- Contains `<TopNavigation />` (sticky top) + `<MainSidebar />` (left) + `<main>` (content)
- Sidebar is collapsible with state toggle

### TopNavigation (`src/components/layout/TopNavigation.tsx`)
- Left: Brain icon + "One Nerve" title with `.gradient-text`
- Right: Value Meter (€12.4M with Euro icon), Learning Hub button, User dropdown (Alex Hales, Supply Planner) with Profile/Preferences/Sign out

### MainSidebar (`src/components/layout/MainSidebar.tsx`)
- 5 nav items with NavLink active states:
  1. Home → `/`
  2. Agentic Process Console → `/agentic-console`
  3. DAP Workspace → `/dap-workspace`
  4. Reports & Insights → `/reports`
  5. Data & Configuration → `/data-config`
- Collapsible: shows icons only when collapsed, full labels when expanded
- Active state: `bg-sidebar-primary text-sidebar-primary-foreground`

### AIChatPanel (`src/components/layout/AIChatPanel.tsx`)
- Floating chat FAB (bottom-right) → opens AI Copilot chat panel
- Fixed position, 396px wide, 600px tall
- Minimizable, closable
- Pre-populated with Orchestrator AI messages
- Each message can have action buttons (View Details, Simulate Impact, Adjust Forecast)

---

## 4. ROUTED PAGES (21 routes in App.tsx)

### Route Map
```
/                        → Landing
/agentic-console         → AgenticConsole
/dap-workspace           → DAPWorkspace
/reports                 → Reports
/data-config             → DataConfiguration
/ai-response             → AIResponse
/risk-alert              → RiskAlert
/deep-dive-diagnostics   → DeepDiveDiagnostics
/scenario-studio         → ScenarioStudio
/recommendation-summary  → RecommendationSummary
/execution-closure       → ExecutionClosure
/insights-home           → InsightsHome
/diagnostics-analytics   → DiagnosticsAnalytics
/predictive-analytics    → PredictiveAnalytics
/reporting-studio        → ReportingStudio
/inventory-optimizer     → InventoryOptimizer
/waste-optimizer         → WasteOptimizer
/capacity-rebalancer     → CapacityRebalancer
/learning-hub            → LearningHub
/risk-monitor            → RiskOverview (THE MAIN RISK AI PAGE)
/risk-analysis           → RiskAnalysisWorkflow
*                        → NotFound
```

---

## 5. DETAILED PAGE SPECIFICATIONS

### 5.1 Landing Page (`/`)
**~691 lines. The main home page.**

**Layout:** Uses `MainLayout`. Full-width content area.

**Key Features:**
- **Planning Health KPIs**: Configurable KPI cards at top. Each shows: label, value, suffix, target, trend (up/down arrow with percentage), badge (On Track/At Risk/Critical), and one-line insight. KPIs are:
  - Case Fill Rate (97.2%, target 98%)
  - Forecast Accuracy (94.1%, target 95%)
  - Inventory Days (32d, target 30d)
  - OTIF (96.8%, target 97%)
  - Waste % (1.2%, target 1.5%)
  - Bias (0.8%)
- **KPI Settings Dialog**: Gear icon opens dialog where users can toggle KPI visibility, edit labels/values/targets, reorder via drag handle, add/delete KPIs
- **Context Cards Grid** (3 columns): Each card has icon, title, description, "Explore" link. Cards include:
  1. Risk Intelligence → `/risk-monitor`
  2. Demand Planning → `/insights-home`
  3. Scenario Studio → `/scenario-studio`
  4. Execution Tracker → `/execution-closure`
  5. Reports & Analytics → `/reports`
  6. Capacity Planning → `/capacity-rebalancer`
- **Generative AI Prompt Box**: Bottom section with text input ("What would you like to plan or explore today?"), microphone icon, send button. Uses `AgenticGenerativeUI` component that simulates AI responses with typing animation, generates charts/metrics/tables dynamically based on input

### 5.2 Agentic Console (`/agentic-console`)
Uses `MainLayout`. Contains `KPICard`, `AgentCard`, `RecommendationCard` dashboard components (reused from `OrchestrationConsole` — see unrouted pages section).

### 5.3 DAP Workspace (`/dap-workspace`)
**Decision Intelligence Platform.** Uses `MainLayout`.
- **Module Selection**: Grid of `ModuleCard` components:
  1. Inventory Transfers (Active, with pending count)
  2. Production Planning (Coming Soon)
  3. Demand Shaping (Coming Soon)
  4. Network Optimization (Coming Soon)
- **KPI Strip**: 4x `KPIMetricCard` showing: Total Decisions (247), Inventory Savings ($2.1M), Service Risk Reduction ($3.8M), Acceptance Rate (73%)
- **FilterBar**: Search input, Location dropdown (L002-L020), Type dropdown (Preventive/Reactive/Optimization), Clear Filters button, result count
- **DecisionTable**: Full-width table with columns: Recommendation, Type, From Location, To Location, Inventory Savings, Service Risk Reduction, Truck Number, Pallets, Calendar Day, Actions (Accept/Dismiss/Modify)
- **DecisionDetailDialog**: Full-screen dialog (95vw × 90vh) split into:
  - Left panel (400px): Decision summary, reasoning, truck details, action buttons
  - Right panel: 6 tabs — Transfer (SKU table + stock projection chart), Impact (before/after inventory levels), Logistics (route map simulation), Alternative Summary (4 alternative options scored), Alternative Analysis (detailed comparison), Learning (historical accuracy chart)

### 5.4 Reports (`/reports`)
Uses `MainLayout`. Simple page with report categories and links.

### 5.5 Data Configuration (`/data-config`)
Uses `MainLayout`. Configuration management interface.

### 5.6 AI Response (`/ai-response`)
Uses `MainLayout`. Shows AI-generated analysis response with agent collaboration timeline.

### 5.7 Risk Alert (`/risk-alert`)
Uses `MainLayout`. Alert detail page showing a specific risk alert with severity, probability, business impact, and recommended actions.

### 5.8 Deep Dive Diagnostics (`/deep-dive-diagnostics`)
Uses `MainLayout`. Multi-panel diagnostic view with root cause analysis, impact assessment, and historical pattern matching.

### 5.9 Scenario Studio (`/scenario-studio`)
Uses `MainLayout`. **~300+ lines.**
- Side-by-side scenario comparison using `RadarChart` and `BarChart` from recharts
- 3 pre-built scenarios with metrics: Service Level, Cost Impact, TO Saved, OSA Impact, Execution Speed, Risk Score
- Editable parameters per scenario
- "Compare" view with overlay charts

### 5.10 Recommendation Summary (`/recommendation-summary`)
Uses `MainLayout`. Summary of AI recommendations with approval workflow, showing selected scenario details and approval chain.

### 5.11 Execution & Closure (`/execution-closure`)
Uses `MainLayout`. **Vertical approval workflow.**
- Multi-step approval chain: L1 Planner → Operations Manager → Finance → SC Director
- Each step shows status (Approved/Pending/Rejected), approver name, timestamp
- SAP action simulation section: auto-generated SAP transaction codes (MD04, CO02, VL01N)
- Action items table with status tracking
- Completion summary with KPI impact

### 5.12 Insights Home (`/insights-home`)
Uses `MainLayout`. Dashboard with multiple insight cards, trend charts, and AI-generated insights. Links to sub-pages.

### 5.13 Diagnostics Analytics (`/diagnostics-analytics`)
Uses `MainLayout`. Analytics dashboard with recharts visualizations for risk diagnostics.

### 5.14 Predictive Analytics (`/predictive-analytics`)
Uses `MainLayout`. Predictive models visualization with confidence intervals, forecast accuracy charts.

### 5.15 Reporting Studio (`/reporting-studio`)
Uses `MainLayout`. Report builder with template selection, parameter configuration, and preview.

### 5.16 Inventory Optimizer (`/inventory-optimizer`)
Uses `MainLayout`. Safety stock optimization with DOH analysis, reorder point calculations, and what-if simulations.

### 5.17 Waste Optimizer (`/waste-optimizer`)
Uses `MainLayout`. Waste reduction analytics with expiry tracking, markdown optimization, and sustainability metrics.

### 5.18 Capacity Rebalancer (`/capacity-rebalancer`)
Uses `MainLayout`. Plant capacity planning with utilization charts, overflow routing, and constraint optimization.

### 5.19 Learning Hub (`/learning-hub`)
Uses `MainLayout`. Knowledge base with training modules, best practices, and AI model performance tracking.

### 5.20 Risk Overview / Risk AI Dashboard (`/risk-monitor`) — **THE PRIMARY PAGE**
**This is the most complex page. Uses NO MainLayout — standalone page.**

**Page Component:** `RiskOverview.tsx` (~132 lines)

**Composition:**
```
RiskOverview
├── Breadcrumb (Home > Risk AI) + header with Shield icon + "Risk AI" title
├── NotificationBell (top-right, with conversation navigation)
├── BarChart3 icon button → opens Visual Centre overlay
├── Timestamp display
├── AlertsSection (severity summary)
├── UnifiedFilters (comprehensive filter bar)
├── DetailedRiskTable (the main data table)
├── InsightsPanel (95% sliding panel from right — opened by insights icon)
├── RiskAnalysisPanel (95% sliding panel — opened by drill-through)
├── RiskAIAgent (side panel AI copilot)
└── VisualCentre (full-screen chart generation overlay)
```

**Sub-Components:**

#### AlertsSection (`src/components/risk-os/AlertsSection.tsx`)
3-column layout:
- **Left (40%)**: Alert rows (Total Risks, Past Due, Assigned to Me) as mini cards with severity dots, icons, values, and percentage bars. Hover shows tooltip
- **Center (30%)**: Donut chart (Critical/Medium/Low) with inner total, legends
- **Right (30%)**: KPI cards — Total Risks (1,281), Value at Risk (€2.4M with +8% trend), Volume (6,955 CS)

#### UnifiedFilters (`src/components/risk-os/UnifiedFilters.tsx`)
- **Dropdown filters**: Market, Category, Small C, MRP Controller, Plant, Risk Type, Severity, Priority, Status, Country, Assigned To
- **Loss Range slider**: 0 to 890K with formatted labels
- **Search input** with icon
- **Manage button**: Popover with checkboxes to show/hide individual filters
- **Save View**: Dialog to name and save current filter state to localStorage
- **Saved Views dropdown**: Load, refresh, delete saved filter views
- **Reset All button**
- Active filter count badge

#### DetailedRiskTable (`src/components/risk-os/DetailedRiskTable.tsx`)
**The most complex component (~800+ lines).**

Features:
- **Frozen columns** (sticky left): Risk ID, Insights/Analyse icon button, MRDR, MRDR Description, MSO Country, UOM — with precise `left` offset calculations matching exact widths
- **MRDR column**: Parent rows have chevron icon, child rows have empty spacer for alignment
- **Scrollable columns**: All remaining ~25 columns scroll horizontally
- **View modes**: MRDR View (groups by MRDR with expandable parent/child), GTIN View (groups by GTIN)
- **Parent rows**: Aggregated rows with expand/collapse. Show combined metrics
- **Child rows**: Individual risk items under parent
- **Insights icon button**: Uses `insights-analyse-icon.png` image (needs to be generated — a blue analysis/chart icon). Clicking opens InsightsPanel
- **Inline editing**: Double-click on Planner Reason Code, Comments, Assigned To to edit
- **Reason Code dropdowns**: Bot Reason Code and Planner Reason Code with predefined options (R01-R08)
- **Status badges**: "Below RS" (orange/amber) and "Out of Stock" (red) with standardized widths
- **Sorting**: Click column headers to sort asc/desc
- **Pagination**: Configurable rows per page (10, 25, 50, 100) with page navigation
- **Add Risk button**: Opens dialog to manually add new risk rows
- **Column visibility toggle**: Manage which columns are visible
- **Global UOM conversion dropdown**: After MSO Country column, allows converting displayed units

#### InsightsPanel (`src/components/risk-os/InsightsPanel.tsx`)
**Full-screen 95% width sliding panel from right. ~460 lines.**

Structure:
- Left sidebar (w-56): Navigation with 8 sections
- Right content: Scrollable content area

8 Sections:
1. **Exception Daily/Weekly CTP**: Toggle between daily/weekly. Bar chart (Demand vs Supply). Full CTP table with metrics: Planned Demand, Total Supply, Balance, Replenishment Stock, Max Stock, Below RS QTY, OOS QTY, AboveMax QTY
2. **Stock Info / Inventory**: Pie chart (Unrestricted/Restricted/Blocked/Quarantine). Full stock table with VF Code, Alt MRDR, stocks, dates, DR%
3. **DOH (Day & Quantity)**: Composed bar+line chart. DOH KPI boxes. Data table
4. **Forecast / Promo Details**: Grouped bar chart (Baseline vs Promo forecast). Bias indicators
5. **STO Data (Top 5)**: Table with PO No, Open PO Qty, Delivery Date, Shipment No, Delivery Number
6. **Production Data**: Bar chart (qty) + Line chart (CCU%). Production table with Next Production Week, Produced In, Quantity, CCU%
7. **Master Data**: Wide table with Material Desc, EAN, Site, Country, Category, Factory, Type, UOM, Segment, MRP, Repack, Pack Size, Planner, Master Scheduler
8. **Projected DR%**: Line chart showing DR% projections. Traffic light status table

#### RiskAnalysisPanel (`src/components/risk-os/RiskAnalysisPanel.tsx`)
**95% width sliding panel. Contains 3 tabs:**

1. **Insights & Data** (`InsightsDataTab`): Summarized risk analysis with charts and KPIs
2. **Recommendations** (`ScenarioSimulatorTab`): AI-generated mitigation scenarios with:
   - 3 scenario cards with name, description, cost, success probability, trade-offs
   - Compare mode with radar charts
   - "Select & Approve" button → triggers Approval Dialog
   - Approval Dialog → "Proceed to Workflow" button → shows LastMileExecution
3. **Conversations** (`ConversationsTab`): Chat threads per risk with multiple participants, reply functionality, and AI assistant messages

**LastMileExecution component**: Multi-step approval workflow with SAP integration simulation. Steps: L1 Planner → Operations Manager → Finance → SC Director. Each step has approve/reject buttons and automated SAP actions.

#### RiskAIAgent (`src/components/risk-os/RiskAIAgent.tsx`)
**Right-edge AI copilot panel. ~391 lines.**
- Collapsed: Vertical tab on right edge with "AI Copilot" text, Bot icon, green pulse dot
- Expanded: 480px wide panel with:
  - Chat interface with markdown rendering (bold, tables)
  - AI Confidence badges in responses
  - Streaming text animation (character by character)
  - 6 suggested actions: Show demand spike drivers, Simulate warehouse rebalance, Compare mitigation scenarios, Explain this risk, Show top 5 risks by loss, What is the total value at risk?
  - **Chat history**: Sidebar with saved conversations, share, delete functionality
  - Follow-up suggestions after each response
  - Thinking animation with bouncing dots

**AI Responses** (mock, keyword-matched):
- "demand spike" → Demand Spike Analysis with drivers, confidence 94%
- "rebalance" → Warehouse Rebalance Simulation with DC transfers
- "compare scenario" → Scenario Comparison table
- "explain risk" → Risk Explanation with root cause
- "top loss" → Top 5 Risks ranked by loss
- "value at risk" → Total value summary
- "critical risk" / "next week action" → Detailed plant-level critical risk analysis with agentic reasoning chain and recommended actions

#### NotificationBell (`src/components/risk-os/NotificationBell.tsx`)
- Bell icon with unread count badge
- Dropdown with notification items (risk updates from team members)
- Each notification: title, message, sender, timestamp, read/unread dot
- Inline reply input per notification
- Pop-out button → opens draggable floating chat window (360×420px)
- Draggable chat: header with drag handle, message list, input, AI auto-reply
- "Go to Conversations" button at bottom

#### VisualCentre (`src/components/visual-centre/VisualCentre.tsx`)
**Full-screen overlay. ~614 lines.**
- **Prompt bar**: Text input + chart type selector (Auto/Bar/Line/Pie) + Generate button
- **Empty state**: Sparkles icon + suggestions (Risk by country, Loss by category, etc.)
- **Generated results**: Grid of 2-4 chart cards. Each card:
  - Chart type badge
  - Pin/Unpin toggle
  - Dropdown menu: Edit Query, Share, Download, Delete
  - Click to select → shows expanded editable panel
- **Selected chart panel**: Larger view with Edit Query button, Share button, Delete button
- **Edit Query Dialog**: Textarea to modify query → Regenerate
- **Share Dialog**: Email input + message textarea
- **History section**: Previous query collections with mini chart previews, Restore/Delete buttons

#### OrchestratorPanel (`src/components/risk-os/OrchestratorPanel.tsx`)
Collapsible panel showing AI agent pipeline:
- 5 agents: Demand, Inventory, Risk, Scenario, Logistics
- Status: completed/running/queued/idle with animated dots
- Pipeline visualization: colored dots connected by lines
- Auto-progression simulation: agents complete sequentially with timeouts
- Expanded view: each agent row with icon, name, insight text, status

#### SituationPanel (`src/components/risk-os/SituationPanel.tsx`)
Global risk situation awareness strip:
- 6-column grid showing: Global Risk Level, Active Risks, Revenue at Risk, Critical Markets, Open Items, Mitigation Rate
- Each metric: icon, label, value with neon glow colors
- Live ticker bar below: infinite horizontal scroll with risk event messages (emoji + text)

### 5.21 Risk Analysis Workflow (`/risk-analysis`)
**Standalone page (no MainLayout, has own header).**
- Query params: `?riskId=1001&tab=insights-data`
- Own top nav bar with Risk AI System branding
- Same 3 tabs as RiskAnalysisPanel (Insights & Data, Recommendations, Conversations)
- Same approval dialog and LastMileExecution flow
- Back button → `/risk-monitor`

---

## 6. UNROUTED PAGES (exist as files but no route — include them for completeness)

These pages exist in the codebase. They form an alternate India-focused demo flow connected via internal navigation:

### 6.1 RiskLanding (`RiskLanding.tsx`)
Risk Intelligence Center with Risk Inbox:
- 3 risk cards (Clear Shampoo 400ml, Dove Soap Bar 100g, Surf Excel 1kg)
- Each card: SKU name, location, type badge (OOS/Below RS), probability, severity, business impact (₹ Cr), status
- Right panel: DOH Projection gauge, Social Sentiment badge, Analytics Agent quote
- Click → navigates to `/risk-detail`

### 6.2 RiskDetail (`RiskDetail.tsx`)
Risk 360° View:
- 2-column layout:
  - Analytics Agent panel: Demand surge detection, sell-out trend (+23%), current DOH (5 days), OOS projection
  - Risk Identification Agent panel: Severity/Probability progress bars, Business Impact (₹5.4 Cr), Customer/Recurrence/Segment/KNX metrics
- DOH Projection bar chart (9 weeks, color-coded: green/warning/red)
- "Generate Mitigation" button → `/mitigation-scenarios`

### 6.3 MitigationScenarios (`MitigationScenarios.tsx`)
Agentic Workspace:
- AI prompt input with "Risk Mitigation Agent" header
- Agent processing animation (4 agents complete sequentially)
- 3 generated scenario cards:
  1. Inter-DC Stock Rebalance (ITST) — ₹1.3L cost, 96% service
  2. Pull Forward Production — ₹6L cost, 98% service
  3. Temporary SKU Substitution — ₹2.6L cost, 94% service
- Each card: icon, cost, service, trade-off, detail table
- "Compare Scenarios" button → `/scenario-comparison`

### 6.4 ScenarioComparison (`ScenarioComparison.tsx`)
Side-by-side comparison table:
- 3 scenarios across 7 KPIs: Service Recovery, Cost, TO Impact, OSA Impact, Execution Speed, Disruption Level, Success Probability
- Color-coded values with progress bars
- "AI Recommended" badge on Scenario 1
- Select buttons per scenario
- AI Recommendation panel: bullet points explaining why Scenario 1 is optimal
- "Approve Scenario N" button → `/risk-resolution`

### 6.5 RiskResolution (`RiskResolution.tsx`)
Risk Resolution Presentation:
- Hero summary card: Scenario 1 selected, 96% service, ₹1.3L cost, ₹5.4 Cr TO saved, 2 days execution
- "What Changed" section: Chennai DC (receiving) and Bangalore DC (sending) — before/after stock, DOH, value with progress bars
- DOH Recovery Curve: 6-week bar chart (before=red, after=green)
- Cost Breakdown: Transport ₹0.8L, Handling ₹0.3L, Admin ₹0.2L, Total ₹1.3L, ROI 4,154%
- Trade-off Summary warning card
- "Execute Solution" button → `/execution-tracker`

### 6.6 ExecutionTracker (`ExecutionTracker.tsx`)
Last Mile Execution:
- Progress bar (N/4 steps) with gradient fill
- 4 execution steps auto-advance every 2 seconds:
  1. SAP — STO Creation (BLR → Chennai)
  2. KNX — Plan Re-simulation
  3. Transport — Linehaul Booking
  4. Notifications — Customer Service, Forecasting, Logistics
- Each step: system icon, action description, status badge (Complete/Processing/Pending), timestamp
- In-progress step shows "Connecting to API" animation
- Completion message: "✔ DC transfer committed, OOS risk resolved"
- Approval Status: Supply Chain Planner ✓, Logistics Manager ✓
- "View Learning Insights" button → `/learning-feedback`

### 6.7 LearningFeedback (`LearningFeedback.tsx`)
Learning & Feedback Loop:
- Success summary card: OOS Risk Avoided, 96% service, ₹5.4 Cr saved, ₹1.3L cost, 2 days
- 2-column layout:
  - Root Cause Learning: Primary cause, contributing factors, "Learning Stored" badge
  - Model Updates: Probability Model, Risk Scoring, Buffer Optimization — all "Updated"
- Similar Pattern Analysis: 3 KPI cards (2 similar risks, 100% success, 2.5 day avg response)
- Proactive Recommendations: Forecast Bias Correction, Safety Stock Norms
- Navigation: Back to Risk Inbox, Return to Home

### 6.8 OrchestrationConsole (`OrchestrationConsole.tsx`)
Process Console (uses MainLayout):
- "Hello, Alex 👋" greeting with gradient text
- 5 KPI cards: Service Level (94.2%), Forecast Accuracy (87.8%), Inventory Turns (12.4x), OTIF (89.6%), Exceptions Pending (27)
- Agent Activity: Horizontal scroll of 5 AgentCards: Demand, Supply, Promo, Capacity, Cost — each with status, insight, drill-down button
- AI Recommendations: 3 RecommendationCards with impact metrics, confidence scores, urgency levels, action buttons

### 6.9 RiskOSHome (`RiskOSHome.tsx`)
Risk AI splash page (no MainLayout):
- Centered layout with ShieldAlert icon in gradient box
- "Risk AI" title + description
- 3 feature cards: Real-time Monitoring, Analytics & Insights, European Coverage
- "Open Risk Overview" button → `/risk-monitor/risk-overview`

### 6.10 RiskMonitor (`RiskMonitor.tsx`)
**Alternative risk monitor page (~426 lines, uses MainLayout):**
- Header with Shield icon, "Risk AI" title, NotificationBell, Connected badge
- **Alerts & Risk Summary card** (3 columns):
  - Left: 6 alert rows with severity dots, tooltips
  - Center: Donut chart (PieChart) with severity distribution + Value at Risk (€2.4M)
  - Right: 5-week stacked bar chart (Critical/Medium/Low)
- **Filters card**: Country, Category, Risk Type, Status, Planner dropdowns + Loss slider + Reset
- **Risk Table**: 8-row table with sortable columns (SKU, Description, Country, Category, Risk Type, Status, Exp. Loss, Planner)
- **AI Chat FAB**: Floating bot button (bottom-right) → opens 380×480px chat panel:
  - Gradient header "Risk Champ"
  - Pre-set questions: "What are the top critical risks?", "Summarize APAC exposure", "Generate mitigation plan"
  - User/AI message bubbles
  - Auto-reply with portfolio analysis

---

## 7. SHARED REUSABLE COMPONENTS

### Dashboard Components (`src/components/dashboard/`)

#### KPICard
Props: `title, value, unit, trend: {direction, value, period}, target: {value, status}, status: healthy|warning|critical, subtitle`
- Gradient card with 3xl bold value, trend arrow, target display
- Warning/Critical shows AlertTriangle icon
- Hover: scale 1.02 + glow shadow

#### AgentCard
Props: `name, type: process|utility|foundation, status: healthy|warning|error, insight, lastUpdate, exceptionCount, icon, onDrillDown`
- 300px min-width horizontal card
- Agent type color icon box (12×12 rounded-xl)
- Status icon (CheckCircle/AlertCircle/XCircle) + exception count badge
- Insight text + "Drill Down" button

#### RecommendationCard
Props: `title, description, impact: {metric, value, direction}, confidence, urgency: low|medium|high, source, actions[]`
- Lightbulb icon + urgency badge
- Impact metric display with trend icon
- Confidence percentage + source display
- Action buttons row

### Risk Analysis Components (`src/components/risk-analysis/`)

#### InsightsDataTab
Summarized risk data view with KPI cards and mini charts.

#### ScenarioSimulatorTab
3 mitigation scenario cards with:
- Name, description, cost, time estimate, success probability
- Trade-off indicators
- Radar chart comparison
- Select + "Trigger Approval" button

Export `Scenario` interface: `{ id, name, description, cost, successProbability, timeEstimate, tradeoffs }`

#### ConversationsTab
Per-risk chat threads:
- Thread list with participant avatars, last message preview
- Active thread: message history with timestamps, sender names
- Reply input with send button
- AI assistant messages interspersed

#### LastMileExecution
Multi-step approval + execution workflow:
- Vertical stepper with approve/reject per step
- SAP action simulation panel
- Status tracking

### UI Components (`src/components/ui/`)

#### ComingSoon
Props: `title, description`
- Back button + centered title/description
- Used for placeholder pages

#### GenerativeChat
Full-screen generative UI assistant:
- Processes prompts to generate: charts (bar), metrics (KPI), alerts (severity cards), tables, insight cards
- Chat history with generated component rendering inline
- Sparkles icon header

### Chat Components (`src/components/chat/`)

#### AgenticGenerativeUI
Used on Landing page. Simulates AI agent responses with:
- Typing animation
- Generated chart/metric/table components based on keyword matching
- Quick action suggestions

#### ChatInput, MessageBubble, EmptyState, QuickActions
Standard chat UI primitives.

---

## 8. ASSET REQUIREMENTS

### insights-analyse-icon.png
Generate a **blue analysis/chart icon** (transparent PNG, ~40×40px design area) used as the "Insights & Analyse" action button in the risk table. Should look like a stylized bar chart or data analysis symbol in the primary blue color.

---

## 9. KEY IMPLEMENTATION NOTES

1. **All colors must use semantic tokens** — never hardcode colors in components
2. **Frozen columns in DetailedRiskTable** use `position: sticky` with calculated `left` offsets that match exact column widths using `MRDR_FROZEN_WIDTHS` mapping
3. **MRDR column alignment**: Parent rows have a chevron icon in a `w-3` span. Child rows have an empty `w-3` span spacer to keep text perfectly aligned
4. **Chart styling**: All recharts charts use theme tokens for colors, grid, axes. Tooltip uses `contentStyle` with `hsl(var(--popover))` background
5. **Animations**: Use CSS keyframes for slide-in-right, fade-in, slide-up. Framer-motion NOT used — pure CSS animations
6. **State management**: React useState/useMemo. No external state library
7. **localStorage**: Used only for saved filter views in UnifiedFilters
8. **Mock data**: All data is client-side mock. No backend/API calls
9. **Status badges**: Use consistent semantic colors — success (green), warning (amber), destructive (red), primary (blue)
10. **The Risk AI page (`/risk-monitor`) is the crown jewel** — it must have the full sliding panels, AI copilot, visual centre, notification system, and comprehensive table with all features working

---

## 10. BUILD CONFIGURATION

- **Vite** with React plugin
- **TypeScript** strict mode
- **Path alias**: `@/` → `src/`
- **PostCSS**: tailwindcss + autoprefixer
- **Dependencies**: All shadcn/ui components installed, recharts, react-router-dom, @tanstack/react-query, sonner, date-fns, embla-carousel-react, react-resizable-panels, vaul, cmdk, input-otp, zod, react-hook-form, @hookform/resolvers

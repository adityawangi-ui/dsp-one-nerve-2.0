// ── Risk Data Types & Mock Data ──────────────────────────

export interface RiskRow {
  riskId: number;
  gtin: number;
  mrdr: number;
  mrdrDescription: string;
  msoCountry: string;
  site: string;
  su: string;
  riskType: "Out Of Stock" | "Below RS";
  severity: string;
  priority: string;
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

export const reasonCodes = ["R01", "R02", "R03", "R04", "R05", "R06", "R07", "R08"];

export const riskData: RiskRow[] = [
  { riskId: 1001, gtin: 1100000000001, mrdr: 50001, mrdrDescription: "Dove Body Wash 250ml", msoCountry: "DE", site: "C402", su: "SU-DE-01", riskType: "Out Of Stock", severity: "S 1", priority: "P 1", riskHorizon: "Short", segmentation: "A", startedOnWeek: "2024-W42", endedOnWeek: "", riskInDays: 14, stockCS: 120, expectedLossCases: 561096, expectedLossValue: 414, nextAvailableDate: "", botReasonCode: "R01", plannerReasonCode: "R01", comments: "Supplier delay confirmed", assignedTo: "Hans Müller", insights: "View More", promoFlag: "Y", typeCode: "Standard", repackDependency: "N", category: "Personal Care", status: "Open", uom: "CS" },
  { riskId: 1002, gtin: 1100000000002, mrdr: 50002, mrdrDescription: "Surf Excel 1L Liquid", msoCountry: "FR", site: "C400", su: "SU-FR-02", riskType: "Below RS", severity: "S 2", priority: "P 1", riskHorizon: "Med", segmentation: "A", startedOnWeek: "2024-W41", endedOnWeek: "", riskInDays: 21, stockCS: 85, expectedLossCases: 420000, expectedLossValue: 310, nextAvailableDate: "2024-11-15", botReasonCode: "R03", plannerReasonCode: "R02", comments: "", assignedTo: "Marie Dubois", insights: "View More", promoFlag: "N", typeCode: "Standard", repackDependency: "N", category: "Home Care", status: "Open", uom: "CS" },
  { riskId: 1003, gtin: 1100000000003, mrdr: 50003, mrdrDescription: "Lipton Green Tea 50pk", msoCountry: "IT", site: "C405", su: "SU-IT-01", riskType: "Out Of Stock", severity: "S 1", priority: "P 1", riskHorizon: "Short", segmentation: "B", startedOnWeek: "2024-W43", endedOnWeek: "", riskInDays: 7, stockCS: 0, expectedLossCases: 241, expectedLossValue: 0, nextAvailableDate: "", botReasonCode: "R02", plannerReasonCode: "R04", comments: "Production line down", assignedTo: "Paolo Rossi", insights: "View More", promoFlag: "N", typeCode: "Repack", repackDependency: "Y", category: "Foods", status: "Open", uom: "EA" },
  { riskId: 1004, gtin: 1100000000001, mrdr: 50001, mrdrDescription: "Dove Body Wash 250ml", msoCountry: "DE", site: "C402", su: "SU-DE-02", riskType: "Below RS", severity: "S 3", priority: "P 2", riskHorizon: "Long", segmentation: "C", startedOnWeek: "2024-W40", endedOnWeek: "2024-W44", riskInDays: 28, stockCS: 340, expectedLossCases: 1850, expectedLossValue: 120, nextAvailableDate: "2024-11-01", botReasonCode: "R05", plannerReasonCode: "R03", comments: "Resolved via alternate sourcing", assignedTo: "Hans Müller", insights: "View More", promoFlag: "N", typeCode: "Standard", repackDependency: "N", category: "Personal Care", status: "Closed", uom: "CS" },
  { riskId: 1005, gtin: 1100000000005, mrdr: 50005, mrdrDescription: "Axe Dark Temptation 150ml", msoCountry: "ES", site: "C410", su: "SU-ES-01", riskType: "Out Of Stock", severity: "S 1", priority: "P 1", riskHorizon: "Short", segmentation: "A", startedOnWeek: "2024-W43", endedOnWeek: "", riskInDays: 5, stockCS: 0, expectedLossCases: 0, expectedLossValue: 0, nextAvailableDate: "", botReasonCode: "R01", plannerReasonCode: "", comments: "", assignedTo: "Carlos García", insights: "View More", promoFlag: "Y", typeCode: "Standard", repackDependency: "N", category: "Personal Care", status: "Open", uom: "CS", isNew: true },
  { riskId: 1006, gtin: 1100000000006, mrdr: 50006, mrdrDescription: "Knorr Soup Cream 500ml", msoCountry: "NL", site: "C450", su: "SU-NL-01", riskType: "Below RS", severity: "S 4", priority: "P 2", riskHorizon: "Med", segmentation: "B", startedOnWeek: "2024-W42", endedOnWeek: "", riskInDays: 12, stockCS: 450, expectedLossCases: 78500, expectedLossValue: 56, nextAvailableDate: "2024-11-10", botReasonCode: "R06", plannerReasonCode: "R05", comments: "Monitoring weekly", assignedTo: "Anna de Vries", insights: "View More", promoFlag: "N", typeCode: "Component", repackDependency: "N", category: "Foods", status: "Open", uom: "L" },
  { riskId: 1007, gtin: 1100000000007, mrdr: 50007, mrdrDescription: "Vaseline Body Lotion 400ml", msoCountry: "PL", site: "C420", su: "SU-PL-01", riskType: "Out Of Stock", severity: "S 2", priority: "P 2", riskHorizon: "Med", segmentation: "A", startedOnWeek: "2024-W41", endedOnWeek: "", riskInDays: 18, stockCS: 25, expectedLossCases: 890000, expectedLossValue: 720, nextAvailableDate: "", botReasonCode: "R04", plannerReasonCode: "R06", comments: "Escalated to regional lead", assignedTo: "Jan Kowalski", insights: "View More", promoFlag: "N", typeCode: "Standard", repackDependency: "N", category: "Personal Care", status: "Open", uom: "CS" },
  { riskId: 1008, gtin: 1100000000008, mrdr: 50008, mrdrDescription: "Comfort Fabric Softener 1L", msoCountry: "DE", site: "C402", su: "SU-DE-03", riskType: "Below RS", severity: "S 5", priority: "P 3", riskHorizon: "Long", segmentation: "D", startedOnWeek: "2024-W39", endedOnWeek: "2024-W43", riskInDays: 28, stockCS: 890, expectedLossCases: 670000, expectedLossValue: 530, nextAvailableDate: "2024-10-28", botReasonCode: "R07", plannerReasonCode: "R07", comments: "Low impact, closed", assignedTo: "Frieda Schneider", insights: "View More", promoFlag: "N", typeCode: "Standard", repackDependency: "N", category: "Home Care", status: "Closed", uom: "L" },
  { riskId: 1009, gtin: 1100000000009, mrdr: 50009, mrdrDescription: "Hellmann's Mayonnaise 400g", msoCountry: "FR", site: "C400", su: "SU-FR-03", riskType: "Out Of Stock", severity: "S 1", priority: "P 1", riskHorizon: "Short", segmentation: "A", startedOnWeek: "2024-W43", endedOnWeek: "", riskInDays: 3, stockCS: 0, expectedLossCases: 3200, expectedLossValue: 18, nextAvailableDate: "", botReasonCode: "R02", plannerReasonCode: "R01", comments: "Critical — CEO escalation", assignedTo: "Pierre Dupont", insights: "View More", promoFlag: "Y", typeCode: "Repack", repackDependency: "Y", category: "Foods", status: "Open", uom: "KG", isNew: true },
  { riskId: 1010, gtin: 1100000000010, mrdr: 50010, mrdrDescription: "Ben & Jerry's Cookie Dough 500ml", msoCountry: "IT", site: "C405", su: "SU-IT-02", riskType: "Below RS", severity: "S 3", priority: "P 2", riskHorizon: "Med", segmentation: "B", startedOnWeek: "2024-W42", endedOnWeek: "", riskInDays: 10, stockCS: 200, expectedLossCases: 560, expectedLossValue: 5, nextAvailableDate: "2024-11-08", botReasonCode: "R08", plannerReasonCode: "R03", comments: "", assignedTo: "Giulia Bianchi", insights: "View More", promoFlag: "N", typeCode: "Standard", repackDependency: "N", category: "Refreshment", status: "Open", uom: "CS" },
  { riskId: 1011, gtin: 1100000000011, mrdr: 50011, mrdrDescription: "Rexona Deodorant 200ml", msoCountry: "ES", site: "C410", su: "SU-ES-02", riskType: "Out Of Stock", severity: "S 2", priority: "P 1", riskHorizon: "Short", segmentation: "A", startedOnWeek: "2024-W43", endedOnWeek: "", riskInDays: 6, stockCS: 15, expectedLossCases: 345000, expectedLossValue: 280, nextAvailableDate: "", botReasonCode: "R03", plannerReasonCode: "", comments: "Awaiting planner input", assignedTo: "Elena Fernández", insights: "View More", promoFlag: "N", typeCode: "Standard", repackDependency: "N", category: "Personal Care", status: "Open", uom: "EA" },
  { riskId: 1012, gtin: 1100000000012, mrdr: 50012, mrdrDescription: "Domestos Bleach 750ml", msoCountry: "NL", site: "C450", su: "SU-NL-02", riskType: "Below RS", severity: "S 6", priority: "P 3", riskHorizon: "Long", segmentation: "I", startedOnWeek: "2024-W38", endedOnWeek: "2024-W42", riskInDays: 28, stockCS: 1200, expectedLossCases: 120, expectedLossValue: 2, nextAvailableDate: "2024-10-20", botReasonCode: "R05", plannerReasonCode: "R07", comments: "Non-critical item", assignedTo: "Lars Johansson", insights: "View More", promoFlag: "N", typeCode: "Component", repackDependency: "N", category: "Home Care", status: "Closed", uom: "L" },
  // Duplicate MRDRs with different weeks for drill-through testing
  { riskId: 1013, gtin: 1100000000001, mrdr: 50001, mrdrDescription: "Dove Body Wash 250ml", msoCountry: "DE", site: "C402", su: "SU-DE-01", riskType: "Out Of Stock", severity: "S 2", priority: "P 1", riskHorizon: "Med", segmentation: "A", startedOnWeek: "2024-W44", endedOnWeek: "", riskInDays: 10, stockCS: 80, expectedLossCases: 245000, expectedLossValue: 190, nextAvailableDate: "", botReasonCode: "R03", plannerReasonCode: "R02", comments: "Second batch delay", assignedTo: "Hans Müller", insights: "View More", promoFlag: "N", typeCode: "Standard", repackDependency: "N", category: "Personal Care", status: "Open", uom: "CS" },
  { riskId: 1014, gtin: 1100000000003, mrdr: 50003, mrdrDescription: "Lipton Green Tea 50pk", msoCountry: "IT", site: "C405", su: "SU-IT-01", riskType: "Out Of Stock", severity: "S 2", priority: "P 2", riskHorizon: "Med", segmentation: "B", startedOnWeek: "2024-W45", endedOnWeek: "", riskInDays: 5, stockCS: 40, expectedLossCases: 512000, expectedLossValue: 385, nextAvailableDate: "", botReasonCode: "R04", plannerReasonCode: "R03", comments: "Alternate supplier contacted", assignedTo: "Paolo Rossi", insights: "View More", promoFlag: "N", typeCode: "Repack", repackDependency: "Y", category: "Foods", status: "Open", uom: "EA" },
  { riskId: 1015, gtin: 1100000000009, mrdr: 50009, mrdrDescription: "Hellmann's Mayonnaise 400g", msoCountry: "FR", site: "C400", su: "SU-FR-03", riskType: "Out Of Stock", severity: "S 2", priority: "P 2", riskHorizon: "Med", segmentation: "A", startedOnWeek: "2024-W45", endedOnWeek: "", riskInDays: 8, stockCS: 30, expectedLossCases: 156000, expectedLossValue: 95, nextAvailableDate: "", botReasonCode: "R06", plannerReasonCode: "R04", comments: "Supply recovery in progress", assignedTo: "Pierre Dupont", insights: "View More", promoFlag: "Y", typeCode: "Repack", repackDependency: "Y", category: "Foods", status: "Open", uom: "KG", isNew: true },
];

export interface ColumnDef {
  key: string;
  label: string;
  width?: number;
}

export const allColumns: ColumnDef[] = [
  { key: "riskId", label: "Risk ID", width: 70 },
  { key: "gtin", label: "GTIN", width: 130 },
  { key: "mrdr", label: "MRDR", width: 100 },
  { key: "site", label: "Site", width: 70 },
  { key: "mrdrDescription", label: "MRDR Description", width: 200 },
  { key: "msoCountry", label: "MSO Country", width: 90 },
  { key: "su", label: "SU", width: 100 },
  { key: "riskType", label: "Risk Type", width: 110 },
  { key: "severity", label: "Severity", width: 80 },
  { key: "priority", label: "Priority", width: 80 },
  { key: "status", label: "Status", width: 80 },
  { key: "uom", label: "UOM", width: 60 },
  { key: "riskHorizon", label: "Risk Horizon", width: 100 },
  { key: "segmentation", label: "Segmentation", width: 100 },
  { key: "promoFlag", label: "Promo Flag", width: 80 },
  { key: "typeCode", label: "Type Code", width: 100 },
  { key: "repackDependency", label: "Repack Dependency", width: 120 },
  { key: "category", label: "Category", width: 120 },
  { key: "startedOnWeek", label: "Started On Week", width: 120 },
  { key: "endedOnWeek", label: "Ended On Week", width: 120 },
  { key: "riskInDays", label: "Risk in Days", width: 90 },
  { key: "stockCS", label: "Stock CS", width: 80 },
  { key: "expectedLossCases", label: "Expected Loss Cases", width: 130 },
  { key: "expectedLossValue", label: "Expected Loss Value (€)", width: 140 },
  { key: "nextAvailableDate", label: "Next Available Date", width: 130 },
  { key: "botReasonCode", label: "Bot Reason Code", width: 110 },
  { key: "plannerReasonCode", label: "Planner Reason Code", width: 130 },
  { key: "comments", label: "Comments", width: 150 },
  { key: "assignedTo", label: "Assigned To", width: 160 },
  { key: "insights", label: "Insights", width: 90 },
];

export const frozenColumns = ["riskId", "gtin", "mrdr", "site"];

export interface GtinRow {
  gtin: number;
  mrdrCount: number;
  msoCountry: string;
  site: string;
  riskType: string;
  severity: string;
  priority: string;
  riskInDays: number;
  stockCS: number;
  expectedLossCases: number;
  expectedLossValue: number;
}

export const gtinColumns: ColumnDef[] = [
  { key: "gtin", label: "GTIN" },
  { key: "mrdrCount", label: "MRDR Count" },
  { key: "msoCountry", label: "MSO Country" },
  { key: "site", label: "Site" },
  { key: "riskType", label: "Risk Type" },
  { key: "severity", label: "Max Severity" },
  { key: "priority", label: "Max Priority" },
  { key: "riskInDays", label: "Total Risk Days" },
  { key: "stockCS", label: "Total Stock CS" },
  { key: "expectedLossCases", label: "Total Expected Loss Cases" },
  { key: "expectedLossValue", label: "Total Expected Loss Value (€)" },
];

export function aggregateByGtin(rows: RiskRow[]): GtinRow[] {
  const map = new Map<number, RiskRow[]>();
  rows.forEach((r) => {
    if (!map.has(r.gtin)) map.set(r.gtin, []);
    map.get(r.gtin)!.push(r);
  });
  return Array.from(map.entries()).map(([gtin, items]) => ({
    gtin,
    mrdrCount: items.length,
    msoCountry: items[0].msoCountry,
    site: items[0].site,
    riskType: items[0].riskType,
    severity: items.reduce((min, r) => (r.severity < min ? r.severity : min), items[0].severity),
    priority: items.reduce((min, r) => (r.priority < min ? r.priority : min), items[0].priority),
    riskInDays: items.reduce((s, r) => s + r.riskInDays, 0),
    stockCS: items.reduce((s, r) => s + r.stockCS, 0),
    expectedLossCases: items.reduce((s, r) => s + r.expectedLossCases, 0),
    expectedLossValue: items.reduce((s, r) => s + r.expectedLossValue, 0),
  }));
}

// MRDR aggregated view
export interface MrdrAggRow {
  riskId: number;
  mrdr: number;
  mrdrDescription: string;
  msoCountry: string;
  site: string;
  su: string;
  riskType: string;
  severity: string;
  priority: string;
  riskHorizon: string;
  segmentation: string;
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
  promoFlag: string;
  typeCode: string;
  repackDependency: string;
  category: string;
  gtin: number;
  status: string;
  uom: string;
  lineCount: number;
  isNew: boolean;
}

export const mrdrAggColumns: ColumnDef[] = [
  { key: "riskId", label: "Risk ID", width: 90 },
  { key: "mrdr", label: "MRDR", width: 120 },
  { key: "mrdrDescription", label: "MRDR GTIN Description", width: 220 },
  { key: "msoCountry", label: "MSO Country", width: 100 },
  { key: "site", label: "Site", width: 70 },
  { key: "su", label: "SU", width: 100 },
  { key: "riskType", label: "Risk Type", width: 110 },
  { key: "severity", label: "Severity", width: 80 },
  { key: "priority", label: "Priority", width: 80 },
  { key: "riskHorizon", label: "Risk Horizon", width: 100 },
  { key: "segmentation", label: "Segmentation", width: 100 },
  { key: "startedOnWeek", label: "Started On Week", width: 120 },
  { key: "endedOnWeek", label: "Ended On Week", width: 120 },
  { key: "riskInDays", label: "Risk in Days", width: 100 },
  { key: "stockCS", label: "Stock CS", width: 90 },
  { key: "expectedLossCases", label: "Expected Loss Cases", width: 140 },
  { key: "expectedLossValue", label: "Expected Loss Value (€)", width: 150 },
  { key: "nextAvailableDate", label: "Next Available Date", width: 140 },
  { key: "botReasonCode", label: "Bot Reason Code", width: 120 },
  { key: "plannerReasonCode", label: "Planner Reason Code", width: 140 },
  { key: "comments", label: "Comments", width: 160 },
  { key: "assignedTo", label: "Assigned To", width: 160 },
  { key: "promoFlag", label: "Promo Flag", width: 90 },
  { key: "typeCode", label: "Type Code", width: 100 },
  { key: "repackDependency", label: "Repack Dependency", width: 130 },
  { key: "category", label: "Category", width: 120 },
  { key: "insights", label: "Insights", width: 100 },
];

export function aggregateByMrdr(rows: RiskRow[]): MrdrAggRow[] {
  const map = new Map<number, RiskRow[]>();
  rows.forEach((r) => {
    if (!map.has(r.mrdr)) map.set(r.mrdr, []);
    map.get(r.mrdr)!.push(r);
  });
  return Array.from(map.entries()).map(([mrdr, items]) => {
    // Sort by startedOnWeek to find earliest
    const sorted = [...items].sort((a, b) => a.startedOnWeek.localeCompare(b.startedOnWeek));
    const earliest = sorted[0];
    return {
      riskId: earliest.riskId,
      mrdr,
      mrdrDescription: earliest.mrdrDescription,
      gtin: earliest.gtin,
      msoCountry: earliest.msoCountry,
      site: earliest.site,
      su: earliest.su,
      riskType: earliest.riskType,
      severity: items.reduce((min, r) => (r.severity < min ? r.severity : min), items[0].severity),
      priority: items.reduce((min, r) => (r.priority < min ? r.priority : min), items[0].priority),
      riskHorizon: earliest.riskHorizon,
      segmentation: earliest.segmentation,
      startedOnWeek: earliest.startedOnWeek,
      endedOnWeek: earliest.endedOnWeek,
      riskInDays: items.reduce((s, r) => s + r.riskInDays, 0),
      stockCS: items.reduce((s, r) => s + r.stockCS, 0),
      expectedLossCases: items.reduce((s, r) => s + r.expectedLossCases, 0),
      expectedLossValue: items.reduce((s, r) => s + r.expectedLossValue, 0),
      nextAvailableDate: earliest.nextAvailableDate,
      botReasonCode: earliest.botReasonCode,
      plannerReasonCode: earliest.plannerReasonCode,
      comments: earliest.comments,
      assignedTo: earliest.assignedTo,
      promoFlag: earliest.promoFlag,
      typeCode: earliest.typeCode,
      repackDependency: earliest.repackDependency,
      category: earliest.category,
      status: items.some(i => i.status === "Open") ? "Open" : "Closed",
      lineCount: items.length,
      isNew: items.some(i => i.isNew),
    };
  });
}

// Alert data for summary section
export const alertRows = [
  { label: "Total Risks", value: 1281, severity: "info" as const, pct: 82, tooltip: "All tracked risk items across all categories and regions. 847 open, 434 closed." },
  { label: "No Next Avail.", value: 156, severity: "critical" as const, pct: 56, tooltip: "Items with no next available supply date. Immediate action needed for 42 SKUs. DE: 68, FR: 45, IT: 43." },
  { label: "Missing Reason", value: 89, severity: "medium" as const, pct: 34, tooltip: "Risk items without a root cause assigned. Top categories: Logistics (34), Demand (28), Supply (27)." },
  { label: "Missing Comments", value: 45, severity: "low" as const, pct: 22, tooltip: "Items requiring planner commentary for audit compliance. 12 are P1 priority." },
  { label: "Past Due", value: 234, severity: "critical" as const, pct: 74, tooltip: "Overdue risk items. 67% are >7 days past due. DE leads with 98 items, FR with 72." },
  { label: "Assigned to Me", value: 67, severity: "assigned" as const, pct: 48, tooltip: "Your personal queue. 12 are high priority, 8 added today. Oldest item: 21 days." },
];

export const donutData = [
  { name: "Critical", value: 47, color: "hsl(var(--critical))" },
  { name: "Medium", value: 156, color: "hsl(var(--medium))" },
  { name: "Low", value: 89, color: "hsl(var(--low))" },
];

export const weeklyTrendData = [
  { week: "W1", critical: 12, medium: 45, low: 30 },
  { week: "W2", critical: 18, medium: 52, low: 28 },
  { week: "W3", critical: 9, medium: 38, low: 35 },
  { week: "W4", critical: 15, medium: 48, low: 22 },
  { week: "W5", critical: 47, medium: 56, low: 29 },
];

export const filterOptions = {
  market: ["Italy", "Germany", "France", "Spain", "Netherlands", "Poland", "Belgium", "Austria", "Portugal", "Sweden"],
  category: ["Personal Care", "Home Care", "Foods", "Refreshment"],
  smallC: ["SC01", "SC02", "SC03"],
  mrpController: ["MRP01", "MRP02", "MRP03"],
  plant: ["P001", "P002", "P003"],
  riskType: ["Out Of Stock", "Below RS"],
  severity: ["S 1", "S 2", "S 3", "S 4", "S 5", "S 6"],
  priority: ["P 1", "P 2", "P 3"],
  status: ["Open", "Closed"],
  country: ["DE", "FR", "IT", "ES", "NL", "PL"],
  assignedTo: ["Hans Müller", "Marie Dubois", "Paolo Rossi", "Carlos García", "Anna de Vries", "Jan Kowalski", "Frieda Schneider", "Pierre Dupont", "Giulia Bianchi", "Elena Fernández", "Lars Johansson"],
};

// Severity color helpers
export function getSeverityColor(sev: string): string {
  if (sev === "S 1") return "critical";
  if (sev === "S 2" || sev === "S 3" || sev === "S 4") return "medium";
  return "low";
}

export function getPriorityColor(p: string): string {
  return p === "P 1" ? "critical" : "secondary";
}

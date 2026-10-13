// Mock data for visual-foundation pass. Not connected to any backend.

export type Severity = "critical" | "warning" | "info";

export const healthSummary = {
  score: 99,
  trendLabel: "+1.2%",
  healthy: 296,
  warning: 3,
  critical: 1,
};

export interface ActionRow {
  id: string;
  severity: Severity;
  asset: string;
  description: string;
  time: string;
  driver: string;
}

export const actionRows: ActionRow[] = [
  {
    id: "SIM-0001",
    severity: "critical",
    asset: "Freightliner Cascadia #114",
    description: "Critical telemetry anomaly detected — engine temperature spike",
    time: "08:42",
    driver: "Mike Ross",
  },
  {
    id: "SIM-0014",
    severity: "warning",
    asset: "Volvo VNL #082",
    description: "Coolant level below threshold",
    time: "08:21",
    driver: "Alina Chen",
  },
  {
    id: "SIM-0022",
    severity: "warning",
    asset: "Peterbilt 579 #047",
    description: "Tire pressure deviation on axle 2",
    time: "07:58",
    driver: "Devon Ortiz",
  },
  {
    id: "SIM-0031",
    severity: "info",
    asset: "Kenworth T680 #203",
    description: "Scheduled maintenance window approaching",
    time: "07:40",
    driver: "Priya Nair",
  },
  {
    id: "SIM-0040",
    severity: "info",
    asset: "Freightliner Cascadia #156",
    description: "Route deviation logged",
    time: "07:12",
    driver: "Sam Walker",
  },
  {
    id: "SIM-0052",
    severity: "warning",
    asset: "Volvo VNL #099",
    description: "Battery voltage fluctuation",
    time: "06:55",
    driver: "Jordan Lee",
  },
];

export const incident = {
  id: "SIM-0001",
  title: "Incident",
  severity: "critical" as Severity,
  location: "Incident detected: M7 Highway, KM 45",
  driver: {
    name: "Mike Ross",
    aiConciergeActive: true,
  },
  primaryIssue: "Critical telemetry from SIM-0001",
  metrics: [
    { label: "Temperature", value: "118°C", severity: "critical" as Severity },
    { label: "Voltage", value: "11.2V", severity: "warning" as Severity },
    { label: "Coolant Level", value: "22%", severity: "critical" as Severity },
    { label: "Speed", value: "0 mph", severity: "info" as Severity },
  ],
};

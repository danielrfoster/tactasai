export interface Node {
  id: string
  label: string
  sublabel?: string
  type: "atem" | "pc" | "device" | "converter" | "cloud" | "stream"
  x: number
  y: number
  system: string
}

export interface Connection {
  from: string
  to: string
  label?: string
  type: "hdmi" | "sdi" | "usb" | "wireless" | "ethernet" | "stream" | "audio"
  lineStyle?: "solid" | "dotted" | "thick"
}

export interface Subgraph {
  id: string
  title: string
  x: number
  y: number
  width: number
  height: number
}

export interface DiagramTemplate {
  id: string
  name: string
  description: string
  nodes: Node[]
  connections: Connection[]
  subgraphs: Subgraph[]
}

const managedAgentSystem: DiagramTemplate = {
  id: "managed-agent-system",
  name: "Managed Agent System",
  description: "Business requests move through company context, agent reasoning, controls, and system actions.",
  nodes: [
    { id: "team_inbox", label: "Team Inbox", sublabel: "Email + Slack", type: "pc", x: 60, y: 100, system: "inputs" },
    { id: "customer_forms", label: "Customer Forms", sublabel: "Requests", type: "device", x: 60, y: 190, system: "inputs" },
    { id: "crm_events", label: "CRM Events", sublabel: "Accounts", type: "cloud", x: 60, y: 280, system: "inputs" },
    { id: "ops_docs", label: "Ops Docs", sublabel: "Policies", type: "device", x: 60, y: 370, system: "inputs" },
    { id: "intake", label: "Intake Router", sublabel: "Classify work", type: "converter", x: 240, y: 220, system: "inputs" },
    { id: "context_index", label: "Knowledge Index", sublabel: "Company context", type: "stream", x: 420, y: 130, system: "agent" },
    { id: "guardrails", label: "Guardrails", sublabel: "Policy checks", type: "converter", x: 420, y: 250, system: "agent" },
    { id: "agent_runtime", label: "Agent Runtime", sublabel: "Plan + reason", type: "atem", x: 600, y: 220, system: "agent" },
    { id: "approval_gate", label: "Approval Gate", sublabel: "Human review", type: "device", x: 780, y: 130, system: "agent" },
    { id: "task_queue", label: "Task Queue", sublabel: "Owners + SLA", type: "stream", x: 780, y: 310, system: "agent" },
    { id: "draft_output", label: "Prepared Output", sublabel: "Reply / brief", type: "device", x: 960, y: 100, system: "systems" },
    { id: "crm_update", label: "CRM Update", sublabel: "Records", type: "cloud", x: 960, y: 220, system: "systems" },
    { id: "work_items", label: "Work Items", sublabel: "Tasks", type: "cloud", x: 960, y: 340, system: "systems" },
    { id: "audit_log", label: "Audit Log", sublabel: "Trace", type: "device", x: 1120, y: 220, system: "systems" },
  ],
  connections: [
    { from: "team_inbox", to: "intake", label: "Request", type: "hdmi" },
    { from: "customer_forms", to: "intake", label: "Submission", type: "hdmi" },
    { from: "crm_events", to: "intake", label: "Trigger", type: "ethernet" },
    { from: "ops_docs", to: "context_index", label: "Knowledge", type: "sdi" },
    { from: "intake", to: "context_index", label: "Need context", type: "sdi" },
    { from: "context_index", to: "agent_runtime", label: "Retrieved facts", type: "usb" },
    { from: "guardrails", to: "agent_runtime", label: "Policy", type: "audio" },
    { from: "intake", to: "agent_runtime", label: "Work intent", type: "hdmi" },
    { from: "agent_runtime", to: "approval_gate", label: "Review", type: "wireless" },
    { from: "approval_gate", to: "draft_output", label: "Approved", type: "stream" },
    { from: "agent_runtime", to: "task_queue", label: "Next steps", type: "stream" },
    { from: "task_queue", to: "work_items", label: "Create tasks", type: "ethernet" },
    { from: "agent_runtime", to: "crm_update", label: "API update", type: "ethernet" },
    { from: "draft_output", to: "audit_log", label: "Evidence", type: "audio" },
    { from: "crm_update", to: "audit_log", label: "Change log", type: "audio" },
    { from: "work_items", to: "audit_log", label: "Status", type: "audio" },
  ],
  subgraphs: [
    { id: "inputs", title: "Business Inputs", x: 30, y: 50, width: 340, height: 400 },
    { id: "agent", title: "Agent Operating Layer", x: 390, y: 50, width: 520, height: 400 },
    { id: "systems", title: "Business Systems", x: 930, y: 50, width: 310, height: 400 },
  ],
}

const customerSupportAgent: DiagramTemplate = {
  id: "customer-support-agent",
  name: "Customer Support Agent",
  description: "Support tickets become contextual answers, escalations, and CRM updates.",
  nodes: [
    { id: "support_inbox", label: "Support Inbox", sublabel: "Tickets", type: "pc", x: 90, y: 120, system: "inputs" },
    { id: "chat_widget", label: "Chat Widget", sublabel: "Live requests", type: "device", x: 90, y: 240, system: "inputs" },
    { id: "help_center", label: "Help Center", sublabel: "Articles", type: "cloud", x: 90, y: 360, system: "inputs" },
    { id: "triage", label: "Triage Agent", sublabel: "Intent + urgency", type: "atem", x: 330, y: 210, system: "agent" },
    { id: "account_context", label: "Account Context", sublabel: "Plan + history", type: "stream", x: 520, y: 120, system: "agent" },
    { id: "answer_draft", label: "Answer Draft", sublabel: "Company voice", type: "device", x: 520, y: 300, system: "agent" },
    { id: "human_escalation", label: "Human Escalation", sublabel: "Edge cases", type: "converter", x: 720, y: 210, system: "agent" },
    { id: "zendesk", label: "Ticket System", sublabel: "Status", type: "cloud", x: 930, y: 120, system: "systems" },
    { id: "crm", label: "CRM", sublabel: "Customer record", type: "cloud", x: 930, y: 250, system: "systems" },
    { id: "csat", label: "CSAT Loop", sublabel: "Feedback", type: "stream", x: 930, y: 380, system: "systems" },
  ],
  connections: [
    { from: "support_inbox", to: "triage", label: "Ticket", type: "hdmi" },
    { from: "chat_widget", to: "triage", label: "Conversation", type: "hdmi" },
    { from: "help_center", to: "account_context", label: "Knowledge", type: "sdi" },
    { from: "triage", to: "account_context", label: "Lookup", type: "usb" },
    { from: "account_context", to: "answer_draft", label: "Context", type: "usb" },
    { from: "triage", to: "answer_draft", label: "Intent", type: "stream" },
    { from: "answer_draft", to: "human_escalation", label: "Review if risky", type: "wireless" },
    { from: "answer_draft", to: "zendesk", label: "Reply", type: "stream" },
    { from: "triage", to: "crm", label: "Update fields", type: "ethernet" },
    { from: "zendesk", to: "csat", label: "Resolved", type: "audio" },
  ],
  subgraphs: [
    { id: "inputs", title: "Support Signals", x: 60, y: 70, width: 230, height: 420 },
    { id: "agent", title: "Support Agent", x: 310, y: 70, width: 550, height: 420 },
    { id: "systems", title: "Customer Systems", x: 900, y: 70, width: 180, height: 420 },
  ],
}

const salesOperationsAgent: DiagramTemplate = {
  id: "sales-operations-agent",
  name: "Sales Ops Agent",
  description: "Lead signals are enriched, scored, routed, and turned into follow-up work.",
  nodes: [
    { id: "web_lead", label: "Web Lead", sublabel: "Form fill", type: "device", x: 90, y: 130, system: "inputs" },
    { id: "meeting_note", label: "Meeting Note", sublabel: "Transcript", type: "pc", x: 90, y: 250, system: "inputs" },
    { id: "product_usage", label: "Product Usage", sublabel: "Signals", type: "cloud", x: 90, y: 370, system: "inputs" },
    { id: "enrichment", label: "Enrichment", sublabel: "Firmographic data", type: "converter", x: 330, y: 130, system: "agent" },
    { id: "sales_agent", label: "Sales Agent", sublabel: "Score + route", type: "atem", x: 520, y: 250, system: "agent" },
    { id: "playbook", label: "Sales Playbook", sublabel: "Messaging", type: "stream", x: 330, y: 370, system: "agent" },
    { id: "manager_review", label: "Manager Review", sublabel: "Key accounts", type: "device", x: 720, y: 250, system: "agent" },
    { id: "crm", label: "CRM", sublabel: "Opportunity", type: "cloud", x: 930, y: 130, system: "systems" },
    { id: "sequencer", label: "Outreach Sequence", sublabel: "Email steps", type: "stream", x: 930, y: 250, system: "systems" },
    { id: "forecast", label: "Forecast View", sublabel: "Pipeline", type: "device", x: 930, y: 370, system: "systems" },
  ],
  connections: [
    { from: "web_lead", to: "enrichment", label: "Lead", type: "hdmi" },
    { from: "meeting_note", to: "sales_agent", label: "Notes", type: "hdmi" },
    { from: "product_usage", to: "sales_agent", label: "Usage", type: "ethernet" },
    { from: "enrichment", to: "sales_agent", label: "Fit data", type: "usb" },
    { from: "playbook", to: "sales_agent", label: "Playbook", type: "sdi" },
    { from: "sales_agent", to: "manager_review", label: "Approval", type: "wireless" },
    { from: "sales_agent", to: "crm", label: "Create opp", type: "ethernet" },
    { from: "manager_review", to: "sequencer", label: "Approved copy", type: "stream" },
    { from: "crm", to: "forecast", label: "Pipeline data", type: "audio" },
  ],
  subgraphs: [
    { id: "inputs", title: "Revenue Inputs", x: 60, y: 80, width: 230, height: 400 },
    { id: "agent", title: "Sales Operations Agent", x: 310, y: 80, width: 550, height: 400 },
    { id: "systems", title: "Revenue Systems", x: 900, y: 80, width: 180, height: 400 },
  ],
}

const knowledgeBaseAgent: DiagramTemplate = {
  id: "knowledge-base-agent",
  name: "Knowledge Base Agent",
  description: "Company knowledge is indexed, retrieved, grounded, and turned into useful answers.",
  nodes: [
    { id: "docs", label: "Docs", sublabel: "Policies", type: "device", x: 90, y: 100, system: "knowledge" },
    { id: "drive", label: "Drive Files", sublabel: "Shared folders", type: "cloud", x: 90, y: 220, system: "knowledge" },
    { id: "tickets", label: "Prior Tickets", sublabel: "Solved cases", type: "device", x: 90, y: 340, system: "knowledge" },
    { id: "normalizer", label: "Normalizer", sublabel: "Clean + chunk", type: "converter", x: 310, y: 220, system: "agent" },
    { id: "retrieval", label: "Retrieval Index", sublabel: "Search context", type: "stream", x: 510, y: 120, system: "agent" },
    { id: "answer_agent", label: "Answer Agent", sublabel: "Grounded response", type: "atem", x: 510, y: 320, system: "agent" },
    { id: "source_view", label: "Source View", sublabel: "Citations", type: "device", x: 730, y: 120, system: "agent" },
    { id: "review", label: "Review Queue", sublabel: "Low confidence", type: "converter", x: 730, y: 320, system: "agent" },
    { id: "employee_chat", label: "Employee Chat", sublabel: "Self-service", type: "pc", x: 950, y: 160, system: "outputs" },
    { id: "briefs", label: "Briefs", sublabel: "Ready summaries", type: "stream", x: 950, y: 320, system: "outputs" },
  ],
  connections: [
    { from: "docs", to: "normalizer", label: "Source", type: "sdi" },
    { from: "drive", to: "normalizer", label: "Files", type: "sdi" },
    { from: "tickets", to: "normalizer", label: "Examples", type: "sdi" },
    { from: "normalizer", to: "retrieval", label: "Index", type: "usb" },
    { from: "retrieval", to: "answer_agent", label: "Context", type: "usb" },
    { from: "answer_agent", to: "source_view", label: "Citations", type: "audio" },
    { from: "answer_agent", to: "review", label: "Confidence check", type: "wireless" },
    { from: "answer_agent", to: "employee_chat", label: "Answer", type: "stream" },
    { from: "answer_agent", to: "briefs", label: "Summary", type: "stream" },
  ],
  subgraphs: [
    { id: "knowledge", title: "Company Knowledge", x: 60, y: 60, width: 210, height: 400 },
    { id: "agent", title: "Grounding Layer", x: 300, y: 60, width: 560, height: 400 },
    { id: "outputs", title: "Knowledge Outputs", x: 920, y: 100, width: 170, height: 300 },
  ],
}

const backOfficeAutomation: DiagramTemplate = {
  id: "back-office-automation",
  name: "Back Office Automation",
  description: "Operational requests become structured approvals, updates, and audit-ready work.",
  nodes: [
    { id: "invoice_inbox", label: "Invoice Inbox", sublabel: "PDFs", type: "pc", x: 90, y: 120, system: "inputs" },
    { id: "hr_request", label: "HR Request", sublabel: "Employee changes", type: "device", x: 90, y: 250, system: "inputs" },
    { id: "ops_request", label: "Ops Request", sublabel: "Internal tickets", type: "device", x: 90, y: 380, system: "inputs" },
    { id: "extractor", label: "Data Extractor", sublabel: "Fields + intent", type: "converter", x: 330, y: 250, system: "agent" },
    { id: "ops_agent", label: "Ops Agent", sublabel: "Prepare work", type: "atem", x: 540, y: 250, system: "agent" },
    { id: "policy_check", label: "Policy Check", sublabel: "Rules", type: "stream", x: 540, y: 100, system: "agent" },
    { id: "approval", label: "Approval", sublabel: "Finance / HR", type: "device", x: 740, y: 250, system: "agent" },
    { id: "erp", label: "ERP", sublabel: "Record update", type: "cloud", x: 950, y: 120, system: "systems" },
    { id: "payroll", label: "Payroll", sublabel: "Employee data", type: "cloud", x: 950, y: 250, system: "systems" },
    { id: "audit", label: "Audit Trail", sublabel: "Evidence", type: "device", x: 950, y: 380, system: "systems" },
  ],
  connections: [
    { from: "invoice_inbox", to: "extractor", label: "Document", type: "hdmi" },
    { from: "hr_request", to: "extractor", label: "Request", type: "hdmi" },
    { from: "ops_request", to: "extractor", label: "Ticket", type: "hdmi" },
    { from: "extractor", to: "ops_agent", label: "Structured work", type: "usb" },
    { from: "policy_check", to: "ops_agent", label: "Rules", type: "sdi" },
    { from: "ops_agent", to: "approval", label: "Approval", type: "wireless" },
    { from: "approval", to: "erp", label: "Post update", type: "ethernet" },
    { from: "approval", to: "payroll", label: "Sync", type: "ethernet" },
    { from: "ops_agent", to: "audit", label: "Evidence", type: "audio" },
    { from: "erp", to: "audit", label: "Change log", type: "audio" },
  ],
  subgraphs: [
    { id: "inputs", title: "Operations Inputs", x: 60, y: 80, width: 230, height: 420 },
    { id: "agent", title: "Back Office Agent", x: 310, y: 80, width: 560, height: 420 },
    { id: "systems", title: "Operational Systems", x: 920, y: 80, width: 180, height: 420 },
  ],
}

const emptyTemplate: DiagramTemplate = {
  id: "empty",
  name: "Blank Agent Map",
  description: "Start from scratch",
  nodes: [],
  connections: [],
  subgraphs: [],
}

export const diagramTemplates: DiagramTemplate[] = [
  managedAgentSystem,
  customerSupportAgent,
  salesOperationsAgent,
  knowledgeBaseAgent,
  backOfficeAutomation,
  emptyTemplate,
]

export const getTemplateById = (id: string): DiagramTemplate | undefined => {
  return diagramTemplates.find((t) => t.id === id)
}

export const defaultTemplate = managedAgentSystem

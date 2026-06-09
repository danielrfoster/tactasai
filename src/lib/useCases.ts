import { promptLibrary } from "./promptLibrary";

export interface Pair {
  title: string;
  body: string;
}

export type UseCaseDepartment =
  | "Support"
  | "RevOps"
  | "Operations"
  | "Professional Services"
  | "Finance"
  | "Security"
  | "Ecommerce"
  | "Marketing"
  | "Engineering"
  | "HR"
  | "Customer Success";

export type UseCaseComplexity = "Starter" | "Intermediate" | "Advanced" | "Enterprise";

export interface UseCaseItem {
  slug: string;
  title: string;
  summary: string;
  shortHeadline: string;
  opening: string;
  builtWith: string;
  exampleWorkSignal: string;
  problem: string;
  helpsBuild: string;
  teamBenefits: string[];
  exampleScenario: string;
  usefulThings: Pair[];
  worthBuilding: string[];
  department: UseCaseDepartment;
  industry: string;
  workflowType: string;
  complexity: UseCaseComplexity;
  buyerRole: string;
  primaryOutput: string;
  inputs: string[];
  systems: string[];
  fit: Pair[];
  workflowSteps: Pair[];
  agentBuiltAssets: Pair[];
  outputs: Pair[];
  guardrails: string[];
  metrics: string[];
  implementationNotes: string[];
  relatedPrompts: string[];
  relatedIndustries: string[];
  relatedProductPages: string[];
  relatedUseCases: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  schemaServiceTypes: string[];
  faqs: Pair[];
}

type RawUseCase = Omit<
  UseCaseItem,
  | "shortHeadline"
  | "opening"
  | "builtWith"
  | "exampleWorkSignal"
  | "problem"
  | "helpsBuild"
  | "teamBenefits"
  | "exampleScenario"
  | "usefulThings"
  | "worthBuilding"
  | "fit"
  | "workflowSteps"
  | "agentBuiltAssets"
  | "outputs"
  | "guardrails"
  | "implementationNotes"
  | "relatedUseCases"
  | "metaTitle"
  | "metaDescription"
  | "keywords"
  | "schemaServiceTypes"
  | "faqs"
> & {
  shortHeadline?: string;
  opening?: string;
  builtWith?: string;
  exampleWorkSignal?: string;
  problem?: string;
  helpsBuild?: string;
  teamBenefits?: string[];
  exampleScenario?: string;
  usefulThings?: Pair[];
  worthBuilding?: string[];
  agentBuiltAssets?: Pair[];
  outputs?: Pair[];
  fitSignals: string[];
  riskArea: string;
  relatedUseCases?: string[];
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  schemaServiceTypes?: string[];
};

export const useCaseDepartments: UseCaseDepartment[] = [
  "Support",
  "RevOps",
  "Operations",
  "Professional Services",
  "Finance",
  "Security",
  "Ecommerce",
  "Marketing",
  "Engineering",
  "HR",
  "Customer Success",
];

export const useCaseIndustries = [
  "All Industries",
  "SaaS",
  "Ecommerce",
  "Healthcare",
  "Professional Services",
  "Finance",
  "Security",
  "Technology",
  "Operations",
  "HR",
];

export const useCaseWorkflowTypes = [
  "Answer",
  "Triage",
  "Summarize",
  "Route",
  "Research",
  "Analyze",
  "Review",
  "Prepare",
  "Monitor",
  "Update",
  "Onboard",
];

export const useCaseComplexities: UseCaseComplexity[] = ["Starter", "Intermediate", "Advanced", "Enterprise"];

export const outputTypes = [
  "Resolution package",
  "Diagnostic asset",
  "Customer context workspace",
  "Account action workspace",
  "Operating workflow package",
  "Evidence workspace",
  "Reusable workflow",
  "Decision package",
  "Operating dashboard",
  "Validated dataset",
  "Delivery package",
  "Campaign asset system",
  "Onboarding workspace",
  "Account health workspace",
  "System update proposal",
  "Customer-ready report",
  "Source-backed reply",
  "Decision brief",
  "Escalation packet",
  "CRM update",
  "Status update",
  "Approval packet",
  "Checklist",
  "Research brief",
  "Risk summary",
  "Handoff note",
];

const productRoutes = [
  "/product/ai-workflow-automation",
  "/product/ai-knowledge-base",
  "/product/data-readiness",
  "/product/agent-system-design",
  "/product/deep-research",
  "/product/assistant",
];

const industryRoutes = [
  "/industries/ecommerce",
  "/industries/healthcare",
  "/industries/professional-services",
  "/industries/ai-assistant-for-saas-companies",
  "/industries/ai-assistant-for-law-firms",
  "/industries/ai-assistant-for-real-estate",
  "/industries/ai-assistant-for-vps-hosting-providers",
];

const departmentGuardrails: Record<UseCaseDepartment, string[]> = {
  Support: [
    "Require source context for customer-facing claims, policy language, refunds, security issues, and timeline statements.",
    "Escalate billing, legal, regulated-data, outage, and executive-visibility cases before any customer action.",
  ],
  RevOps: [
    "Separate confirmed buying signals from inferred fit, and keep pricing, discount, ownership, and contract decisions under human review.",
    "Do not overwrite CRM ownership, stage, amount, or forecast fields without explicit routing rules and approval.",
  ],
  Operations: [
    "Keep record updates reviewable until the workflow has stable source coverage, owner rules, and exception handling.",
    "Flag policy exceptions, missing owners, date conflicts, and audit-sensitive status changes.",
  ],
  "Professional Services": [
    "Separate agreed scope from proposed change, and flag pricing, timeline, legal, and client commitment risks.",
    "Keep deliverables, approvals, and handoffs traceable to source documents, emails, or project records.",
  ],
  Finance: [
    "Do not approve spend, release payment, alter accounting records, or make tax/legal conclusions.",
    "Flag vendor, budget, renewal, liability, purchase approval, and contract exceptions for the authorized reviewer.",
  ],
  Security: [
    "Do not approve vendors, declare breach status, revoke access, or make external security commitments automatically.",
    "Preserve audit evidence, source timestamps, system owners, and approval decisions for security review.",
  ],
  Ecommerce: [
    "Do not approve refunds, replacements, warranties, safety claims, or shipping exceptions outside supplied policy.",
    "Escalate fraud risk, chargebacks, high-value exceptions, legal threats, and product-safety signals.",
  ],
  Marketing: [
    "Do not invent customer results, statistics, competitor claims, compliance claims, or product commitments.",
    "Mark unsupported claims for evidence review and preserve approved brand and legal guidance.",
  ],
  Engineering: [
    "Do not close incidents, approve releases, merge code, or mark issues resolved without the responsible human owner.",
    "Separate confirmed facts from hypotheses and call out rollback, migration, security, and customer-impact risks.",
  ],
  HR: [
    "Do not make employment, compensation, promotion, disciplinary, legal, or benefits decisions automatically.",
    "Flag sensitive employee data, policy exceptions, manager approvals, and legal review requirements.",
  ],
  "Customer Success": [
    "Do not promise renewal terms, roadmap delivery, credits, or exceptions without approved account guidance.",
    "Escalate churn risk, executive asks, legal concerns, security concerns, and commercial commitments.",
  ],
};

const workflowVerb: Record<string, string> = {
  Answer: "turn repeated questions into reusable answer systems",
  Triage: "investigate, classify, and package incoming work",
  Summarize: "transform scattered context into a reusable work package",
  Route: "build routing logic and handoff workspaces",
  Research: "collect signals, compare evidence, and create reusable research assets",
  Analyze: "diagnose patterns and generate decision-ready artifacts",
  Review: "validate evidence and assemble a controlled review package",
  Prepare: "build the assets needed to move the work forward",
  Monitor: "create an operating view over open work and exceptions",
  Update: "generate proposed system changes with evidence and review notes",
  Onboard: "assemble reusable onboarding workspaces and first-task plans",
};

const toKeywords = (item: RawUseCase) => [
  item.title.toLowerCase(),
  `${item.department.toLowerCase()} AI agent`,
  `${item.workflowType.toLowerCase()} AI workflow example`,
  "AI agent examples",
  "AI workflow examples",
  "built with TactasAI",
  "agent workflow gallery",
  "business AI agent examples",
  "workflow automation examples",
  "business task automation",
  ...item.systems.slice(0, 4).map((system) => `${system} automation`),
];

const outputByDepartment: Record<UseCaseDepartment, string> = {
  Support: "Resolution package",
  RevOps: "Account action workspace",
  Operations: "Operating workflow package",
  "Professional Services": "Delivery package",
  Finance: "Decision package",
  Security: "Evidence workspace",
  Ecommerce: "Customer-ready report",
  Marketing: "Campaign asset system",
  Engineering: "Diagnostic asset",
  HR: "Onboarding workspace",
  "Customer Success": "Account health workspace",
};

const titleOverrides: Record<string, string> = {
  "sales-lead-qualification-agent": "Inbound Lead Qualification Workspace",
  "ai-customer-support-automation": "Internal Answer Workspace for Repeated Requests",
  "ai-back-office-automation": "Back Office Update Workspace",
  "ai-crm-workflow-automation": "CRM Next-Step Workspace",
  "support-ticket-triage-agent": "Support Queue Prioritization Workspace",
  "support-escalation-packet": "Support Escalation Case Workspace",
  "support-knowledge-gap-detection": "Support Knowledge Gap Finder",
  "support-macro-quality-review": "Support Macro Review Workspace",
  "internal-policy-answer-agent": "Internal Policy Answer Workspace",
  "weekly-operations-update-agent": "Weekly Operations Control Room",
  "document-collection-status-agent": "Document Collection Tracker",
  "approval-queue-monitor": "Approval Queue Workspace",
  "sop-execution-checklist": "SOP Execution Workspace",
  "open-work-follow-up-queue": "Open Work Follow-Up Queue",
  "inbound-demo-routing": "Inbound Demo Routing Workspace",
  "account-research-brief": "Account Research Workspace",
  "crm-hygiene-agent": "CRM Hygiene Control Room",
  "follow-up-draft-agent": "Sales Follow-Up Workspace",
  "renewal-risk-brief": "Renewal Risk Workspace",
  "qbr-preparation-agent": "QBR Planning Workspace",
  "client-intake-brief-agent": "Client Intake Workspace",
  "proposal-readiness-checklist": "Proposal Readiness Workspace",
  "client-delivery-handoff": "Client Delivery Handoff Workspace",
  "scope-change-summary": "Scope Change Review Workspace",
  "invoice-variance-review": "Invoice Exception Review Workspace",
  "vendor-onboarding-packet": "Vendor Onboarding Workspace",
  "purchase-request-brief": "Purchase Request Review Workspace",
  "budget-variance-commentary-agent": "Budget Variance Commentary Workspace",
  "renewal-obligation-monitor": "Renewal Obligation Tracker",
  "vendor-security-evidence-triage": "Vendor Evidence Review Workspace",
  "access-review-summary-agent": "Access Review Workspace",
  "security-incident-communication-checklist": "Security Incident Communication Workspace",
  "compliance-evidence-collection": "Compliance Evidence Tracker",
  "order-exception-triage": "Order Exception Workspace",
  "return-request-review": "Return Exception Review Workspace",
  "product-question-reply-agent": "Product Question Answer Workspace",
  "fulfillment-delay-update-agent": "Fulfillment Delay Workspace",
  "campaign-brief-synthesis": "Campaign Brief Workspace",
  "competitor-research-brief": "Competitor Research Workspace",
  "content-refresh-planning": "Content Refresh Planning Workspace",
  "webinar-repurposing-agent": "Webinar Repurposing Workspace",
  "bug-report-triage-agent": "Bug Report Investigation Workspace",
  "release-readiness-checklist": "Release Readiness Workspace",
  "api-integration-requirements": "API Integration Requirements Workspace",
  "incident-timeline-summary": "Incident Timeline Workspace",
  "candidate-screening-brief": "Candidate Screening Workspace",
  "employee-onboarding-brief": "Employee Onboarding Workspace",
  "employee-question-routing": "Employee Question Routing Workspace",
  "patient-intake-admin-summary": "Patient Intake Admin Workspace",
  "prior-authorization-admin-packet": "Prior Authorization Admin Workspace",
  "contract-deviation-risk-review": "Contract Deviation Review Workspace",
  "spreadsheet-discrepancy-reconciliation": "Spreadsheet Reconciliation Workspace",
  "support-queue-prioritization": "Support Queue Priority Workspace",
  "knowledge-base-article-from-case": "Knowledge Article Builder from Resolved Cases",
};

const summaryOverrides: Record<string, string> = {
  "sales-lead-qualification-agent": "Give RevOps a working view of lead fit, account context, ownership, and the next action before a rep follows up.",
  "ai-customer-support-automation": "Create a reusable answer surface for repeated business questions where context lives across docs, records, and internal tools.",
  "ai-back-office-automation": "Give operations a live workspace for recurring updates, record changes, missing inputs, and owner follow-up.",
  "ai-crm-workflow-automation": "Help teams turn meetings, emails, CRM context, and open tasks into a clear next-step workspace.",
  "support-ticket-triage-agent": "Help support teams see priority, account impact, SLA risk, and the right first owner before a queue gets noisy.",
  "support-escalation-packet": "Create a focused case workspace so engineering, billing, product, or security receives the context they actually need.",
  "support-knowledge-gap-detection": "Show which repeated customer questions should become help articles, macros, internal notes, or product feedback.",
  "support-macro-quality-review": "Give support enablement a workspace for checking macros against current policy, product behavior, and customer tone.",
  "internal-policy-answer-agent": "Create an internal policy workspace that helps employees find the right answer and escalation path without guessing.",
  "weekly-operations-update-agent": "Turn tasks, blockers, messages, and project notes into an operating view leaders can scan every week.",
  "document-collection-status-agent": "Track requested documents, missing files, owner follow-ups, and readiness status in one workspace.",
  "approval-queue-monitor": "Give approvers a clear view of pending requests, policy exceptions, missing evidence, and deadlines.",
  "sop-execution-checklist": "Turn a living SOP into a workspace with owners, evidence needs, exceptions, and completion status.",
  "open-work-follow-up-queue": "Surface stalled work, aging handoffs, missing replies, and owner nudges before tasks disappear.",
  "inbound-demo-routing": "Help RevOps assign demo requests using fit, territory, ownership, product need, and speed-to-lead context.",
  "account-research-brief": "Give sales teams a reusable account workspace with firmographics, CRM history, usage signals, and meeting context.",
  "crm-hygiene-agent": "Show incomplete fields, duplicate records, stale stages, and missing next steps before pipeline quality hurts decisions.",
  "follow-up-draft-agent": "Create a post-meeting workspace with promised items, buyer concerns, CRM updates, and the next customer touch.",
  "renewal-risk-brief": "Give CS teams an account health view before renewal conversations, with open issues, usage shifts, and risk signals.",
  "qbr-preparation-agent": "Create a QBR workspace with outcomes, usage proof points, risks, open asks, and next-step owners.",
  "client-intake-brief-agent": "Give service teams a clean intake workspace with client goals, missing information, risks, and delivery requirements.",
  "proposal-readiness-checklist": "Help teams see whether a proposal has the scope, pricing inputs, assumptions, approvals, and risks it needs.",
  "client-delivery-handoff": "Create a handoff workspace so delivery teams receive scope, context, owners, risks, and next steps clearly.",
  "scope-change-summary": "Give client teams a review surface for scope changes, commercial impact, timeline risk, and approval needs.",
  "invoice-variance-review": "Turn invoice mismatches into a clear exception workspace with vendor context, budget impact, and owner questions.",
  "vendor-onboarding-packet": "Give admin and finance teams a workspace for vendor data, documents, approvals, risk notes, and next steps.",
  "purchase-request-brief": "Create a review workspace for purchase requests with business case, budget context, policy fit, and approval path.",
  "budget-variance-commentary-agent": "Help finance teams explain budget variance using drivers, owner notes, assumptions, and follow-up questions.",
  "renewal-obligation-monitor": "Track vendor renewals, notice windows, owners, usage signals, and negotiation risk before deadlines pass.",
  "vendor-security-evidence-triage": "Give security teams an evidence workspace for missing files, expired reports, vendor claims, and follow-up questions.",
  "access-review-summary-agent": "Create an access review workspace with anomalies, privileged accounts, manager questions, and audit notes.",
  "security-incident-communication-checklist": "Help security teams keep confirmed facts, unknowns, stakeholder updates, and approval needs in one place.",
  "compliance-evidence-collection": "Track audit evidence, control owners, missing files, and review status without chasing every source manually.",
  "order-exception-triage": "Give ecommerce teams a workspace for order issues, policy fit, customer history, fulfillment status, and next action.",
  "return-request-review": "Create a return exception workspace with policy checks, order context, fraud signals, and customer handling notes.",
  "product-question-reply-agent": "Help customer experience teams answer product questions using catalog details, policy context, and prior examples.",
  "fulfillment-delay-update-agent": "Give teams a delay workspace with order state, carrier data, customer impact, and communication guidance.",
  "campaign-brief-synthesis": "Create a campaign planning workspace with customer research, product context, claims, goals, and owner next steps.",
  "competitor-research-brief": "Give product marketing a reusable workspace for competitor signals, source notes, implications, and sales enablement.",
  "content-refresh-planning": "Turn content decay signals, product changes, search data, and conversion goals into a prioritized refresh plan.",
  "webinar-repurposing-agent": "Create a repurposing workspace that turns one webinar into approved clips, posts, emails, and sales snippets.",
  "bug-report-triage-agent": "Give product and engineering teams an investigation workspace for impact, reproduction quality, owners, and release risk.",
  "release-readiness-checklist": "Create a go-live workspace with blockers, rollout notes, rollback needs, owners, and customer impact.",
  "api-integration-requirements": "Turn partner notes and API context into a requirements workspace with risks, open questions, and acceptance criteria.",
  "incident-timeline-summary": "Give incident teams a shared timeline workspace with facts, mitigations, customer impact, and follow-up owners.",
  "candidate-screening-brief": "Create a screening workspace that aligns candidate materials to role criteria and interview focus areas.",
  "employee-onboarding-brief": "Give managers and new hires a role-specific workspace for first tasks, access needs, people, and documents.",
  "employee-question-routing": "Help employees land policy, HR, IT, finance, or legal questions with the right owner and context.",
  "patient-intake-admin-summary": "Create an admin intake workspace with required documents, scheduling context, missing items, and follow-up needs.",
  "prior-authorization-admin-packet": "Give healthcare ops a workspace for payer requirements, document status, submission notes, and admin follow-up.",
  "contract-deviation-risk-review": "Create a contract review workspace that highlights deviations, commercial context, owner questions, and approval needs.",
  "spreadsheet-discrepancy-reconciliation": "Turn messy spreadsheet mismatches into a reconciliation workspace with owners, rules, and proposed fixes.",
  "support-queue-prioritization": "Help support leads rank queues by customer impact, SLA exposure, severity, and specialist needs.",
  "knowledge-base-article-from-case": "Turn resolved cases into reusable knowledge material without losing customer-safe context or approval needs.",
};

const primaryOutputOverrides: Record<string, string> = Object.fromEntries(
  Object.entries(titleOverrides).map(([slug, title]) => [slug, title.replace(/\bfor .+$/i, "").replace(/\bfrom .+$/i, "").trim()]),
);

const normalizePrimaryOutput = (item: RawUseCase) => {
  if (primaryOutputOverrides[item.slug]) return primaryOutputOverrides[item.slug];
  const output = item.primaryOutput.toLowerCase();
  if (["source-backed reply", "status update", "handoff note", "checklist", "crm update", "research brief", "risk summary", "decision brief", "approval packet"].includes(output)) {
    return outputByDepartment[item.department];
  }
  if (output.includes("escalation")) return "Escalation package";
  return item.primaryOutput;
};

const assetByDepartment: Record<UseCaseDepartment, string> = {
  Support: "diagnostic support asset",
  RevOps: "account action workspace",
  Operations: "operating workflow",
  "Professional Services": "client delivery package",
  Finance: "approval and reconciliation asset",
  Security: "evidence workspace",
  Ecommerce: "order resolution asset",
  Marketing: "campaign asset system",
  Engineering: "diagnostic engineering workspace",
  HR: "people operations workspace",
  "Customer Success": "account health workspace",
};

const createAgentBuiltAssets = (item: RawUseCase, primaryOutput: string): Pair[] => [
  {
    title: primaryOutput,
    body: `A structured work package that combines the original signal, known facts, missing information, owner questions, and the next action the team can approve.`,
  },
  {
    title: `Reusable ${assetByDepartment[item.department]}`,
    body: `A task-specific workspace or lightweight workflow the team can reuse when similar ${item.department.toLowerCase()} work appears again.`,
  },
  {
    title: "Evidence and scoring table",
    body: `A compact table that compares source inputs, confidence, exceptions, and open risks instead of hiding decisions inside a generic AI response.`,
  },
  {
    title: "System update proposal",
    body: `Suggested changes for ${item.systems.slice(0, 3).join(", ")} with fields, owners, and review notes separated before anything is written back.`,
  },
  {
    title: "Reusable improvement note",
    body: `A short artifact showing what source, SOP, policy, template, or internal workflow should be improved after the work is resolved.`,
  },
];

const createOutputs = (item: RawUseCase, primaryOutput: string): Pair[] => [
  {
    title: primaryOutput,
    body: `A completed work package with context, evidence, decisions needed, recommended action, and reusable material for the next similar request.`,
  },
  {
    title: "Working surface",
    body: "A workspace, comparison table, internal view, or reusable note that helps the team complete the task more reliably.",
  },
  {
    title: "Reusable workflow",
    body: "A repeatable pattern the team can run again with clearer inputs, owner rules, review points, and exception handling.",
  },
  {
    title: "System update proposal",
    body: `Reviewable updates for ${item.systems.slice(0, 3).join(", ")} so records, tasks, or customer-facing systems can be aligned after approval.`,
  },
];

const departmentSystemLabel: Record<UseCaseDepartment, string> = {
  Support: "customer context workspace",
  RevOps: "account action system",
  Operations: "operating workspace",
  "Professional Services": "client delivery workspace",
  Finance: "exception review workspace",
  Security: "evidence case builder",
  Ecommerce: "customer issue workspace",
  Marketing: "campaign planning surface",
  Engineering: "issue investigation workspace",
  HR: "people operations workspace",
  "Customer Success": "account health workspace",
};

const departmentProblem: Record<UseCaseDepartment, string> = {
  Support:
    "Support teams often need details that do not live cleanly inside one ticket: account history, relationship context, recurring issues, past complaints, product usage, and the internal notes that experienced agents remember but new agents cannot see.",
  RevOps:
    "Revenue teams lose time when account history, qualification rules, ownership notes, meeting context, and follow-up decisions are split across CRM fields, inboxes, enrichment tools, and rep memory.",
  Operations:
    "Operations work slows down when requests, owners, documents, approvals, and exceptions live across too many tools. The team knows the process, but the working view is rarely in one place.",
  "Professional Services":
    "Client delivery teams need to understand scope, commitments, open questions, documents, approvals, and handoff status without rebuilding the story from emails, decks, project tools, and notes.",
  Finance:
    "Finance and admin teams often review messy requests with incomplete vendor details, budget context, policy rules, contract notes, and approval history spread across exports and messages.",
  Security:
    "Security teams need clean evidence, ownership, risk context, and decision history, but reviews often begin with scattered questionnaires, access lists, vendor files, tickets, and Slack threads.",
  Ecommerce:
    "Ecommerce teams handle customer issues where order data, policy, fulfillment status, payment history, product details, and prior messages sit in different systems and create avoidable mistakes.",
  Marketing:
    "Marketing work depends on research, claims, product context, approvals, campaign goals, and channel plans that often live in different docs and tools, making reuse and prioritization harder than it should be.",
  Engineering:
    "Engineering and product operations teams need to make sense of reports, logs, customer impact, ownership, release context, and follow-up work without relying on scattered messages and manual reconstruction.",
  HR:
    "People operations teams handle questions and onboarding work where policy, role context, manager notes, access tasks, and sensitive employee details need to be available without creating confusion.",
  "Customer Success":
    "Customer success teams need account health, renewal risk, relationship history, support issues, product usage, and promised next steps in one working view before they act.",
};

const createTeamBenefits = (item: RawUseCase, primaryOutput: string) => [
  `The team can see the information that matters before acting, instead of searching through ${item.systems.slice(0, 3).join(", ")} every time.`,
  `Extra context, owner notes, risk signals, and next-step guidance live in a working view that matches how the team actually handles the task.`,
  `${primaryOutput} becomes more consistent because the system can suggest the right fields, notes, owner questions, and follow-up actions for the situation.`,
  `New team members can handle repeated cases with more of the judgment normally carried by experienced operators.`,
];

const createUsefulThings = (item: RawUseCase, primaryOutput: string): Pair[] => [
  {
    title: departmentSystemLabel[item.department].replace(/^\w/, (letter) => letter.toUpperCase()),
    body: `A focused working surface for ${item.department.toLowerCase()} teams that brings the relevant customer, account, request, or case context into one place.`,
  },
  {
    title: "Extra context profile",
    body: `A place to keep useful details that do not fit neatly in the main system, such as priorities, recurring concerns, handling notes, risk level, and open questions.`,
  },
  {
    title: "Recommended action view",
    body: `A short view showing what should happen next, which system fields may need attention, who should own the work, and what information is still missing.`,
  },
  {
    title: primaryOutput,
    body: `The practical output the team can use to complete the work more accurately, whether that means a customer note, account plan, exception view, decision surface, or handoff.`,
  },
  {
    title: "Reusable playbook entry",
    body: "A reusable note or pattern the team can apply when the same type of situation appears again.",
  },
];

const createWorthBuilding = (item: RawUseCase) => [
  `${item.department} teams keep rediscovering the same context across tools.`,
  `The main system does not capture the relationship, risk, or handling details that determine the right action.`,
  `Experienced team members carry too much of the process in memory.`,
  `Small mistakes in ${item.systems.slice(0, 2).join(" or ")} create rework, slow handoffs, or inconsistent customer experiences.`,
];

const createUseCase = (item: RawUseCase): UseCaseItem => {
  const workflowAction = workflowVerb[item.workflowType] ?? "prepare work";
  const primaryOutput = normalizePrimaryOutput(item);
  const title = titleOverrides[item.slug] ?? item.title;
  const summary = summaryOverrides[item.slug] ?? item.summary;
  const fit = item.fitSignals.map((signal) => ({
    title: signal,
    body: `This matters when ${signal.toLowerCase()} and the team needs the surrounding context, system action, and next step to be easier to trust.`,
  }));
  const workingSystem = departmentSystemLabel[item.department];

  return {
    ...item,
    title,
    summary,
    primaryOutput,
    shortHeadline: item.shortHeadline ?? summary,
    opening:
      item.opening ??
      `TactasAI can help create the working surface around this task: the extra context, system guidance, reusable notes, and practical output the team needs to do the work correctly.`,
    builtWith:
      item.builtWith ??
      `TactasAI can combine ${item.inputs.slice(0, 4).join(", ")} with activity from ${item.systems.slice(0, 4).join(", ")} so the team gets a practical working view around the task.`,
    exampleWorkSignal:
      item.exampleWorkSignal ??
      `A ${item.buyerRole.toLowerCase()} sees a repeated ${item.workflowType.toLowerCase()} request where ${item.fitSignals[0].toLowerCase()} and the current process requires manual context gathering across ${item.systems.slice(0, 3).join(", ")}.`,
    problem: item.problem ?? departmentProblem[item.department],
    helpsBuild:
      item.helpsBuild ??
      `TactasAI can help create the ${workingSystem} that keeps important details, current status, recommended action, and reusable handling notes available beside the systems where the team already works.`,
    teamBenefits: item.teamBenefits ?? createTeamBenefits(item, primaryOutput),
    exampleScenario:
      item.exampleScenario ??
      `The team is handling ${title.toLowerCase()}. TactasAI checks the relevant context in ${item.systems.slice(0, 4).join(", ")}, creates a focused working view, highlights what matters, and suggests the practical next action. The team does not have to reconstruct the situation from scratch before doing the work.`,
    usefulThings: item.usefulThings ?? createUsefulThings(item, primaryOutput),
    worthBuilding: item.worthBuilding ?? createWorthBuilding(item),
    fit,
    workflowSteps: [
      {
        title: "Capture the work signal",
        body: `A ticket, message, record change, upload, scheduled review, or tool event starts the ${item.title.toLowerCase()} workflow.`,
      },
      {
        title: "Build the working context",
        body: `The agent gathers ${item.inputs.slice(0, 4).join(", ")} and recent activity from ${item.systems.slice(0, 4).join(", ")} so the work starts from known facts.`,
      },
      {
        title: "Build task-specific assets",
        body: `The agent can ${workflowAction}, generate comparison tables, assemble diagnostic notes, and create the internal artifact needed for this case.`,
      },
      {
        title: `Assemble the ${primaryOutput.toLowerCase()}`,
        body: `The work is packaged with facts, assumptions, missing inputs, owner questions, and proposed next actions.`,
      },
      {
        title: "Apply review and action rules",
        body: `The package is checked against permissions, confidence, exception rules, and ${item.riskArea.toLowerCase()} before any external action.`,
      },
      {
        title: "Reuse the artifact",
        body: "The team can keep the asset, workflow, or improvement note so similar work starts with a better operating pattern next time.",
      },
    ],
    agentBuiltAssets: item.agentBuiltAssets ?? createAgentBuiltAssets(item, primaryOutput),
    outputs: item.outputs ?? createOutputs(item, primaryOutput),
    guardrails: departmentGuardrails[item.department],
    implementationNotes: [
      `Start by mapping the ${item.inputs.slice(0, 3).join(", ")} sources that determine what the agent should build.`,
      `Define read/write permissions for ${item.systems.slice(0, 4).join(", ")} before enabling any automated record change.`,
      `Document the reviewer, approval threshold, exception cases, and fallback response for ${item.riskArea.toLowerCase()}.`,
      "Track whether the agent-built asset is reused, edited, or rejected before expanding scope.",
    ],
    relatedUseCases: item.relatedUseCases ?? [],
    metaTitle: `${title} | Tactas AI`,
    metaDescription:
      summary.length > 150 ? `${summary.slice(0, 147)}...` : summary,
    keywords: item.keywords ?? toKeywords(item),
    schemaServiceTypes: item.schemaServiceTypes ?? [
      title,
      `${item.department} AI agent`,
      `${item.workflowType} AI workflow example`,
      "AI agent examples",
      "Workflow automation examples",
      "Business AI agent use cases",
    ],
    faqs: [
      {
        title: `What problem does ${title.toLowerCase()} solve?`,
        body: item.problem ?? departmentProblem[item.department],
      },
      {
        title: "What can the team create with this workflow?",
        body: `The team can create the ${primaryOutput.toLowerCase()} plus related views, notes, recommendations, and reusable handling patterns that make the next case easier.`,
      },
      {
        title: "When is this worth building?",
        body: `It is worth building when ${item.fitSignals.slice(0, 2).join(", ").toLowerCase()}, and the team needs a more reliable way to see context and take the right action.`,
      },
    ],
  };
};

const rawUseCases: RawUseCase[] = [
  {
    slug: "customer-support-ai-agent",
    title: "Customer Context Workspace for Support Teams",
    summary: "Help support teams understand the customer before they reply, update CRM, or escalate a case.",
    shortHeadline: "Help support teams handle every customer like they already understand the account.",
    opening:
      "TactasAI can create a customer context layer around each support ticket: the details that matter, the history behind the relationship, the right CRM action, and the next step a skilled support operator would look for before replying.",
    builtWith:
      "The workflow gives support teams a small working surface beside the ticket, so important customer knowledge does not stay trapped in memory, scattered notes, or fields the helpdesk was never designed to hold.",
    exampleWorkSignal:
      "A customer opens a ticket about a billing-related product issue. The ticket text alone is not enough: the team needs to know the customer's plan, recurring concerns, past complaints, technical environment, risk level, preferred handling style, and what CRM action should happen next.",
    problem:
      "Support teams often know important customer details that do not live cleanly in one place. The CRM may show the plan and owner, but not the customer's recurring concerns, preferred communication style, previous frustrations, unresolved edge cases, or the internal history behind a ticket. This makes every new ticket slower and riskier than it should be.",
    helpsBuild:
      "TactasAI can help create a lightweight customer context workspace beside the ticket. The workspace can collect CRM data, previous tickets, internal notes, product usage signals, support history, risk level, and extra relationship context that the team normally keeps in memory or scattered notes.",
    teamBenefits: [
      "Support staff can see what the customer cares about before replying.",
      "New agents can handle complex customers without depending on tribal account knowledge.",
      "CRM updates become more consistent because the workspace can suggest the exact fields, notes, and next action to record.",
      "Escalations include the right context the first time, with less back-and-forth between support, product, billing, or engineering.",
      "Managers can see which customers repeatedly require manual attention, special handling, or follow-up.",
    ],
    exampleScenario:
      "A customer opens a ticket about a billing-related product issue. TactasAI checks the customer's account, previous tickets, known concerns, internal notes, plan level, usage history, and unresolved issues. It creates a case view that shows what matters: customer priority, likely issue, previous handling pattern, recommended CRM update, suggested next action, and whether the case should be escalated. The team does not just get a reply draft. They get the context needed to handle the customer correctly.",
    usefulThings: [
      {
        title: "Customer context profile",
        body: "A lightweight profile beside the ticket with customer basics, plan, relationship notes, recurring concerns, preferred handling style, and internal support context.",
      },
      {
        title: "Relationship risk score",
        body: "A practical signal for support managers showing whether the case involves a sensitive account, repeat frustration, executive visibility, or commercial risk.",
      },
      {
        title: "Recurring issue tracker",
        body: "A small view of repeated problems, unresolved edge cases, and account-specific patterns so the team does not rediscover the same history every time.",
      },
      {
        title: "CRM action recommendation",
        body: "Suggested CRM updates, internal notes, owner changes, follow-up tasks, or account flags written in the format the team should use.",
      },
      {
        title: "Case handling workspace",
        body: "A focused case view that brings ticket details, customer context, support history, recommended next action, and escalation guidance into one place.",
      },
      {
        title: "Support manager view",
        body: "A view that helps managers spot customers with repeated issues, high-touch handling needs, incomplete CRM context, or recurring operational risk.",
      },
    ],
    worthBuilding: [
      "Support teams keep rediscovering the same customer context across CRM, helpdesk, Slack, and internal notes.",
      "CRM data is not enough to explain how a customer should be handled.",
      "Experienced agents carry too much account knowledge in their heads.",
      "New support staff need to handle important customers without sounding like they are starting from zero.",
      "Escalations fail because product, billing, or engineering receives the ticket without the relationship context behind it.",
    ],
    department: "Support",
    industry: "SaaS",
    workflowType: "Triage",
    complexity: "Intermediate",
    buyerRole: "Head of Support",
    primaryOutput: "Customer context workspace",
    inputs: ["support ticket", "customer profile", "product documentation", "internal notes", "logs and error reports", "billing or subscription status", "past similar cases"],
    systems: ["Zendesk", "Intercom", "HubSpot", "Slack", "Help center", "Internal APIs", "Log exports", "Statuspage"],
    fitSignals: ["customer context keeps getting rediscovered", "CRM data does not explain how to handle the account", "new agents need experienced-account context", "support managers need a better view of recurring account risk"],
    riskArea: "customer commitments, billing, refunds, security, downtime, and policy exceptions",
    metrics: ["fewer repeated context searches", "faster handling for known customers", "higher CRM update completeness", "lower escalation back-and-forth", "fewer cases handled without account context", "faster onboarding for new support staff"],
    agentBuiltAssets: [
      {
        title: "Customer context profile",
        body: "A lightweight profile beside the ticket with customer basics, plan, recurring concerns, risk level, preferred handling style, and internal notes.",
      },
      {
        title: "CRM action recommendation",
        body: "Suggested CRM updates, internal notes, follow-up tasks, owner changes, and account flags written in the format the support team expects.",
      },
      {
        title: "Recurring issue tracker",
        body: "A small working view of repeated issues, unresolved complaints, product areas involved, and account-specific handling notes.",
      },
      {
        title: "Case handling workspace",
        body: "A focused workspace showing the issue, customer history, risk signals, recommended next action, and escalation guidance.",
      },
      {
        title: "Support manager view",
        body: "A view for spotting accounts that repeatedly need manual attention, special handling, or better CRM hygiene.",
      },
    ],
    outputs: [
      {
        title: "Customer context workspace",
        body: "The account details, support history, current issue, risk signals, and recommended action visible beside the ticket.",
      },
      {
        title: "CRM action recommendation",
        body: "The specific CRM note, field update, follow-up task, or account flag the support team should apply after handling the case.",
      },
      {
        title: "Escalation handoff",
        body: "A focused handoff for product, billing, engineering, or customer success with the customer context that changes how the issue should be handled.",
      },
      {
        title: "Reusable handling note",
        body: "A reusable account or issue note that helps the next support agent avoid starting from scratch.",
      },
    ],
    relatedPrompts: ["summarize-a-customer-support-ticket", "draft-a-source-backed-support-reply", "route-a-support-issue-to-the-right-team"],
    relatedIndustries: ["/industries/ai-assistant-for-saas-companies"],
    relatedProductPages: ["/product/ai-knowledge-base", "/product/ai-workflow-automation"],
    relatedUseCases: ["support-escalation-packet", "support-knowledge-gap-detection", "support-ticket-triage-agent"],
    metaTitle: "Customer Context Workspace for Support Teams | Tactas AI",
    metaDescription: "See how TactasAI helps support teams create a customer context workspace beside each ticket with CRM actions, risk signals, recurring issues, and next-step guidance.",
    keywords: ["customer support AI agent example", "AI agents for support", "customer context workspace", "AI workflow examples", "built with TactasAI", "CRM action assistant for support teams"],
  },
  {
    slug: "sales-lead-qualification-agent",
    title: "Sales Lead Qualification Agent",
    summary: "Score inbound leads, enrich account context, route opportunities, and prepare reviewed follow-up for revenue teams.",
    department: "RevOps",
    industry: "SaaS",
    workflowType: "Route",
    complexity: "Intermediate",
    buyerRole: "VP Revenue Operations",
    primaryOutput: "CRM update",
    inputs: ["form submission", "CRM record", "ICP rules", "account history", "enrichment data"],
    systems: ["HubSpot", "Salesforce", "Apollo", "Clearbit", "Slack"],
    fitSignals: ["inbound leads need fast review", "routing depends on multiple systems", "CRM context is often incomplete", "follow-up should be reviewed"],
    riskArea: "pricing, account ownership, qualification assumptions, and commercial commitments",
    metrics: ["speed to lead", "routing accuracy", "qualified meeting rate", "CRM completeness"],
    relatedPrompts: ["qualify-an-inbound-lead", "prepare-a-crm-follow-up-plan"],
    relatedIndustries: ["/industries/ai-assistant-for-saas-companies"],
    relatedProductPages: ["/product/ai-workflow-automation", "/product/data-readiness"],
    relatedUseCases: ["inbound-demo-routing", "crm-hygiene-agent", "account-research-brief"],
    metaTitle: "Sales Lead Qualification Agent | Tactas AI",
    metaDescription: "A managed sales lead qualification agent that scores inbound leads, enriches account context, routes opportunities, and prepares follow-up with human review.",
    keywords: ["sales lead qualification agent", "AI lead qualification agent", "inbound lead qualification AI", "AI lead routing", "CRM workflow automation"],
  },
  {
    slug: "ai-customer-support-automation",
    title: "Answer with Context",
    summary: "Answer repeated business requests with company knowledge, source context, business data, and connected tools.",
    department: "Support",
    industry: "All Industries",
    workflowType: "Answer",
    complexity: "Starter",
    buyerRole: "Operations Lead",
    primaryOutput: "Source-backed reply",
    inputs: ["question", "company docs", "account data", "policy references", "prior examples"],
    systems: ["Slack", "Email", "Notion", "Google Drive", "Internal APIs"],
    fitSignals: ["questions repeat across teams", "context lives across sources", "answers need source confidence", "speed and consistency matter"],
    riskArea: "unsupported claims, missing context, customer commitments, and policy exceptions",
    metrics: ["answer turnaround time", "source coverage", "review acceptance rate", "repeat-question volume"],
    relatedPrompts: ["draft-a-source-backed-support-reply", "summarize-a-customer-support-ticket"],
    relatedIndustries: ["/industries/professional-services"],
    relatedProductPages: ["/product/ai-knowledge-base", "/product/assistant"],
    relatedUseCases: ["internal-policy-answer-agent", "support-knowledge-gap-detection", "product-question-reply-agent"],
    metaTitle: "Answer with Context Using Managed AI Agents | Tactas AI",
    metaDescription: "Managed AI agents answer repeated business requests with company knowledge, source context, business data, and connected tools.",
  },
  {
    slug: "ai-back-office-automation",
    title: "Automate Repeated Business Updates",
    summary: "Turn recurring status updates, document summaries, record changes, and routine coordination into action-ready work.",
    department: "Operations",
    industry: "Operations",
    workflowType: "Update",
    complexity: "Intermediate",
    buyerRole: "COO",
    primaryOutput: "Status update",
    inputs: ["task records", "documents", "messages", "spreadsheets", "approval history"],
    systems: ["Airtable", "Notion", "Google Drive", "Slack", "PostgreSQL"],
    fitSignals: ["updates repeat every day", "inputs come from many places", "records drift out of sync", "outputs should be ready to use"],
    riskArea: "record accuracy, ownership, approval status, and audit-sensitive changes",
    metrics: ["manual update time", "record freshness", "missed follow-ups", "review acceptance rate"],
    relatedPrompts: ["create-a-weekly-operations-update", "summarize-document-collection-status"],
    relatedIndustries: ["/industries/professional-services"],
    relatedProductPages: ["/product/ai-workflow-automation", "/product/data-readiness"],
    relatedUseCases: ["weekly-operations-update-agent", "document-collection-status-agent", "approval-queue-monitor"],
    metaTitle: "Automate Repeated Business Updates with Managed AI Agents | Tactas AI",
    metaDescription: "Managed AI agents turn repeated business updates, document summaries, record changes, and routine coordination into action-ready work.",
  },
  {
    slug: "ai-crm-workflow-automation",
    title: "Prepare Next Steps",
    summary: "Summarize business context, prepare follow-up drafts, recommend owners, and keep open work moving across tools.",
    department: "RevOps",
    industry: "All Industries",
    workflowType: "Prepare",
    complexity: "Starter",
    buyerRole: "Operations Lead",
    primaryOutput: "Handoff note",
    inputs: ["meeting notes", "CRM records", "emails", "task history", "SOPs"],
    systems: ["HubSpot", "Salesforce", "Gmail", "Outlook", "Project tools"],
    fitSignals: ["work stalls after context gathering", "follow-up is inconsistent", "context changes quickly", "outputs should be ready to use"],
    riskArea: "wrong owner, missing context, external promises, and commercial assumptions",
    metrics: ["follow-up speed", "handoff completeness", "open task aging", "review acceptance rate"],
    relatedPrompts: ["prepare-a-crm-follow-up-plan", "turn-a-meeting-into-action-items"],
    relatedIndustries: ["/industries/ai-assistant-for-saas-companies"],
    relatedProductPages: ["/product/ai-workflow-automation", "/product/assistant"],
    relatedUseCases: ["crm-hygiene-agent", "follow-up-draft-agent", "open-work-follow-up-queue"],
    metaTitle: "Prepare Next Steps with Managed AI Agents | Tactas AI",
    metaDescription: "Managed AI agents summarize business context, prepare follow-up drafts, recommend owners, and keep open work moving across connected tools.",
  },
];

const additionalUseCases: RawUseCase[] = [
  ["support-ticket-triage-agent", "Support Ticket Triage Agent", "Classify inbound tickets, identify severity, attach source context, and recommend the first owner.", "Support", "SaaS", "Triage", "Starter", "Support Operations Manager", "Escalation packet", ["ticket text", "customer plan", "SLA rules", "product area map", "recent incidents"], ["Zendesk", "Intercom", "Statuspage", "Slack", "Jira"], ["ticket queues are noisy", "severity rules are applied inconsistently", "specialist handoffs need context", "SLA risk must be visible"], "severity classification, SLA exposure, regulated data, and customer impact", ["first touch accuracy", "SLA breach risk", "routing accuracy", "reopen rate"], ["summarize-a-customer-support-ticket", "route-a-support-issue-to-the-right-team"]],
  ["support-escalation-packet", "Support Escalation Packet", "Prepare internal escalation summaries with issue impact, customer context, evidence, and missing diagnostics.", "Support", "SaaS", "Prepare", "Intermediate", "Head of Support", "Escalation packet", ["ticket thread", "logs", "account details", "prior escalations", "product docs"], ["Zendesk", "Jira", "Datadog", "Slack", "HubSpot"], ["escalations lose context", "engineering needs cleaner evidence", "customer impact must be summarized", "diagnostics are often incomplete"], "technical uncertainty, customer impact, incident overlap, and sensitive account details", ["escalation completeness", "time to owner", "engineering clarification rate", "customer update speed"], ["route-a-support-issue-to-the-right-team", "summarize-a-customer-support-ticket"]],
  ["support-knowledge-gap-detection", "Support Knowledge Gap Detection", "Find repeated questions, stale macros, missing help docs, and policy gaps from support work.", "Support", "SaaS", "Research", "Advanced", "Support Enablement Lead", "Research brief", ["ticket archive", "macros", "help center articles", "CSAT notes", "product updates"], ["Zendesk", "Intercom", "Help center", "Notion", "Productboard"], ["tickets repeat without good articles", "macros drift from policy", "agents ask the same questions", "product updates change support answers"], "unsupported help content, stale policy, and incorrect customer guidance", ["repeat ticket volume", "macro reuse quality", "article gap count", "deflection opportunity"], ["draft-a-source-backed-support-reply", "summarize-a-customer-support-ticket"]],
  ["support-macro-quality-review", "Support Macro Quality Review", "Review macros against source policy, product changes, customer tone, and escalation rules.", "Support", "SaaS", "Review", "Intermediate", "Support Enablement Lead", "Risk summary", ["macro library", "policy docs", "product changelog", "resolved tickets", "brand voice"], ["Zendesk", "Intercom", "Notion", "Confluence", "Google Drive"], ["macros are used frequently", "policy changes create risk", "tone should stay consistent", "unsupported promises need removal"], "incorrect promises, outdated product claims, refund language, and compliance-sensitive wording", ["macro approval rate", "policy mismatch count", "reply edit rate", "support consistency"], ["draft-a-source-backed-support-reply"]],
  ["internal-policy-answer-agent", "Internal Policy Answer Agent", "Answer employee policy questions with cited source sections and clear escalation boundaries.", "Operations", "All Industries", "Answer", "Starter", "Operations Lead", "Source-backed reply", ["employee question", "policy docs", "HR handbook", "approval rules", "location context"], ["Slack", "Notion", "Google Drive", "Confluence", "HRIS"], ["employees ask repeated policy questions", "answers need source citations", "policies vary by context", "exceptions need escalation"], "employment advice, benefits interpretation, legal obligations, and policy exceptions", ["answer speed", "source coverage", "escalation accuracy", "policy gap count"], ["find-the-right-internal-policy"]],
  ["weekly-operations-update-agent", "Weekly Operations Update Agent", "Create executive-readable weekly updates from tasks, tickets, documents, and team messages.", "Operations", "Operations", "Summarize", "Starter", "COO", "Status update", ["task board", "ticket data", "project notes", "team messages", "risk register"], ["Asana", "Linear", "Slack", "Notion", "Airtable"], ["updates take manual effort", "leaders need consistent summaries", "blockers hide in tools", "decisions need owners"], "incorrect status, missing blockers, implied commitments, and stale records", ["update prep time", "blocker visibility", "decision turnaround", "status accuracy"], ["create-a-weekly-operations-update"]],
  ["document-collection-status-agent", "Document Collection Status Agent", "Track requested files, missing items, blockers, and follow-up messages for document-heavy workflows.", "Operations", "Professional Services", "Monitor", "Starter", "Operations Lead", "Status update", ["request checklist", "uploaded documents", "email thread", "review notes", "due dates"], ["Google Drive", "SharePoint", "Gmail", "Notion", "Airtable"], ["documents arrive across channels", "missing files delay work", "follow-up should be polite", "review status needs visibility"], "confidential documents, incomplete files, outdated versions, and deadline risk", ["missing item count", "follow-up speed", "collection cycle time", "review readiness"], ["summarize-document-collection-status"]],
  ["approval-queue-monitor", "Approval Queue Monitor", "Monitor approval queues, summarize blockers, and prepare decision packets for authorized reviewers.", "Operations", "Operations", "Monitor", "Intermediate", "Operations Lead", "Approval packet", ["approval requests", "policy rules", "budget owner notes", "vendor details", "deadline data"], ["Airtable", "Notion", "Slack", "DocuSign", "Google Sheets"], ["approvals stall between systems", "reviewers need consistent context", "exceptions must be flagged", "deadlines affect business work"], "unauthorized approval, missing evidence, spend exceptions, and policy conflicts", ["approval aging", "packet completeness", "exception rate", "review turnaround"], ["summarize-a-purchase-approval-request"]],
  ["sop-execution-checklist", "SOP Execution Checklist", "Turn SOPs and live task context into execution checklists with owners, evidence, and exceptions.", "Operations", "Operations", "Prepare", "Intermediate", "Operations Manager", "Checklist", ["SOP", "task request", "owner map", "evidence requirements", "exception history"], ["Notion", "Confluence", "Asana", "Slack", "Google Drive"], ["SOPs are long or inconsistently followed", "evidence matters", "owners change by condition", "exceptions need tracking"], "missed steps, wrong owners, outdated SOPs, and audit gaps", ["checklist completion", "exception frequency", "evidence completeness", "cycle time"], ["create-a-weekly-operations-update"]],
  ["open-work-follow-up-queue", "Open Work Follow-up Queue", "Find stalled tasks, unanswered requests, and aging handoffs before work disappears between tools.", "Operations", "All Industries", "Monitor", "Intermediate", "Operations Lead", "Handoff note", ["task board", "email inbox", "Slack messages", "calendar events", "CRM tasks"], ["Asana", "Slack", "Gmail", "HubSpot", "Calendar"], ["open work spans tools", "owners miss follow-ups", "aging work needs prioritization", "teams need concise nudges"], "wrong prioritization, sensitive follow-ups, stale ownership, and over-automation", ["stale task count", "follow-up completion", "handoff aging", "owner response rate"], ["turn-a-meeting-into-action-items"]],
  ["inbound-demo-routing", "Inbound Demo Routing", "Route demo requests by ICP, territory, product need, urgency, and account ownership.", "RevOps", "SaaS", "Route", "Starter", "Revenue Operations Manager", "CRM update", ["demo form", "account data", "territory rules", "ICP criteria", "calendar availability"], ["HubSpot", "Salesforce", "Calendly", "Clearbit", "Slack"], ["demo volume is growing", "ownership rules are complex", "speed matters", "bad routing hurts conversion"], "ownership conflicts, qualification assumptions, calendar promises, and commercial exceptions", ["speed to lead", "routing accuracy", "meeting booked rate", "duplicate record rate"], ["qualify-an-inbound-lead"]],
  ["account-research-brief", "Account Research Brief", "Prepare account briefs from CRM history, firmographics, product signals, and public context.", "RevOps", "SaaS", "Research", "Intermediate", "Sales Operations Lead", "Research brief", ["CRM record", "call notes", "company website", "usage data", "support history"], ["Salesforce", "HubSpot", "Apollo", "Product analytics", "Google Search"], ["reps spend time researching", "account context spans systems", "meetings need better prep", "signals need ranking"], "unverified public claims, stale CRM data, privacy-sensitive data, and inferred buying intent", ["research time saved", "brief usage", "meeting prep quality", "next-step conversion"], ["prepare-a-crm-follow-up-plan"]],
  ["crm-hygiene-agent", "CRM Hygiene Agent", "Detect incomplete fields, duplicate records, stale stages, and missing next steps for pipeline quality.", "RevOps", "SaaS", "Review", "Advanced", "VP Revenue Operations", "Risk summary", ["CRM records", "pipeline rules", "activity history", "ownership map", "stage definitions"], ["Salesforce", "HubSpot", "Pipedrive", "Slack", "Google Sheets"], ["CRM quality affects forecasts", "fields are incomplete", "duplicates create confusion", "stage rules need enforcement"], "unauthorized CRM changes, forecast impact, ownership disputes, and stale assumptions", ["field completeness", "duplicate reduction", "stage accuracy", "forecast hygiene"], ["prepare-a-crm-follow-up-plan"]],
  ["follow-up-draft-agent", "Follow-up Draft Agent", "Draft sales or customer follow-ups from meeting notes, open questions, promised items, and CRM context.", "RevOps", "SaaS", "Prepare", "Starter", "Sales Manager", "Source-backed reply", ["meeting transcript", "CRM record", "email thread", "pricing notes", "product docs"], ["Gong", "HubSpot", "Salesforce", "Gmail", "Google Drive"], ["follow-up quality varies", "promised items get missed", "context is scattered", "messages need review"], "pricing statements, roadmap promises, unsupported claims, and stakeholder sensitivity", ["follow-up speed", "edit rate", "task completion", "opportunity progression"], ["prepare-a-crm-follow-up-plan"]],
  ["renewal-risk-brief", "Renewal Risk Brief", "Summarize account health, open issues, usage signals, and renewal risks before account reviews.", "Customer Success", "SaaS", "Summarize", "Intermediate", "Head of Customer Success", "Decision brief", ["account plan", "usage data", "support tickets", "QBR notes", "contract terms"], ["Gainsight", "HubSpot", "Salesforce", "Zendesk", "Product analytics"], ["renewals need earlier risk visibility", "account context spans teams", "usage changes matter", "open issues affect decisions"], "commercial terms, roadmap commitments, churn assumptions, and sensitive customer issues", ["risk detection speed", "save plan completeness", "renewal forecast quality", "open issue aging"], ["prepare-a-crm-follow-up-plan"]],
  ["qbr-preparation-agent", "QBR Preparation Agent", "Prepare QBR packets with outcomes, product usage, risks, open asks, and source-backed recommendations.", "Customer Success", "SaaS", "Prepare", "Intermediate", "Customer Success Lead", "Decision brief", ["usage reports", "account notes", "support history", "success plan", "meeting notes"], ["Gainsight", "Looker", "HubSpot", "Google Slides", "Zendesk"], ["QBR prep is manual", "customer proof points need sources", "risks must be visible", "next asks need owners"], "unsupported ROI claims, roadmap commitments, executive sensitivity, and renewal terms", ["QBR prep time", "source coverage", "action item completion", "stakeholder satisfaction"], ["prepare-a-crm-follow-up-plan"]],
  ["client-intake-brief-agent", "Client Intake Brief Agent", "Turn inquiries, forms, emails, and documents into structured service intake briefs.", "Professional Services", "Professional Services", "Summarize", "Starter", "Practice Operations Lead", "Decision brief", ["inquiry", "intake form", "uploaded files", "email thread", "service criteria"], ["Gmail", "Typeform", "Google Drive", "Notion", "Clio"], ["intake details arrive scattered", "teams need consistent briefs", "scope risk appears early", "missing information delays response"], "legal, financial, medical, contractual, or scope-sensitive judgment", ["intake prep time", "missing question rate", "qualification accuracy", "handoff completeness"], ["create-a-client-intake-brief"]],
  ["proposal-readiness-checklist", "Proposal Readiness Checklist", "Identify scope, dependencies, pricing inputs, risks, and missing information before proposal work begins.", "Professional Services", "Professional Services", "Prepare", "Intermediate", "Services Operations Lead", "Checklist", ["client brief", "SOW template", "delivery notes", "pricing inputs", "approval rules"], ["Notion", "Google Drive", "HubSpot", "DocuSign", "Slack"], ["proposals start with gaps", "scope needs boundaries", "pricing inputs need review", "approvals must happen before sending"], "scope commitments, pricing, legal terms, timelines, and dependency assumptions", ["proposal cycle time", "missing input count", "approval turnaround", "revision rate"], ["draft-a-proposal-preparation-checklist"]],
  ["client-delivery-handoff", "Client Delivery Handoff", "Prepare delivery teams with agreed scope, stakeholders, timelines, risks, and source context.", "Professional Services", "Professional Services", "Prepare", "Intermediate", "Delivery Operations Lead", "Handoff note", ["signed agreement", "sales notes", "project plan", "client emails", "risk notes"], ["HubSpot", "Notion", "Asana", "Google Drive", "Slack"], ["sales-to-delivery handoffs vary", "scope context gets lost", "owners need clarity", "client commitments need tracking"], "scope drift, missed commitments, unclear owners, and confidential client data", ["handoff completeness", "kickoff readiness", "scope-change rate", "delivery blocker count"], ["create-a-client-intake-brief"]],
  ["scope-change-summary", "Scope Change Summary", "Summarize requested scope changes with impact, dependencies, approvals, and client communication drafts.", "Professional Services", "Professional Services", "Review", "Advanced", "Engagement Manager", "Decision brief", ["client request", "SOW", "project status", "delivery estimates", "budget notes"], ["Asana", "Notion", "Google Drive", "HubSpot", "DocuSign"], ["scope changes are frequent", "impact is hard to see", "approvals are sensitive", "client messages need care"], "pricing, legal terms, client commitments, delivery risk, and approval authority", ["change review time", "approval clarity", "scope drift", "margin impact visibility"], ["draft-a-proposal-preparation-checklist"]],
  ["invoice-variance-review", "Invoice Variance Review", "Compare invoices, purchase orders, contracts, and usage records to prepare variance questions.", "Finance", "Finance", "Review", "Intermediate", "Finance Operations Lead", "Risk summary", ["invoice", "purchase order", "contract", "usage data", "approval history"], ["NetSuite", "QuickBooks", "Bill.com", "Google Drive", "Slack"], ["invoice variances need explanation", "contracts are hard to check", "approvers need concise evidence", "payment decisions need controls"], "payment approval, tax/legal interpretation, contract exceptions, and accounting records", ["variance detection", "review cycle time", "question quality", "payment exception rate"], ["review-an-invoice-variance"]],
  ["vendor-onboarding-packet", "Vendor Onboarding Packet", "Prepare vendor onboarding packets with business need, documents, security status, and approval gaps.", "Finance", "Finance", "Prepare", "Advanced", "Procurement Lead", "Approval packet", ["vendor form", "W-9 or tax document", "contract", "security review", "business case"], ["Zip", "Coupa", "DocuSign", "Google Drive", "Slack"], ["vendor setup needs many documents", "approval gaps delay work", "security and legal reviews matter", "owners need a packet"], "vendor approval, contract terms, payment setup, tax documents, and security review status", ["onboarding cycle time", "missing document count", "approval completeness", "vendor setup errors"], ["summarize-a-purchase-approval-request", "triage-vendor-security-evidence"]],
  ["purchase-request-brief", "Purchase Request Brief", "Summarize software, vendor, or services purchase requests for budget and policy review.", "Finance", "Finance", "Summarize", "Starter", "Finance Operations Lead", "Approval packet", ["purchase request", "vendor quote", "budget owner notes", "contract terms", "security status"], ["Zip", "Coupa", "Slack", "Google Sheets", "DocuSign"], ["spend requests need consistent review", "budget owners need context", "security/legal status matters", "approvers need missing questions"], "spend approval, budget exceptions, renewals, legal terms, and procurement policy", ["approval cycle time", "packet completeness", "exception rate", "requester follow-up count"], ["summarize-a-purchase-approval-request"]],
  ["budget-variance-commentary-agent", "Budget Variance Commentary Agent", "Explain budget variances with source-backed drivers, owner follow-ups, and forecast risks.", "Finance", "Finance", "Summarize", "Intermediate", "FP&A Lead", "Status update", ["actuals", "budget", "forecast notes", "owner updates", "vendor records"], ["NetSuite", "Google Sheets", "Anaplan", "Slack", "Looker"], ["variance commentary is repetitive", "leaders need concise drivers", "owners need follow-up questions", "forecast risk must be visible"], "financial interpretation, forecast commitments, budget ownership, and missing evidence", ["commentary prep time", "driver clarity", "owner follow-up completion", "forecast variance"], ["prepare-budget-variance-commentary"]],
  ["renewal-obligation-monitor", "Renewal Obligation Monitor", "Track upcoming renewals, cancellation windows, contract obligations, and owner follow-ups.", "Finance", "Finance", "Monitor", "Advanced", "Procurement Lead", "Status update", ["contract repository", "vendor list", "renewal terms", "usage notes", "owner map"], ["Ironclad", "DocuSign", "Google Drive", "Slack", "Airtable"], ["renewals surprise teams", "cancellation windows are missed", "usage data needs review", "owners need reminders"], "contract terms, renewal commitments, cancellation deadlines, and vendor negotiations", ["missed renewal count", "notice window coverage", "owner response rate", "spend at risk"], ["summarize-a-purchase-approval-request"]],
  ["vendor-security-evidence-triage", "Vendor Security Evidence Triage", "Review vendor security documents for missing evidence, expired files, and follow-up questions.", "Security", "Security", "Review", "Intermediate", "Security Operations Lead", "Risk summary", ["SOC 2 report", "security questionnaire", "DPA", "pen test summary", "vendor notes"], ["Vanta", "Drata", "Google Drive", "Slack", "Jira"], ["vendor evidence is inconsistent", "security teams need fast triage", "documents expire", "follow-up questions repeat"], "vendor approval, expired evidence, sensitive data, and unverified controls", ["evidence gap count", "triage cycle time", "follow-up completeness", "review queue aging"], ["triage-vendor-security-evidence"]],
  ["access-review-summary-agent", "Access Review Summary Agent", "Summarize user access lists, anomalies, privileged access, and revocation recommendations for review.", "Security", "Security", "Review", "Advanced", "Security Operations Lead", "Risk summary", ["user list", "role definitions", "manager notes", "system logs", "termination records"], ["Okta", "Google Workspace", "GitHub", "Slack", "Vanta"], ["access reviews are manual", "privileged access needs focus", "inactive accounts need review", "audit notes matter"], "privileged access, revocation decisions, employment status, and audit evidence", ["review completion time", "anomaly count", "revocation review accuracy", "audit readiness"], ["draft-an-access-review-summary"]],
  ["security-incident-communication-checklist", "Security Incident Communication Checklist", "Prepare incident communication checklists with confirmed facts, unknowns, stakeholders, and approvals.", "Security", "Security", "Prepare", "Enterprise", "Security Lead", "Checklist", ["incident notes", "system status", "stakeholder map", "legal guidance", "customer impact notes"], ["PagerDuty", "Jira", "Slack", "Google Docs", "Statuspage"], ["incident communication is sensitive", "facts change quickly", "approvals are required", "stakeholders need consistent updates"], "breach status, legal review, customer commitments, and regulatory obligations", ["communication prep time", "approval completeness", "fact accuracy", "stakeholder response time"], ["prepare-a-security-incident-communication-checklist"]],
  ["compliance-evidence-collection", "Compliance Evidence Collection", "Collect audit evidence, map controls, detect gaps, and prepare reviewer notes.", "Security", "Security", "Monitor", "Enterprise", "Compliance Lead", "Risk summary", ["control list", "evidence requests", "system exports", "policy docs", "owner notes"], ["Vanta", "Drata", "Google Drive", "Jira", "Slack"], ["evidence collection is repetitive", "owners miss requests", "control mapping needs traceability", "audit deadlines matter"], "audit evidence gaps, sensitive data, control claims, and compliance sign-off", ["evidence completeness", "owner response rate", "audit prep time", "control gap count"], ["triage-vendor-security-evidence"]],
  ["order-exception-triage", "Order Exception Triage", "Classify order issues, retrieve policy and fulfillment context, and recommend the next reviewed action.", "Ecommerce", "Ecommerce", "Triage", "Starter", "Operations Manager", "Handoff note", ["order record", "customer message", "fulfillment status", "return policy", "payment status"], ["Shopify", "Gorgias", "Klaviyo", "ShipStation", "Stripe"], ["order issues repeat", "policy decisions vary", "fulfillment data is scattered", "customers need timely updates"], "refunds, replacements, fraud, chargebacks, and product safety claims", ["triage accuracy", "response time", "exception rate", "refund escalation quality"], ["draft-a-source-backed-support-reply"]],
  ["return-request-review", "Return Request Review", "Review return requests against policy, order status, product condition, and fraud risk.", "Ecommerce", "Ecommerce", "Review", "Intermediate", "Ecommerce Operations Lead", "Decision brief", ["return request", "order record", "policy", "customer history", "shipping data"], ["Shopify", "Loop Returns", "Gorgias", "Stripe", "ShipStation"], ["returns need policy checks", "exceptions are costly", "customer history matters", "fraud signals need review"], "refund approval, warranty claims, fraud risk, and product safety issues", ["return decision speed", "exception rate", "policy adherence", "chargeback risk"], ["draft-a-source-backed-support-reply"]],
  ["product-question-reply-agent", "Product Question Reply Agent", "Draft source-backed answers to shopper product questions using catalog data, policy, and prior examples.", "Ecommerce", "Ecommerce", "Answer", "Starter", "Customer Experience Lead", "Source-backed reply", ["customer question", "product catalog", "FAQ", "policy docs", "prior answers"], ["Shopify", "Gorgias", "Klaviyo", "PIM", "Google Drive"], ["product questions repeat", "answers need accurate specs", "policy matters", "unsupported claims are risky"], "product claims, safety statements, warranty terms, and unsupported comparisons", ["reply speed", "source coverage", "conversion assist rate", "escalation rate"], ["draft-a-source-backed-support-reply"]],
  ["fulfillment-delay-update-agent", "Fulfillment Delay Update Agent", "Prepare customer and internal updates for delayed orders using fulfillment data and approved language.", "Ecommerce", "Ecommerce", "Update", "Intermediate", "Ecommerce Operations Lead", "Status update", ["order status", "carrier data", "inventory status", "customer message", "shipping policy"], ["Shopify", "ShipStation", "Gorgias", "Klaviyo", "Slack"], ["delays create repeated inquiries", "shipping data changes", "customer messaging needs consistency", "exceptions need review"], "delivery promises, refunds, carrier liability, and high-value exceptions", ["delay response time", "customer contact rate", "edit rate", "escalation volume"], ["draft-a-source-backed-support-reply"]],
  ["campaign-brief-synthesis", "Campaign Brief Synthesis", "Turn customer research, product context, goals, and source material into campaign briefs.", "Marketing", "All Industries", "Prepare", "Intermediate", "Marketing Operations Lead", "Research brief", ["campaign goal", "customer research", "product docs", "brand guide", "analytics"], ["Notion", "Google Drive", "HubSpot", "Looker", "Slack"], ["campaign input is scattered", "teams need a shared brief", "claims need evidence", "launch work needs owners"], "unsupported claims, brand inconsistency, legal review, and channel commitments", ["brief prep time", "claim evidence coverage", "stakeholder approval time", "launch readiness"], ["create-an-seo-content-brief", "analyze-customer-research-themes"]],
  ["competitor-research-brief", "Competitor Research Brief", "Collect competitor signals, summarize positioning, and prepare source-backed implications.", "Marketing", "SaaS", "Research", "Advanced", "Product Marketing Lead", "Research brief", ["competitor pages", "review sites", "sales notes", "customer research", "product context"], ["Google Search", "G2", "Notion", "HubSpot", "Slack"], ["competitor questions repeat", "sales needs current context", "sources must be cited", "positioning needs nuance"], "unsupported competitor claims, outdated public data, legal sensitivity, and overgeneralization", ["research freshness", "source coverage", "sales usage", "positioning update speed"], ["analyze-customer-research-themes", "create-an-seo-content-brief"]],
  ["content-refresh-planning", "Content Refresh Planning", "Prioritize content refreshes from search data, product changes, internal links, and conversion goals.", "Marketing", "All Industries", "Analyze", "Intermediate", "Content Lead", "Checklist", ["content inventory", "search metrics", "product changes", "conversion data", "internal links"], ["Google Search Console", "Analytics", "CMS", "Notion", "HubSpot"], ["content libraries age", "SEO signals change", "product messaging evolves", "teams need prioritization"], "unsupported claims, stale product details, compliance language, and incorrect prioritization", ["refresh backlog quality", "traffic recovery", "conversion impact", "content decay reduction"], ["create-an-seo-content-brief"]],
  ["webinar-repurposing-agent", "Webinar Repurposing Agent", "Turn webinar transcripts into clips, posts, emails, enablement snippets, and follow-up tasks.", "Marketing", "All Industries", "Prepare", "Starter", "Marketing Operations Lead", "Checklist", ["webinar transcript", "slide deck", "speaker notes", "audience data", "brand guide"], ["Zoom", "Descript", "HubSpot", "Notion", "LinkedIn"], ["long-form content is underused", "repurposing takes time", "claims need source clips", "sales needs snippets"], "unsupported claims, speaker approvals, customer references, and brand compliance", ["asset creation speed", "approval rate", "campaign reuse", "engagement lift"], ["repurpose-a-webinar-transcript"]],
  ["bug-report-triage-agent", "Bug Report Triage Agent", "Group bug reports by impact, reproduction quality, ownership, and release risk.", "Engineering", "Technology", "Triage", "Intermediate", "Product Operations Lead", "Risk summary", ["bug reports", "logs", "customer impact", "release notes", "component owners"], ["Jira", "Linear", "GitHub", "Datadog", "Slack"], ["bug backlogs are noisy", "impact needs ranking", "owners need context", "release risk should be visible"], "severity assignment, release risk, customer impact, and incomplete diagnostics", ["triage accuracy", "duplicate reduction", "time to owner", "release blocker visibility"], ["triage-a-bug-report-backlog"]],
  ["release-readiness-checklist", "Release Readiness Checklist", "Create go-live checklists from tickets, pull requests, tests, rollout notes, and unresolved blockers.", "Engineering", "Technology", "Prepare", "Advanced", "Engineering Manager", "Checklist", ["tickets", "pull requests", "test results", "deployment notes", "incident history"], ["GitHub", "Linear", "Jira", "Datadog", "LaunchDarkly"], ["releases need structured review", "blockers hide across tools", "rollback plans matter", "customer communication may be needed"], "go-live approval, rollback risk, migration steps, customer impact, and security issues", ["release prep time", "blocker detection", "rollback readiness", "post-release incidents"], ["create-a-release-readiness-checklist"]],
  ["api-integration-requirements", "API Integration Requirements", "Convert partner or customer integration notes into technical requirements, risks, and acceptance criteria.", "Engineering", "Technology", "Summarize", "Intermediate", "Product Operations Lead", "Decision brief", ["partner notes", "API docs", "security requirements", "event needs", "acceptance criteria"], ["Notion", "Jira", "GitHub", "Postman", "Slack"], ["integration requests are ambiguous", "requirements span business and technical teams", "security needs early review", "acceptance criteria need clarity"], "security requirements, data exposure, customer commitments, and technical feasibility", ["requirements clarity", "open question count", "engineering review time", "scope-change rate"], ["summarize-api-integration-requirements"]],
  ["incident-timeline-summary", "Incident Timeline Summary", "Prepare incident timelines with facts, customer impact, owners, mitigations, and follow-up items.", "Engineering", "Technology", "Summarize", "Advanced", "Engineering Manager", "Status update", ["incident channel", "logs", "status updates", "customer reports", "postmortem notes"], ["PagerDuty", "Slack", "Datadog", "Statuspage", "Jira"], ["incidents move quickly", "timelines need accuracy", "customers need careful updates", "follow-ups need owners"], "root-cause claims, breach status, customer commitments, and incomplete evidence", ["timeline accuracy", "postmortem prep time", "follow-up completion", "stakeholder update quality"], ["prepare-a-security-incident-communication-checklist"]],
  ["candidate-screening-brief", "Candidate Screening Brief", "Summarize candidate materials against role criteria and prepare interview focus areas for review.", "HR", "HR", "Summarize", "Intermediate", "Talent Operations Lead", "Decision brief", ["resume", "role rubric", "application answers", "recruiter notes", "interview plan"], ["Greenhouse", "Lever", "Ashby", "Google Drive", "Slack"], ["screening volume is high", "rubrics need consistency", "interviewers need focus", "human decision remains required"], "employment decisions, bias, protected characteristics, compensation, and legal compliance", ["screening prep time", "rubric coverage", "interviewer readiness", "candidate experience"], ["turn-a-meeting-into-action-items"]],
  ["employee-onboarding-brief", "Employee Onboarding Brief", "Prepare role-specific onboarding briefs from systems, documents, meetings, people, and first tasks.", "HR", "HR", "Onboard", "Starter", "People Operations Lead", "Checklist", ["role profile", "onboarding checklist", "team docs", "system access", "manager notes"], ["HRIS", "Notion", "Google Drive", "Slack", "Okta"], ["new hires need contextual onboarding", "managers repeat setup work", "docs are scattered", "access needs tracking"], "employee privacy, access permissions, policy exceptions, and manager commitments", ["onboarding prep time", "first-week readiness", "missing access count", "new hire satisfaction"], ["turn-a-meeting-into-action-items"]],
  ["employee-question-routing", "Employee Question Routing", "Route employee questions to HR, IT, Finance, Legal, or managers with context and source links.", "HR", "All Industries", "Route", "Starter", "People Operations Lead", "Handoff note", ["employee question", "policy docs", "owner map", "ticket history", "employee context"], ["Slack", "HRIS", "Jira Service Management", "Notion", "Email"], ["questions arrive in many channels", "ownership is unclear", "sensitive topics need routing", "answers need source links"], "employee privacy, legal advice, compensation, benefits, and manager-sensitive topics", ["routing accuracy", "response time", "escalation quality", "repeat question volume"], ["find-the-right-internal-policy"]],
  ["patient-intake-admin-summary", "Patient Intake Admin Summary", "Summarize administrative intake details, required documents, scheduling notes, and missing follow-up items.", "Operations", "Healthcare", "Summarize", "Intermediate", "Clinic Operations Lead", "Decision brief", ["intake form", "referral details", "scheduling notes", "insurance details", "admin policy"], ["EHR", "Google Drive", "Email", "Scheduling tool", "Forms"], ["admin intake is document-heavy", "missing items delay scheduling", "staff need consistent summaries", "clinical questions need escalation"], "medical advice, diagnosis, urgency, payer interpretation, and protected health information", ["intake prep time", "missing item count", "handoff completeness", "review accuracy"], ["prepare-a-patient-intake-summary"]],
  ["prior-authorization-admin-packet", "Prior Authorization Admin Packet", "Prepare administrative prior authorization packets with document status, payer requirements, and follow-up questions.", "Operations", "Healthcare", "Prepare", "Advanced", "Healthcare Operations Lead", "Approval packet", ["payer requirements", "admin forms", "referral records", "supporting documents", "submission status"], ["EHR", "Payer portal", "Google Drive", "Email", "Task board"], ["authorization packets need many documents", "payer rules vary", "status updates are manual", "clinical judgment must stay excluded"], "clinical prioritization, medical necessity conclusions, payer commitments, and protected health information", ["packet completeness", "submission cycle time", "missing document rate", "status update speed"], ["summarize-a-prior-authorization-admin-packet"]],
  ["contract-deviation-risk-review", "Contract Deviation Risk Review", "Identify deviations from standard terms, summarize risk areas, and prepare legal or commercial review questions.", "Finance", "Professional Services", "Review", "Enterprise", "Operations or Finance Lead", "Risk summary", ["contract draft", "standard terms", "redlines", "commercial notes", "approval policy"], ["DocuSign", "Ironclad", "Google Drive", "Slack", "CRM"], ["contract review creates bottlenecks", "standard deviations need visibility", "approvers need concise risk", "legal judgment must remain human"], "legal interpretation, liability, pricing, indemnity, privacy terms, and commercial commitments", ["deviation detection", "review prep time", "approval completeness", "legal question quality"], ["analyze-contract-deviation-risk"]],
  ["spreadsheet-discrepancy-reconciliation", "Spreadsheet Discrepancy Reconciliation", "Compare spreadsheet exports, detect mismatches, and prepare owner questions before record updates.", "Operations", "Operations", "Analyze", "Intermediate", "Operations Manager", "Risk summary", ["spreadsheet exports", "system report", "record IDs", "owner notes", "business rules"], ["Google Sheets", "Excel", "Airtable", "CRM", "Database"], ["teams reconcile exports manually", "mismatches need owners", "record updates carry risk", "exceptions need evidence"], "incorrect record changes, duplicate rows, stale exports, and ownership uncertainty", ["mismatch count", "reconciliation time", "owner question quality", "record update accuracy"], ["reconcile-spreadsheet-discrepancies"]],
  ["support-queue-prioritization", "Support Queue Prioritization", "Prioritize support queues by severity, SLA exposure, customer impact, and required specialist review.", "Support", "SaaS", "Analyze", "Intermediate", "Support Operations Manager", "Decision brief", ["ticket queue", "SLA policy", "customer tier", "incident status", "support tags"], ["Zendesk", "Intercom", "HubSpot", "Statuspage", "Slack"], ["queues grow during busy periods", "priority rules are inconsistent", "SLA exposure needs visibility", "customer impact needs context"], "severity assumptions, SLA commitments, customer impact, and executive visibility", ["priority accuracy", "SLA breach reduction", "queue aging", "specialist routing quality"], ["prioritize-a-support-queue"]],
  ["knowledge-base-article-from-case", "Knowledge Base Article from Resolved Case", "Draft internal or customer-facing knowledge articles from resolved cases, source docs, and approved examples.", "Support", "SaaS", "Prepare", "Intermediate", "Support Enablement Lead", "Checklist", ["resolved ticket", "product docs", "agent notes", "screenshots", "approval guidance"], ["Zendesk", "Intercom", "Notion", "Confluence", "Help center"], ["resolved cases contain reusable knowledge", "article drafts need sources", "support teams need review workflow", "customer-facing claims need approval"], "unsupported product claims, stale screenshots, customer data exposure, and policy language", ["article draft speed", "source coverage", "approval rate", "repeat ticket reduction"], ["draft-a-knowledge-base-article-from-a-resolved-case"]],
].map(
  ([
    slug,
    title,
    summary,
    department,
    industry,
    workflowType,
    complexity,
    buyerRole,
    primaryOutput,
    inputs,
    systems,
    fitSignals,
    riskArea,
    metrics,
    relatedPrompts,
  ]) => ({
    slug,
    title,
    summary,
    department,
    industry,
    workflowType,
    complexity,
    buyerRole,
    primaryOutput,
    inputs,
    systems,
    fitSignals,
    riskArea,
    metrics,
    relatedPrompts,
    relatedIndustries:
      industry === "Ecommerce"
        ? ["/industries/ecommerce"]
        : industry === "Healthcare"
          ? ["/industries/healthcare"]
          : industry === "Professional Services"
            ? ["/industries/professional-services"]
            : industry === "SaaS" || industry === "Technology"
              ? ["/industries/ai-assistant-for-saas-companies"]
              : [],
    relatedProductPages:
      department === "Security"
        ? ["/product/agent-system-design", "/product/data-readiness"]
        : workflowType === "Research"
          ? ["/product/deep-research", "/product/ai-knowledge-base"]
          : ["/product/ai-workflow-automation", "/product/ai-knowledge-base"],
  }) as RawUseCase,
);

export const useCases: UseCaseItem[] = [...rawUseCases, ...additionalUseCases].map(createUseCase);

const useCaseSlugs = new Set(useCases.map((item) => item.slug));
const promptSlugs = new Set(promptLibrary.map((item) => item.slug));
const allowedTaxonomy = {
  departments: new Set(useCaseDepartments),
  industries: new Set(useCaseIndustries),
  workflowTypes: new Set(useCaseWorkflowTypes),
  complexities: new Set(useCaseComplexities),
};

const validateUseCases = () => {
  const seen = new Set<string>();
  for (const item of useCases) {
    if (seen.has(item.slug)) throw new Error(`Duplicate use case slug: ${item.slug}`);
    seen.add(item.slug);
    if (!item.metaTitle || !item.metaDescription || item.keywords.length === 0) {
      throw new Error(`Missing SEO fields for use case: ${item.slug}`);
    }
    if (!allowedTaxonomy.departments.has(item.department)) throw new Error(`Invalid department for use case: ${item.slug}`);
    if (!allowedTaxonomy.industries.has(item.industry)) throw new Error(`Invalid industry for use case: ${item.slug}`);
    if (!allowedTaxonomy.workflowTypes.has(item.workflowType)) throw new Error(`Invalid workflow type for use case: ${item.slug}`);
    if (!allowedTaxonomy.complexities.has(item.complexity)) throw new Error(`Invalid complexity for use case: ${item.slug}`);
    for (const promptSlug of item.relatedPrompts) {
      if (!promptSlugs.has(promptSlug)) throw new Error(`Unknown related prompt "${promptSlug}" for use case: ${item.slug}`);
    }
    for (const slug of item.relatedUseCases) {
      if (!useCaseSlugs.has(slug)) throw new Error(`Unknown related use case "${slug}" for use case: ${item.slug}`);
    }
    for (const route of item.relatedProductPages) {
      if (!productRoutes.includes(route)) throw new Error(`Unknown product route "${route}" for use case: ${item.slug}`);
    }
    for (const route of item.relatedIndustries) {
      if (!industryRoutes.includes(route)) throw new Error(`Unknown industry route "${route}" for use case: ${item.slug}`);
    }
  }
};

validateUseCases();

export const featuredUseCaseSlugs = [
  "customer-support-ai-agent",
  "sales-lead-qualification-agent",
  "weekly-operations-update-agent",
  "invoice-variance-review",
  "vendor-security-evidence-triage",
  "client-intake-brief-agent",
];

export const getUseCaseBySlug = (slug: string) => useCases.find((item) => item.slug === slug);

export const getRelatedUseCases = (useCase: UseCaseItem, limit = 4) => {
  const explicit = useCase.relatedUseCases
    .map((slug) => getUseCaseBySlug(slug))
    .filter((item): item is UseCaseItem => Boolean(item));

  const inferred = useCases
    .filter((item) => item.slug !== useCase.slug)
    .filter((item) => item.department === useCase.department || item.industry === useCase.industry || item.workflowType === useCase.workflowType);

  return [...explicit, ...inferred.filter((item) => !explicit.some((existing) => existing.slug === item.slug))].slice(0, limit);
};

export const getFeaturedUseCases = () =>
  featuredUseCaseSlugs
    .map((slug) => getUseCaseBySlug(slug))
    .filter((item): item is UseCaseItem => Boolean(item));

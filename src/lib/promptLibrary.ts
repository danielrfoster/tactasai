export interface PromptLibraryItem {
  slug: string;
  title: string;
  body: string;
  department: string;
  category: string;
  tags: string[];
  prompt: string;
}

export const promptDepartments = [
  "All Teams",
  "Support",
  "Sales",
  "Operations",
  "Professional Services",
  "Healthcare",
  "Ecommerce",
  "Finance",
  "Security",
  "Marketing",
  "Engineering",
];

export const promptCategories = ["Create", "Summarize", "Analyze", "Search", "Route", "Onboard", "Research"];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const departmentInputGuide: Record<string, string[]> = {
  "All Teams": ["workflow notes, project docs, policies, messages, task records, and relevant source links"],
  Support: ["ticket thread, customer profile, account plan, product docs, policies, resolved examples, logs, and SLA rules"],
  Sales: ["CRM record, account notes, call transcript, stakeholder emails, product/service context, pricing rules, and next-step history"],
  Operations: ["task records, SOPs, spreadsheets, tool exports, policy docs, messages, approvals, and exception history"],
  "Professional Services": ["client brief, statement of work, project plan, delivery notes, emails, tasks, and approval history"],
  Healthcare: ["administrative intake details, forms, scheduling notes, payer requirements, referral records, and approved admin policies"],
  Ecommerce: ["order records, product details, customer messages, fulfillment data, return policy, inventory data, and prior cases"],
  Finance: ["invoice, purchase order, budget, contract terms, approval history, vendor details, and finance policy"],
  Security: ["security policies, logs, evidence, access records, vendor documents, approved responses, and incident notes"],
  Marketing: ["campaign brief, audience notes, customer research, source material, product claims, analytics, and brand guidance"],
  Engineering: ["ticket, pull request, logs, test results, architecture notes, API docs, release notes, and incident timeline"],
};

const categoryOutputGuide: Record<string, string[]> = {
  Create: [
    "Final draft or checklist ready for human review",
    "Context used and assumptions made",
    "Fields, tasks, or records to update",
    "Risks, approvals, and escalation needs",
    "Missing information before this can be sent or acted on",
  ],
  Summarize: [
    "One-paragraph executive summary",
    "Confirmed facts with source references",
    "Open questions and missing context",
    "Risks, blockers, and decisions needed",
    "Recommended next action with owner if known",
  ],
  Analyze: [
    "Key findings ranked by impact",
    "Evidence and source references for each finding",
    "Recommended actions and expected value",
    "Risks, edge cases, and review requirements",
    "Confidence level and data gaps",
  ],
  Search: [
    "Direct answer, if the sources support one",
    "Relevant source titles or sections",
    "Conditions, exceptions, or policy boundaries",
    "Who should review or approve the next step",
    "What to say if the answer is not found",
  ],
  Route: [
    "Recommended destination or owner",
    "Routing reason and priority",
    "Context required for the handoff",
    "Escalation triggers and approval needs",
    "Draft handoff note",
  ],
  Onboard: [
    "Role-specific context brief",
    "People, systems, docs, and decisions to know",
    "First actions in priority order",
    "Risks, open questions, and sensitive areas",
    "Source links for deeper review",
  ],
  Research: [
    "Research summary",
    "Signals, evidence, and source references",
    "Opportunities, risks, and hypotheses",
    "Recommended questions or follow-ups",
    "Confidence level and missing sources",
  ],
};

const departmentGuardrails: Record<string, string[]> = {
  Healthcare: [
    "Do not provide medical advice, diagnosis, treatment guidance, clinical prioritization, or urgency recommendations.",
    "If content appears clinical, safety-related, urgent, or outside administrative handling, flag it for qualified human review.",
  ],
  Finance: [
    "Do not approve payments, alter accounting records, make tax conclusions, or provide legal advice.",
    "Flag contract, tax, payment, liability, renewal, and budget exceptions for the authorized reviewer.",
  ],
  Security: [
    "Do not claim compliance, approve vendors, revoke access, declare breach status, or make external commitments.",
    "Flag sensitive data, privileged access, audit evidence gaps, incident communications, and policy conflicts for security review.",
  ],
  Engineering: [
    "Do not approve code, close incidents, or mark a release ready without human review.",
    "Separate confirmed facts from hypotheses and call out rollback, migration, security, and customer-impact risks.",
  ],
  Support: [
    "Do not promise refunds, fixes, timelines, credits, exceptions, or policy overrides unless the supplied sources explicitly allow it.",
    "Escalate security, billing, downtime, legal, regulated-data, or executive-visibility issues.",
  ],
  Sales: [
    "Do not invent budget, authority, timeline, need, pricing, discounts, contract terms, or customer intent.",
    "Separate confirmed buying signals from inferred ones and mark CRM updates that require human review.",
  ],
  Ecommerce: [
    "Do not approve refunds, replacements, credits, shipping exceptions, warranty claims, or safety claims beyond policy.",
    "Flag fraud risk, chargebacks, high-value exceptions, legal threats, and product safety concerns.",
  ],
  Marketing: [
    "Do not invent product claims, customer results, compliance claims, competitor claims, or statistics.",
    "Mark unsupported claims as needing evidence and preserve the brand tone from the supplied guidance.",
  ],
  Operations: [
    "Do not overwrite records, approve exceptions, or change workflow status without an authorized human decision.",
    "Flag ambiguous ownership, data mismatches, policy exceptions, and audit-sensitive actions.",
  ],
  "Professional Services": [
    "Do not approve scope, pricing, legal terms, timelines, or client commitments without authorized review.",
    "Separate agreed scope from proposed changes and flag delivery, budget, and dependency risks.",
  ],
  "All Teams": [
    "Do not invent owners, dates, approvals, policies, or source details.",
    "Flag sensitive decisions, policy exceptions, customer commitments, and missing context for human review.",
  ],
};

const buildCopyReadyPrompt = (prompt: Omit<PromptLibraryItem, "slug">) => {
  const inputs = departmentInputGuide[prompt.department] ?? departmentInputGuide["All Teams"];
  const output = categoryOutputGuide[prompt.category] ?? categoryOutputGuide.Summarize;
  const guardrails = departmentGuardrails[prompt.department] ?? departmentGuardrails["All Teams"];

  return [
    `You are a supervised AI workflow assistant for ${prompt.department} teams.`,
    `Task: ${prompt.prompt}`,
    "Inputs to use:",
    ...inputs.map((item) => `- ${item}`),
    "Output format:",
    ...output.map((item, index) => `${index + 1}. ${item}`),
    "Quality rules:",
    "- Use only the supplied context. If a fact is not in the sources, say what is missing.",
    "- Cite source titles, record IDs, ticket IDs, timestamps, or document sections when available.",
    "- Separate confirmed facts, assumptions, and recommendations.",
    "- Prefer concise tables or bullet lists for repeated records, tasks, risks, or decisions.",
    "- Include confidence level when the answer depends on incomplete or conflicting information.",
    "Review and safety rules:",
    ...guardrails.map((item) => `- ${item}`),
    "- End with the smallest useful next action and the person or team that should review it.",
  ].join("\n");
};

const rawPrompts = [
  {
    title: "Summarize a customer support ticket",
    body: "Turn a support thread into status, customer need, risk, owner, and next action.",
    department: "Support",
    category: "Summarize",
    tags: ["support automation", "ticket triage", "customer context"],
    prompt:
      "You are an AI support operations assistant. Summarize this customer support ticket for the team. Include: customer goal, issue summary, current status, blockers, sentiment, urgency, suggested next action, owner, and any knowledge base articles or past tickets that should be checked. If information is missing, list the exact follow-up questions needed before responding.",
  },
  {
    title: "Draft a source-backed support reply",
    body: "Create a customer-ready response using policy, product docs, and resolved examples.",
    department: "Support",
    category: "Create",
    tags: ["customer reply", "knowledge base", "human review"],
    prompt:
      "Draft a helpful customer support reply using only the supplied company knowledge, product documentation, policies, and resolved ticket examples. Cite the source title for every factual claim. Keep the tone clear and calm. Do not promise fixes, refunds, timelines, or exceptions unless the source explicitly allows it. End with the next step and a concise question if more information is needed.",
  },
  {
    title: "Route a support issue to the right team",
    body: "Classify the request, identify escalation criteria, and recommend the owner.",
    department: "Support",
    category: "Route",
    tags: ["routing", "SLA", "escalation"],
    prompt:
      "Classify this support issue and recommend the routing path. Return: issue type, severity, customer impact, SLA risk, recommended owner team, why that team is responsible, required context before handoff, and an escalation note if the issue involves security, billing, downtime, regulated data, or executive visibility.",
  },
  {
    title: "Prepare a CRM follow-up plan",
    body: "Summarize account context and create next steps after a sales conversation.",
    department: "Sales",
    category: "Create",
    tags: ["CRM workflow", "follow-up", "pipeline"],
    prompt:
      "Act as a sales operations assistant. Using the call notes, CRM data, emails, and opportunity context, create a follow-up plan. Include buying goal, stakeholders, pain points, objections, promised items, missing context, next meeting objective, CRM fields to update, task list with owners, and a concise follow-up email draft for human review.",
  },
  {
    title: "Qualify an inbound lead",
    body: "Score a new inquiry and decide whether to book, nurture, or disqualify.",
    department: "Sales",
    category: "Analyze",
    tags: ["lead scoring", "intake", "sales ops"],
    prompt:
      "Evaluate this inbound lead against our ideal customer profile and service fit. Return a qualification score from 1-5, fit rationale, likely use case, urgency, missing questions, recommended routing, CRM notes, and the first reply. Do not overstate fit when budget, authority, timeline, or business pain is unclear.",
  },
  {
    title: "Create a client intake brief",
    body: "Turn scattered intake details into a structured brief for a service team.",
    department: "Professional Services",
    category: "Summarize",
    tags: ["client intake", "brief", "service operations"],
    prompt:
      "Create a client intake brief from the inquiry, forms, emails, and uploaded documents. Include client profile, requested outcome, timeline, service line, required documents, open questions, risk flags, approval needs, and recommended next step. Separate confirmed facts from assumptions. Flag anything involving legal, financial, medical, or contractual judgment for human review.",
  },
  {
    title: "Draft a proposal preparation checklist",
    body: "Identify what a team needs before preparing a proposal or scope of work.",
    department: "Professional Services",
    category: "Create",
    tags: ["proposal", "scope", "handoff"],
    prompt:
      "Review the client request and prepare a proposal readiness checklist. Include desired outcome, scope boundaries, deliverables, timeline, stakeholders, dependencies, pricing inputs, risks, assumptions, missing information, and internal approvals required before a proposal is drafted.",
  },
  {
    title: "Summarize document collection status",
    body: "Track requested files, missing items, blockers, and follow-up messages.",
    department: "Operations",
    category: "Summarize",
    tags: ["document workflow", "operations", "follow-up"],
    prompt:
      "Summarize document collection status for this workflow. Return documents received, documents missing, documents that need review, blockers, responsible party, due dates, risk level, and a polite follow-up message for missing items. If a document appears incomplete or outdated, explain why and mark it for review.",
  },
  {
    title: "Turn a meeting into action items",
    body: "Extract owners, dates, dependencies, and updates from meeting notes.",
    department: "All Teams",
    category: "Create",
    tags: ["meeting notes", "tasks", "owners"],
    prompt:
      "Extract action items from this meeting transcript. For each action item include owner, task, due date if stated, dependency, source quote or timestamp, and confidence level. Then provide decisions made, unresolved questions, and suggested follow-up tasks for the project tool. Do not invent owners or dates.",
  },
  {
    title: "Create a weekly operations update",
    body: "Prepare a concise status update from tasks, tickets, docs, and messages.",
    department: "Operations",
    category: "Summarize",
    tags: ["weekly update", "operations", "status"],
    prompt:
      "Create a weekly operations update from the provided tasks, tickets, docs, and messages. Organize by completed work, in-progress work, blocked work, risks, decisions needed, and next week's priorities. Keep the update executive-readable and include source links or record IDs for any important claim.",
  },
  {
    title: "Analyze a back-office workflow",
    body: "Find repeated steps that could become a supervised AI automation.",
    department: "Operations",
    category: "Analyze",
    tags: ["workflow audit", "automation", "process"],
    prompt:
      "Analyze this back-office workflow for AI automation fit. Identify repeated steps, inputs, outputs, systems used, decision points, exceptions, risks, human approvals, and measurable success criteria. Recommend the smallest useful automation to launch first and explain what should remain under human review.",
  },
  {
    title: "Prepare a patient intake summary",
    body: "Structure non-diagnostic intake context for a healthcare admin team.",
    department: "Healthcare",
    category: "Summarize",
    tags: ["healthcare intake", "admin", "compliance"],
    prompt:
      "Prepare a non-diagnostic patient intake summary for administrative review. Include appointment reason as stated by the patient, demographic/admin details, forms received, forms missing, scheduling constraints, insurance or billing notes if provided, and follow-up questions. Do not provide medical advice, diagnosis, treatment recommendations, or clinical prioritization.",
  },
  {
    title: "Check healthcare document completeness",
    body: "Review submitted forms for missing administrative information.",
    department: "Healthcare",
    category: "Analyze",
    tags: ["forms", "compliance", "intake"],
    prompt:
      "Review these healthcare intake documents for administrative completeness. List missing fields, conflicting information, unreadable items, expired documents, and follow-up questions. Do not infer clinical meaning. Flag any sensitive data handling concerns and recommend a human review path.",
  },
  {
    title: "Summarize ecommerce order issues",
    body: "Group order complaints by cause, customer impact, and recovery action.",
    department: "Ecommerce",
    category: "Analyze",
    tags: ["order support", "refunds", "CX"],
    prompt:
      "Analyze these ecommerce order issues. Group them by root cause, customer impact, affected products, fulfillment status, refund/replacement eligibility based on policy, and recommended recovery action. Cite policy or order data when making a recommendation. Flag exceptions that require manager approval.",
  },
  {
    title: "Draft a product return response",
    body: "Create a policy-aware return or exchange message for a customer.",
    department: "Ecommerce",
    category: "Create",
    tags: ["returns", "customer support", "policy"],
    prompt:
      "Draft a customer response for this return or exchange request using the supplied order data and return policy. State eligibility, required next steps, timeline, and any documents or photos needed. Use a friendly tone. Do not approve exceptions, refunds, credits, or replacements beyond policy without human approval.",
  },
  {
    title: "Summarize vendor request business case",
    body: "Turn a vendor request into need, cost, risk, and approval path.",
    department: "Finance",
    category: "Summarize",
    tags: ["vendor request", "finance ops", "approval"],
    prompt:
      "Summarize this vendor request as a business case. Include requested vendor, business need, expected value, estimated cost, owner, alternatives considered, security or legal review needs, budget impact, renewal risk, and approval recommendation. Separate facts from assumptions and list missing data needed for finance review.",
  },
  {
    title: "Analyze contract deviation risk",
    body: "Compare requested terms against approved standards and flag review needs.",
    department: "Finance",
    category: "Analyze",
    tags: ["contracts", "risk", "review"],
    prompt:
      "Compare this contract or requested change against the approved standards provided. Identify deviations, business impact, risk level, owner for review, and suggested negotiation questions. Do not provide legal advice. Flag any liability, data, payment, renewal, termination, or compliance terms for appropriate human review.",
  },
  {
    title: "Summarize security questionnaire answers",
    body: "Prepare draft answers from internal policies and security docs.",
    department: "Security",
    category: "Create",
    tags: ["security review", "questionnaire", "trust"],
    prompt:
      "Draft answers for this security questionnaire using only the supplied security documentation, policies, and approved responses. For each answer include confidence level, source, and whether security review is required. Do not invent controls, certifications, timelines, or commitments.",
  },
  {
    title: "Assess risk in a new workflow",
    body: "Find sensitive-data, approval, and audit risks before automating a process.",
    department: "Security",
    category: "Analyze",
    tags: ["risk assessment", "governance", "automation"],
    prompt:
      "Assess operational, data, and security risks in this proposed AI workflow. Identify sensitive data, access boundaries, approval points, audit requirements, failure modes, policy conflicts, and recommended guardrails. Provide a go/no-go recommendation for a limited pilot and list what must be reviewed by security, legal, or operations.",
  },
  {
    title: "Draft launch page copy from a brief",
    body: "Convert a launch brief into clear page copy with proof points and CTA.",
    department: "Marketing",
    category: "Create",
    tags: ["landing page", "launch", "copy"],
    prompt:
      "Use this launch brief to draft landing page copy. Include headline, subhead, audience, pain points, feature explanation, proof points, objections, CTA, and FAQ. Keep the claims grounded in the brief. Avoid generic AI language and mark any unsupported claim as needing evidence.",
  },
  {
    title: "Create a campaign progress summary",
    body: "Collect campaign status from docs, tasks, and channel updates.",
    department: "Marketing",
    category: "Summarize",
    tags: ["campaign ops", "status", "handoff"],
    prompt:
      "Summarize campaign launch progress using the provided docs, tasks, and messages. Include milestones completed, current status, blockers, upcoming deadlines, asset status, owner list, approval needs, and recommended next actions. Link or cite the source for important status claims.",
  },
  {
    title: "Summarize a technical incident",
    body: "Prepare incident context, customer impact, suspected cause, and next steps.",
    department: "Engineering",
    category: "Summarize",
    tags: ["incident", "debugging", "handoff"],
    prompt:
      "Summarize this technical incident for engineering and support. Include observed behavior, affected systems, customer impact, timeline, logs or errors, suspected cause, mitigation attempted, open questions, next diagnostic steps, and communication notes. Separate confirmed facts from hypotheses.",
  },
  {
    title: "Create a pull request impact summary",
    body: "Explain what changed, why it matters, and what should be tested.",
    department: "Engineering",
    category: "Analyze",
    tags: ["pull request", "review", "release"],
    prompt:
      "Analyze this pull request and create an impact summary. Include changed areas, user-facing behavior, data/schema impact, security considerations, testing recommendations, rollout risk, and reviewer questions. Do not approve the change; prepare context for a human reviewer.",
  },
  {
    title: "Find the right internal policy",
    body: "Answer an employee question using company policy sources.",
    department: "All Teams",
    category: "Search",
    tags: ["policy", "knowledge base", "employee support"],
    prompt:
      "Answer this employee policy question using only the supplied company policy sources. Provide a concise answer, cite the relevant policy title or section, explain any conditions or exceptions, and list who to contact for approval. If the sources do not answer the question, say so and suggest the next internal owner.",
  },
  {
    title: "Onboard a new teammate to a project",
    body: "Create a role-aware onboarding brief from docs, tasks, and decisions.",
    department: "All Teams",
    category: "Onboard",
    tags: ["onboarding", "project context", "handoff"],
    prompt:
      "Create an onboarding brief for a new teammate joining this project. Include project goal, current status, key decisions, important documents, active tasks, people to know, risks, meeting cadence, useful terminology, and first-week actions. Keep the brief specific to the teammate's role.",
  },
  {
    title: "Research customer expansion signals",
    body: "Look across account activity for upsell, churn, and support patterns.",
    department: "Sales",
    category: "Research",
    tags: ["account research", "expansion", "customer success"],
    prompt:
      "Research this customer account for expansion and retention signals using CRM notes, support tickets, product usage summaries, and recent messages. Return positive signals, risk signals, stakeholder changes, open requests, likely next value opportunity, and recommended customer conversation questions.",
  },
  {
    title: "Prepare an executive review brief",
    body: "Condense project or account status into crisp executive-ready context.",
    department: "All Teams",
    category: "Summarize",
    tags: ["executive brief", "status", "decision support"],
    prompt:
      "Prepare an executive review brief. Include objective, current status, business impact, progress since last review, key risks, tradeoffs, decisions needed, recommended option, and appendix of source links. Keep the main brief concise and move detail into bullets.",
  },
  {
    title: "Map tool updates after a customer call",
    body: "Turn a call log into CRM, task, and support updates.",
    department: "Operations",
    category: "Route",
    tags: ["connected tools", "CRM", "task automation"],
    prompt:
      "Turn this customer call log into system updates. Return CRM fields to update, support tickets to create or update, project tasks, follow-up email draft, owner assignments, due dates, and any data that should not be written automatically. Mark each update as safe to automate or requires human review.",
  },
  {
    title: "Find repeated requests in support tickets",
    body: "Cluster tickets to identify automation, documentation, and product gaps.",
    department: "Support",
    category: "Analyze",
    tags: ["ticket clustering", "automation opportunity", "knowledge gaps"],
    prompt:
      "Analyze these support tickets for repeated request patterns. Cluster by theme, frequency, customer impact, available knowledge coverage, likely automation opportunity, and recommended knowledge base improvements. Include example ticket IDs for each cluster.",
  },
  {
    title: "Create a supervised automation spec",
    body: "Turn a task idea into inputs, outputs, rules, guardrails, and metrics.",
    department: "Operations",
    category: "Create",
    tags: ["automation spec", "agent design", "guardrails"],
    prompt:
      "Create a supervised AI automation specification for this business task. Include trigger, inputs, data sources, output, connected tools, approval rules, exception handling, audit log needs, success metrics, owner, and rollout plan. Clearly state what the agent can prepare versus what a human must approve.",
  },
  {
    title: "Draft a knowledge base article from a resolved case",
    body: "Convert a solved issue into reusable, searchable internal knowledge.",
    department: "Support",
    category: "Create",
    tags: ["knowledge base", "resolved ticket", "documentation"],
    prompt:
      "Create a knowledge base article from this resolved support case. Include problem summary, affected users or conditions, symptoms, root cause if confirmed, resolution steps, verification steps, escalation criteria, related articles, and tags. Remove customer-sensitive details and mark uncertain items for review.",
  },
  {
    title: "Prioritize a support queue",
    body: "Rank open tickets by impact, urgency, SLA risk, and available context.",
    department: "Support",
    category: "Analyze",
    tags: ["queue management", "SLA", "support prioritization"],
    prompt:
      "Prioritize this support queue for the next work block. For each ticket, return priority, customer impact, SLA status, urgency reason, missing context, suggested owner, and first action. Flag tickets involving security, billing, downtime, legal commitments, regulated data, or executive visibility for escalation. Do not close or resolve tickets automatically.",
  },
  {
    title: "Create a support escalation handoff",
    body: "Prepare a clean handoff when a ticket needs engineering, billing, or management review.",
    department: "Support",
    category: "Route",
    tags: ["escalation", "handoff", "support ops"],
    prompt:
      "Create an escalation handoff for this support issue. Include customer summary, problem statement, reproduction steps if available, business impact, timeline, evidence, attempted fixes, requested decision, recommended owner team, and customer communication status. Separate confirmed facts from assumptions and list what the next owner must verify.",
  },
  {
    title: "Audit support macro coverage",
    body: "Find repeated replies that should become macros, help docs, or automation.",
    department: "Support",
    category: "Analyze",
    tags: ["macros", "knowledge gaps", "support automation"],
    prompt:
      "Analyze these support conversations and existing macros. Identify recurring questions, gaps in macro coverage, outdated or risky macros, opportunities for new help content, and cases where automation could prepare a draft. Include example ticket IDs, suggested macro titles, required source material, and human approval needs.",
  },
  {
    title: "Prepare a discovery call brief",
    body: "Summarize prospect context before a sales discovery conversation.",
    department: "Sales",
    category: "Research",
    tags: ["discovery", "account research", "sales preparation"],
    prompt:
      "Prepare a discovery call brief from the CRM record, website notes, prior emails, and account context. Include company snapshot, likely business problem, relevant use cases, stakeholders, open questions, potential objections, proof points to mention, and what not to assume. Keep claims source-backed and mark uncertain information clearly.",
  },
  {
    title: "Draft a renewal risk summary",
    body: "Review account health signals before a renewal conversation.",
    department: "Sales",
    category: "Summarize",
    tags: ["renewal", "customer success", "account health"],
    prompt:
      "Summarize renewal risk for this customer using CRM notes, usage summaries, support history, invoices, and recent communications. Include value realized, adoption gaps, unresolved issues, stakeholder sentiment, commercial risks, expansion signals, recommended renewal strategy, and questions for the account owner. Do not make pricing or contract commitments.",
  },
  {
    title: "Update an opportunity from stakeholder emails",
    body: "Turn buying committee messages into CRM updates and next actions.",
    department: "Sales",
    category: "Route",
    tags: ["CRM hygiene", "stakeholders", "pipeline"],
    prompt:
      "Extract CRM updates from these stakeholder emails. Return opportunity stage signals, stakeholder roles, buying criteria, objections, promised follow-ups, dates, risks, next best action, and fields that should be updated. Mark each update as confirmed, inferred, or needs human review before saving.",
  },
  {
    title: "Build an SOP from a recurring task",
    body: "Convert repeated work into a step-by-step operating procedure.",
    department: "Operations",
    category: "Create",
    tags: ["SOP", "process documentation", "operations"],
    prompt:
      "Create a standard operating procedure from these examples, notes, and task records. Include purpose, trigger, required inputs, step-by-step process, decision rules, exceptions, quality checks, systems used, owner roles, timing expectations, and escalation path. Highlight unclear steps that require process owner review.",
  },
  {
    title: "Reconcile spreadsheet discrepancies",
    body: "Compare records, identify mismatches, and suggest review actions.",
    department: "Operations",
    category: "Analyze",
    tags: ["data cleanup", "reconciliation", "spreadsheets"],
    prompt:
      "Compare these spreadsheet or export records and identify discrepancies. Return mismatched fields, duplicate records, missing values, likely causes, records needing manual review, and recommended correction steps. Do not overwrite data. Provide record IDs and confidence level for each suggested action.",
  },
  {
    title: "Prepare an exception approval packet",
    body: "Summarize an exception request with policy, risk, and decision options.",
    department: "Operations",
    category: "Summarize",
    tags: ["approval workflow", "exceptions", "policy"],
    prompt:
      "Prepare an approval packet for this exception request. Include requested exception, relevant policy, business reason, affected customer or team, risk level, alternatives, precedent if available, decision options, recommended reviewer, and missing information. Do not approve the exception; prepare context for the authorized decision maker.",
  },
  {
    title: "Create a project status report",
    body: "Turn project artifacts into status, risks, decisions, and next steps.",
    department: "Professional Services",
    category: "Summarize",
    tags: ["project status", "client delivery", "services ops"],
    prompt:
      "Create a client project status report from tasks, notes, deliverables, and messages. Include overall status, completed work, upcoming work, blockers, risks, client dependencies, budget or scope notes if provided, decisions needed, and next actions by owner. Keep client-facing language clear and avoid unsupported commitments.",
  },
  {
    title: "Analyze a scope change request",
    body: "Assess requested changes against scope, timeline, budget, and risk.",
    department: "Professional Services",
    category: "Analyze",
    tags: ["scope change", "delivery risk", "client services"],
    prompt:
      "Analyze this scope change request using the statement of work, project plan, messages, and delivery notes. Return requested change, current scope comparison, impact on timeline, budget inputs, resource needs, risks, open questions, and recommended response path. Do not provide legal advice or approve commercial terms.",
  },
  {
    title: "Prepare a client handoff summary",
    body: "Package delivery context for a new account, support, or success owner.",
    department: "Professional Services",
    category: "Onboard",
    tags: ["handoff", "client context", "delivery"],
    prompt:
      "Prepare a client handoff summary for a new owner. Include client goals, delivered work, current configuration or process state, unresolved items, key contacts, communication preferences, risks, open decisions, renewal or support considerations, and source links. Separate facts from assumptions and note what the new owner should verify first.",
  },
  {
    title: "Draft an appointment scheduling follow-up",
    body: "Create a non-clinical message for missing scheduling or intake details.",
    department: "Healthcare",
    category: "Create",
    tags: ["scheduling", "patient admin", "intake"],
    prompt:
      "Draft a non-clinical appointment scheduling follow-up using the provided intake and scheduling context. Ask only for missing administrative details, forms, availability, referral information, insurance details, or contact preferences. Do not provide medical advice, diagnosis, triage, treatment guidance, or urgency recommendations.",
  },
  {
    title: "Summarize a prior authorization admin packet",
    body: "Organize administrative requirements and missing items for review.",
    department: "Healthcare",
    category: "Summarize",
    tags: ["prior authorization", "admin workflow", "compliance"],
    prompt:
      "Summarize this prior authorization packet for administrative review. Include patient/admin identifiers as appropriate, requested service or item as stated, payer requirements, documents received, missing documents, deadlines, submission channel, status, and follow-up tasks. Do not infer clinical necessity or make medical judgments.",
  },
  {
    title: "Route a healthcare admin inbox item",
    body: "Classify non-clinical messages and assign the right administrative path.",
    department: "Healthcare",
    category: "Route",
    tags: ["admin inbox", "routing", "healthcare operations"],
    prompt:
      "Route this healthcare administrative inbox item. Classify the request type, identify required administrative action, recommended owner, missing information, due date if stated, and sensitivity concerns. If the message appears clinical, urgent, safety-related, or outside administrative handling, flag it for qualified human review immediately.",
  },
  {
    title: "Detect fulfillment delay patterns",
    body: "Find recurring shipping, warehouse, carrier, or inventory causes.",
    department: "Ecommerce",
    category: "Analyze",
    tags: ["fulfillment", "shipping", "operations"],
    prompt:
      "Analyze these ecommerce fulfillment delay records. Group delays by likely cause, carrier, warehouse, product, geography, order age, customer impact, and recovery action. Identify preventable patterns, policy-driven customer responses, and exceptions needing operations approval. Include representative order IDs for each pattern.",
  },
  {
    title: "Create a product FAQ from reviews and questions",
    body: "Turn customer questions into useful product-page answers.",
    department: "Ecommerce",
    category: "Create",
    tags: ["product FAQ", "reviews", "conversion"],
    prompt:
      "Create a product FAQ from these reviews, customer questions, product specs, and support tickets. Include concise answers, source-backed claims, uncertainty notes, and suggested product page updates. Do not invent compatibility, warranty, shipping, safety, or performance claims that are not supported by the provided sources.",
  },
  {
    title: "Analyze abandoned cart reasons",
    body: "Identify friction signals across checkout, pricing, shipping, and product questions.",
    department: "Ecommerce",
    category: "Research",
    tags: ["checkout", "conversion", "cart recovery"],
    prompt:
      "Analyze abandoned cart signals using checkout events, customer messages, product data, pricing, and shipping context. Return likely abandonment reasons, customer segments affected, evidence, recommended experiments, recovery message ideas, and data gaps. Separate measurable signals from hypotheses.",
  },
  {
    title: "Review an invoice variance",
    body: "Compare invoice details against purchase order, contract, or usage records.",
    department: "Finance",
    category: "Analyze",
    tags: ["invoice review", "AP", "variance"],
    prompt:
      "Review this invoice variance using the invoice, purchase order, contract terms, usage records, and approval history. Identify line-item differences, likely explanation, amount at issue, required approver, vendor questions, and recommended next action. Do not authorize payment or change accounting records.",
  },
  {
    title: "Prepare budget variance commentary",
    body: "Explain spending changes with source-backed drivers and follow-ups.",
    department: "Finance",
    category: "Summarize",
    tags: ["budget", "variance", "finance ops"],
    prompt:
      "Prepare budget variance commentary from actuals, budget, forecast notes, and owner updates. Include variance amount, percentage, primary drivers, timing differences, recurring versus one-time items, risks to forecast, owner follow-ups, and confidence level. Keep commentary factual and source-backed.",
  },
  {
    title: "Summarize a purchase approval request",
    body: "Create a decision brief for software, vendor, or services spend.",
    department: "Finance",
    category: "Summarize",
    tags: ["purchase approval", "procurement", "spend control"],
    prompt:
      "Summarize this purchase approval request. Include requester, vendor, amount, business need, budget owner, alternatives, expected value, renewal or cancellation terms, security/legal review needs, implementation effort, and decision needed. Flag missing information before approval.",
  },
  {
    title: "Triage vendor security evidence",
    body: "Review vendor-provided documents for gaps, expiration, and follow-up.",
    department: "Security",
    category: "Analyze",
    tags: ["vendor security", "evidence review", "risk"],
    prompt:
      "Triage this vendor security evidence for review. List documents received, document dates, expired or missing items, controls covered, controls not evidenced, sensitive data concerns, follow-up questions, and recommended review owner. Do not mark the vendor approved; prepare a security review summary.",
  },
  {
    title: "Draft an access review summary",
    body: "Summarize user access, anomalies, and revocation recommendations.",
    department: "Security",
    category: "Summarize",
    tags: ["access review", "identity", "audit"],
    prompt:
      "Draft an access review summary from these user lists, role definitions, manager notes, and system logs. Include users to confirm, possible excessive access, inactive accounts, privileged access, missing owners, recommended removals for review, and audit notes. Do not revoke access automatically.",
  },
  {
    title: "Prepare a security incident communication checklist",
    body: "Organize stakeholders, facts, approvals, and message drafts after an incident signal.",
    department: "Security",
    category: "Create",
    tags: ["incident response", "communications", "governance"],
    prompt:
      "Prepare a security incident communication checklist from the available incident context. Include confirmed facts, unknowns, affected systems, internal stakeholders, approval path, customer communication considerations, regulator or legal review flags, draft internal update, and next information needed. Do not declare breach status or make external commitments.",
  },
  {
    title: "Repurpose a webinar transcript",
    body: "Turn a long session into clips, posts, emails, and sales enablement snippets.",
    department: "Marketing",
    category: "Create",
    tags: ["webinar", "content repurposing", "campaign"],
    prompt:
      "Repurpose this webinar transcript into marketing assets. Create key themes, audience takeaways, short social posts, email copy, sales enablement bullets, clip suggestions with timestamps if available, and FAQ ideas. Keep claims grounded in the transcript and mark any claim that needs proof or approval.",
  },
  {
    title: "Analyze customer research themes",
    body: "Cluster interview notes into pain points, language, objections, and opportunities.",
    department: "Marketing",
    category: "Analyze",
    tags: ["customer research", "messaging", "positioning"],
    prompt:
      "Analyze these customer research notes. Cluster themes by pain point, desired outcome, buying trigger, objection, exact customer language, segment differences, and product or content opportunities. Include representative quotes or source IDs and distinguish strong patterns from isolated comments.",
  },
  {
    title: "Create an SEO content brief",
    body: "Prepare a search-focused outline with intent, sources, and proof points.",
    department: "Marketing",
    category: "Research",
    tags: ["SEO", "content brief", "search intent"],
    prompt:
      "Create an SEO content brief using the provided keyword, audience, product context, competitor notes, and internal sources. Include search intent, target reader, angle, outline, questions to answer, proof points, internal links, CTA, differentiation notes, and claims that need evidence. Avoid generic filler.",
  },
  {
    title: "Triage a bug report backlog",
    body: "Group bugs by impact, reproduction quality, ownership, and release risk.",
    department: "Engineering",
    category: "Analyze",
    tags: ["bug triage", "backlog", "release risk"],
    prompt:
      "Triage this bug report backlog. For each issue or cluster, return user impact, severity suggestion, reproduction quality, affected area, suspected owner, duplicate candidates, missing diagnostics, release risk, and recommended next action. Do not close issues automatically and mark uncertain classifications.",
  },
  {
    title: "Create a release readiness checklist",
    body: "Turn release notes, tickets, and test results into go-live criteria.",
    department: "Engineering",
    category: "Create",
    tags: ["release", "QA", "rollout"],
    prompt:
      "Create a release readiness checklist from these tickets, pull requests, test results, and deployment notes. Include shipped changes, required tests, unresolved blockers, migration or config steps, monitoring plan, rollback plan, customer communication needs, and go/no-go questions for the release owner.",
  },
  {
    title: "Summarize API integration requirements",
    body: "Convert partner or customer integration notes into technical requirements.",
    department: "Engineering",
    category: "Summarize",
    tags: ["API", "integration", "requirements"],
    prompt:
      "Summarize these API integration requirements for engineering review. Include use case, systems involved, authentication needs, endpoints or data objects, required events, rate or volume expectations, error handling, security considerations, open questions, and acceptance criteria. Separate customer requests from confirmed technical decisions.",
  },
] satisfies Array<Omit<PromptLibraryItem, "slug">>;

export const promptLibrary: PromptLibraryItem[] = rawPrompts.map((prompt) => ({
  ...prompt,
  prompt: buildCopyReadyPrompt(prompt),
  slug: slugify(prompt.title),
}));

export const getPromptBySlug = (slug: string) => promptLibrary.find((prompt) => prompt.slug === slug);

export const getRelatedPrompts = (prompt: PromptLibraryItem, limit = 3) =>
  promptLibrary
    .filter((item) => item.slug !== prompt.slug)
    .filter((item) => item.department === prompt.department || item.category === prompt.category)
    .slice(0, limit);

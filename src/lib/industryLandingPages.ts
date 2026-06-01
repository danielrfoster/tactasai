export type IndustryIcon =
  | "briefcase"
  | "building"
  | "cart"
  | "cloud"
  | "gavel"
  | "heart"
  | "home"
  | "server";

export interface IndustryLandingPage {
  slug: string;
  name: string;
  shortName: string;
  icon: IndustryIcon;
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  secondaryCtaLabel: string;
  keywords: string[];
  proof: Array<{
    label: string;
    value: string;
    body: string;
  }>;
  problems: Array<{
    title: string;
    body: string;
  }>;
  useCases: Array<{
    title: string;
    body: string;
    icon: IndustryIcon;
  }>;
  workflowTitle: string;
  workflowBody: string;
  workflow: Array<{
    step: string;
    title: string;
    body: string;
  }>;
  guardrailTitle: string;
  guardrailBody: string;
  guardrails: string[];
  integrations: string[];
  prompts: Array<{
    label: string;
    prompt: string;
  }>;
  faq: Array<{
    q: string;
    a: string;
  }>;
}

export const industryLandingPages: IndustryLandingPage[] = [
  {
    slug: "ai-assistant-for-saas-companies",
    name: "AI Assistant for SaaS Companies",
    shortName: "SaaS",
    icon: "building",
    title: "AI Assistant for SaaS Companies | Tactas AI",
    description:
      "AI assistant workflows for SaaS support, onboarding, product docs, customer success handoffs, and sales qualification.",
    eyebrow: "AI assistant for SaaS",
    headline: "Resolve SaaS support, onboarding, and product questions with company context.",
    subheadline:
      "Tactas AI connects docs, tickets, CRM notes, product context, and approval rules so SaaS teams can answer customers faster and move follow-up work into the right system.",
    ctaLabel: "Book a SaaS workflow review",
    secondaryCtaLabel: "See SaaS workflows",
    keywords: [
      "AI assistant for SaaS",
      "SaaS support automation",
      "AI customer support for SaaS",
      "AI onboarding assistant",
      "AI product documentation assistant",
      "AI customer success automation",
    ],
    proof: [
      { label: "Support", value: "Docs plus tickets", body: "Answer product questions with source context from help docs, release notes, and prior cases." },
      { label: "Onboarding", value: "Next steps", body: "Guide customers through setup, integrations, permissions, and adoption blockers." },
      { label: "Success", value: "Account context", body: "Prepare renewal, escalation, and health summaries from CRM and customer notes." },
      { label: "Sales", value: "Qualified intent", body: "Route buyers by plan fit, use case, integration needs, and urgency." },
    ],
    problems: [
      {
        title: "Customers ask questions across too many surfaces",
        body: "The answer may live in docs, release notes, support history, customer success notes, or a product manager's explanation.",
      },
      {
        title: "Onboarding stalls when context is scattered",
        body: "Implementation issues often need product knowledge, account history, integration status, and a clear next action.",
      },
      {
        title: "Support handoffs lose useful detail",
        body: "Tickets move between support, success, sales, and engineering without the full situation attached.",
      },
    ],
    useCases: [
      { title: "Product docs Q&A", body: "Answer feature, setup, permission, API, and troubleshooting questions using approved docs and release notes.", icon: "building" },
      { title: "Customer onboarding", body: "Guide setup tasks, collect blockers, and prepare account-specific next steps for success teams.", icon: "briefcase" },
      { title: "Ticket triage", body: "Classify support issues, identify missing details, draft replies, and route escalations.", icon: "cloud" },
      { title: "Account summaries", body: "Summarize customer history, risks, open tasks, and renewal context before calls.", icon: "briefcase" },
      { title: "Sales qualification", body: "Capture use case, company size, integrations, plan fit, budget signals, and urgency.", icon: "building" },
      { title: "Engineering handoff", body: "Prepare bug reports and feature requests with reproduction steps, impact, and source links.", icon: "server" },
    ],
    workflowTitle: "A SaaS assistant should work like an operating layer, not a generic chat widget.",
    workflowBody:
      "The assistant retrieves the right source material, checks account context, prepares a response or action, and escalates product-risk or commercial-risk decisions.",
    workflow: [
      { step: "01", title: "Customer asks", body: "A user asks why an integration is failing during onboarding." },
      { step: "02", title: "Assistant checks context", body: "Docs, plan limits, account notes, integration status, and recent tickets are reviewed." },
      { step: "03", title: "Assistant answers", body: "The response includes likely causes, setup steps, and source references." },
      { step: "04", title: "Risk is assessed", body: "Account-impacting actions, refunds, or product commitments require human review." },
      { step: "05", title: "Work is routed", body: "The assistant drafts a success follow-up or engineering handoff with full context." },
    ],
    guardrailTitle: "Keep product commitments, account changes, and escalations under control.",
    guardrailBody:
      "Tactas AI can answer routine questions and prepare work, while sensitive pricing, roadmap, contractual, or production-impacting decisions stay behind approval.",
    guardrails: ["Source-linked answers", "Human approval for account changes", "Escalation rules for outages and bugs", "Audit logs for assistant actions"],
    integrations: ["Knowledge base", "Helpdesk", "CRM", "Product analytics", "Issue tracker", "Meeting notes", "Email", "Internal docs"],
    prompts: [
      { label: "Support", prompt: "Summarize this customer's issue, likely root cause, missing details, and next best reply." },
      { label: "Success", prompt: "Prepare an onboarding risk brief for this account using open tasks, tickets, and CRM notes." },
      { label: "Sales", prompt: "Qualify this inbound conversation by use case, urgency, integrations, and plan fit." },
    ],
    faq: [
      {
        q: "What SaaS workflow should we automate first?",
        a: "Start with product docs Q&A, onboarding support, support triage, account summaries, or sales qualification because these workflows are frequent and measurable.",
      },
      {
        q: "Can the assistant answer technical product questions?",
        a: "Yes, when it is grounded in approved docs, release notes, tickets, and product context. High-risk bugs, outages, and account changes can route to human review.",
      },
      {
        q: "Can it work with our existing support stack?",
        a: "Tactas AI is designed around the systems you already use, such as helpdesk tools, CRM, docs, issue trackers, email, and internal workspaces.",
      },
    ],
  },
  {
    slug: "ai-assistant-for-ecommerce",
    name: "AI Assistant for Ecommerce Stores",
    shortName: "Ecommerce",
    icon: "cart",
    title: "AI Assistant for Ecommerce Stores | Tactas AI",
    description:
      "AI assistant workflows for ecommerce product questions, order status, returns intake, support triage, and revenue recovery.",
    eyebrow: "AI assistant for ecommerce",
    headline: "Answer shoppers, check orders, and prepare returns without losing control.",
    subheadline:
      "Tactas AI helps ecommerce teams automate product Q&A, order status, returns intake, and support triage across store, payment, fulfillment, and helpdesk systems.",
    ctaLabel: "Book an ecommerce workflow review",
    secondaryCtaLabel: "See ecommerce workflows",
    keywords: [
      "AI assistant for ecommerce",
      "ecommerce AI chatbot",
      "AI customer support for ecommerce",
      "Shopify support automation",
      "AI order status automation",
      "AI returns automation",
    ],
    proof: [
      { label: "Pre-sale", value: "Product fit", body: "Answer sizing, compatibility, stock, bundle, warranty, and delivery questions." },
      { label: "Orders", value: "Status lookup", body: "Check payment, fulfillment, shipment, and delivery context before replying." },
      { label: "Returns", value: "Policy intake", body: "Collect details, apply policy, and prepare approval-ready return cases." },
      { label: "Revenue", value: "Recovered intent", body: "Capture high-intent questions and sync follow-up to email or CRM." },
    ],
    problems: [
      {
        title: "Shoppers leave when answers are slow",
        body: "Questions about fit, shipping, returns, and availability often happen outside support hours or during campaign spikes.",
      },
      {
        title: "Order questions require too many lookups",
        body: "Support may need the storefront, payment processor, fulfillment tool, helpdesk, and shipping data before it can answer.",
      },
      {
        title: "Returns and exceptions drain the team",
        body: "Refunds, damaged items, fraud signals, VIP cases, and policy overrides need a controlled path.",
      },
    ],
    useCases: [
      { title: "Product Q&A", body: "Answer catalog, sizing, compatibility, availability, bundle, warranty, and policy questions.", icon: "cart" },
      { title: "Order status", body: "Retrieve order, payment, fulfillment, shipment, and customer history in one support flow.", icon: "cloud" },
      { title: "Returns intake", body: "Collect return reasons, photos, order details, eligibility checks, and escalation packets.", icon: "briefcase" },
      { title: "Support triage", body: "Classify tickets, enrich cases, draft replies, and route priority issues.", icon: "building" },
      { title: "Revenue recovery", body: "Identify high-intent conversations and prepare follow-up for abandoned carts or VIP shoppers.", icon: "cart" },
      { title: "Policy control", body: "Keep refunds, discounts, fraud risk, and unusual requests behind review gates.", icon: "gavel" },
    ],
    workflowTitle: "Ecommerce assistants need store context, policies, and approval paths.",
    workflowBody:
      "The assistant can answer routine questions quickly while keeping refunds, discounts, address changes, and policy overrides under human control.",
    workflow: [
      { step: "01", title: "Shopper asks", body: "A customer asks where an order is and whether the delivery address can change." },
      { step: "02", title: "Assistant checks data", body: "Order, payment, fulfillment, shipment, customer history, and policy are reviewed." },
      { step: "03", title: "Answer is drafted", body: "The assistant explains status, delivery ETA, and whether address changes are still possible." },
      { step: "04", title: "Guardrail applies", body: "Low-risk answers can send; refunds, address changes, and exceptions route for approval." },
      { step: "05", title: "Case is logged", body: "The support record includes answer, sources, customer intent, and next action." },
    ],
    guardrailTitle: "Protect margin and customer experience.",
    guardrailBody:
      "Routine support can run faster, while discounts, refunds, fraud risk, VIP cases, and policy overrides stay reviewable.",
    guardrails: ["Policy-grounded responses", "Approval for refunds and discounts", "Escalation for fraud or VIP cases", "Conversation and action logs"],
    integrations: ["Shopify", "WooCommerce", "Stripe", "Gorgias", "Zendesk", "Klaviyo", "Inventory systems", "Fulfillment APIs"],
    prompts: [
      { label: "Product", prompt: "Recommend products for this shopper based on use case, budget, availability, and return policy." },
      { label: "Orders", prompt: "Explain this order status using payment, fulfillment, shipping, and customer history." },
      { label: "Returns", prompt: "Check return eligibility and prepare a support-ready summary with missing details." },
    ],
    faq: [
      {
        q: "Is this just an ecommerce chatbot?",
        a: "No. It can chat with shoppers, but the real value is supervised support automation connected to store data, policies, and approval rules.",
      },
      {
        q: "Can it support Shopify or WooCommerce?",
        a: "Yes. Tactas AI can be designed around your store, helpdesk, payment, fulfillment, inventory, and email systems.",
      },
      {
        q: "What ecommerce workflow should start first?",
        a: "Product Q&A, order status, returns intake, and support triage are strong starting points because they are frequent and easy to measure.",
      },
    ],
  },
  {
    slug: "ai-assistant-for-law-firms",
    name: "AI Assistant for Law Firms",
    shortName: "Law firms",
    icon: "gavel",
    title: "AI Assistant for Law Firms | Tactas AI",
    description:
      "AI assistant workflows for law firm intake, lead qualification, document collection, follow-up, and administrative case routing.",
    eyebrow: "AI assistant for law firms",
    headline: "Qualify legal inquiries and prepare intake without replacing attorney judgment.",
    subheadline:
      "Tactas AI helps law firms handle repetitive intake, document checklists, appointment prep, and client follow-up while keeping legal advice and case decisions with qualified staff.",
    ctaLabel: "Book a law firm workflow review",
    secondaryCtaLabel: "See legal workflows",
    keywords: [
      "AI assistant for law firms",
      "AI legal intake assistant",
      "law firm intake automation",
      "legal client intake automation",
      "AI chatbot for law firms",
      "legal workflow automation",
    ],
    proof: [
      { label: "Intake", value: "Better facts", body: "Collect matter type, timeline, location, parties, urgency, and missing details." },
      { label: "Routing", value: "Right team", body: "Route leads by practice area, jurisdiction, urgency, and availability." },
      { label: "Documents", value: "Checklist ready", body: "Prepare client document requests before the first consultation." },
      { label: "Follow-up", value: "Less leakage", body: "Draft reminders and next steps for qualified inquiries that need human review." },
    ],
    problems: [
      {
        title: "High-value inquiries arrive with incomplete facts",
        body: "Staff need to collect matter type, dates, parties, documents, and urgency before an attorney can evaluate next steps.",
      },
      {
        title: "Admin intake competes with billable work",
        body: "Reception and paralegal teams spend time repeating the same screening, scheduling, and checklist steps.",
      },
      {
        title: "Legal boundaries must stay clear",
        body: "The assistant should collect and organize context, not provide legal advice or make case acceptance decisions.",
      },
    ],
    useCases: [
      { title: "Client intake", body: "Collect matter type, timeline, parties, location, urgency, and contact details.", icon: "gavel" },
      { title: "Lead qualification", body: "Screen inquiries by practice area, geography, conflict signals, budget, and urgency.", icon: "briefcase" },
      { title: "Document collection", body: "Prepare matter-specific checklists and identify missing forms or evidence.", icon: "building" },
      { title: "Consultation prep", body: "Summarize facts, questions, timeline, and open risks for staff review.", icon: "briefcase" },
      { title: "Follow-up automation", body: "Draft next-step emails, appointment reminders, and missing-document reminders.", icon: "cloud" },
      { title: "Escalation control", body: "Route advice, conflict checks, pricing, and case acceptance to qualified staff.", icon: "gavel" },
    ],
    workflowTitle: "Legal assistants should gather facts, prepare work, and preserve professional judgment.",
    workflowBody:
      "The system structures intake and follow-up while advice, case strategy, conflicts, fee decisions, and sensitive commitments remain controlled.",
    workflow: [
      { step: "01", title: "Prospect asks", body: "A potential client describes a matter and asks whether the firm can help." },
      { step: "02", title: "Assistant gathers facts", body: "Matter type, dates, parties, location, urgency, and documents are collected." },
      { step: "03", title: "Summary is prepared", body: "The firm receives an intake brief with missing details and next-step options." },
      { step: "04", title: "Boundary is enforced", body: "Legal advice, conflict checks, and case acceptance route to qualified staff." },
      { step: "05", title: "Follow-up is queued", body: "The assistant drafts reminders, document requests, and scheduling notes for review." },
    ],
    guardrailTitle: "Do not let automation cross into legal advice.",
    guardrailBody:
      "Tactas AI should be configured to collect, summarize, route, and draft administrative work while licensed professionals review legal judgments.",
    guardrails: ["No legal advice responses", "Attorney review for case decisions", "Conflict and privacy escalation", "Audit trail for intake and follow-up"],
    integrations: ["Website forms", "Email", "CRM", "Calendars", "Document storage", "Practice management tools", "Phone notes", "Knowledge base"],
    prompts: [
      { label: "Intake", prompt: "Turn this inquiry into a legal intake brief with matter type, dates, parties, urgency, and missing facts." },
      { label: "Documents", prompt: "Create a document checklist for this intake without giving legal advice." },
      { label: "Routing", prompt: "Route this inquiry by practice area, location, urgency, and review requirements." },
    ],
    faq: [
      {
        q: "Can the assistant give legal advice?",
        a: "No. It should collect facts, summarize context, prepare administrative work, and route legal questions to qualified staff.",
      },
      {
        q: "What law firm workflow should we automate first?",
        a: "Client intake, lead qualification, document collection, consultation prep, and follow-up are strong first workflows.",
      },
      {
        q: "Can it work across practice areas?",
        a: "Yes, the intake logic can be tailored by practice area, jurisdiction, urgency, document requirements, and review rules.",
      },
    ],
  },
  {
    slug: "ai-assistant-for-healthcare-clinics",
    name: "AI Assistant for Healthcare Clinics",
    shortName: "Healthcare clinics",
    icon: "heart",
    title: "AI Assistant for Healthcare Clinics | Tactas AI",
    description:
      "AI assistant workflows for healthcare clinics, patient intake, appointment preparation, forms, billing routing, and staff handoff.",
    eyebrow: "AI assistant for healthcare clinics",
    headline: "Prepare patient intake and admin support while clinical decisions stay with staff.",
    subheadline:
      "Tactas AI helps clinics reduce repetitive front-desk work around appointment requests, forms, billing questions, reminders, and non-clinical FAQs with clear handoff boundaries.",
    ctaLabel: "Book a clinic workflow review",
    secondaryCtaLabel: "See healthcare workflows",
    keywords: [
      "AI assistant for healthcare clinics",
      "AI patient intake automation",
      "AI medical office assistant",
      "clinic workflow automation",
      "AI appointment scheduling for clinics",
      "healthcare administrative automation",
    ],
    proof: [
      { label: "Intake", value: "Cleaner forms", body: "Collect patient details, visit reason, insurance context, and missing documents." },
      { label: "Scheduling", value: "Prepared requests", body: "Route appointment requests with service type, urgency, and staff handoff notes." },
      { label: "Admin", value: "Fewer repeats", body: "Answer non-clinical questions about hours, forms, billing paths, and preparation." },
      { label: "Handoff", value: "Clear boundaries", body: "Clinical, urgent, medication, and diagnosis questions route to qualified staff." },
    ],
    problems: [
      {
        title: "Front desks handle repetitive intake questions",
        body: "Patients ask about forms, preparation, records, insurance, scheduling, billing, and next steps before staff can triage.",
      },
      {
        title: "Appointment requests arrive incomplete",
        body: "Teams need visit reason, timing, patient details, insurance context, documents, and urgency before scheduling.",
      },
      {
        title: "Clinical and urgent boundaries matter",
        body: "The assistant must avoid diagnosis, treatment advice, medication guidance, and urgent symptom handling.",
      },
    ],
    useCases: [
      { title: "Patient intake", body: "Collect visit reason, patient details, forms, insurance context, and missing information.", icon: "heart" },
      { title: "Appointment prep", body: "Prepare scheduling requests with service type, urgency, and handoff notes.", icon: "briefcase" },
      { title: "Forms and documents", body: "Guide patients to required forms, records, referrals, and preparation steps.", icon: "building" },
      { title: "Billing routing", body: "Classify billing questions and route them with the right context.", icon: "cloud" },
      { title: "Patient FAQs", body: "Answer non-clinical questions about hours, location, forms, and visit preparation.", icon: "heart" },
      { title: "Staff handoff", body: "Escalate clinical, urgent, medication, privacy, and policy-sensitive issues.", icon: "gavel" },
    ],
    workflowTitle: "Healthcare assistants need administrative scope and clinical handoff rules.",
    workflowBody:
      "The assistant can prepare intake and routine admin answers, while diagnosis, treatment, urgent symptoms, and medication questions route to qualified clinical staff.",
    workflow: [
      { step: "01", title: "Patient asks", body: "A patient requests an appointment and mentions symptoms or a visit reason." },
      { step: "02", title: "Assistant collects details", body: "Basic intake, visit reason, preferred times, insurance context, and missing forms are gathered." },
      { step: "03", title: "Admin path is prepared", body: "The scheduling or intake team gets a concise summary and next steps." },
      { step: "04", title: "Clinical boundary applies", body: "Urgent symptoms, diagnosis, treatment, and medication questions escalate." },
      { step: "05", title: "Record is logged", body: "The interaction is logged with source context, handoff reason, and required follow-up." },
    ],
    guardrailTitle: "Administrative automation with clinical boundaries.",
    guardrailBody:
      "Tactas AI should support intake and operations, not replace clinical assessment. Privacy, access control, logging, and escalation rules should match the deployment model.",
    guardrails: ["No diagnosis or treatment advice", "Urgent symptom escalation", "Privacy and access review", "Logs for handoff and QA"],
    integrations: ["Website forms", "Calendars", "EHR-adjacent workflows", "Patient portal", "Email", "Phone notes", "Billing tools", "Document storage"],
    prompts: [
      { label: "Intake", prompt: "Prepare a non-clinical patient intake summary with missing details and escalation flags." },
      { label: "Scheduling", prompt: "Classify this appointment request by service type, urgency, and required staff follow-up." },
      { label: "Admin", prompt: "Answer this clinic operations question using approved policy and route clinical questions to staff." },
    ],
    faq: [
      {
        q: "Does this provide diagnosis or treatment advice?",
        a: "No. The assistant is for administrative workflows. Clinical questions, urgent symptoms, diagnosis, treatment, and medication guidance should route to qualified staff.",
      },
      {
        q: "What healthcare workflow should start first?",
        a: "Patient intake, appointment request preparation, forms, reminders, billing routing, and non-clinical FAQs are practical first workflows.",
      },
      {
        q: "Can this support privacy requirements?",
        a: "Tactas AI designs around access control, logging, escalation boundaries, and your compliance review process. Requirements depend on your systems and deployment model.",
      },
    ],
  },
  {
    slug: "ai-assistant-for-real-estate",
    name: "AI Assistant for Real Estate Teams",
    shortName: "Real estate",
    icon: "home",
    title: "AI Assistant for Real Estate Teams | Tactas AI",
    description:
      "AI assistant workflows for real estate lead qualification, property Q&A, showing preparation, buyer follow-up, and CRM updates.",
    eyebrow: "AI assistant for real estate",
    headline: "Qualify property inquiries and follow up faster across every lead source.",
    subheadline:
      "Tactas AI helps real estate teams answer listing questions, qualify buyers or renters, prepare showings, summarize conversations, and keep CRM follow-up moving.",
    ctaLabel: "Book a real estate workflow review",
    secondaryCtaLabel: "See real estate workflows",
    keywords: [
      "AI assistant for real estate",
      "real estate AI chatbot",
      "real estate lead qualification automation",
      "AI real estate assistant",
      "property inquiry automation",
      "real estate CRM automation",
    ],
    proof: [
      { label: "Leads", value: "Qualified intent", body: "Capture budget, location, timeline, financing, property type, and readiness." },
      { label: "Listings", value: "Fast answers", body: "Answer property questions using listing facts, policies, neighborhood notes, and availability." },
      { label: "Showings", value: "Prepared handoff", body: "Collect preferences, schedule context, and questions before an agent steps in." },
      { label: "CRM", value: "Clean follow-up", body: "Sync summaries, tasks, tags, and next steps after conversations." },
    ],
    problems: [
      {
        title: "Property inquiries go cold quickly",
        body: "Buyers and renters often ask questions after hours, across portals, forms, chat, email, and ads.",
      },
      {
        title: "Agents need qualification before they spend time",
        body: "Budget, location, financing, timeline, property preferences, and readiness determine the right follow-up.",
      },
      {
        title: "CRM follow-up is easy to miss",
        body: "Conversation summaries, tasks, showing notes, and next steps often lag behind active outreach.",
      },
    ],
    useCases: [
      { title: "Lead qualification", body: "Capture budget, timeline, financing, location, preferences, and readiness.", icon: "home" },
      { title: "Listing Q&A", body: "Answer property details, availability, policies, fees, amenities, and neighborhood questions.", icon: "building" },
      { title: "Showing preparation", body: "Collect questions, preferences, documents, and scheduling context before agent handoff.", icon: "briefcase" },
      { title: "Buyer follow-up", body: "Draft follow-up messages with property matches, open questions, and next steps.", icon: "cloud" },
      { title: "CRM updates", body: "Summarize conversations, create tasks, tag lead stage, and keep records current.", icon: "building" },
      { title: "Escalation control", body: "Route pricing, negotiation, legal, and fair-housing-sensitive questions to humans.", icon: "gavel" },
    ],
    workflowTitle: "Real estate assistants need fast qualification plus careful handoff.",
    workflowBody:
      "The assistant can respond to routine property questions and prepare leads, while negotiations, legal terms, and sensitive questions stay with agents.",
    workflow: [
      { step: "01", title: "Lead asks", body: "A buyer asks about a listing, price flexibility, and showing availability." },
      { step: "02", title: "Assistant qualifies", body: "Budget, timeline, financing, location, property needs, and contact preference are gathered." },
      { step: "03", title: "Listing context is checked", body: "The assistant answers approved facts about the listing and neighborhood." },
      { step: "04", title: "Sensitive issues route", body: "Negotiation, legal, and fair-housing-sensitive questions escalate to the agent." },
      { step: "05", title: "CRM gets updated", body: "A summary, tags, tasks, and next-step follow-up are prepared." },
    ],
    guardrailTitle: "Keep negotiations and sensitive housing questions with humans.",
    guardrailBody:
      "Automation can accelerate qualification and follow-up, but pricing commitments, legal terms, and fair-housing-sensitive topics need careful human handling.",
    guardrails: ["Approved listing facts only", "Human review for negotiations", "Fair-housing-sensitive escalation", "CRM logs and source context"],
    integrations: ["Website forms", "Property listings", "CRM", "Calendars", "Email", "SMS tools", "Ad leads", "Internal notes"],
    prompts: [
      { label: "Lead", prompt: "Qualify this property inquiry by budget, timeline, location, financing, and next best follow-up." },
      { label: "Listing", prompt: "Answer this listing question using approved property facts and route sensitive topics to an agent." },
      { label: "CRM", prompt: "Turn this conversation into CRM notes, lead stage, tasks, and unanswered questions." },
    ],
    faq: [
      {
        q: "What real estate workflow should we automate first?",
        a: "Start with lead qualification, listing Q&A, showing preparation, buyer follow-up, or CRM updates.",
      },
      {
        q: "Can the assistant negotiate pricing?",
        a: "It should not make pricing commitments. Negotiation, legal, and sensitive housing questions should route to agents or qualified staff.",
      },
      {
        q: "Can it work with property portals and CRM tools?",
        a: "Yes. Tactas AI can be designed around lead forms, listing data, CRM records, calendars, email, SMS tools, and internal notes.",
      },
    ],
  },
  {
    slug: "ai-assistant-for-vps-hosting-providers",
    name: "AI Assistant for VPS Hosting Providers",
    shortName: "VPS hosting",
    icon: "server",
    title: "AI Assistant for VPS Hosting Providers | Tactas AI",
    description:
      "AI assistant workflows for VPS hosting support, DNS, SSH, SSL, billing, migration, abuse triage, and technical escalation.",
    eyebrow: "AI assistant for VPS hosting",
    headline: "Deflect repetitive VPS support while risky server actions stay controlled.",
    subheadline:
      "Tactas AI helps hosting teams answer setup questions, triage incidents, guide DNS and SSL issues, prepare migration tickets, and escalate destructive or account-sensitive actions.",
    ctaLabel: "Book a hosting workflow review",
    secondaryCtaLabel: "See VPS workflows",
    keywords: [
      "AI assistant for VPS providers",
      "AI support assistant for hosting companies",
      "hosting support automation",
      "VPS support automation",
      "AI chatbot for hosting providers",
      "technical support AI assistant",
    ],
    proof: [
      { label: "Setup", value: "Faster starts", body: "Guide SSH, DNS, firewall, SSL, backups, control panel, and first deploy questions." },
      { label: "Tickets", value: "Cleaner triage", body: "Classify outages, performance, abuse, migration, billing, and access issues." },
      { label: "Docs", value: "Source-backed", body: "Answer using provider docs, plan limits, runbooks, and status context." },
      { label: "Safety", value: "Risk gates", body: "Escalate destructive commands, account actions, abuse cases, and incidents." },
    ],
    problems: [
      {
        title: "Technical support repeats the same setup guidance",
        body: "Customers ask about SSH keys, DNS records, SSL, firewalls, backups, ports, panels, migrations, and common Linux tasks.",
      },
      {
        title: "Risky instructions need boundaries",
        body: "Bad commands, destructive changes, security-sensitive actions, and account changes can create real damage.",
      },
      {
        title: "Incidents need structured escalation",
        body: "Outages, abuse reports, performance issues, and migration failures require clean triage and human review.",
      },
    ],
    useCases: [
      { title: "VPS setup assistant", body: "Guide SSH access, initial hardening, DNS records, SSL, firewall basics, and backups.", icon: "server" },
      { title: "Hosting docs Q&A", body: "Answer support questions using provider docs, plan limits, status pages, and runbooks.", icon: "cloud" },
      { title: "Incident triage", body: "Classify outage, performance, network, abuse, and account issues with required details.", icon: "briefcase" },
      { title: "Migration prep", body: "Collect source server, stack, DNS, data size, downtime window, and risk notes.", icon: "server" },
      { title: "Billing and renewal", body: "Answer plan, invoice, renewal, upgrade, cancellation, and refund-path questions.", icon: "building" },
      { title: "Safety escalation", body: "Route destructive commands, account access, abuse, and production incidents to humans.", icon: "gavel" },
    ],
    workflowTitle: "Hosting assistants need technical accuracy and action safety.",
    workflowBody:
      "The assistant can guide common setup and support questions, but destructive commands, access changes, abuse, and incidents require confirmation or human escalation.",
    workflow: [
      { step: "01", title: "Customer asks", body: "A VPS customer asks how to fix SSL after changing DNS." },
      { step: "02", title: "Assistant checks context", body: "Docs, plan type, DNS status, control panel notes, and known incidents are reviewed." },
      { step: "03", title: "Guidance is prepared", body: "The assistant explains likely causes, safe checks, and links to provider-specific docs." },
      { step: "04", title: "Risk is detected", body: "Destructive commands, credential exposure, account changes, and incident signals escalate." },
      { step: "05", title: "Ticket is enriched", body: "If unresolved, the human support ticket includes steps tried, logs requested, and environment context." },
    ],
    guardrailTitle: "Technical help should be useful without being reckless.",
    guardrailBody:
      "Tactas AI can explain and triage, while destructive commands, credential handling, account changes, abuse cases, and incident response remain controlled.",
    guardrails: ["Explain-before-action guidance", "Confirm destructive commands", "Escalate credential and abuse issues", "Ticket logs with source links"],
    integrations: ["Knowledge base", "Status page", "Billing system", "Ticketing", "Control panel", "Monitoring", "Runbooks", "Customer portal"],
    prompts: [
      { label: "Setup", prompt: "Guide this VPS customer through safe first checks for SSH, DNS, SSL, and firewall setup." },
      { label: "Triage", prompt: "Classify this hosting ticket by urgency, likely category, missing logs, and escalation path." },
      { label: "Migration", prompt: "Prepare a VPS migration checklist with source server details, DNS timing, data size, and risks." },
    ],
    faq: [
      {
        q: "Can the assistant give Linux commands?",
        a: "It can provide safe, provider-approved guidance, but destructive commands, credential handling, production-impacting actions, and uncertain fixes should require confirmation or human escalation.",
      },
      {
        q: "What VPS support workflow should we automate first?",
        a: "Start with setup questions, docs Q&A, DNS and SSL triage, billing questions, migration prep, or ticket enrichment.",
      },
      {
        q: "Can it reduce hosting support tickets?",
        a: "Yes, especially for repetitive setup, billing, docs, and triage questions. Complex incidents and account-sensitive actions should still escalate.",
      },
    ],
  },
];

export function getIndustryLandingPage(slug: string) {
  return industryLandingPages.find((page) => page.slug === slug);
}

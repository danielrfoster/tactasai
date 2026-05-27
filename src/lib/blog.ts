export interface BlogPostSection {
  heading: string;
  body: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readTime: string;
  keywords: string[];
  summary: string;
  sections: BlogPostSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "business-task-automation-managed-ai-agents",
    title: "Business Task Automation With Managed AI Agents",
    description:
      "How managed AI agents can use company knowledge, business context, and connected tools to automate repeated business tasks.",
    category: "Business Task Automation",
    publishedAt: "2026-05-28",
    readTime: "5 min read",
    keywords: [
      "business task automation",
      "managed AI agents",
      "AI agents for business operations",
      "automate repeated business tasks",
    ],
    summary:
      "The best first AI automation projects are not broad transformations. They are repeated business tasks where context, output, and next action are clear.",
    sections: [
      {
        heading: "Start With Work That Repeats",
        body: [
          "Managed AI agents create value fastest when the task happens often, uses familiar company context, and has a clear output. That output might be a summary, a status update, a next step, a draft, a task, or an automated action in a connected tool.",
          "This framing keeps automation close to real work. Instead of starting with a department label, start with the business task people repeat every week.",
        ],
      },
      {
        heading: "Use Company Knowledge As Operating Context",
        body: [
          "AI agents need more than a prompt. They need the documents, records, examples, tool activity, and business context that explain how work should happen inside the company.",
          "When that context is available, agents can prepare work that is closer to usable: source-backed answers, action-ready summaries, recommended owners, task updates, and follow-up drafts.",
        ],
      },
      {
        heading: "Connect Tools After The Task Is Clear",
        body: [
          "Tool connection should follow the task. Once the repeated task is clear, it becomes easier to decide which tools the agent needs to read from, write to, or use to move work forward.",
          "This is how business task automation becomes practical: choose one task, connect the knowledge and tools behind it, then improve the output pattern over time.",
        ],
      },
    ],
  },
  {
    slug: "company-knowledge-action-ready-context",
    title: "Turning Company Knowledge Into Action-Ready Context",
    description:
      "Why company knowledge should support answers, summaries, outputs, next steps, and automated business tasks instead of staying as passive documents.",
    category: "Company Knowledge",
    publishedAt: "2026-05-28",
    readTime: "4 min read",
    keywords: [
      "company knowledge automation",
      "company knowledge layer",
      "AI agents that use company knowledge",
      "action-ready context",
    ],
    summary:
      "A knowledge layer is most useful when it helps AI agents prepare work, not just search documents.",
    sections: [
      {
        heading: "Knowledge Should Lead To Work",
        body: [
          "Most companies already have useful knowledge spread across files, docs, tools, messages, and business systems. The problem is that this knowledge is often passive. People still have to search, interpret, rewrite, and move the work forward manually.",
          "For managed AI agents, company knowledge should become action-ready context. It should help the agent answer, summarize, draft, update, recommend, and automate.",
        ],
      },
      {
        heading: "Search Is A Proof Point, Not The Category",
        body: [
          "Source-backed answers, semantic search, and retrieval are useful capabilities. But the larger business value is what happens after the right context is found.",
          "The agent should be able to use that context to prepare a decision brief, summarize changes, create next steps, update work status, or support a repeated business task.",
        ],
      },
      {
        heading: "Build Around Reuse",
        body: [
          "Every repeated request is a signal. If teams keep asking the same questions or rebuilding the same summary, that pattern should become reusable knowledge for future work.",
          "This turns company knowledge into an operating asset for managed agents, not just a library people search when they have time.",
        ],
      },
    ],
  },
  {
    slug: "choose-first-managed-ai-agent-task",
    title: "How To Choose The First Task For A Managed AI Agent",
    description:
      "A practical way to choose the first business task for managed AI agents: repeated work, clear context, connected tools, and measurable output.",
    category: "Task Review",
    publishedAt: "2026-05-28",
    readTime: "6 min read",
    keywords: [
      "managed AI agent task",
      "AI task automation for business teams",
      "business task review",
      "AI agents for connected business tools",
    ],
    summary:
      "The first task should be narrow enough to launch, valuable enough to matter, and connected enough to teach the agent how the business works.",
    sections: [
      {
        heading: "Look For Repetition And Friction",
        body: [
          "A good first task is repeated often and creates drag for the team. It may involve reading the same sources, rewriting the same updates, checking several tools, or deciding the same next step again and again.",
          "The goal is not to automate everything at once. The goal is to find a task where an agent can reliably turn context into useful work.",
        ],
      },
      {
        heading: "Check The Context",
        body: [
          "The task should have enough company knowledge available for an agent to work from: documents, examples, records, messages, previous decisions, or tool data.",
          "If the task depends only on human memory, start by building the knowledge layer. If the task already has visible context, it may be ready for automation.",
        ],
      },
      {
        heading: "Define The Output",
        body: [
          "Before connecting tools, define what good work looks like. The output might be a summary, an answer, a next step, a task update, a follow-up draft, or a prepared action.",
          "A clear output makes the first managed agent easier to evaluate, improve, and expand into adjacent tasks.",
        ],
      },
    ],
  },
];

export const getBlogPostBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug);

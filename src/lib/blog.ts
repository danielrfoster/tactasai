import { aiAgentImplementationChecklistBusinessOperations } from "../content/blog/ai-agent-implementation-checklist-business-operations";
import { businessTaskAutomationManagedAIAgents } from "../content/blog/business-task-automation-managed-ai-agents";
import { chooseFirstManagedAIAgentTask } from "../content/blog/choose-first-managed-ai-agent-task";
import { companyKnowledgeActionReadyContext } from "../content/blog/company-knowledge-action-ready-context";
import { customerSupportAIAgent } from "../content/blog/customer-support-ai-agent";
import { gleanVsGuruVsTactasai } from "../content/blog/glean-vs-guru-vs-tactasai";
import { salesLeadQualificationAgent } from "../content/blog/sales-lead-qualification-agent";
import type { BlogPost, BlogPostSection } from "../content/blog/types";

export type { BlogPost, BlogPostSection };

export const blogPosts: BlogPost[] = [
  customerSupportAIAgent,
  salesLeadQualificationAgent,
  aiAgentImplementationChecklistBusinessOperations,
  gleanVsGuruVsTactasai,
  businessTaskAutomationManagedAIAgents,
  companyKnowledgeActionReadyContext,
  chooseFirstManagedAIAgentTask,
].sort((a, b) => {
  return new Date(`${b.publishedAt}T00:00:00`).getTime() - new Date(`${a.publishedAt}T00:00:00`).getTime();
});

export const getBlogPostBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug);

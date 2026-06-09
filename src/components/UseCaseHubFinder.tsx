import { ArrowRight, Check, GitCompare, Mail, RotateCcw, Search, Send, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { UseCaseItem } from "../lib/useCases";

interface Props {
  useCases: UseCaseItem[];
  departments: string[];
  industries: string[];
  workflowTypes: string[];
  complexities: string[];
  outputTypes: string[];
  brandEmail: string;
}

interface Filters {
  query: string;
  department: string;
  industry: string;
  workflowType: string;
  system: string;
  complexity: string;
  output: string;
}

const emptyFilters: Filters = {
  query: "",
  department: "",
  industry: "",
  workflowType: "",
  system: "",
  complexity: "",
  output: "",
};

const normalized = (value: string) => value.toLowerCase().trim();
const unique = (values: string[]) => Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));

export default function UseCaseHubFinder({
  useCases,
  departments,
  industries,
  workflowTypes,
  complexities,
  outputTypes,
  brandEmail,
}: Props) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [urgency, setUrgency] = useState("This quarter");
  const [desiredOutput, setDesiredOutput] = useState("");

  const systems = useMemo(() => unique(useCases.flatMap((item) => item.systems)), [useCases]);
  const categoryTabs = ["All", ...departments.slice(0, 8)];
  const selectedUseCases = useMemo(
    () => selectedSlugs.map((slug) => useCases.find((item) => item.slug === slug)).filter((item): item is UseCaseItem => Boolean(item)),
    [selectedSlugs, useCases],
  );

  const filteredUseCases = useMemo(() => {
    const query = normalized(filters.query);
    return useCases.filter((item) => {
      const haystack = normalized(
        [
          item.title,
          item.summary,
          item.department,
          item.industry,
          item.workflowType,
          item.complexity,
          item.buyerRole,
          item.primaryOutput,
          item.inputs.join(" "),
          item.systems.join(" "),
          item.usefulThings.map((asset) => `${asset.title} ${asset.body}`).join(" "),
          item.outputs.map((output) => `${output.title} ${output.body}`).join(" "),
          item.metrics.join(" "),
          item.keywords.join(" "),
        ].join(" "),
      );

      return (
        (!query || haystack.includes(query)) &&
        (!filters.department || item.department === filters.department) &&
        (!filters.industry || item.industry === filters.industry) &&
        (!filters.workflowType || item.workflowType === filters.workflowType) &&
        (!filters.system || item.systems.includes(filters.system)) &&
        (!filters.complexity || item.complexity === filters.complexity) &&
        (!filters.output || item.primaryOutput === filters.output || item.outputs.some((output) => output.title === filters.output))
      );
    });
  }, [filters, useCases]);

  const setFilter = (key: keyof Filters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const resetFilters = () => setFilters(emptyFilters);

  const toggleSelected = (slug: string) => {
    setSelectedSlugs((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      return [...current.slice(-2), slug];
    });
  };

  const buildInquiry = () => {
    const chosen = selectedUseCases.length > 0 ? selectedUseCases : filteredUseCases.slice(0, 3);
    const payload = {
      company,
      email,
      urgency,
      desiredOutput,
      selectedUseCases: chosen.map((item) => ({
        slug: item.slug,
        title: item.title,
        department: item.department,
        industry: item.industry,
        workflowType: item.workflowType,
        complexity: item.complexity,
        systems: item.systems,
        primaryOutput: item.primaryOutput,
        usefulThings: item.usefulThings.map((asset) => asset.title),
      })),
      filters,
    };

    const body = [
      "Use case hub inquiry",
      "",
      `Company: ${company}`,
      `Work email: ${email}`,
      `Urgency: ${urgency}`,
      `Desired working surface/output: ${desiredOutput}`,
      "",
      "Selected use cases:",
      ...chosen.map((item, index) => `${index + 1}. ${item.title} (${item.department}, ${item.workflowType}) - ${item.systems.slice(0, 5).join(", ")}`),
      "",
      "Structured payload:",
      JSON.stringify(payload, null, 2),
    ].join("\n");

    window.location.href = `mailto:${brandEmail}?subject=${encodeURIComponent("Tactas AI use case review")}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="use-case-finder" className="border-b border-black/10 bg-white">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-tactas-accent-strong">Use case library</p>
          <h2 className="mt-3 text-[34px] font-semibold leading-tight tracking-normal text-tactas-ink-strong sm:text-[50px]">
            Browse by team, feature, or system.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-tactas-muted">
            Every example shows the business problem, systems, and working surface your team could create around the task.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-[820px] rounded-[20px] border border-black/10 bg-[#fbfaf7] p-3 shadow-sm">
          <label className="relative block">
            <span className="sr-only">Search use cases</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-tactas-muted-soft" strokeWidth={1.9} />
            <input
              type="search"
              value={filters.query}
              onChange={(event) => setFilter("query", event.target.value)}
              className="h-14 w-full rounded-[16px] border border-black/10 bg-white pl-12 pr-4 text-[16px] text-tactas-ink outline-none transition placeholder:text-tactas-muted-soft focus:border-tactas-accent-strong focus:ring-2 focus:ring-tactas-accent/15"
              placeholder="Search resolution package, CRM workspace, Zendesk, invoice, access review..."
            />
          </label>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {categoryTabs.map((tab) => {
              const value = tab === "All" ? "" : tab;
              const active = filters.department === value;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilter("department", value)}
                  className={[
                    "h-10 shrink-0 rounded-full border px-4 text-[13px] font-semibold transition",
                    active ? "border-tactas-ink-strong bg-tactas-ink-strong text-white" : "border-black/10 bg-white text-tactas-muted hover:border-tactas-accent-line hover:text-tactas-accent-strong",
                  ].join(" ")}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-3 rounded-[18px] border border-black/10 bg-[#fbfaf7] p-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
          <FilterSelect label="Industry" value={filters.industry} options={industries} onChange={(value) => setFilter("industry", value)} />
          <FilterSelect label="Workflow" value={filters.workflowType} options={workflowTypes} onChange={(value) => setFilter("workflowType", value)} />
          <FilterSelect label="System" value={filters.system} options={systems} onChange={(value) => setFilter("system", value)} />
          <FilterSelect label="Output" value={filters.output} options={outputTypes} onChange={(value) => setFilter("output", value)} />
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[14px] border border-black/10 bg-white px-4 text-[13px] font-semibold text-tactas-ink-strong transition hover:border-tactas-accent hover:text-tactas-accent-strong"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.9} />
            Reset
          </button>
        </div>

        <div className="mt-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-[14px] text-tactas-muted">
            <span className="font-semibold text-tactas-ink-strong">{filteredUseCases.length}</span> use cases found
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-black/10 bg-[#fbfaf7] px-3 py-1.5 text-[12px] font-semibold text-tactas-muted">
              {selectedUseCases.length} selected
            </span>
            <a href="#task-fit" className="inline-flex items-center text-[13px] font-semibold text-tactas-accent-strong transition hover:text-tactas-primary-strong">
              Submit yours
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" strokeWidth={1.9} />
            </a>
          </div>
        </div>

        {filteredUseCases.length === 0 ? (
          <div className="mt-8 rounded-[20px] border border-dashed border-black/20 bg-[#fbfaf7] px-6 py-12 text-center">
            <p className="text-[20px] font-semibold text-tactas-ink-strong">No matching use cases.</p>
            <p className="mt-2 text-[14px] text-tactas-muted-soft">Try another team, feature, system, or keyword.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredUseCases.map((item, index) => {
              const isSelected = selectedSlugs.includes(item.slug);
              return (
                <article key={item.slug} className="group overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_28px_80px_-56px_rgba(15,23,42,0.34)]">
                  <div className={["flex min-h-28 items-start justify-between p-5", cardHeaderClass(index)].join(" ")}>
                    <div>
                      <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[12px] font-semibold text-tactas-ink">{item.department}</span>
                      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-tactas-muted-soft">Built with Tactas AI</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSelected(item.slug)}
                      className={[
                        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition",
                        isSelected ? "border-tactas-ink-strong bg-tactas-ink-strong text-white" : "border-black/10 bg-white/80 text-tactas-muted hover:border-tactas-accent hover:text-tactas-accent-strong",
                      ].join(" ")}
                      aria-label={isSelected ? `Remove ${item.title}` : `Select ${item.title}`}
                    >
                      {isSelected ? <Check className="h-4 w-4" strokeWidth={2.2} /> : <GitCompare className="h-4 w-4" strokeWidth={1.9} />}
                    </button>
                  </div>

                  <div className="p-5">
                    <a href={`/use-cases/${item.slug}`} className="block text-[22px] font-semibold leading-tight tracking-normal text-tactas-ink-strong transition group-hover:text-tactas-accent-strong">
                      {item.title}
                    </a>
                    <p className="mt-3 line-clamp-3 min-h-[68px] text-[14px] leading-relaxed text-tactas-muted">{item.summary}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full bg-tactas-bg px-3 py-1 text-[11px] font-medium text-tactas-muted">{item.workflowType}</span>
                      <span className="rounded-full bg-tactas-bg px-3 py-1 text-[11px] font-medium text-tactas-muted">{item.primaryOutput}</span>
                      <span className="rounded-full bg-tactas-bg px-3 py-1 text-[11px] font-medium text-tactas-muted">{item.complexity}</span>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-black/10 pt-4">
                      <span className="truncate text-[12px] text-tactas-muted-soft">{item.systems.slice(0, 3).join(", ")}</span>
                      <a href={`/use-cases/${item.slug}`} className="inline-flex shrink-0 items-center text-[13px] font-semibold text-tactas-accent-strong transition hover:text-tactas-primary-strong">
                        View
                        <ArrowRight className="ml-1 h-3.5 w-3.5" strokeWidth={1.9} />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {selectedUseCases.length > 0 ? (
          <section className="mt-8 rounded-[20px] border border-black/10 bg-[#fbfaf7] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-tactas-accent-strong">Selected</p>
                <h3 className="mt-1 text-[24px] font-semibold tracking-normal text-tactas-ink-strong">Compare up to three workflows.</h3>
              </div>
              <button type="button" onClick={() => setSelectedSlugs([])} className="inline-flex h-10 items-center justify-center gap-2 rounded-[14px] border border-black/10 bg-white px-4 text-[13px] font-semibold text-tactas-muted transition hover:border-tactas-accent hover:text-tactas-accent-strong">
                <X className="h-4 w-4" strokeWidth={1.9} />
                Clear
              </button>
            </div>
            <div className="mt-5 grid gap-3 lg:grid-cols-3">
              {selectedUseCases.map((item) => (
                <div key={item.slug} className="rounded-[16px] border border-black/10 bg-white p-4">
                  <h4 className="text-[18px] font-semibold text-tactas-ink-strong">{item.title}</h4>
                  <p className="mt-2 text-[13px] leading-relaxed text-tactas-muted">{item.primaryOutput} for {item.buyerRole}</p>
                  <p className="mt-3 text-[12px] leading-relaxed text-tactas-muted-soft">{item.usefulThings.slice(0, 2).map((asset) => asset.title).join(" + ")}</p>
                  <p className="mt-3 text-[12px] text-tactas-muted-soft">{item.systems.slice(0, 4).join(", ")}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section id="task-fit" className="mt-10 overflow-hidden rounded-[20px] border border-black/10 bg-tactas-ink-strong text-white">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-tactas-accent">Submit use case</p>
              <h3 className="mt-3 text-[32px] font-semibold leading-tight tracking-normal">Share the workflow you want to automate.</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                Pick from selected cards or describe the working surface you want around the task. The email includes a structured payload for later CRM/API capture.
              </p>
            </div>

            <div className="p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                  Company
                  <input value={company} onChange={(event) => setCompany(event.target.value)} className="h-11 rounded-[14px] border border-white/10 bg-white/10 px-3.5 text-[14px] normal-case tracking-normal text-white outline-none transition placeholder:text-white/38 focus:border-tactas-accent" placeholder="Company name" />
                </label>
                <label className="grid gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                  Work email
                  <input value={email} onChange={(event) => setEmail(event.target.value)} className="h-11 rounded-[14px] border border-white/10 bg-white/10 px-3.5 text-[14px] normal-case tracking-normal text-white outline-none transition placeholder:text-white/38 focus:border-tactas-accent" placeholder="you@company.com" />
                </label>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                  Urgency
                  <select value={urgency} onChange={(event) => setUrgency(event.target.value)} className="h-11 rounded-[14px] border border-white/10 bg-white/10 px-3.5 text-[14px] normal-case tracking-normal text-white outline-none transition focus:border-tactas-accent">
                    <option>This quarter</option>
                    <option>This month</option>
                    <option>Exploring for next quarter</option>
                    <option>Active operational pain</option>
                  </select>
                </label>
                <label className="grid gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                  Desired output
                  <input value={desiredOutput} onChange={(event) => setDesiredOutput(event.target.value)} className="h-11 rounded-[14px] border border-white/10 bg-white/10 px-3.5 text-[14px] normal-case tracking-normal text-white outline-none transition placeholder:text-white/38 focus:border-tactas-accent" placeholder="Workspace, report, queue, review view..." />
                </label>
              </div>
              <button type="button" onClick={buildInquiry} className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-white px-6 text-[14px] font-semibold text-tactas-ink-strong transition hover:bg-tactas-accent hover:text-white">
                <Send className="h-4 w-4" strokeWidth={2} />
                Submit use case
              </button>
              <p className="mt-3 flex items-center justify-center gap-2 text-center text-[12px] text-white/50">
                <Mail className="h-3.5 w-3.5" strokeWidth={1.9} />
                Opens email to {brandEmail}
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-tactas-muted-soft">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-[14px] border border-black/10 bg-white px-3 text-[13px] normal-case tracking-normal text-tactas-ink outline-none transition focus:border-tactas-accent-strong focus:ring-2 focus:ring-tactas-accent/15"
      >
        <option value="">All {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function cardHeaderClass(index: number) {
  if (index % 4 === 0) return "bg-[linear-gradient(135deg,#e8fbff_0%,#f4f7ff_100%)]";
  if (index % 4 === 1) return "bg-[linear-gradient(135deg,#f7f1ff_0%,#eef7ff_100%)]";
  if (index % 4 === 2) return "bg-[linear-gradient(135deg,#fff7e6_0%,#eefcff_100%)]";
  return "bg-[linear-gradient(135deg,#f1fff8_0%,#f5f7ff_100%)]";
}

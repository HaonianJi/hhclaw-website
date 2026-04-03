import BibTexCopy from '@/components/BibTexCopy';

/* ─── Data ──────────────────────────────────────────────────── */
const EVAL_DIMS = [
  {
    id: 'MS-R',
    name: 'Multi-Step Reasoning',
    icon: '🧠',
    color: '#6366f1',
    bg: '#eef2ff',
    darkBg: '#1e1b4b',
    description:
      'Evaluates the agent\'s ability to chain multiple reasoning steps, retrieve relevant context from prior turns, and maintain coherent task state across a conversation.',
  },
  {
    id: 'DU',
    name: 'Decision Under Uncertainty',
    icon: '⚖️',
    color: '#0891b2',
    bg: '#ecfeff',
    darkBg: '#083344',
    description:
      'Measures how well agents handle ambiguous instructions, missing context, or conflicting preferences — including appropriate clarification-seeking behavior.',
  },
  {
    id: 'P',
    name: 'Planning',
    icon: '🗂️',
    color: '#059669',
    bg: '#ecfdf5',
    darkBg: '#052e16',
    description:
      'Tests structured task decomposition and goal-directed planning — especially for multi-step workflows like scheduling, delegation, and priority management.',
  },
  {
    id: 'EC',
    name: 'Executable Code',
    icon: '⚡',
    color: '#d97706',
    bg: '#fffbeb',
    darkBg: '#292524',
    description:
      'Requires agents to produce working code that passes automated test suites. Covers data processing, automation scripts, and tool-use within sandboxed environments.',
  },
  {
    id: 'NON',
    name: 'Non-Task Handling',
    icon: '🛡️',
    color: '#dc2626',
    bg: '#fef2f2',
    darkBg: '#2d1515',
    description:
      'Assesses graceful handling of out-of-scope requests, safety boundaries, refusals, and appropriate escalation — critical for production personal assistants.',
  },
];

const SPEC_LAYERS = [
  { id: 'L0', label: 'Global Rules',   desc: 'Universal constraints applicable to every scenario across all domains.' },
  { id: 'L1', label: 'Domain Rules',   desc: 'Domain-specific norms and expectations for each of the 8 life domains.' },
  { id: 'L2', label: 'Persona',        desc: 'User identity, preferences, communication style, and persistent context.' },
  { id: 'L3', label: 'Scenario Setup', desc: 'Per-scenario initial state, tools available, and background knowledge.' },
  { id: 'L4', label: 'Task Spec',      desc: 'Specific task instructions, expected outputs, and evaluation rubrics.' },
  { id: 'GUIDE', label: 'Evaluator Guide', desc: 'Human and LLM judge guidelines for consistent, calibrated scoring.' },
];

const DOMAINS = [
  { id: 'C', name: 'Tech/HR Startup',  persona: 'Alex Rivera (CEO)',          lang: 'EN', scenarios: 8, rounds: 204, icon: '💼' },
  { id: 'D', name: 'Hospital Admin',   persona: 'Dr. Kenji Tanaka',           lang: 'EN', scenarios: 8, rounds: 240, icon: '🏥' },
  { id: 'E', name: 'Nonprofit/NGO',    persona: 'Sarah Chen',                 lang: 'EN', scenarios: 8, rounds: 240, icon: '🌱' },
  { id: 'F', name: 'Family/Personal',  persona: '赵磊 (Quant Trader)',         lang: 'ZH', scenarios: 8, rounds: 240, icon: '🏠' },
  { id: 'G', name: 'Tech Corporate',   persona: '陈静 (HR Manager)',           lang: 'ZH', scenarios: 8, rounds: 240, icon: '🏢' },
  { id: 'H', name: 'Campus/Student',   persona: '王明 (CS Undergrad)',         lang: 'ZH', scenarios: 8, rounds: 235, icon: '🎓' },
  { id: 'I', name: 'Clinical/Medical', persona: '林逸 (ER Attending)',         lang: 'ZH', scenarios: 8, rounds: 240, icon: '🩺' },
  { id: 'J', name: 'Community/MCN',    persona: '周芳 (Food Blogger)',         lang: 'ZH', scenarios: 8, rounds: 240, icon: '📱' },
];

/* ─── Page ──────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Hero */}
      <section className="mb-14">
        <h1
          className="font-bold tracking-tight mb-4"
          style={{ fontSize: '2rem', color: 'var(--text)' }}
        >
          About HHClaw
        </h1>
        <div
          className="rounded-xl p-6"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            <strong style={{ color: 'var(--text)' }}>HHClaw</strong> (Human-in-the-Loop Claw) is a rigorous
            evaluation framework designed to measure how well AI assistants perform as personal productivity
            tools in realistic, multi-turn interaction settings. Unlike benchmarks that evaluate isolated
            capabilities, HHClaw tests agents on complete <em>workflow scenarios</em> — from scheduling and
            email triage to code generation and decision support — across 8 distinct life domains with
            4 English-speaking and 4 Chinese-speaking user personas.
          </p>
          <p className="mt-4" style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            The benchmark comprises <strong style={{ color: 'var(--text)' }}>64 scenarios</strong>,{' '}
            <strong style={{ color: 'var(--text)' }}>1,879 evaluation rounds</strong>, and a
            hierarchical 6-layer specification system (L0–L4 + GUIDE) that ensures consistent,
            auditable evaluation across all configurations.
          </p>
        </div>
      </section>

      {/* Evaluation Dimensions */}
      <section className="mb-14">
        <h2
          className="font-bold mb-2"
          style={{ fontSize: '1.375rem', color: 'var(--text)' }}
        >
          5 Evaluation Dimensions
        </h2>
        <p className="mb-6" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Each scenario is scored across five orthogonal capability dimensions.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EVAL_DIMS.map((dim) => (
            <div
              key={dim.id}
              className="rounded-xl p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: dim.bg }}
                >
                  {dim.icon}
                </div>
                <div>
                  <span
                    className="inline-block px-2 py-0.5 rounded-full text-xs font-bold font-mono"
                    style={{ background: dim.bg, color: dim.color }}
                  >
                    {dim.id}
                  </span>
                  <div
                    className="font-semibold mt-0.5"
                    style={{ fontSize: '0.875rem', color: 'var(--text)' }}
                  >
                    {dim.name}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dim.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6-Layer Spec System */}
      <section className="mb-14">
        <h2
          className="font-bold mb-2"
          style={{ fontSize: '1.375rem', color: 'var(--text)' }}
        >
          6-Layer Specification System
        </h2>
        <p className="mb-6" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          HHClaw uses a hierarchical specification system to ensure reproducible and fair evaluation.
          Each layer narrows scope from global rules down to task-specific rubrics.
        </p>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
        >
          {SPEC_LAYERS.map((layer, idx) => (
            <div
              key={layer.id}
              className="flex items-start gap-4 p-4 transition-colors duration-150 hover:bg-[var(--primary-light)]"
              style={{
                background: idx % 2 === 0 ? 'var(--surface)' : 'var(--surface-alt)',
                borderBottom: idx < SPEC_LAYERS.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              {/* Arrow indicator */}
              <div className="flex flex-col items-center" style={{ marginTop: 2 }}>
                <span
                  className="inline-block px-2 py-1 rounded-md font-bold font-mono text-xs"
                  style={{ background: 'var(--primary-light)', color: 'var(--primary)', minWidth: 48, textAlign: 'center' }}
                >
                  {layer.id}
                </span>
                {idx < SPEC_LAYERS.length - 1 && (
                  <div
                    className="w-px mt-1"
                    style={{ height: 12, background: 'var(--border)' }}
                  />
                )}
              </div>
              <div>
                <div
                  className="font-semibold"
                  style={{ fontSize: '0.875rem', color: 'var(--text)' }}
                >
                  {layer.label}
                </div>
                <div
                  className="mt-1"
                  style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}
                >
                  {layer.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8 Domain Cards */}
      <section className="mb-14">
        <h2
          className="font-bold mb-2"
          style={{ fontSize: '1.375rem', color: 'var(--text)' }}
        >
          8 Evaluation Domains
        </h2>
        <p className="mb-6" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Four English and four Chinese domains, each with a distinct persona and real-world context.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DOMAINS.map((domain) => (
            <div
              key={domain.id}
              className="rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{domain.icon}</span>
                <span
                  className="font-bold font-mono text-xs px-2 py-0.5 rounded"
                  style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}
                >
                  Domain {domain.id}
                </span>
              </div>
              <div
                className="font-semibold mb-1"
                style={{ fontSize: '0.875rem', color: 'var(--text)' }}
              >
                {domain.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                {domain.persona}
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    background: domain.lang === 'EN' ? '#eff6ff' : '#fdf4ff',
                    color: domain.lang === 'EN' ? '#1d4ed8' : '#7e22ce',
                  }}
                >
                  {domain.lang}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {domain.scenarios} scenarios · {domain.rounds} rounds
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Citation */}
      <section className="mb-6">
        <h2
          className="font-bold mb-2"
          style={{ fontSize: '1.375rem', color: 'var(--text)' }}
        >
          Citation
        </h2>
        <p className="mb-4" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          If you use HHClaw in your research, please cite our paper:
        </p>
        <BibTexCopy />
      </section>
    </div>
  );
}

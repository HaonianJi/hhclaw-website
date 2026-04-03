import BibTexCopy from '@/components/BibTexCopy';

/* ─── Data ──────────────────────────────────────────────────── */
const EVAL_DIMS = [
  {
    id: 'MS',
    name: 'Multi-Source Conflict Reasoning',
    icon: '⚡',
    color: '#6366f1',
    bg: '#eef2ff',
    description:
      'Evaluates the agent\'s ability to reconcile contradictory information from multiple sources. Covers four conflict types: C1 (factual), C2 (authority), C3 (non-conflict), and C4 (temporal/process).',
  },
  {
    id: 'DU',
    name: 'Dynamic Belief Revision',
    icon: '🔄',
    color: '#0891b2',
    bg: '#ecfeff',
    description:
      'Measures how well agents update their beliefs when workspace files and session histories are modified via dynamic update packages. Difficulty is governed by update design strategy, not volume.',
  },
  {
    id: 'P',
    name: 'Implicit Personalization',
    icon: '👤',
    color: '#059669',
    bg: '#ecfdf5',
    description:
      'Tests whether agents can infer unstated user preferences from behavioral patterns in session histories — explicit preferences alone are insufficient for top performance.',
  },
];

const QUESTION_TAXONOMY = [
  { dim: 'MS',     recall: true,  reasoning: true  },
  { dim: 'DU',     recall: true,  reasoning: true  },
  { dim: 'P',      recall: true,  reasoning: true  },
  { dim: 'MS×DU',  recall: true,  reasoning: true  },
  { dim: 'MS×P',   recall: true,  reasoning: true  },
  { dim: 'DU×P',   recall: true,  reasoning: true  },
  { dim: 'All',    recall: true,  reasoning: true  },
];

const CONFLICT_TYPES = [
  { id: 'C1', name: 'Factual Conflict',        desc: 'Two or more sources assert contradictory facts about the same entity or event.' },
  { id: 'C2', name: 'Authority Conflict',       desc: 'Sources with different authority levels (e.g., official policy vs. user preference) disagree.' },
  { id: 'C3', name: 'Non-Conflict',             desc: 'Sources are consistent; tests whether agents correctly avoid hallucinating conflicts.' },
  { id: 'C4', name: 'Temporal / Process Conflict', desc: 'Information becomes outdated or process steps conflict across time-stamped sources.' },
];

const SPEC_LAYERS = [
  { id: 'L0', label: 'Narrative Bible (hidden)', desc: 'Hidden ground-truth world model defining all canonical facts for the scenario. Not visible to the agent.' },
  { id: 'L1', label: 'Workspace Files',          desc: 'Structured files accessible to the agent — documents, calendars, databases, and reference materials.' },
  { id: 'L2', label: 'Session Histories',        desc: 'Prior conversation logs that encode implicit user preferences and behavioral patterns.' },
  { id: 'L3', label: 'Evaluation Questions',     desc: 'Per-scenario questions across all 14 taxonomy categories, with reference answers.' },
  { id: 'L4', label: 'Update Packages',          desc: 'Dynamic updates that modify L1/L2 mid-evaluation to test belief revision capabilities.' },
  { id: 'Guide', label: 'Evaluator Guide',       desc: 'Human and LLM judge guidelines for consistent, calibrated scoring across all configurations.' },
];

const PIPELINE_STEPS = [
  { step: '01', label: 'Seed Construction',    desc: 'Domain experts author canonical scenario seeds with ground-truth world models (L0 Narrative Bible).' },
  { step: '02', label: 'Meta-Spec Induction',  desc: 'Structured meta-specifications are induced from seeds to define the generation space for each scenario.' },
  { step: '03', label: 'Batch Generation',     desc: 'LLM-assisted generation populates workspace files (L1), session histories (L2), questions (L3), and update packages (L4) at scale.' },
  { step: '04', label: 'Validation',           desc: 'Automated consistency checks and human review ensure factual accuracy, conflict fidelity, and evaluation quality.' },
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
          About ClawArena
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
            <strong style={{ color: 'var(--text)' }}>ClawArena</strong> is a rigorous evaluation
            framework for benchmarking AI agents in evolving information environments. Unlike benchmarks
            that test static knowledge, ClawArena places agents in scenarios where information
            changes — requiring <em>multi-source conflict reasoning</em>, <em>dynamic belief revision</em>,
            and <em>implicit personalization</em> across 64 professional scenarios in 8 domains.
          </p>
          <p className="mt-4" style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            The benchmark comprises <strong style={{ color: 'var(--text)' }}>64 scenarios</strong>,{' '}
            <strong style={{ color: 'var(--text)' }}>1,879 evaluation rounds</strong>,{' '}
            <strong style={{ color: 'var(--text)' }}>365 dynamic updates</strong>, and a
            hierarchical 6-layer specification system (L0 Narrative Bible → L1–L4 → Guide) that ensures
            consistent, auditable evaluation across all configurations. Under review at{' '}
            <strong style={{ color: 'var(--text)' }}>COLM 2026</strong>.
          </p>
        </div>
      </section>

      {/* 3 Evaluation Dimensions */}
      <section className="mb-14">
        <h2
          className="font-bold mb-2"
          style={{ fontSize: '1.375rem', color: 'var(--text)' }}
        >
          3 Evaluation Dimensions
        </h2>
        <p className="mb-6" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Each scenario is scored across three orthogonal capability dimensions (Section 2 of the paper).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

      {/* 14-Category Question Taxonomy */}
      <section className="mb-14">
        <h2
          className="font-bold mb-2"
          style={{ fontSize: '1.375rem', color: 'var(--text)' }}
        >
          14-Category Question Taxonomy (Table 1)
        </h2>
        <p className="mb-6" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Seven dimension combinations × two question types (Recall and Reasoning) = 14 fine-grained
          evaluation categories. This structure allows aggregate scores to be decomposed into
          qualitatively distinct failure modes.
        </p>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
        >
          <div
            className="grid font-semibold px-4 py-2.5"
            style={{
              gridTemplateColumns: '1fr 1fr 1fr',
              background: 'var(--surface-alt)',
              borderBottom: '1px solid var(--border)',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
            }}
          >
            <span>Dimension Combination</span>
            <span>Recall</span>
            <span>Reasoning</span>
          </div>
          {QUESTION_TAXONOMY.map((row, idx) => (
            <div
              key={row.dim}
              className="grid px-4 py-3 hover:bg-[var(--primary-light)] transition-colors"
              style={{
                gridTemplateColumns: '1fr 1fr 1fr',
                background: idx % 2 === 0 ? 'var(--surface)' : 'var(--surface-alt)',
                borderBottom: idx < QUESTION_TAXONOMY.length - 1 ? '1px solid var(--border)' : 'none',
                fontSize: '0.875rem',
              }}
            >
              <span className="font-mono font-bold" style={{ color: 'var(--primary)' }}>{row.dim}</span>
              <span style={{ color: 'var(--text)' }}>✓ {row.dim}-Recall</span>
              <span style={{ color: 'var(--text)' }}>✓ {row.dim}-Reasoning</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Conflict Types */}
      <section className="mb-14">
        <h2
          className="font-bold mb-2"
          style={{ fontSize: '1.375rem', color: 'var(--text)' }}
        >
          Four Conflict Types
        </h2>
        <p className="mb-6" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          The MS dimension is further subdivided by conflict type to capture qualitatively distinct
          reasoning challenges.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CONFLICT_TYPES.map((ct) => (
            <div
              key={ct.id}
              className="rounded-xl p-4"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="font-mono font-bold text-xs px-2 py-1 rounded"
                  style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}
                >
                  {ct.id}
                </span>
                <span className="font-semibold" style={{ fontSize: '0.875rem', color: 'var(--text)' }}>
                  {ct.name}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {ct.desc}
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
          6-Layer Specification System (Section 2.3)
        </h2>
        <p className="mb-6" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          ClawArena uses a hierarchical specification system to ensure reproducible and fair evaluation.
          Each layer narrows scope from a hidden ground-truth model down to dynamic update packages.
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

      {/* Construction Pipeline */}
      <section className="mb-14">
        <h2
          className="font-bold mb-2"
          style={{ fontSize: '1.375rem', color: 'var(--text)' }}
        >
          Construction Pipeline (Section 2.4)
        </h2>
        <p className="mb-6" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          ClawArena scenarios are constructed via a four-stage pipeline that balances expert authorship
          with LLM-assisted generation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PIPELINE_STEPS.map((ps) => (
            <div
              key={ps.step}
              className="rounded-xl p-4"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                className="font-bold font-mono text-2xl mb-2"
                style={{ color: 'var(--primary)', opacity: 0.4 }}
              >
                {ps.step}
              </div>
              <div className="font-semibold mb-1" style={{ fontSize: '0.875rem', color: 'var(--text)' }}>
                {ps.label}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {ps.desc}
              </p>
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
          Four English and four Chinese domains, each with a distinct professional persona and real-world context.
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
          If you use ClawArena in your research, please cite our paper:
        </p>
        <BibTexCopy />
      </section>
    </div>
  );
}

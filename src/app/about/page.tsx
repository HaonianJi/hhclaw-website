'use client';

import BibTexCopy from '@/components/BibTexCopy';

/* ─── Data ──────────────────────────────────────────────────── */
const EVAL_DIMS = [
  {
    id: 'MS',
    name: 'Multi-Source Conflict Reasoning',
    color: '#ff6b35',
    description:
      'Evaluates the agent\'s ability to reconcile contradictory information from multiple sources. Covers four conflict types: C1 (factual), C2 (authority), C3 (non-conflict), and C4 (temporal/process).',
  },
  {
    id: 'DU',
    name: 'Dynamic Belief Revision',
    color: '#f7c948',
    description:
      'Measures how well agents update their beliefs when workspace files and session histories are modified via dynamic update packages. Difficulty is governed by update design strategy, not volume.',
  },
  {
    id: 'P',
    name: 'Implicit Personalization',
    color: '#e2336b',
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
  { id: 'C1', name: 'Factual Conflict',            desc: 'Two or more sources assert contradictory facts about the same entity or event.' },
  { id: 'C2', name: 'Authority Conflict',           desc: 'Sources with different authority levels (e.g., official policy vs. user preference) disagree.' },
  { id: 'C3', name: 'Non-Conflict',                 desc: 'Sources are consistent; tests whether agents correctly avoid hallucinating conflicts.' },
  { id: 'C4', name: 'Temporal / Process Conflict',  desc: 'Information becomes outdated or process steps conflict across time-stamped sources.' },
];

const SPEC_LAYERS = [
  { id: 'L0',    label: 'Narrative Bible (hidden)', desc: 'Hidden ground-truth world model defining all canonical facts for the scenario. Not visible to the agent.' },
  { id: 'L1',    label: 'Workspace Files',          desc: 'Structured files accessible to the agent — documents, calendars, databases, and reference materials.' },
  { id: 'L2',    label: 'Session Histories',        desc: 'Prior conversation logs that encode implicit user preferences and behavioral patterns.' },
  { id: 'L3',    label: 'Evaluation Questions',     desc: 'Per-scenario questions across all 14 taxonomy categories, with reference answers.' },
  { id: 'L4',    label: 'Update Packages',          desc: 'Dynamic updates that modify L1/L2 mid-evaluation to test belief revision capabilities.' },
  { id: 'Guide', label: 'Evaluator Guide',          desc: 'Human and LLM judge guidelines for consistent, calibrated scoring across all configurations.' },
];

const PIPELINE_STEPS = [
  { step: '01', label: 'Seed Construction',    desc: 'Domain experts author scenario seeds with cross-validation until all four contradiction types are present and every answer requires multiple sources.' },
  { step: '02', label: 'Meta-Spec Induction',  desc: 'Structural invariants distilled from seeds: narrative patterns, contradiction-type ratios, bias-phrase rules, and update-question binding constraints.' },
  { step: '03', label: 'Batch Generation',     desc: 'LLM-assisted generation grounded in 200+ published empirical distributions (email volume, commit patterns, messaging activity, social network structure).' },
  { step: '04', label: 'Validation',           desc: 'Three-level checks: structural (schema, files), semantic (contradiction coverage, answer keys), and control (bias-phrase placement, non-conflict consistency).' },
  { step: '05', label: 'Refinement',           desc: 'Scenarios failing validation are removed; answer keys rewritten for clarity; MC/EC ratio rebalanced. The released 12 scenarios satisfy all design constraints.' },
];

const SCENARIOS = [
  { id: 'hil_s1', rounds: 24, mc: 8, ec: 16, context: 'Startup outage & engineering incident' },
  { id: 'hil_c7', rounds: 28, mc: 8, ec: 20, context: 'Retail analytics' },
  { id: 'hil_d3', rounds: 30, mc: 8, ec: 22, context: 'Finance' },
  { id: 'hil_e4', rounds: 24, mc: 7, ec: 17, context: 'Healthcare' },
  { id: 'hil_g4', rounds: 27, mc: 8, ec: 19, context: 'Information security' },
  { id: 'hil_g1', rounds: 30, mc: 8, ec: 22, context: 'HR' },
  { id: 'hil_h3', rounds: 27, mc: 8, ec: 19, context: 'Education' },
  { id: 'hil_j1', rounds: 30, mc: 8, ec: 22, context: 'Research integrity' },
  { id: 'hil_f3', rounds: 30, mc: 8, ec: 22, context: 'Professional services' },
  { id: 'hil_i2', rounds: 30, mc: 8, ec: 22, context: 'Clinical/Medical' },
  { id: 'hil_g3', rounds: 30, mc: 8, ec: 22, context: 'Enterprise' },
  { id: 'hil_f7', rounds: 27, mc: 8, ec: 19, context: 'E-commerce' },
];

/* ─── Page ──────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Hero */}
      <section className="mb-14">
        <h1
          className="font-bold tracking-tight mb-5"
          style={{ fontSize: '2rem', color: 'var(--text)', letterSpacing: '-0.03em' }}
        >
          About{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #ff6b35, #f7c948)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ClawArena
          </span>
        </h1>
        <div
          className="rounded-xl p-6"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            <strong style={{ color: 'var(--text)' }}>ClawArena</strong> is a rigorous evaluation
            framework for benchmarking AI agents in evolving information environments. Unlike benchmarks
            that test static knowledge, ClawArena places agents in scenarios where information
            changes — requiring <em style={{ color: 'var(--text)', fontStyle: 'normal', fontWeight: 500 }}>multi-source conflict reasoning</em>,{' '}
            <em style={{ color: 'var(--text)', fontStyle: 'normal', fontWeight: 500 }}>dynamic belief revision</em>,
            and <em style={{ color: 'var(--text)', fontStyle: 'normal', fontWeight: 500 }}>implicit personalization</em>{' '}
            across 12 multi-turn scenarios spanning diverse professional contexts.
          </p>
          <p className="mt-4" style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            The benchmark comprises <strong style={{ color: 'var(--text)' }}>12 scenarios</strong>,{' '}
            <strong style={{ color: 'var(--text)' }}>337 evaluation rounds</strong>,{' '}
            <strong style={{ color: 'var(--text)' }}>45 dynamic updates</strong>, evaluated across{' '}
            <strong style={{ color: 'var(--text)' }}>5 frameworks</strong> and{' '}
            <strong style={{ color: 'var(--text)' }}>18 language models</strong>. A hierarchical
            6-layer specification system and the Composite Reliability Score (CRS) ensure
            consistent, auditable evaluation across all configurations.{' '}
          </p>
        </div>
      </section>

      {/* 3 Evaluation Dimensions */}
      <section className="mb-14">
        <h2 className="section-heading mb-2">3 Evaluation Dimensions</h2>
        <p className="mb-6" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Each scenario is scored across three orthogonal capability dimensions (Section 2 of the paper).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {EVAL_DIMS.map((dim) => (
            <div
              key={dim.id}
              className="rounded-xl p-5"
              style={{
                background: 'var(--surface, rgba(255,255,255,0.03))',
                border: '1px solid var(--border)',
                borderLeft: `3px solid ${dim.color}`,
              }}
            >
              <div className="mb-3">
                <span
                  className="font-mono font-bold text-xs"
                  style={{ color: dim.color, letterSpacing: '0.06em' }}
                >
                  {dim.id}
                </span>
                <div
                  className="font-semibold mt-1"
                  style={{ fontSize: '0.9rem', color: 'var(--text)', letterSpacing: '-0.01em' }}
                >
                  {dim.name}
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {dim.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 14-Category Question Taxonomy */}
      <section className="mb-14">
        <h2 className="section-heading mb-2">14-Category Question Taxonomy (Table 1)</h2>
        <p className="mb-6" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Seven dimension combinations × two question types (Recall and Reasoning) = 14 fine-grained
          evaluation categories. This structure allows aggregate scores to be decomposed into
          qualitatively distinct failure modes.
        </p>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
        >
          <div
            className="grid font-semibold px-4 py-3"
            style={{
              gridTemplateColumns: '1fr 1fr 1fr',
              background: 'rgba(255,107,53,0.06)',
              borderBottom: '1px solid var(--border)',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            <span>Dimension Combination</span>
            <span>Recall</span>
            <span>Reasoning</span>
          </div>
          {QUESTION_TAXONOMY.map((row, idx) => (
            <div
              key={row.dim}
              className="grid px-4 py-3 transition-colors duration-150"
              style={{
                gridTemplateColumns: '1fr 1fr 1fr',
                background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                borderBottom: idx < QUESTION_TAXONOMY.length - 1 ? '1px solid var(--border)' : 'none',
                fontSize: '0.875rem',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,107,53,0.04)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)'; }}
            >
              <span
                className="font-mono font-bold"
                style={{ color: 'var(--primary)' }}
              >
                {row.dim}
              </span>
              <span style={{ color: 'var(--text)' }}>✓ {row.dim}-Recall</span>
              <span style={{ color: 'var(--text)' }}>✓ {row.dim}-Reasoning</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Conflict Types */}
      <section className="mb-14">
        <h2 className="section-heading mb-2">Four Conflict Types</h2>
        <p className="mb-6" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          The MS dimension is further subdivided by conflict type to capture qualitatively distinct
          reasoning challenges.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CONFLICT_TYPES.map((ct) => (
            <div
              key={ct.id}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="font-mono font-bold text-xs px-2 py-1 rounded-md"
                  style={{
                    background: 'rgba(255,107,53,0.1)',
                    color: 'var(--primary)',
                    border: '1px solid rgba(255,107,53,0.2)',
                  }}
                >
                  {ct.id}
                </span>
                <span className="font-semibold" style={{ fontSize: '0.875rem', color: 'var(--text)' }}>
                  {ct.name}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {ct.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6-Layer Spec System */}
      <section className="mb-14">
        <h2 className="section-heading mb-2">6-Layer Specification System (Section 2.3)</h2>
        <p className="mb-6" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          ClawArena uses a hierarchical specification system to ensure reproducible and fair evaluation.
          Each layer narrows scope from a hidden ground-truth model down to dynamic update packages.
        </p>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
        >
          {SPEC_LAYERS.map((layer, idx) => (
            <div
              key={layer.id}
              className="flex items-start gap-4 p-4 transition-all duration-150"
              style={{
                background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                borderBottom: idx < SPEC_LAYERS.length - 1 ? '1px solid var(--border)' : 'none',
                borderLeft: '3px solid transparent',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,107,53,0.04)';
                (e.currentTarget as HTMLDivElement).style.borderLeftColor = 'rgba(255,107,53,0.5)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)';
                (e.currentTarget as HTMLDivElement).style.borderLeftColor = 'transparent';
              }}
            >
              <div className="flex flex-col items-center" style={{ marginTop: 2 }}>
                <span
                  className="inline-block px-2 py-1 rounded-md font-bold font-mono text-xs"
                  style={{
                    background: 'rgba(255,107,53,0.1)',
                    color: 'var(--primary)',
                    border: '1px solid rgba(255,107,53,0.2)',
                    minWidth: 48,
                    textAlign: 'center',
                  }}
                >
                  {layer.id}
                </span>
                {idx < SPEC_LAYERS.length - 1 && (
                  <div
                    className="w-px mt-1"
                    style={{ height: 12, background: 'rgba(255,107,53,0.2)' }}
                  />
                )}
              </div>
              <div>
                <div
                  className="font-semibold"
                  style={{ fontSize: '0.875rem', color: 'var(--text)', letterSpacing: '-0.01em' }}
                >
                  {layer.label}
                </div>
                <div
                  className="mt-1"
                  style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}
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
        <h2 className="section-heading mb-2">Construction Pipeline</h2>
        <p className="mb-6" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          ClawArena scenarios are constructed via a five-stage pipeline combining expert authorship,
          empirical grounding (200+ published distributions), and automated validation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PIPELINE_STEPS.map((ps) => (
            <div
              key={ps.step}
              className="glass-card rounded-xl p-4"
            >
              <div
                className="font-bold font-mono text-3xl mb-3"
                style={{
                  background: 'linear-gradient(135deg, #ff6b35, #f7c948)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  opacity: 0.6,
                }}
              >
                {ps.step}
              </div>
              <div
                className="font-semibold mb-1"
                style={{ fontSize: '0.875rem', color: 'var(--text)', letterSpacing: '-0.01em' }}
              >
                {ps.label}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {ps.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 12 Scenarios */}
      <section className="mb-14">
        <h2 className="section-heading mb-2">12 Scenarios</h2>
        <p className="mb-6" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Spanning retail analytics, finance, healthcare, information security, HR, education, research integrity, and more.
          337 total rounds (95 MC + 242 EC) with 45 dynamic updates.
        </p>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
        >
          <div
            className="grid font-semibold px-4 py-3"
            style={{
              gridTemplateColumns: '1fr 80px 60px 60px 1.5fr',
              background: 'rgba(255,107,53,0.06)',
              borderBottom: '1px solid var(--border)',
              fontSize: '0.7rem',
              color: 'var(--text-secondary)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase' as const,
            }}
          >
            <span>Scenario</span>
            <span>Rounds</span>
            <span>MC</span>
            <span>EC</span>
            <span>Context</span>
          </div>
          {SCENARIOS.map((s, idx) => (
            <div
              key={s.id}
              className="grid px-4 py-2.5"
              style={{
                gridTemplateColumns: '1fr 80px 60px 60px 1.5fr',
                background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                borderBottom: idx < SCENARIOS.length - 1 ? '1px solid var(--border)' : 'none',
                fontSize: '0.8125rem',
              }}
            >
              <span className="font-mono font-semibold" style={{ color: 'var(--primary)' }}>{s.id}</span>
              <span style={{ color: 'var(--text)' }}>{s.rounds}</span>
              <span style={{ color: 'var(--text-muted)' }}>{s.mc}</span>
              <span style={{ color: 'var(--text-muted)' }}>{s.ec}</span>
              <span style={{ color: 'var(--text-secondary)' }}>{s.context}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Citation */}
      <section className="mb-6">
        <h2 className="section-heading mb-2">Citation</h2>
        <p className="mb-4" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          If you use ClawArena in your research, please cite our paper:
        </p>
        <BibTexCopy />
      </section>
    </div>
  );
}

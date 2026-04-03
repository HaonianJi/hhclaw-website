import { Download, GitBranch, ExternalLink } from 'lucide-react';

const DOWNLOADS = [
  {
    icon: '📦',
    title: 'Full Dataset',
    description:
      'Complete ClawArena evaluation set with all 64 scenarios across 8 domains, including questions, specs, and reference answers.',
    size: '~42 MB',
    files: ['questions.json', 'specs/', 'reference_answers/'],
    primary: { label: 'GitHub', icon: <GitBranch size={14} />, href: 'https://github.com' },
    secondary: { label: 'HuggingFace', href: 'https://huggingface.co' },
  },
  {
    icon: '🎯',
    title: '12-Scenario Subset',
    description:
      'The canonical 12-scenario evaluation subset (subset_12) used in Experiment 2, designed for quick, reproducible benchmarking.',
    size: '~8 MB',
    files: ['subset_12_questions.json', 'subset_12_specs/'],
    primary: { label: 'GitHub', icon: <GitBranch size={14} />, href: 'https://github.com' },
    secondary: { label: 'HuggingFace', href: 'https://huggingface.co' },
  },
  {
    icon: '📋',
    title: 'Spec Templates',
    description:
      'The 6-layer specification template system (L0–L4 + GUIDE) used to author ClawArena scenarios. Extend it for new domains.',
    size: '~1 MB',
    files: ['spec_templates/', 'guide.md'],
    primary: { label: 'GitHub', icon: <GitBranch size={14} />, href: 'https://github.com' },
    secondary: null,
  },
];

const SCHEMA = `{
  "scenario_id": "hil_c6",
  "domain": "C",
  "persona": "Alex Rivera",
  "language": "EN",
  "dimension": "MS-R",
  "questions": [
    {
      "q_id": "c6_q1",
      "turn": 1,
      "instruction": "...",
      "expected_answer": "...",
      "eval_type": "mc_em"
    }
  ]
}`;

export default function DatasetPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1
          className="font-bold tracking-tight mb-3"
          style={{ fontSize: '2rem', color: 'var(--text)' }}
        >
          Dataset
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          All ClawArena data is publicly available under the{' '}
          <strong style={{ color: 'var(--text)' }}>CC BY 4.0</strong> license.
          Download the full benchmark, the 12-scenario subset, or the spec template system.
        </p>
      </div>

      {/* Download Cards */}
      <section className="mb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DOWNLOADS.map((dl) => (
            <div
              key={dl.title}
              className="glass-card rounded-xl p-5 flex flex-col"
              style={{}}
            >
              <div className="text-4xl mb-4">{dl.icon}</div>
              <h3
                className="font-bold mb-2"
                style={{ fontSize: '1rem', color: 'var(--text)' }}
              >
                {dl.title}
              </h3>
              <p
                className="flex-1 mb-4"
                style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}
              >
                {dl.description}
              </p>

              {/* File list */}
              <div className="mb-4">
                {dl.files.map((f) => (
                  <div
                    key={f}
                    className="font-mono mb-1"
                    style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
                  >
                    📄 {f}
                  </div>
                ))}
                <div
                  className="mt-2 font-semibold"
                  style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
                >
                  Size: {dl.size}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-2">
                <a
                  href={dl.primary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-all duration-150 hover:scale-[1.01]"
                  style={{
                    background: 'linear-gradient(135deg, #ff6b35, #e2336b)',
                    fontSize: '0.8125rem',
                    boxShadow: '0 2px 10px rgba(255,107,53,0.3)',
                  }}
                >
                  {dl.primary.icon}
                  {dl.primary.label}
                  <Download size={12} />
                </a>
                {dl.secondary && (
                  <a
                    href={dl.secondary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-150 hover:scale-[1.01]"
                    style={{
                      border: '1px solid rgba(255,107,53,0.25)',
                      color: 'var(--primary)',
                      background: 'rgba(255,107,53,0.05)',
                      fontSize: '0.8125rem',
                    }}
                  >
                    <ExternalLink size={12} />
                    {dl.secondary.label}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Format spec */}
      <section className="mb-14">
        <h2
          className="section-heading mb-2"
        >
          Data Format
        </h2>
        <p className="mb-5" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Each scenario is a JSON object with the following structure:
        </p>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
        >
          <div
            className="flex items-center justify-between px-4 py-2.5"
            style={{
              background: 'rgba(255,107,53,0.05)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <span
              className="font-semibold"
              style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}
            >
              questions.json schema
            </span>
            <span
              className="px-2 py-0.5 rounded text-xs font-mono"
              style={{ background: 'rgba(255,107,53,0.12)', color: 'var(--primary)', border: '1px solid rgba(255,107,53,0.2)' }}
            >
              JSON
            </span>
          </div>
          <pre className="code-block rounded-none m-0" style={{ borderRadius: 0, border: 'none' }}>
            {SCHEMA}
          </pre>
        </div>
      </section>

      {/* Evaluation types */}
      <section>
        <h2
          className="section-heading mb-4"
        >
          Evaluation Types
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              type: 'mc_em',
              name: 'Multiple Choice — Exact Match',
              desc: 'Agent selects from a discrete option set. Scored 0 or 1 per question based on exact match with reference.',
            },
            {
              type: 'mc_partial',
              name: 'Multiple Choice — Partial Credit',
              desc: 'Ordered preference matching. Partial credit awarded for correct ranking of multi-part answers.',
            },
            {
              type: 'ec_pass',
              name: 'Executable Code — Pass@1',
              desc: 'Agent produces code. Scored 0/1 based on whether the code passes all unit tests in a sandboxed environment.',
            },
            {
              type: 'non',
              name: 'Non-Task Handling',
              desc: 'Binary evaluation of whether the agent correctly declines, redirects, or escalates out-of-scope requests.',
            },
          ].map(({ type, name, desc }) => (
            <div
              key={type}
              className="glass-card rounded-xl p-4"
              style={{}}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="font-mono font-bold text-xs px-2 py-1 rounded"
                  style={{ background: 'rgba(255,107,53,0.12)', color: 'var(--primary)', border: '1px solid rgba(255,107,53,0.2)' }}
                >
                  {type}
                </span>
              </div>
              <div
                className="font-semibold mb-1"
                style={{ fontSize: '0.875rem', color: 'var(--text)' }}
              >
                {name}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

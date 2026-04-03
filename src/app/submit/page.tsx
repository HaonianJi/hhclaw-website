import { Terminal, GitPullRequest, Package } from 'lucide-react';

const STEPS = [
  {
    number: 1,
    icon: <Package size={20} />,
    title: 'Install the Evaluator',
    description: 'Install the ClawArena evaluation harness via pip. Python 3.10+ required.',
    code: `pip install clawarena-eval

# Verify installation
clawarena --version`,
  },
  {
    number: 2,
    icon: <Terminal size={20} />,
    title: 'Run Evaluation',
    description:
      'Point the evaluator at your agent endpoint. Use --subset 12 for the canonical subset or --full for all 64 scenarios.',
    code: `# Quick eval on 12-scenario subset
clawarena eval \\
  --agent your_agent_entrypoint.py \\
  --subset 12 \\
  --output results/

# Full evaluation (64 scenarios)
clawarena eval \\
  --agent your_agent_entrypoint.py \\
  --full \\
  --output results/`,
  },
  {
    number: 3,
    icon: <GitPullRequest size={20} />,
    title: 'Submit a Pull Request',
    description:
      'Fork the leaderboard repo, add your results JSON to data/, and open a PR. We review submissions within 48 hours.',
    code: `# Fork and clone
git clone https://github.com/clawarena/leaderboard.git
cd leaderboard

# Add your results
cp path/to/results/summary.json data/submissions/

# Open PR
gh pr create \\
  --title "Add [YourFramework + Model] results" \\
  --body "Framework: ...\\nModel: ...\\nOverall: 0.XXX"`,
  },
];

const FRAMEWORKS = [
  { name: 'OpenClaw',     status: 'Supported', color: '#60a5fa',  bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.2)', url: 'https://github.com/anthropics/openclaw' },
  { name: 'ZeroClaw',    status: 'Supported', color: '#60a5fa',  bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.2)', url: 'https://github.com/zeroclaw-labs/zeroclaw' },
  { name: 'IronClaw',    status: 'Supported', color: '#60a5fa',  bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.2)', url: 'https://github.com/nearai/ironclaw' },
  { name: 'Claude Code',status: 'Supported', color: '#c084fc',  bg: 'rgba(192,132,252,0.1)', border: 'rgba(192,132,252,0.2)', url: 'https://docs.anthropic.com/en/docs/claude-code' },
  { name: 'NanoBot',     status: 'Supported', color: '#4ade80',  bg: 'rgba(74,222,128,0.1)',  border: 'rgba(74,222,128,0.2)', url: null },
  { name: 'PicoClaw',    status: 'Supported', color: '#4ade80',  bg: 'rgba(74,222,128,0.1)',  border: 'rgba(74,222,128,0.2)', url: null },
  { name: 'CoPaw',       status: 'Supported', color: '#4ade80',  bg: 'rgba(74,222,128,0.1)',  border: 'rgba(74,222,128,0.2)', url: null },
  { name: 'Codex CLI',   status: 'Supported', color: '#4ade80',  bg: 'rgba(74,222,128,0.1)',  border: 'rgba(74,222,128,0.2)', url: 'https://github.com/openai/codex' },
  { name: 'Custom',      status: 'Plugin API',color: '#ff6b35',  bg: 'rgba(255,107,53,0.1)',  border: 'rgba(255,107,53,0.2)', url: null },
];

export default function SubmitPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1
          className="font-bold tracking-tight mb-3"
          style={{ fontSize: '2rem', color: 'var(--text)' }}
        >
          Submit Your Results
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Evaluate your AI assistant on ClawArena and add it to the public leaderboard.
          The process takes about 30 minutes for the 12-scenario subset.
        </p>
      </div>

      {/* 3-step guide */}
      <section className="mb-14">
        <div className="flex flex-col gap-6">
          {STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="glass-card rounded-xl overflow-hidden"
              style={{}}
            >
              {/* Step header */}
              <div
                className="flex items-center gap-4 px-6 py-4"
                style={{
                  background: 'rgba(255,107,53,0.05)',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #ff6b35, #e2336b)', fontSize: '0.875rem', boxShadow: '0 0 12px rgba(255,107,53,0.35)' }}
                >
                  {step.number}
                </div>
                <div
                  className="flex items-center gap-2"
                  style={{ color: 'var(--primary)' }}
                >
                  {step.icon}
                  <h3
                    className="font-bold"
                    style={{ fontSize: '1rem', color: 'var(--text)' }}
                  >
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Step body */}
              <div
                className="px-6 py-4"
                style={{ background: 'var(--surface)' }}
              >
                <p
                  className="mb-4"
                  style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}
                >
                  {step.description}
                </p>
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ border: '1px solid var(--border)' }}
                >
                  <div
                    className="flex items-center px-4 py-2 gap-2"
                    style={{
                      background: '#1e293b',
                      borderBottom: '1px solid #334155',
                    }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span
                      className="ml-2 font-mono"
                      style={{ fontSize: '0.7rem', color: '#64748b' }}
                    >
                      Terminal
                    </span>
                  </div>
                  <pre
                    className="code-block rounded-none m-0"
                    style={{ borderRadius: 0, border: 'none' }}
                  >
                    {step.code}
                  </pre>
                </div>
              </div>

              {/* Connector line (not on last) */}
              {idx < STEPS.length - 1 && (
                <div className="flex justify-center py-2" style={{ background: 'var(--surface)' }}>
                  <div className="w-px h-4" style={{ background: 'rgba(255,107,53,0.25)' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Supported frameworks */}
      <section className="mb-14">
        <h2
          className="font-bold mb-2"
          style={{ fontSize: '1.375rem', color: 'var(--text)' }}
        >
          Supported Frameworks
        </h2>
        <p className="mb-6" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Any framework that implements the ClawArena agent interface can be evaluated.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {FRAMEWORKS.map((fw) => {
            const inner = (
              <>
                <span
                  className="font-semibold"
                  style={{ fontSize: '0.875rem', color: 'var(--text)' }}
                >
                  {fw.name}
                  {fw.url && (
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginLeft: 6 }}>↗</span>
                  )}
                </span>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ background: fw.bg, color: fw.color, border: `1px solid ${fw.border}` }}
                >
                  {fw.status}
                </span>
              </>
            );
            return fw.url ? (
              <a
                key={fw.name}
                href={fw.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card flex items-center justify-between rounded-lg px-4 py-3 no-underline"
                style={{ textDecoration: 'none', transition: 'border-color 0.15s ease' }}
              >
                {inner}
              </a>
            ) : (
              <div
                key={fw.name}
                className="glass-card flex items-center justify-between rounded-lg px-4 py-3"
              >
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      {/* Requirements */}
      <section>
        <h2
          className="font-bold mb-4"
          style={{ fontSize: '1.375rem', color: 'var(--text)' }}
        >
          Submission Requirements
        </h2>
        <div
          className="glass-card rounded-xl p-5"
          style={{}}
        >
          <ul className="space-y-3">
            {[
              'Results must be generated using the official clawarena-eval harness (v0.3+)',
              'Agent must be publicly available or described in a preprint/paper',
              'Include the framework name, model name/version, and provider',
              'EC Pass scores require code to run in the provided sandboxed environment',
              'ZeroClaw-style entries (no tool access) may omit EC Pass scores',
              'Results are verified by the ClawArena team before appearing on the leaderboard',
            ].map((req) => (
              <li
                key={req}
                className="flex items-start gap-2"
                style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}
              >
                <span style={{ color: 'var(--primary)', marginTop: 1, flexShrink: 0 }}>✓</span>
                {req}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

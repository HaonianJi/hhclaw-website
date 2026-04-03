import { Terminal, GitPullRequest, Package } from 'lucide-react';

const STEPS = [
  {
    number: 1,
    icon: <Package size={20} />,
    title: 'Install the Evaluator',
    description: 'Install the HHClaw evaluation harness via pip. Python 3.10+ required.',
    code: `pip install hhclaw-eval

# Verify installation
hhclaw --version`,
  },
  {
    number: 2,
    icon: <Terminal size={20} />,
    title: 'Run Evaluation',
    description:
      'Point the evaluator at your agent endpoint. Use --subset 12 for the canonical subset or --full for all 64 scenarios.',
    code: `# Quick eval on 12-scenario subset
hhclaw eval \\
  --agent your_agent_entrypoint.py \\
  --subset 12 \\
  --output results/

# Full evaluation (64 scenarios)
hhclaw eval \\
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
git clone https://github.com/hhclaw/leaderboard.git
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
  { name: 'OpenClaw',    status: 'Official',  badge: 'bg-blue-100 text-blue-700' },
  { name: 'ZeroClaw',   status: 'Official',  badge: 'bg-blue-100 text-blue-700' },
  { name: 'NanoBot',    status: 'Community', badge: 'bg-green-100 text-green-700' },
  { name: 'PicoClaw',   status: 'Community', badge: 'bg-green-100 text-green-700' },
  { name: 'Claude Code',status: 'Community', badge: 'bg-purple-100 text-purple-700' },
  { name: 'AutoAgent',  status: 'Custom',    badge: 'bg-gray-100 text-gray-700' },
  { name: 'LangChain',  status: 'Custom',    badge: 'bg-gray-100 text-gray-700' },
  { name: 'CrewAI',     status: 'Custom',    badge: 'bg-gray-100 text-gray-700' },
  { name: 'Custom',     status: 'Plugin API', badge: 'bg-orange-100 text-orange-700' },
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
          Evaluate your AI assistant on HHClaw and add it to the public leaderboard.
          The process takes about 30 minutes for the 12-scenario subset.
        </p>
      </div>

      {/* 3-step guide */}
      <section className="mb-14">
        <div className="flex flex-col gap-6">
          {STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="rounded-xl overflow-hidden"
              style={{
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              {/* Step header */}
              <div
                className="flex items-center gap-4 px-6 py-4"
                style={{
                  background: 'var(--surface)',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                  style={{ background: 'var(--primary)', fontSize: '0.875rem' }}
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
                style={{ background: 'var(--bg)' }}
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
                <div className="flex justify-center py-2" style={{ background: 'var(--bg)' }}>
                  <div className="w-px h-4" style={{ background: 'var(--border)' }} />
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
          Any framework that implements the HHClaw agent interface can be evaluated.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {FRAMEWORKS.map((fw) => (
            <div
              key={fw.name}
              className="flex items-center justify-between rounded-lg px-4 py-3 transition-colors duration-150 hover:bg-[var(--primary-light)]"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <span
                className="font-semibold"
                style={{ fontSize: '0.875rem', color: 'var(--text)' }}
              >
                {fw.name}
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${fw.badge}`}
              >
                {fw.status}
              </span>
            </div>
          ))}
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
          className="rounded-xl p-5"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
          }}
        >
          <ul className="space-y-3">
            {[
              'Results must be generated using the official hhclaw-eval harness (v0.3+)',
              'Agent must be publicly available or described in a preprint/paper',
              'Include the framework name, model name/version, and provider',
              'EC Pass scores require code to run in the provided sandboxed environment',
              'ZeroClaw-style entries (no tool access) may omit EC Pass scores',
              'Results are verified by the HHClaw team before appearing on the leaderboard',
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

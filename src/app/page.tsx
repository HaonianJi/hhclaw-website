import Link from 'next/link';
import { ArrowRight, Database, BarChart3, BookOpen } from 'lucide-react';
import QuickLeaderboard from '@/components/QuickLeaderboard';

export default function LandingPage() {
  return (
    <div>
      {/* ─── Hero ──────────────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          {/* Live badge */}
          <div className="flex justify-center mb-6">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                border: '1px solid #bfdbfe',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Under review at COLM 2026
            </span>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1
              className="font-bold tracking-tight leading-tight"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3rem)',
                color: 'var(--text)',
              }}
            >
              <span className="mr-3">🦀</span>ClawArena
            </h1>
            <p
              className="mt-3 mx-auto max-w-2xl font-semibold"
              style={{
                fontSize: '1.125rem',
                color: 'var(--text-secondary)',
              }}
            >
              Benchmarking AI Agents in Evolving Information Environments
            </p>
            <p
              className="mt-4 mx-auto max-w-2xl leading-relaxed"
              style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}
            >
              A rigorous evaluation framework for AI agents — measuring reasoning under{' '}
              <strong style={{ color: 'var(--text)' }}>multi-source conflicts</strong>,{' '}
              <strong style={{ color: 'var(--text)' }}>dynamic belief revision</strong>, and{' '}
              <strong style={{ color: 'var(--text)' }}>implicit personalization</strong> across
              64 evolving scenarios in 8 professional domains.
            </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mt-10">
            {[
              { value: '64',    label: 'Scenarios',  sublabel: 'across 8 domains' },
              { value: '8',     label: 'Domains',    sublabel: 'professional settings' },
              { value: '1,879', label: 'Eval Rounds', sublabel: 'evaluation turns'  },
              { value: '365',   label: 'Updates',    sublabel: 'dynamic spec changes' },
            ].map(({ value, label, sublabel }) => (
              <div
                key={label}
                className="text-center rounded-xl p-4 sm:p-5"
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <div
                  className="font-bold stat-number tabular-nums"
                  style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                    color: 'var(--primary)',
                    lineHeight: 1.1,
                  }}
                >
                  {value}
                </div>
                <div
                  className="font-semibold mt-1"
                  style={{ fontSize: '0.8rem', color: 'var(--text)' }}
                >
                  {label}
                </div>
                <div
                  className="hidden sm:block mt-0.5"
                  style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}
                >
                  {sublabel}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white transition-all duration-150 hover:scale-[1.02] hover:shadow-lg"
              style={{
                background: 'var(--primary)',
                fontSize: '0.9375rem',
                boxShadow: '0 2px 8px rgba(37,99,235,0.3)',
              }}
            >
              <BarChart3 size={16} />
              View Leaderboard
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all duration-150 hover:scale-[1.02]"
              style={{
                border: '1.5px solid var(--primary)',
                color: 'var(--primary)',
                background: 'transparent',
                fontSize: '0.9375rem',
              }}
            >
              <BookOpen size={16} />
              Read Paper
            </Link>
            <Link
              href="/dataset"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all duration-150 hover:scale-[1.02]"
              style={{
                border: '1.5px solid var(--border)',
                color: 'var(--text-secondary)',
                background: 'transparent',
                fontSize: '0.9375rem',
              }}
            >
              <Database size={16} />
              Get Dataset
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Quick Leaderboard Preview ──────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className="font-bold"
              style={{ fontSize: '1.5rem', color: 'var(--text)' }}
            >
              Top Rankings
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 4 }}>
              Cross-Model comparison on 12 scenarios (OpenClaw framework) — sorted by overall score
            </p>
          </div>
          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-1.5 font-medium text-sm transition-colors duration-150 hover:underline"
            style={{ color: 'var(--primary)' }}
          >
            Full leaderboard
            <ArrowRight size={14} />
          </Link>
        </div>

        <QuickLeaderboard />
      </section>

      {/* ─── Key Findings ───────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2
            className="text-center font-bold mb-10"
            style={{ fontSize: '1.5rem', color: 'var(--text)' }}
          >
            Key Findings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {KEY_FINDINGS.map((f) => (
              <div
                key={f.title}
                className="rounded-xl p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-lg"
                  style={{ background: 'var(--primary-light)' }}
                >
                  {f.icon}
                </div>
                <h3
                  className="font-semibold mb-2"
                  style={{ fontSize: '0.9375rem', color: 'var(--text)' }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Feature Cards ──────────────────────────────────────── */}
      <section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2
            className="text-center font-bold mb-10"
            style={{ fontSize: '1.5rem', color: 'var(--text)' }}
          >
            What Makes ClawArena Different
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-lg"
                  style={{ background: 'var(--primary-light)' }}
                >
                  {f.icon}
                </div>
                <h3
                  className="font-semibold mb-2"
                  style={{ fontSize: '0.9375rem', color: 'var(--text)' }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const KEY_FINDINGS = [
  {
    icon: '📊',
    title: 'Model Capability Dominates',
    description:
      'Model capability accounts for a 15.4% performance range, outweighing framework design effects (6.8% range) — choosing the right model matters more than the framework.',
  },
  {
    icon: '🔄',
    title: 'Update Design Over Volume',
    description:
      'Belief revision difficulty is governed by update design strategy rather than update volume — how updates are structured matters more than how many there are.',
  },
  {
    icon: '⚠️',
    title: 'Aggregate Scores Can Mislead',
    description:
      'Aggregate scores can mask qualitatively different failure modes — models with similar overall scores may fail on entirely different question types and conflict categories.',
  },
];

const FEATURES = [
  {
    icon: '🧠',
    title: 'Multi-Source Conflict Reasoning',
    description:
      'Agents must reconcile contradictory information from multiple sources — factual conflicts (C1), authority conflicts (C2), non-conflicts (C3), and temporal/process conflicts (C4).',
  },
  {
    icon: '🔄',
    title: 'Dynamic Belief Revision',
    description:
      '365 dynamic update packages test how well agents revise their beliefs when workspace files and session histories are updated mid-evaluation.',
  },
  {
    icon: '👤',
    title: 'Implicit Personalization',
    description:
      'Agents must infer unstated user preferences from behavioral patterns in session histories — explicit preferences alone are insufficient.',
  },
  {
    icon: '📋',
    title: '14-Category Question Taxonomy',
    description:
      'Questions span 7 dimension combinations (MS, DU, P, MS×DU, MS×P, DU×P, All) × 2 types (Recall, Reasoning), yielding 14 fine-grained evaluation categories.',
  },
  {
    icon: '⚡',
    title: 'Code Execution Evaluation',
    description:
      'Beyond text matching — agents must produce working code that passes automated test suites in sandboxed environments (EC Pass@1).',
  },
  {
    icon: '🏗️',
    title: '6-Layer Specification System',
    description:
      'Hierarchical specification system (L0 Narrative Bible → L1 Workspace Files → L2 Sessions → L3 Questions → L4 Updates → Guide) ensures auditable evaluation.',
  },
];

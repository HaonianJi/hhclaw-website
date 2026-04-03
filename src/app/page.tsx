'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowRight, Database, BarChart3, BookOpen } from 'lucide-react';
import QuickLeaderboard from '@/components/QuickLeaderboard';

export default function LandingPage() {
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRevealRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div>
      {/* ─── Hero ──────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background:
            'radial-gradient(ellipse at 30% 0%, rgba(120,50,255,0.15) 0%, transparent 50%), ' +
            'radial-gradient(ellipse at 70% 0%, rgba(255,100,50,0.10) 0%, transparent 50%), ' +
            'var(--bg)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* Animated background orbs */}
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        {/* Dot grid */}
        <div className="hero-grid" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32" style={{ position: 'relative', zIndex: 1 }}>
          {/* Live badge */}
          <div className="flex justify-center mb-8">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold pulse-badge-anim"
              style={{
                background: 'rgba(255,107,53,0.1)',
                color: '#ff6b35',
                border: '1px solid rgba(255,107,53,0.3)',
                letterSpacing: '0.02em',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: '#ff6b35',
                  boxShadow: '0 0 6px rgba(255,107,53,0.8)',
                  animation: 'pulse-dot 2s ease-in-out infinite',
                }}
              />
              Benchmark for AI Agents in Evolving Environments
            </span>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1
              className="font-bold tracking-tight leading-tight mb-4"
              style={{
                fontSize: 'clamp(3rem, 7vw, 5rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              <img
                src="/clawarena-logo.jpg"
                alt="ClawArena"
                width={80}
                height={80}
                style={{
                  display: 'inline-block',
                  marginRight: '0.2em',
                  verticalAlign: 'middle',
                  borderRadius: '12px',
                  filter: 'drop-shadow(0 0 16px rgba(255,107,53,0.5))',
                }}
              />
              <span className="gradient-text">ClawArena</span>
            </h1>
            <p
              className="mx-auto max-w-2xl font-semibold"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: 'var(--text-secondary)',
                letterSpacing: '-0.01em',
              }}
            >
              Benchmarking AI Agents in Evolving Information Environments
            </p>
            <p
              className="mt-5 mx-auto max-w-2xl leading-relaxed"
              style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
              }}
            >
              A rigorous evaluation framework for AI agents — measuring reasoning under{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>multi-source conflicts</strong>,{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>dynamic belief revision</strong>, and{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>implicit personalization</strong> across
              64 evolving scenarios in 8 professional domains.
            </p>
          </div>

          {/* Stat Cards — glass morphism */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mt-12">
            {[
              { value: '64',    label: 'Scenarios',    sublabel: 'across 8 domains' },
              { value: '8',     label: 'Domains',      sublabel: 'professional settings' },
              { value: '1,879', label: 'Eval Rounds',  sublabel: 'evaluation turns' },
              { value: '365',   label: 'Updates',      sublabel: 'dynamic spec changes' },
            ].map(({ value, label, sublabel }, i) => (
              <div
                key={label}
                className="text-center rounded-xl p-4 sm:p-5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <div
                  className="font-bold stat-number tabular-nums"
                  style={{
                    fontSize: 'clamp(1.375rem, 3vw, 2rem)',
                    background: 'linear-gradient(135deg, #ff6b35, #f7c948)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1.1,
                    fontFeatureSettings: '"tnum"',
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #ff6b35, #e2336b)',
                fontSize: '0.9375rem',
                boxShadow: '0 4px 16px rgba(255,107,53,0.35)',
                letterSpacing: '-0.01em',
              }}
            >
              <BarChart3 size={16} />
              View Leaderboard
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-[1.03]"
              style={{
                border: '1px solid rgba(255,107,53,0.35)',
                color: '#ff6b35',
                background: 'rgba(255,107,53,0.06)',
                fontSize: '0.9375rem',
                letterSpacing: '-0.01em',
              }}
            >
              <BookOpen size={16} />
              Read Paper
            </Link>
            <Link
              href="/dataset"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-[1.03]"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                background: 'rgba(255,255,255,0.03)',
                fontSize: '0.9375rem',
                letterSpacing: '-0.01em',
              }}
            >
              <Database size={16} />
              Get Dataset
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Quick Leaderboard Preview ──────────────────────────── */}
      <section
        ref={addRevealRef}
        className="scroll-reveal max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className="font-bold"
              style={{ fontSize: '1.5rem', color: 'var(--text)', letterSpacing: '-0.02em' }}
            >
              Top Rankings
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 4 }}>
              Cross-Model comparison on 12 scenarios (OpenClaw framework) — sorted by overall score
            </p>
          </div>
          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-1.5 font-medium text-sm transition-all duration-150 hover:gap-2"
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
            ref={addRevealRef}
            className="scroll-reveal text-center font-bold mb-10"
            style={{ fontSize: '1.5rem', color: 'var(--text)', letterSpacing: '-0.02em' }}
          >
            Key Findings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {KEY_FINDINGS.map((f, i) => (
              <div
                key={f.title}
                ref={addRevealRef}
                className="scroll-reveal glass-card rounded-xl p-5"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-lg"
                  style={{
                    background: 'rgba(255,107,53,0.1)',
                    border: '1px solid rgba(255,107,53,0.15)',
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  className="font-semibold mb-2"
                  style={{ fontSize: '0.9375rem', color: 'var(--text)', letterSpacing: '-0.01em' }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
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
            ref={addRevealRef}
            className="scroll-reveal text-center font-bold mb-10"
            style={{ fontSize: '1.5rem', color: 'var(--text)', letterSpacing: '-0.02em' }}
          >
            What Makes ClawArena Different
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                ref={addRevealRef}
                className="scroll-reveal glass-card rounded-xl p-5"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-lg"
                  style={{
                    background: 'rgba(255,107,53,0.08)',
                    border: '1px solid rgba(255,107,53,0.12)',
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  className="font-semibold mb-2"
                  style={{ fontSize: '0.9375rem', color: 'var(--text)', letterSpacing: '-0.01em' }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
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

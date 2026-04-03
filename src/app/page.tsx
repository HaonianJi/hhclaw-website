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
                src="/clawarena-logo.png"
                alt="ClawArena"
                width={120}
                height={120}
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
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2
            ref={addRevealRef}
            className="scroll-reveal font-bold mb-12"
            style={{ fontSize: '1.75rem', color: 'var(--text)', letterSpacing: '-0.03em' }}
          >
            What we found
          </h2>
          <div className="flex flex-col gap-0">
            {KEY_FINDINGS.map((f, i) => (
              <div
                key={f.num}
                ref={addRevealRef}
                className="scroll-reveal flex gap-6 py-6"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  borderBottom: i < KEY_FINDINGS.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <span
                  className="font-mono font-bold shrink-0"
                  style={{ fontSize: '3rem', lineHeight: 1, color: 'rgba(255,107,53,0.2)', width: 60, textAlign: 'right' }}
                >
                  {f.num}
                </span>
                <div>
                  <h3 className="font-semibold mb-1" style={{ fontSize: '1.05rem', color: 'var(--text)', letterSpacing: '-0.01em' }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Evaluation Dimensions ──────────────────────────────── */}
      <section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2
            ref={addRevealRef}
            className="scroll-reveal font-bold mb-4"
            style={{ fontSize: '1.75rem', color: 'var(--text)', letterSpacing: '-0.03em' }}
          >
            Three coupled challenges
          </h2>
          <p
            ref={addRevealRef}
            className="scroll-reveal mb-10"
            style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 560 }}
          >
            Real information environments are multi-source, dynamic, and personalized. ClawArena evaluates all three jointly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            {DIMENSIONS.map((d, i) => (
              <div
                key={d.tag}
                ref={addRevealRef}
                className="scroll-reveal"
                style={{
                  background: 'var(--bg)',
                  padding: '28px 24px',
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <span
                  className="font-mono font-bold"
                  style={{ fontSize: '0.7rem', color: d.color, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}
                >
                  {d.tag}
                </span>
                <h3 className="font-semibold mt-2 mb-2" style={{ fontSize: '1rem', color: 'var(--text)' }}>
                  {d.title}
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                  {d.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional capabilities - compact list */}
          <div
            ref={addRevealRef}
            className="scroll-reveal mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {EXTRAS.map((e) => (
              <div key={e.title}>
                <h4 className="font-semibold mb-1" style={{ fontSize: '0.875rem', color: 'var(--text)' }}>{e.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{e.description}</p>
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
    num: '01',
    title: 'Model capability dominates framework design',
    description: 'Across four frameworks and five models, model choice accounts for a 15.4% performance range while framework design accounts for 6.8%. The right model matters roughly twice as much as the right framework.',
  },
  {
    num: '02',
    title: 'Belief revision depends on update design, not volume',
    description: 'Concentrated, targeted updates cause 0.28–0.36 score drops. Distributed updates across 12 scenarios show only +1.7% change. How updates are structured matters far more than how many there are.',
  },
  {
    num: '03',
    title: 'Aggregate scores mask divergent failures',
    description: 'Two configurations scoring 0.833 on the same question fail on structurally opposite options — one misses a genuine conflict, the other over-flags a non-conflict. Per-option diagnostics are essential.',
  },
];

const DIMENSIONS = [
  {
    tag: 'MS',
    title: 'Multi-Source Conflict',
    description: 'Evidence is scattered across heterogeneous sources that may contradict each other. The agent must judge source reliability across four canonical conflict types.',
    color: '#ff6b35',
  },
  {
    tag: 'DU',
    title: 'Dynamic Belief Revision',
    description: 'New evidence can invalidate previously correct conclusions. 365 staged update packages test whether agents revise rather than simply accumulate.',
    color: '#f7c948',
  },
  {
    tag: 'P',
    title: 'Implicit Personalization',
    description: 'User preferences surface through corrections and behavioral patterns, not explicit instructions. A four-stage protocol ends in silent-exam rounds.',
    color: '#e2336b',
  },
];

const EXTRAS = [
  {
    title: '14-category taxonomy',
    description: '7 dimension combinations × 2 types (Recall, Reasoning) prevent systems from scoring well by solving only one dimension.',
  },
  {
    title: 'Executable checks',
    description: 'Shell-based verification of workspace file state. Agents must produce working artifacts, not just text answers.',
  },
  {
    title: '6-layer specifications',
    description: 'Hidden ground truth (L0) is never shown to agents. Observable layers are noisy, partial reflections of the same underlying reality.',
  },
];

'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowRight, Database, BarChart3, BookOpen } from 'lucide-react';
import FullLeaderboard from '@/components/FullLeaderboard';

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
              12 multi-turn scenarios spanning diverse professional contexts.
            </p>
          </div>

          {/* Stats strip */}
          <div className="flex justify-center mt-12">
          <div
            className="inline-grid grid-cols-5 rounded-xl overflow-hidden"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
            }}
          >
            {[
              { value: '12',  label: 'Scenarios' },
              { value: '337', label: 'Rounds' },
              { value: '18',  label: 'Models' },
              { value: '5',   label: 'Frameworks' },
              { value: '45',  label: 'Updates' },
            ].map(({ value, label }, i, arr) => (
              <div
                key={label}
                className="flex flex-col items-center py-3 px-2 sm:py-4 sm:px-7"
                style={{
                  borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <span
                  className="font-bold tabular-nums"
                  style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                    color: 'var(--primary)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {value}
                </span>
                <span
                  className="mt-1 font-medium"
                  style={{
                    fontSize: '0.6rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase' as const,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
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

      {/* ─── Overview Figure ──────────────────────────────────────── */}
      <section
        ref={addRevealRef}
        className="scroll-reveal max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="text-center mb-6">
          <h2
            className="font-bold"
            style={{ fontSize: '1.5rem', color: 'var(--text)', letterSpacing: '-0.02em' }}
          >
            Overview
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            An evolving information environment with conflicting and progressively updated evidence,
            structured along three coupled evaluation dimensions.
          </p>
        </div>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--border)', background: '#fff' }}
        >
          <img
            src="/overview.png"
            alt="ClawArena Overview"
            className="w-full"
            style={{ display: 'block' }}
          />
        </div>
      </section>

      {/* ─── Full Leaderboard ──────────────────────────────────── */}
      <section
        ref={addRevealRef}
        className="scroll-reveal max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className="font-bold"
              style={{ fontSize: '1.5rem', color: 'var(--text)', letterSpacing: '-0.02em' }}
            >
              Leaderboard
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 4 }}>
              All configurations ranked by CRS (Composite Reliability Score) — 18 models × 5 frameworks
            </p>
          </div>
          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-1.5 font-medium text-sm transition-all duration-150 hover:gap-2"
            style={{ color: 'var(--primary)' }}
          >
            Detailed breakdown
            <ArrowRight size={14} />
          </Link>
        </div>

        <FullLeaderboard />
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
    description: 'Model choice accounts for a 29-point CRS range across 18 models, while framework design accounts for 17 points across 5 frameworks. The right model matters nearly twice as much as the right framework.',
  },
  {
    num: '02',
    title: 'MetaClaw improves robustness without degrading accuracy',
    description: 'Skill-based self-evolution consistently improves CRS by 0.33–1.19 across all three tested model families. The mechanism is behavioral consistency (SC and FD both rise), not raw accuracy.',
  },
  {
    num: '03',
    title: 'Belief revision difficulty is governed by update design',
    description: 'Updates that force re-interpretation of earlier claims cause clustered failures, while updates that merely extend prior evidence are handled reliably. Update specificity, not volume, determines difficulty.',
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
    description: 'New evidence can invalidate previously correct conclusions. 45 staged updates across 12 scenarios test whether agents revise rather than simply accumulate.',
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

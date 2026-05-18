'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowRight, BookOpen, Database, ExternalLink } from 'lucide-react';
import FullLeaderboard from '@/components/FullLeaderboard';

export default function LandingPage() {
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const addRevealRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <div>
      {/* ─── Compact Hero ─────────────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img
              src="/clawarena-logo.png"
              alt="ClawArena"
              width={72}
              height={72}
              style={{ borderRadius: 12, flexShrink: 0 }}
            />
            <div className="flex-1">
              <h1 className="font-bold tracking-tight" style={{ fontSize: '1.75rem', color: 'var(--text)', letterSpacing: '-0.03em' }}>
                ClawArena
              </h1>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.6 }}>
                Benchmarking AI agents in evolving information environments — <strong style={{ color: 'var(--text)' }}>multi-source conflicts</strong>,{' '}
                <strong style={{ color: 'var(--text)' }}>dynamic belief revision</strong>, and{' '}
                <strong style={{ color: 'var(--text)' }}>implicit personalization</strong>.
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold" style={{ background: 'var(--primary-light)', color: 'var(--primary)', border: '1px solid rgba(255,107,53,0.2)' }}>12 scenarios</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold" style={{ background: 'var(--primary-light)', color: 'var(--primary)', border: '1px solid rgba(255,107,53,0.2)' }}>337 rounds</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold" style={{ background: 'var(--primary-light)', color: 'var(--primary)', border: '1px solid rgba(255,107,53,0.2)' }}>18 models</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold" style={{ background: 'var(--primary-light)', color: 'var(--primary)', border: '1px solid rgba(255,107,53,0.2)' }}>5 frameworks</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold" style={{ background: 'var(--primary-light)', color: 'var(--primary)', border: '1px solid rgba(255,107,53,0.2)' }}>45 updates</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:flex-col">
              <a href="https://arxiv.org/abs/2604.04202" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors" style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
                <BookOpen size={13} /> Paper
              </a>
              <a href="https://github.com/aiming-lab/ClawArena" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors" style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
                <ExternalLink size={13} /> GitHub
              </a>
              <a href="https://huggingface.co/datasets/Haonian/ClawArena" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors" style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
                <Database size={13} /> Dataset
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Comparison Table ─────────────────────────────────────── */}
      <section ref={addRevealRef} className="scroll-reveal" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold" style={{ fontSize: '1.125rem', color: 'var(--text)', letterSpacing: '-0.02em' }}>
              Comparison with Agent Benchmarks
            </h2>
          </div>
          <div className="lb-table-container" style={{ maxHeight: 'none' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="lb-table" style={{ fontSize: '0.8rem' }}>
                <thead>
                  <tr>
                    <th>Benchmark</th>
                    <th style={{ textAlign: 'center' }}>MSC</th>
                    <th style={{ textAlign: 'center' }}>DU</th>
                    <th style={{ textAlign: 'center' }}>MU</th>
                    <th style={{ textAlign: 'center' }}>Pref.</th>
                    <th className="hidden sm:table-cell">Verification</th>
                    <th className="hidden sm:table-cell" style={{ textAlign: 'center' }}>Frmw.</th>
                    <th className="hidden md:table-cell">Scale</th>
                  </tr>
                </thead>
                <tbody>
                  {BENCHMARKS.map((b) => (
                    <tr key={b.name} style={{ cursor: 'default', background: b.ours ? 'rgba(255,107,53,0.05)' : undefined }}>
                      <td style={{ fontWeight: b.ours ? 700 : 500, color: b.ours ? 'var(--primary)' : 'var(--text)' }}>{b.name}</td>
                      <td style={{ textAlign: 'center' }}>{_mark(b.msc)}</td>
                      <td style={{ textAlign: 'center' }}>{_mark(b.du)}</td>
                      <td style={{ textAlign: 'center' }}>{_mark(b.mu)}</td>
                      <td style={{ textAlign: 'center' }}>{_mark(b.pref)}</td>
                      <td className="hidden sm:table-cell" style={{ color: 'var(--text-muted)', fontWeight: b.ours ? 600 : 400 }}>{b.verify}</td>
                      <td className="hidden sm:table-cell" style={{ textAlign: 'center', fontWeight: b.ours ? 700 : 400, color: b.ours ? 'var(--primary)' : 'var(--text-secondary)' }}>{b.fw}</td>
                      <td className="hidden md:table-cell" style={{ color: 'var(--text-muted)', fontWeight: b.ours ? 600 : 400 }}>{b.scale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2" style={{ borderTop: '1px solid var(--border)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
              MSC: multi-source conflict · DU: dynamic updates · MU: multi-turn user · Pref: implicit preferences · &#9989; supported · &#10060; unsupported · &#128993; partial
            </div>
          </div>
        </div>
      </section>

      {/* ─── Leaderboard ──────────────────────────────────────────── */}
      <section ref={addRevealRef} className="scroll-reveal">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold" style={{ fontSize: '1.125rem', color: 'var(--text)', letterSpacing: '-0.02em' }}>
                Leaderboard
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
                18 models ranked by CRS. Click column headers to sort.
              </p>
            </div>
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-1.5 font-medium text-xs transition-all hover:gap-2"
              style={{ color: 'var(--primary)' }}
            >
              Model &amp; Harness breakdown
              <ArrowRight size={13} />
            </Link>
          </div>
          <FullLeaderboard />
        </div>
      </section>

      {/* ─── Overview Figure ──────────────────────────────────────── */}
      <section ref={addRevealRef} className="scroll-reveal" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="font-bold mb-4" style={{ fontSize: '1.125rem', color: 'var(--text)', letterSpacing: '-0.02em' }}>
            How it works
          </h2>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', background: '#fff' }}>
            <img src="/overview.png" alt="ClawArena Overview" className="w-full" style={{ display: 'block' }} />
          </div>
        </div>
      </section>

      {/* ─── Key Findings (compact) ───────────────────────────────── */}
      <section ref={addRevealRef} className="scroll-reveal" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="font-bold mb-6" style={{ fontSize: '1.125rem', color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Key findings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {KEY_FINDINGS.map((f) => (
              <div key={f.num} className="rounded-xl p-4" style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
                <span className="font-mono font-bold text-xs" style={{ color: 'var(--primary)' }}>{f.num}</span>
                <h3 className="font-semibold mt-1 mb-2" style={{ fontSize: '0.875rem', color: 'var(--text)', lineHeight: 1.4 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function _mark(v: string) {
  if (v === 'true') return '\u2705';
  if (v === 'partial') return '\uD83D\uDFE1';
  return '\u274C';
}

const BENCHMARKS = [
  { name: 'ClawBench', msc: 'false', du: 'false', mu: 'false', pref: 'false', verify: 'rule+llm', fw: 8, scale: '283 / 144 sites' },
  { name: 'Claw-Eval', msc: 'false', du: 'false', mu: 'true', pref: 'false', verify: 'rule+llm', fw: 1, scale: '300 / 9 cats' },
  { name: 'Claw-Eval-Live', msc: 'false', du: 'false', mu: 'false', pref: 'false', verify: 'rule+llm', fw: 1, scale: '105 / 17 fam.' },
  { name: 'ClawMark', msc: 'true', du: 'true', mu: 'true', pref: 'false', verify: 'rule-based', fw: 1, scale: '100 / 13 scen.' },
  { name: 'ClawsBench', msc: 'true', du: 'false', mu: 'false', pref: 'false', verify: 'rule-based', fw: 4, scale: '44 / 5 svc.' },
  { name: 'MetaClawBench', msc: 'partial', du: 'true', mu: 'true', pref: 'partial', verify: 'rule-based', fw: 1, scale: '346 / 30 days' },
  { name: 'PinchBench', msc: 'false', du: 'false', mu: 'false', pref: 'false', verify: 'rule+llm', fw: 1, scale: '23 / 8 cats' },
  { name: 'QwenClawBench', msc: 'false', du: 'false', mu: 'false', pref: 'partial', verify: 'rule+llm', fw: 1, scale: '100 / 8 dom.' },
  { name: 'WildClawBench', msc: 'true', du: 'false', mu: 'false', pref: 'partial', verify: 'rule+llm', fw: 1, scale: '60 / 6 cats' },
  { name: 'ZClawBench', msc: 'false', du: 'false', mu: 'false', pref: 'false', verify: 'rule+llm', fw: 1, scale: '116 / 6 cats' },
  { name: 'ClawArena (Ours)', msc: 'true', du: 'true', mu: 'true', pref: 'true', verify: 'rule-based', fw: 5, scale: '337 / 12 scen.', ours: true },
];

const KEY_FINDINGS = [
  {
    num: '01',
    title: 'Model > Framework',
    description: '29-point CRS range across models vs up to 24 points across frameworks. Model capability still dominates.',
  },
  {
    num: '02',
    title: 'MetaClaw improves robustness',
    description: 'Skill injection improves CRS by 0.33–1.19 across all four tested families through behavioral consistency, not accuracy.',
  },
  {
    num: '03',
    title: 'Update design > update volume',
    description: 'Updates forcing re-interpretation cause clustered failures. Updates that merely extend evidence are handled reliably.',
  },
];

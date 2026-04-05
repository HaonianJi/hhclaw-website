'use client';

import { useState, useEffect } from 'react';
import { type Exp1Row, type Exp2Row, Exp1Table, Exp2Table } from '@/components/LeaderboardTable';
import { Info } from 'lucide-react';

type Tab = 'exp1' | 'exp2';

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('exp1');
  const [exp1Data, setExp1Data] = useState<Exp1Row[]>([]);
  const [exp2Data, setExp2Data] = useState<Exp2Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/data/leaderboard_exp1.json').then((r) => r.json()),
      fetch('/data/leaderboard_exp2.json').then((r) => r.json()),
    ]).then(([d1, d2]) => {
      setExp1Data(d1);
      setExp2Data(d2);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1
          className="font-bold tracking-tight"
          style={{ fontSize: '2rem', color: 'var(--text)', letterSpacing: '-0.03em' }}
        >
          Leaderboard
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginTop: 6 }}>
          Model rankings on the ClawArena benchmark. Click any row to view per-scenario breakdown.
        </p>
      </div>

      {/* Tab switcher */}
      <div
        className="flex gap-1.5 mb-6 p-1 rounded-xl w-fit"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--border)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {([
          { id: 'exp2' as Tab, label: 'Cross-Model', badge: `${exp2Data.length}` },
          { id: 'exp1' as Tab, label: 'Cross-Framework', badge: `${exp1Data.length}` },
        ] as { id: Tab; label: string; badge: string }[]).map(({ id, label, badge }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200"
            style={{
              fontSize: '0.875rem',
              background: activeTab === id
                ? 'linear-gradient(135deg, #ff6b35, #e2336b)'
                : 'transparent',
              color: activeTab === id ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer',
              boxShadow: activeTab === id ? '0 4px 12px rgba(255,107,53,0.25)' : 'none',
            }}
          >
            {label}
            {badge !== '0' && (
              <span
                className="rounded-full px-1.5 py-0.5 text-xs font-semibold"
                style={{
                  background: activeTab === id ? 'rgba(255,255,255,0.2)' : 'var(--surface-alt)',
                  color: activeTab === id ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.65rem',
                }}
              >
                {badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Info banner */}
      <div
        className="info-banner flex items-start gap-3 mb-6"
        style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}
      >
        <Info size={15} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 1 }} />
        {activeTab === 'exp2' ? (
          <span>
            <strong style={{ color: 'var(--text)' }}>Cross-Model Comparison</strong> (Table 4) evaluates
            four backbone models with the OpenClaw framework. Scores include MC EM and
            EC Pass metrics.
          </span>
        ) : (
          <span>
            <strong style={{ color: 'var(--text)' }}>Cross-Framework Comparison</strong> (Table 2) evaluates
            multiple agent frameworks on the hil_s1 format across all 64 scenarios. Scores are Overall,
            MC (multiple choice), and EC (executable code) pass rates.
          </span>
        )}
      </div>

      {/* Table */}
      {loading ? (
        <div
          className="rounded-xl p-12 text-center"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
          }}
        >
          <div
            className="inline-block w-6 h-6 border-2 border-t-transparent rounded-full animate-spin mb-3"
            style={{ borderColor: 'rgba(255,107,53,0.3)', borderTopColor: 'transparent' }}
          />
          <div style={{ fontSize: '0.875rem' }}>Loading leaderboard data...</div>
        </div>
      ) : (
        <div key={activeTab} className="animate-fade-in">
          {activeTab === 'exp2' ? (
            <Exp2Table data={exp2Data} />
          ) : (
            <Exp1Table data={exp1Data} />
          )}
        </div>
      )}

      {/* Legend */}
      <div
        className="flex flex-wrap items-center gap-4 mt-5"
        style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
      >
        <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Score color:</span>
        {[
          { color: '#22c55e', label: '≥ 75%' },
          { color: '#f7c948', label: '55–75%' },
          { color: '#f59e0b', label: '40–55%' },
          { color: '#ef4444', label: '< 40%' },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: color }}
            />
            {label}
          </span>
        ))}
        <span className="ml-2">— = not evaluated</span>
      </div>
    </div>
  );
}

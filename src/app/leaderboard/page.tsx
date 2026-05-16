'use client';

import { useState, useEffect } from 'react';
import {
  type CrossModelData,
  type CrossFrameworkData,
  type MetaClawRow,
  CrossModelTable,
  CrossFrameworkTable,
  MetaClawTable,
} from '@/components/LeaderboardTable';
import { Info } from 'lucide-react';

type Tab = 'model' | 'framework' | 'metaclaw';

const TABS: { id: Tab; label: string }[] = [
  { id: 'model', label: 'Cross-Model' },
  { id: 'framework', label: 'Cross-Framework' },
  { id: 'metaclaw', label: 'MetaClaw Overlay' },
];

const INFO: Record<Tab, { title: string; table: string; desc: string }> = {
  model: {
    title: 'Cross-Model Comparison',
    table: 'Table 3',
    desc: '18 models evaluated on all 12 scenarios (337 rounds). Proprietary and open-weight models use OpenClaw; Anthropic models use Claude Code (not directly comparable).',
  },
  framework: {
    title: 'Cross-Framework Comparison',
    table: 'Table 4',
    desc: 'Four frameworks evaluated under three models (GPT-5.5, GPT-5.1, Kimi-K2.5) spanning two providers, testing whether framework effects generalize.',
  },
  metaclaw: {
    title: 'MetaClaw Overlay Ablation',
    table: 'Table 5',
    desc: 'Each pair shares the same model and base OpenClaw configuration. The +MetaClaw variant adds skill injection to isolate the effect of self-evolving skills.',
  },
};

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('model');
  const [modelData, setModelData] = useState<CrossModelData | null>(null);
  const [frameworkData, setFrameworkData] = useState<CrossFrameworkData | null>(null);
  const [metaClawData, setMetaClawData] = useState<MetaClawRow[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/data/leaderboard_cross_model.json').then((r) => r.json()),
      fetch('/data/leaderboard_cross_framework.json').then((r) => r.json()),
      fetch('/data/leaderboard_metaclaw.json').then((r) => r.json()),
    ]).then(([m, f, mc]) => {
      setModelData(m);
      setFrameworkData(f);
      setMetaClawData(mc);
      setLoading(false);
    });
  }, []);

  const info = INFO[activeTab];

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
          12 scenarios, 337 rounds, 18 models, 5 frameworks. Scored by CRS (Composite Reliability Score).
        </p>
      </div>

      {/* Tab switcher */}
      <div
        className="flex gap-0 mb-6 border-b overflow-x-auto"
        style={{ borderColor: 'var(--border)', WebkitOverflowScrolling: 'touch' }}
      >
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="px-4 py-2.5 font-medium transition-all duration-200"
            style={{
              fontSize: '0.875rem',
              color: activeTab === id ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === id ? '2px solid var(--primary)' : '2px solid transparent',
              background: 'none',
              cursor: 'pointer',
              marginBottom: '-1px',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Info banner */}
      <div
        className="info-banner flex items-start gap-3 mb-6"
        style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}
      >
        <Info size={15} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 1 }} />
        <span>
          <strong style={{ color: 'var(--text)' }}>{info.title}</strong> ({info.table}). {info.desc}
        </span>
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
          {activeTab === 'model' && modelData && <CrossModelTable data={modelData} />}
          {activeTab === 'framework' && frameworkData && <CrossFrameworkTable data={frameworkData} />}
          {activeTab === 'metaclaw' && metaClawData && <MetaClawTable data={metaClawData} />}
        </div>
      )}

      {/* Legend */}
      <div
        className="flex flex-wrap items-center gap-4 mt-5"
        style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
      >
        <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>CRS color:</span>
        {[
          { color: '#22c55e', label: '≥ 65' },
          { color: '#f7c948', label: '55–65' },
          { color: '#f59e0b', label: '45–55' },
          { color: '#ef4444', label: '< 45' },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ background: color }} />
            {label}
          </span>
        ))}
        <span className="ml-4 font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
          CRS = (TCR + Robustness) / 2 &nbsp;|&nbsp; Robustness = SC × FD
        </span>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

interface Row {
  rank: number;
  config: string;
  model: string;
  framework: string;
  group: string;
  tcr_avg: number;
  tcr_mc: number;
  tcr_ec: number;
  rob: number;
  sc: number;
  fd: number;
  crs: number;
  note?: string | null;
}

interface CrossModelData {
  proprietary: { model: string; tcr_avg: number; tcr_mc: number; tcr_ec: number; rob: number; sc: number; fd: number; crs: number; note?: string | null }[];
  open_weight: { model: string; tcr_avg: number; tcr_mc: number; tcr_ec: number; rob: number; sc: number; fd: number; crs: number; note?: string | null }[];
  provider_native: { model: string; tcr_avg: number; tcr_mc: number; tcr_ec: number; rob: number; sc: number; fd: number; crs: number; note?: string | null }[];
}

interface CrossFrameworkData {
  gpt51: { framework: string; tcr_avg: number; tcr_mc: number; tcr_ec: number; rob: number; sc: number; fd: number; crs: number; note?: string | null }[];
  kimi_k25: { framework: string; tcr_avg: number; tcr_mc: number; tcr_ec: number; rob: number; sc: number; fd: number; crs: number; note?: string | null }[];
}

interface MetaClawRow {
  model: string; config: string; tcr_avg: number; tcr_mc: number; tcr_ec: number; sc: number; fd: number; crs: number; delta?: number | null;
}

function crsColor(v: number): string {
  if (v >= 65) return '#22c55e';
  if (v >= 58) return '#f7c948';
  if (v >= 50) return '#f59e0b';
  if (v >= 42) return '#fb923c';
  return '#ef4444';
}

function crsBar(v: number) {
  const pct = Math.min(100, (v / 72) * 100);
  return (
    <div className="flex items-center gap-2">
      <div style={{ width: 60, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: 3, background: crsColor(v) }} />
      </div>
      <span className="font-mono font-bold tabular-nums" style={{ fontSize: '0.85rem', color: crsColor(v), minWidth: 42 }}>
        {v.toFixed(2)}
      </span>
    </div>
  );
}

function num(v: number, muted = false) {
  return (
    <span className="font-mono tabular-nums" style={{ fontSize: '0.8rem', color: muted ? 'var(--text-muted)' : 'var(--text-secondary)' }}>
      {v.toFixed(2)}
    </span>
  );
}

function GroupTag({ group }: { group: string }) {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    'Proprietary': { bg: 'rgba(59,130,246,0.1)', text: '#60a5fa', border: 'rgba(59,130,246,0.25)' },
    'Open-Weight': { bg: 'rgba(34,197,94,0.1)', text: '#4ade80', border: 'rgba(34,197,94,0.25)' },
    'Provider-Native': { bg: 'rgba(168,85,247,0.1)', text: '#c084fc', border: 'rgba(168,85,247,0.25)' },
  };
  const c = colors[group] || colors['Proprietary'];
  return (
    <span
      className="text-xs font-medium px-1.5 py-0.5 rounded"
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, fontSize: '0.6rem', whiteSpace: 'nowrap' }}
    >
      {group}
    </span>
  );
}

export default function FullLeaderboard() {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/data/leaderboard_cross_model.json').then((r) => r.json()),
      fetch('/data/leaderboard_cross_framework.json').then((r) => r.json()),
      fetch('/data/leaderboard_metaclaw.json').then((r) => r.json()),
    ]).then(([cm, cf, mc]: [CrossModelData, CrossFrameworkData, MetaClawRow[]]) => {
      const all: Row[] = [];

      // Cross-model: proprietary (OpenClaw)
      cm.proprietary.forEach((r) => all.push({
        rank: 0, config: `${r.model} + OpenClaw`, model: r.model, framework: 'OpenClaw',
        group: 'Proprietary', tcr_avg: r.tcr_avg, tcr_mc: r.tcr_mc, tcr_ec: r.tcr_ec,
        rob: r.rob, sc: r.sc, fd: r.fd, crs: r.crs, note: r.note,
      }));
      // Cross-model: open-weight (OpenClaw)
      cm.open_weight.forEach((r) => all.push({
        rank: 0, config: `${r.model} + OpenClaw`, model: r.model, framework: 'OpenClaw',
        group: 'Open-Weight', tcr_avg: r.tcr_avg, tcr_mc: r.tcr_mc, tcr_ec: r.tcr_ec,
        rob: r.rob, sc: r.sc, fd: r.fd, crs: r.crs, note: r.note,
      }));
      // Cross-model: provider-native (Claude Code)
      cm.provider_native.forEach((r) => all.push({
        rank: 0, config: `${r.model} + Claude Code`, model: r.model, framework: 'Claude Code',
        group: 'Provider-Native', tcr_avg: r.tcr_avg, tcr_mc: r.tcr_mc, tcr_ec: r.tcr_ec,
        rob: r.rob, sc: r.sc, fd: r.fd, crs: r.crs, note: r.note,
      }));
      // Cross-framework: GPT-5.1 (skip OpenClaw since it's already in cross-model)
      cf.gpt51.forEach((r) => {
        if (r.framework === 'OpenClaw') return; // already in cross-model
        const robustness = r.rob;
        all.push({
          rank: 0, config: `GPT-5.1 + ${r.framework}`, model: 'GPT-5.1', framework: r.framework,
          group: 'Cross-Framework', tcr_avg: r.tcr_avg, tcr_mc: r.tcr_mc, tcr_ec: r.tcr_ec,
          rob: robustness, sc: r.sc, fd: r.fd, crs: r.crs, note: r.note,
        });
      });
      // Cross-framework: Kimi-K2.5
      cf.kimi_k25.forEach((r) => {
        all.push({
          rank: 0, config: `Kimi-K2.5 + ${r.framework}`, model: 'Kimi-K2.5', framework: r.framework,
          group: 'Cross-Framework', tcr_avg: r.tcr_avg, tcr_mc: r.tcr_mc, tcr_ec: r.tcr_ec,
          rob: r.rob, sc: r.sc, fd: r.fd, crs: r.crs, note: r.note,
        });
      });
      // MetaClaw overlay (only +MetaClaw variants, skip baselines since they're already in cross-model)
      mc.filter((r) => r.config.includes('MetaClaw')).forEach((r) => {
        const robustness = r.sc * r.fd / 100; // SC and FD are already percentages
        all.push({
          rank: 0, config: `${r.model} + MetaClaw`, model: r.model, framework: 'MetaClaw',
          group: 'MetaClaw', tcr_avg: r.tcr_avg, tcr_mc: r.tcr_mc, tcr_ec: r.tcr_ec,
          rob: robustness, sc: r.sc, fd: r.fd, crs: r.crs,
          note: r.delta ? `+${r.delta.toFixed(2)} CRS vs baseline` : null,
        });
      });

      // Sort by CRS descending
      all.sort((a, b) => b.crs - a.crs);
      setRows(all.map((r, i) => ({ ...r, rank: i + 1 })));
    });
  }, []);

  if (rows.length === 0) {
    return (
      <div className="rounded-xl p-12 text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="lb-table-container" style={{ maxHeight: 'none' }}>
      <div style={{ overflowX: 'auto' }}>
        <table className="lb-table" style={{ minWidth: 900 }}>
          <thead>
            <tr>
              <th style={{ width: 44 }}>#</th>
              <th>Configuration</th>
              <th>Source</th>
              <th>CRS</th>
              <th>TCR</th>
              <th>MC</th>
              <th>EC</th>
              <th>Robustness</th>
              <th>SC</th>
              <th>FD</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={`${row.config}-${i}`} style={{ animationDelay: `${i * 25}ms`, cursor: 'default' }}>
                <td>
                  <span className="font-mono font-bold" style={{ color: row.rank <= 3 ? 'var(--primary)' : 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {row.rank}
                  </span>
                </td>
                <td>
                  <div>
                    <span className="font-semibold" style={{ color: 'var(--text)', fontSize: '0.85rem' }}>
                      {row.model}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}> + </span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      {row.framework}
                    </span>
                    {row.note && (
                      <span className="ml-2" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                        {row.note}
                      </span>
                    )}
                  </div>
                </td>
                <td><GroupTag group={row.group} /></td>
                <td>{crsBar(row.crs)}</td>
                <td>{num(row.tcr_avg)}</td>
                <td>{num(row.tcr_mc)}</td>
                <td>{num(row.tcr_ec)}</td>
                <td>{num(row.rob)}</td>
                <td>{num(row.sc, true)}</td>
                <td>{num(row.fd, true)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="px-4 py-3 flex flex-wrap items-center gap-4"
        style={{ borderTop: '1px solid var(--border)', fontSize: '0.7rem', color: 'var(--text-muted)' }}
      >
        <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>CRS = (TCR + Robustness) / 2</span>
        <span>|</span>
        <span>Robustness = SC × FD</span>
        <span>|</span>
        <span>TCR = Task Completion Rate (macro-avg across 12 scenarios, 337 rounds)</span>
        <span className="ml-auto flex items-center gap-3">
          {[
            { color: '#22c55e', label: '≥65' },
            { color: '#f7c948', label: '58–65' },
            { color: '#f59e0b', label: '50–58' },
            { color: '#fb923c', label: '42–50' },
            { color: '#ef4444', label: '<42' },
          ].map(({ color, label }) => (
            <span key={label} className="flex items-center gap-1">
              <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
              {label}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

interface Row {
  rank: number;
  model: string;
  framework: string;
  tcr: number;
  mc: number;
  ec: number;
  sc: number;
  fd: number;
  crs: number;
}

type SortKey = 'crs' | 'tcr' | 'mc' | 'ec' | 'sc' | 'fd';

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

export default function FullLeaderboard() {
  const [rows, setRows] = useState<Row[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>('crs');
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    fetch('/data/leaderboard_unified.json')
      .then((r) => r.json())
      .then((data: Row[]) => setRows(data));
  }, []);

  const sortedRows = [...rows]
    .sort((a, b) => {
      const diff = (a[sortKey] as number) - (b[sortKey] as number);
      return sortAsc ? diff : -diff;
    })
    .map((r, i) => ({ ...r, rank: i + 1 }));

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  };

  const si = (key: SortKey) => {
    if (key !== sortKey) return <span style={{ opacity: 0.3, marginLeft: 2 }}>&#8645;</span>;
    return <span style={{ marginLeft: 2 }}>{sortAsc ? '↑' : '↓'}</span>;
  };

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
        <table className="lb-table">
          <thead>
            <tr>
              <th style={{ width: 36 }}>#</th>
              <th>Model</th>
              <th className="hidden sm:table-cell">Framework</th>
              <th onClick={() => handleSort('crs')} style={{ cursor: 'pointer' }}>CRS {si('crs')}</th>
              <th className="hidden sm:table-cell" onClick={() => handleSort('tcr')} style={{ cursor: 'pointer' }}>TCR {si('tcr')}</th>
              <th className="hidden md:table-cell" onClick={() => handleSort('mc')} style={{ cursor: 'pointer' }}>MC {si('mc')}</th>
              <th className="hidden md:table-cell" onClick={() => handleSort('ec')} style={{ cursor: 'pointer' }}>EC {si('ec')}</th>
              <th className="hidden lg:table-cell" onClick={() => handleSort('sc')} style={{ cursor: 'pointer' }}>SC {si('sc')}</th>
              <th className="hidden lg:table-cell" onClick={() => handleSort('fd')} style={{ cursor: 'pointer' }}>FD {si('fd')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, i) => (
              <tr key={row.model} style={{ animationDelay: `${i * 25}ms`, cursor: 'default' }}>
                <td>
                  <span className="font-mono font-bold" style={{ color: row.rank <= 3 ? 'var(--primary)' : 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {row.rank}
                  </span>
                </td>
                <td>
                  <span className="font-semibold" style={{ color: 'var(--text)', fontSize: '0.85rem' }}>
                    {row.model}
                  </span>
                  <div className="sm:hidden" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 1 }}>
                    {row.framework}
                  </div>
                </td>
                <td className="hidden sm:table-cell">
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{row.framework}</span>
                </td>
                <td>{crsBar(row.crs)}</td>
                <td className="hidden sm:table-cell">{num(row.tcr)}</td>
                <td className="hidden md:table-cell">{num(row.mc)}</td>
                <td className="hidden md:table-cell">{num(row.ec)}</td>
                <td className="hidden lg:table-cell">{num(row.sc, true)}</td>
                <td className="hidden lg:table-cell">{num(row.fd, true)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="px-4 py-3 flex flex-wrap items-center gap-2 sm:gap-4"
        style={{ borderTop: '1px solid var(--border)', fontSize: '0.65rem', color: 'var(--text-muted)' }}
      >
        <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>CRS = (TCR + Robustness) / 2</span>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:inline">12 scenarios, 337 rounds, macro-averaged</span>
        <div className="flex items-center gap-2 sm:gap-3 sm:ml-auto">
          {[
            { color: '#22c55e', label: '≥65' },
            { color: '#f7c948', label: '58–65' },
            { color: '#f59e0b', label: '50–58' },
            { color: '#fb923c', label: '42–50' },
            { color: '#ef4444', label: '<42' },
          ].map(({ color, label }) => (
            <span key={label} className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-sm" style={{ background: color }} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

interface ModelRow {
  rank: number;
  model: string;
  crs: number;
  tcr_avg: number;
  rob: number;
  note?: string | null;
}

interface CrossModelData {
  proprietary: ModelRow[];
  open_weight: ModelRow[];
  provider_native: ModelRow[];
}

function scoreColor(v: number): string {
  if (v >= 65) return 'linear-gradient(90deg, #22c55e, #16a34a)';
  if (v >= 55) return 'linear-gradient(90deg, #ff6b35, #f7c948)';
  return 'linear-gradient(90deg, #ef4444, #e2336b)';
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="rank-badge rank-badge-gold">&#129351;</span>;
  if (rank === 2) return <span className="rank-badge rank-badge-silver">&#129352;</span>;
  if (rank === 3) return <span className="rank-badge rank-badge-bronze">&#129353;</span>;
  return <span className="rank-badge rank-badge-plain">{rank}</span>;
}

function ScoreBar({ value }: { value: number }) {
  return (
    <div className="score-bar-wrap">
      <div className="score-bar-track" style={{ minWidth: 60 }}>
        <div
          className="score-bar-fill"
          style={{
            width: `${Math.round(value)}%`,
            background: scoreColor(value),
          }}
        />
      </div>
      <span
        className="tabular-nums font-mono font-semibold"
        style={{ fontSize: '0.8125rem', color: 'var(--text)', minWidth: 38 }}
      >
        {value.toFixed(2)}
      </span>
    </div>
  );
}

export default function QuickLeaderboard() {
  const [rows, setRows] = useState<ModelRow[]>([]);

  useEffect(() => {
    fetch('/data/leaderboard_cross_model.json')
      .then((r) => r.json())
      .then((data: CrossModelData) => {
        // Merge all groups and sort by CRS, take top 6
        const all = [
          ...data.proprietary,
          ...data.open_weight,
          ...data.provider_native,
        ].sort((a, b) => b.crs - a.crs);
        // Re-rank
        const ranked = all.slice(0, 6).map((r, i) => ({ ...r, rank: i + 1 }));
        setRows(ranked);
      });
  }, []);

  if (rows.length === 0) {
    return (
      <div
        className="rounded-xl p-8 text-center"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          color: 'var(--text-muted)',
          fontSize: '0.875rem',
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="lb-table-container overflow-x-auto">
      <table className="lb-table">
        <thead>
          <tr>
            <th style={{ width: 52 }}>#</th>
            <th>Model</th>
            <th>CRS</th>
            <th className="hidden sm:table-cell">TCR</th>
            <th className="hidden md:table-cell">Robustness</th>
          </tr>
        </thead>
        <tbody className="table-row-stagger">
          {rows.map((row) => (
            <tr
              key={row.rank}
              style={{ animationDelay: `${(row.rank - 1) * 20}ms` }}
            >
              <td>
                <div className="flex justify-center">
                  <RankBadge rank={row.rank} />
                </div>
              </td>
              <td>
                <div>
                  <span
                    className="font-semibold"
                    style={{ color: 'var(--text)', fontSize: '0.875rem' }}
                  >
                    {row.model}
                  </span>
                </div>
                {row.note && (
                  <div
                    className="mt-0.5"
                    style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}
                  >
                    {row.note}
                  </div>
                )}
              </td>
              <td>
                <ScoreBar value={row.crs} />
              </td>
              <td className="hidden sm:table-cell">
                <span
                  className="tabular-nums font-mono"
                  style={{ fontSize: '0.8125rem', color: 'var(--text)' }}
                >
                  {row.tcr_avg.toFixed(2)}
                </span>
              </td>
              <td className="hidden md:table-cell">
                <span
                  className="tabular-nums font-mono"
                  style={{ fontSize: '0.8125rem', color: 'var(--text)' }}
                >
                  {row.rob.toFixed(2)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

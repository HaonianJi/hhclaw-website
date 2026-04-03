'use client';

import { useEffect, useState } from 'react';

interface Exp2Row {
  rank: number;
  framework: string;
  model: string;
  provider: string;
  overall: number;
  mc_em: number;
  mc_partial: number | null;
  ec_pass: number | null;
  rounds: number;
  complete: string;
}

function scoreColor(v: number): string {
  if (v >= 0.7) return 'linear-gradient(90deg, #22c55e, #16a34a)';
  if (v >= 0.5) return 'linear-gradient(90deg, #ff6b35, #f7c948)';
  return 'linear-gradient(90deg, #ef4444, #e2336b)';
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="rank-badge rank-badge-gold">🥇</span>;
  if (rank === 2) return <span className="rank-badge rank-badge-silver">🥈</span>;
  if (rank === 3) return <span className="rank-badge rank-badge-bronze">🥉</span>;
  return (
    <span className="rank-badge rank-badge-plain">
      {rank}
    </span>
  );
}

function ScoreBar({ value }: { value: number }) {
  return (
    <div className="score-bar-wrap">
      <div className="score-bar-track" style={{ minWidth: 60 }}>
        <div
          className="score-bar-fill"
          style={{
            width: `${Math.round(value * 100)}%`,
            background: scoreColor(value),
          }}
        />
      </div>
      <span
        className="tabular-nums font-mono font-semibold"
        style={{ fontSize: '0.8125rem', color: 'var(--text)', minWidth: 38 }}
      >
        {value.toFixed(3)}
      </span>
    </div>
  );
}

export default function QuickLeaderboard() {
  const [rows, setRows] = useState<Exp2Row[]>([]);

  useEffect(() => {
    fetch('/data/leaderboard_exp1.json')
      .then((r) => r.json())
      .then((data: Exp2Row[]) => setRows(data));
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
            <th>Configuration</th>
            <th>Overall</th>
            <th className="hidden sm:table-cell">MC EM</th>
            <th className="hidden md:table-cell">EC Pass</th>
            <th className="hidden lg:table-cell">Rounds</th>
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
                    {row.framework}
                  </span>
                  <span
                    className="ml-1"
                    style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}
                  >
                    + {row.model}
                  </span>
                </div>
                <div
                  className="mt-0.5"
                  style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}
                >
                  {row.provider}
                </div>
              </td>
              <td>
                <ScoreBar value={row.overall} />
              </td>
              <td className="hidden sm:table-cell">
                {row.mc_em != null ? (
                  <span
                    className="tabular-nums font-mono"
                    style={{ fontSize: '0.8125rem', color: 'var(--text)' }}
                  >
                    {row.mc_em.toFixed(3)}
                  </span>
                ) : (
                  <span style={{ color: 'var(--text-muted)' }}>—</span>
                )}
              </td>
              <td className="hidden md:table-cell">
                {row.ec_pass != null ? (
                  <span
                    className="tabular-nums font-mono"
                    style={{ fontSize: '0.8125rem', color: 'var(--text)' }}
                  >
                    {row.ec_pass.toFixed(3)}
                  </span>
                ) : (
                  <span style={{ color: 'var(--text-muted)' }}>—</span>
                )}
              </td>
              <td className="hidden lg:table-cell">
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  {row.rounds}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

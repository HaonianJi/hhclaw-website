'use client';

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  type ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronRight } from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────────── */
export interface Exp1Row {
  rank: number;
  framework: string;
  model: string;
  overall: number;
  em_rate: number | null;
  mc_score: number;
  ec_pass: number;
  note: string | null;
}

export interface Exp2Row {
  rank: number;
  framework: string;
  model: string;
  provider: string;
  overall: number;
  mc_em: number;
  mc_partial: number | null;
  ec_pass: number | null;
  avg_fp: number | null;
  avg_fn: number | null;
  rounds: number;
  complete: string;
  per_scenario: Record<string, number>;
}

/* ─── Helpers ───────────────────────────────────────────────── */
function scoreColor(v: number): string {
  if (v >= 0.75) return 'linear-gradient(90deg, #22c55e, #16a34a)';
  if (v >= 0.55) return 'linear-gradient(90deg, #ff6b35, #f7c948)';
  if (v >= 0.40) return 'linear-gradient(90deg, #f59e0b, #f97316)';
  return 'linear-gradient(90deg, #ef4444, #e2336b)';
}

function fmtNum(v: number | null | undefined) {
  if (v == null) return '—';
  return v.toFixed(3);
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="rank-badge rank-badge-gold">🥇</span>;
  if (rank === 2) return <span className="rank-badge rank-badge-silver">🥈</span>;
  if (rank === 3) return <span className="rank-badge rank-badge-bronze">🥉</span>;
  return <span className="rank-badge rank-badge-plain">{rank}</span>;
}

function ScoreBar({ value }: { value: number | null }) {
  if (value == null)
    return <span style={{ color: 'var(--text-muted)' }}>—</span>;
  return (
    <div className="score-bar-wrap">
      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{ width: `${Math.round(value * 100)}%`, background: scoreColor(value), boxShadow: value >= 0.55 ? '0 0 6px rgba(255,107,53,0.3)' : 'none' }}
        />
      </div>
      <span
        className="tabular-nums font-mono font-semibold"
        style={{ fontSize: '0.8rem', color: 'var(--text)', minWidth: 38 }}
      >
        {value.toFixed(3)}
      </span>
    </div>
  );
}

function SortIcon({ sorted }: { sorted: false | 'asc' | 'desc' }) {
  if (!sorted) return <ChevronsUpDown size={12} className="opacity-50" />;
  if (sorted === 'asc') return <ChevronUp size={12} />;
  return <ChevronDown size={12} />;
}

/* ─── Scenario Heatmap ──────────────────────────────────────── */
const SUBSET_12 = [
  'hil_c6','hil_d2','hil_d6','hil_e6',
  'hil_f1','hil_f5','hil_g7','hil_h3',
  'hil_i2','hil_i4','hil_j4','hil_j8',
];

function heatColor(v: number | undefined): string {
  if (v == null) return 'var(--surface-alt)';
  const r = Math.round(239 - (239 - 34) * v);
  const g = Math.round(68 + (197 - 68) * v);
  const b = Math.round(68 + (94 - 68) * v);
  return `rgb(${r},${g},${b})`;
}

function ExpandPanel({ row }: { row: Exp2Row }) {
  return (
    <tr>
      <td
        colSpan={9}
        style={{
          background: 'rgba(255,107,53,0.03)',
          borderBottom: '2px solid rgba(255,107,53,0.4)',
          padding: '0',
        }}
      >
        <div
          className="animate-slide-down px-5 py-4"
          style={{ borderTop: '1px solid rgba(255,107,53,0.15)' }}
        >
          <div
            className="font-semibold mb-3"
            style={{ fontSize: '0.875rem', color: 'var(--text)' }}
          >
            {row.framework} + {row.model} — Per-Scenario Breakdown
          </div>

          {/* Heatmap */}
          <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(6, 1fr)', maxWidth: 480 }}>
            {SUBSET_12.map((sc) => {
              const val = row.per_scenario?.[sc];
              return (
                <div
                  key={sc}
                  className="heatmap-cell"
                  style={{
                    background: heatColor(val),
                    color: val == null ? 'var(--text-muted)' : val > 0.5 ? '#fff' : '#1f2937',
                    padding: '6px 4px',
                    borderRadius: 6,
                    fontSize: '0.65rem',
                    flexDirection: 'column',
                    gap: 2,
                    opacity: val == null ? 0.45 : 1,
                  }}
                  title={`${sc}: ${val != null ? (val * 100).toFixed(0) + '%' : 'not run'}`}
                >
                  <span style={{ fontWeight: 700 }}>{sc.replace('hil_', '')}</span>
                  <span>{val != null ? `${(val * 100).toFixed(0)}%` : '—'}</span>
                </div>
              );
            })}
          </div>

          {/* Stats row */}
          <div
            className="flex flex-wrap gap-x-6 gap-y-1 mt-3"
            style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}
          >
            {row.avg_fp != null && (
              <span>Avg FP/q: <strong style={{ color: 'var(--text)' }}>{row.avg_fp.toFixed(2)}</strong></span>
            )}
            {row.avg_fn != null && (
              <span>Avg FN/q: <strong style={{ color: 'var(--text)' }}>{row.avg_fn.toFixed(2)}</strong></span>
            )}
            <span>Rounds: <strong style={{ color: 'var(--text)' }}>{row.rounds}</strong></span>
            <span>Coverage: <strong style={{ color: 'var(--text)' }}>{row.complete}</strong></span>
          </div>
        </div>
      </td>
    </tr>
  );
}

/* ─── Exp2 Table ─────────────────────────────────────────────── */
export function Exp2Table({ data }: { data: Exp2Row[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);


  const columns = useMemo<ColumnDef<Exp2Row>[]>(
    () => [
      {
        id: 'rank',
        header: '#',
        accessorKey: 'rank',
        cell: ({ row }) => (
          <div className="flex justify-center">
            <RankBadge rank={row.original.rank} />
          </div>
        ),
        enableSorting: false,
        size: 52,
      },
      {
        id: 'config',
        header: 'Configuration',
        accessorFn: (r) => `${r.framework} ${r.model}`,
        cell: ({ row }) => (
          <div>
            <div>
              <span className="font-semibold" style={{ color: 'var(--text)', fontSize: '0.875rem' }}>
                {row.original.framework}
              </span>
              <span className="ml-1" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                + {row.original.model}
              </span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>
              {row.original.provider}
            </div>
          </div>
        ),
        enableSorting: false,
      },
      {
        id: 'overall',
        header: 'Overall ▾',
        accessorKey: 'overall',
        cell: ({ getValue }) => <ScoreBar value={getValue() as number} />,
      },
      {
        id: 'mc_em',
        header: 'MC EM',
        accessorKey: 'mc_em',
        cell: ({ getValue }) => <ScoreBar value={getValue() as number} />,
      },
      {
        id: 'ec_pass',
        header: 'EC Pass',
        accessorKey: 'ec_pass',
        cell: ({ getValue }) => <ScoreBar value={getValue() as number | null} />,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="lb-table-container" style={{ maxHeight: 700, overflowY: 'auto' }}>
      <div style={{ overflowX: 'auto' }}>
        <table className="lb-table">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      cursor: header.column.getCanSort() ? 'pointer' : 'default',
                    }}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <SortIcon sorted={header.column.getIsSorted()} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="table-row-stagger">
            {table.getRowModel().rows.map((row, i) => (
              <tr key={row.id} style={{ animationDelay: `${i * 20}ms` }}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Exp1 Table ─────────────────────────────────────────────── */
export function Exp1Table({ data }: { data: Exp1Row[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<Exp1Row>[]>(
    () => [
      {
        id: 'rank',
        header: '#',
        accessorKey: 'rank',
        cell: ({ row }) => (
          <div className="flex justify-center">
            <RankBadge rank={row.original.rank} />
          </div>
        ),
        enableSorting: false,
        size: 52,
      },
      {
        id: 'config',
        header: 'Configuration',
        accessorFn: (r) => `${r.framework} ${r.model}`,
        cell: ({ row }) => (
          <div>
            <div>
              <span className="font-semibold" style={{ color: 'var(--text)', fontSize: '0.875rem' }}>
                {row.original.framework}
              </span>
              <span className="ml-1" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                + {row.original.model}
              </span>
            </div>
            {row.original.note && (
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 2 }}>
                {row.original.note}
              </div>
            )}
          </div>
        ),
        enableSorting: false,
      },
      {
        id: 'overall',
        header: 'Overall ▾',
        accessorKey: 'overall',
        cell: ({ getValue }) => <ScoreBar value={getValue() as number} />,
      },
      {
        id: 'mc_score',
        header: 'MC Score',
        accessorKey: 'mc_score',
        cell: ({ getValue }) => <ScoreBar value={getValue() as number} />,
      },
      {
        id: 'ec_pass',
        header: 'EC Pass',
        accessorKey: 'ec_pass',
        cell: ({ getValue }) => <ScoreBar value={getValue() as number} />,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="lb-table-container" style={{ maxHeight: 700, overflowY: 'auto' }}>
      <div style={{ overflowX: 'auto' }}>
        <table className="lb-table">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <SortIcon sorted={header.column.getIsSorted()} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="table-row-stagger">
            {table.getRowModel().rows.map((row, i) => (
              <tr key={row.id} style={{ animationDelay: `${i * 20}ms` }}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

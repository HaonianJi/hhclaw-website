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
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────────── */
export interface ModelRow {
  rank: number;
  model: string;
  tcr_avg: number;
  tcr_mc: number;
  tcr_ec: number;
  rob: number;
  sc: number;
  fd: number;
  crs: number;
  note?: string | null;
}

export interface FrameworkRow {
  rank: number;
  framework: string;
  tcr_avg: number;
  tcr_mc: number;
  tcr_ec: number;
  rob: number;
  sc: number;
  fd: number;
  crs: number;
  note?: string | null;
}

export interface MetaClawRow {
  model: string;
  config: string;
  tcr_avg: number;
  tcr_mc: number;
  tcr_ec: number;
  sc: number;
  fd: number;
  crs: number;
  delta?: number | null;
}

export interface CrossModelData {
  proprietary: ModelRow[];
  open_weight: ModelRow[];
  provider_native: ModelRow[];
}

export interface CrossFrameworkData {
  gpt51: FrameworkRow[];
  kimi_k25: FrameworkRow[];
}

/* ─── Helpers ───────────────────────────────────────────────── */
function scoreColor(v: number): string {
  if (v >= 65) return 'linear-gradient(90deg, #22c55e, #16a34a)';
  if (v >= 55) return 'linear-gradient(90deg, #ff6b35, #f7c948)';
  if (v >= 45) return 'linear-gradient(90deg, #f59e0b, #f97316)';
  return 'linear-gradient(90deg, #ef4444, #e2336b)';
}

function fmtNum(v: number | null | undefined) {
  if (v == null) return '—';
  return v.toFixed(2);
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="rank-badge rank-badge-gold">&#129351;</span>;
  if (rank === 2) return <span className="rank-badge rank-badge-silver">&#129352;</span>;
  if (rank === 3) return <span className="rank-badge rank-badge-bronze">&#129353;</span>;
  return <span className="rank-badge rank-badge-plain">{rank}</span>;
}

function ScoreBar({ value, max = 100 }: { value: number | null; max?: number }) {
  if (value == null) return <span style={{ color: 'var(--text-muted)' }}>—</span>;
  return (
    <div className="score-bar-wrap">
      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{ width: `${Math.round((value / max) * 100)}%`, background: scoreColor(value), boxShadow: value >= 55 ? '0 0 6px rgba(255,107,53,0.3)' : 'none' }}
        />
      </div>
      <span
        className="tabular-nums font-mono font-semibold"
        style={{ fontSize: '0.8rem', color: 'var(--text)', minWidth: 38 }}
      >
        {value.toFixed(2)}
      </span>
    </div>
  );
}

function SortIcon({ sorted }: { sorted: false | 'asc' | 'desc' }) {
  if (!sorted) return <ChevronsUpDown size={12} className="opacity-50" />;
  if (sorted === 'asc') return <ChevronUp size={12} />;
  return <ChevronDown size={12} />;
}

function NumCell({ value }: { value: number }) {
  return (
    <span className="tabular-nums font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
      {value.toFixed(2)}
    </span>
  );
}

/* ─── Section Header ───────────────────────────────────────── */
function SectionHeader({ title }: { title: string }) {
  return (
    <tr>
      <td
        colSpan={99}
        style={{
          background: 'rgba(255,107,53,0.04)',
          borderBottom: '1px solid var(--border)',
          padding: '8px 16px',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </td>
    </tr>
  );
}

/* ─── Generic Table Renderer ──────────────────────────────── */
function DataTable<T>({
  columns,
  sections,
}: {
  columns: ColumnDef<T>[];
  sections: { title: string; data: T[] }[];
}) {
  const allData = useMemo(() => sections.flatMap((s) => s.data), [sections]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: allData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // When sorting is active, render flat; otherwise render with sections
  const isSorted = sorting.length > 0;

  return (
    <div className="lb-table-container" style={{ maxHeight: 800, overflowY: 'auto' }}>
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
            {isSorted
              ? table.getRowModel().rows.map((row, i) => (
                  <tr key={row.id} style={{ animationDelay: `${i * 15}ms` }}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              : sections.map((section) => {
                  const sectionRows = table
                    .getRowModel()
                    .rows.filter((row) =>
                      section.data.includes(row.original)
                    );
                  return [
                    <SectionHeader key={`section-${section.title}`} title={section.title} />,
                    ...sectionRows.map((row, i) => (
                      <tr key={row.id} style={{ animationDelay: `${i * 15}ms` }}>
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    )),
                  ];
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Cross-Model Table ────────────────────────────────────── */
export function CrossModelTable({ data }: { data: CrossModelData }) {
  const columns = useMemo<ColumnDef<ModelRow>[]>(
    () => [
      {
        id: 'rank', header: '#', accessorKey: 'rank', enableSorting: false, size: 48,
        cell: ({ getValue }) => <div className="flex justify-center"><RankBadge rank={getValue() as number} /></div>,
      },
      {
        id: 'model', header: 'Model', accessorKey: 'model', enableSorting: false,
        cell: ({ row }) => (
          <div>
            <span className="font-semibold" style={{ color: 'var(--text)', fontSize: '0.875rem' }}>
              {row.original.model}
            </span>
            {row.original.note && (
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 2 }}>{row.original.note}</div>
            )}
          </div>
        ),
      },
      { id: 'crs', header: 'CRS', accessorKey: 'crs', cell: ({ getValue }) => <ScoreBar value={getValue() as number} /> },
      { id: 'tcr_avg', header: 'TCR', accessorKey: 'tcr_avg', cell: ({ getValue }) => <NumCell value={getValue() as number} /> },
      { id: 'tcr_mc', header: 'MC', accessorKey: 'tcr_mc', cell: ({ getValue }) => <NumCell value={getValue() as number} /> },
      { id: 'tcr_ec', header: 'EC', accessorKey: 'tcr_ec', cell: ({ getValue }) => <NumCell value={getValue() as number} /> },
      { id: 'rob', header: 'Robustness', accessorKey: 'rob', cell: ({ getValue }) => <NumCell value={getValue() as number} /> },
      { id: 'sc', header: 'SC', accessorKey: 'sc', cell: ({ getValue }) => <NumCell value={getValue() as number} /> },
      { id: 'fd', header: 'FD', accessorKey: 'fd', cell: ({ getValue }) => <NumCell value={getValue() as number} /> },
    ],
    []
  );

  const sections = [
    { title: 'Proprietary (OpenClaw)', data: data.proprietary },
    { title: 'Open-Weight (OpenClaw)', data: data.open_weight },
    { title: 'Provider-Native (Claude Code)', data: data.provider_native },
  ];

  return <DataTable columns={columns} sections={sections} />;
}

/* ─── Cross-Framework Table ────────────────────────────────── */
export function CrossFrameworkTable({ data }: { data: CrossFrameworkData }) {
  const columns = useMemo<ColumnDef<FrameworkRow>[]>(
    () => [
      {
        id: 'rank', header: '#', accessorKey: 'rank', enableSorting: false, size: 48,
        cell: ({ getValue }) => <div className="flex justify-center"><RankBadge rank={getValue() as number} /></div>,
      },
      {
        id: 'framework', header: 'Framework', accessorKey: 'framework', enableSorting: false,
        cell: ({ row }) => (
          <div>
            <span className="font-semibold" style={{ color: 'var(--text)', fontSize: '0.875rem' }}>
              {row.original.framework}
            </span>
            {row.original.note && (
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 2 }}>{row.original.note}</div>
            )}
          </div>
        ),
      },
      { id: 'crs', header: 'CRS', accessorKey: 'crs', cell: ({ getValue }) => <ScoreBar value={getValue() as number} /> },
      { id: 'tcr_avg', header: 'TCR', accessorKey: 'tcr_avg', cell: ({ getValue }) => <NumCell value={getValue() as number} /> },
      { id: 'tcr_mc', header: 'MC', accessorKey: 'tcr_mc', cell: ({ getValue }) => <NumCell value={getValue() as number} /> },
      { id: 'tcr_ec', header: 'EC', accessorKey: 'tcr_ec', cell: ({ getValue }) => <NumCell value={getValue() as number} /> },
      { id: 'rob', header: 'Robustness', accessorKey: 'rob', cell: ({ getValue }) => <NumCell value={getValue() as number} /> },
      { id: 'sc', header: 'SC', accessorKey: 'sc', cell: ({ getValue }) => <NumCell value={getValue() as number} /> },
      { id: 'fd', header: 'FD', accessorKey: 'fd', cell: ({ getValue }) => <NumCell value={getValue() as number} /> },
    ],
    []
  );

  const sections = [
    { title: 'GPT-5.1', data: data.gpt51 },
    { title: 'Kimi-K2.5', data: data.kimi_k25 },
  ];

  return <DataTable columns={columns} sections={sections} />;
}

/* ─── MetaClaw Overlay Table ──────────────────────────────── */
export function MetaClawTable({ data }: { data: MetaClawRow[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<MetaClawRow>[]>(
    () => [
      {
        id: 'model', header: 'Model', accessorKey: 'model', enableSorting: false,
        cell: ({ getValue }) => (
          <span className="font-semibold" style={{ color: 'var(--text)', fontSize: '0.875rem' }}>
            {getValue() as string}
          </span>
        ),
      },
      {
        id: 'config', header: 'Config', accessorKey: 'config', enableSorting: false,
        cell: ({ row }) => {
          const isMetaClaw = row.original.config.includes('MetaClaw');
          return (
            <span style={{
              fontSize: '0.8rem',
              color: isMetaClaw ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: isMetaClaw ? 600 : 400,
            }}>
              {row.original.config}
            </span>
          );
        },
      },
      { id: 'crs', header: 'CRS', accessorKey: 'crs',
        cell: ({ row }) => {
          const d = row.original.delta;
          return (
            <div className="flex items-center gap-2">
              <ScoreBar value={row.original.crs} />
              {d != null && (
                <span style={{ fontSize: '0.7rem', color: '#22c55e', fontWeight: 600 }}>
                  +{d.toFixed(2)}
                </span>
              )}
            </div>
          );
        },
      },
      { id: 'tcr_avg', header: 'TCR', accessorKey: 'tcr_avg', cell: ({ getValue }) => <NumCell value={getValue() as number} /> },
      { id: 'tcr_mc', header: 'MC', accessorKey: 'tcr_mc', cell: ({ getValue }) => <NumCell value={getValue() as number} /> },
      { id: 'tcr_ec', header: 'EC', accessorKey: 'tcr_ec', cell: ({ getValue }) => <NumCell value={getValue() as number} /> },
      { id: 'sc', header: 'SC', accessorKey: 'sc', cell: ({ getValue }) => <NumCell value={getValue() as number} /> },
      { id: 'fd', header: 'FD', accessorKey: 'fd', cell: ({ getValue }) => <NumCell value={getValue() as number} /> },
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

  // Group by model pairs
  const models = ['GPT-5.1', 'GLM-5.1', 'Qwen3.6-Plus'];

  return (
    <div className="lb-table-container" style={{ maxHeight: 600, overflowY: 'auto' }}>
      <div style={{ overflowX: 'auto' }}>
        <table className="lb-table">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} style={{ cursor: 'default' }}>
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="table-row-stagger">
            {models.map((modelName, mi) => {
              const rows = table.getRowModel().rows.filter((r) => r.original.model === modelName);
              return rows.map((row, i) => (
                <tr
                  key={row.id}
                  style={{
                    animationDelay: `${(mi * 2 + i) * 15}ms`,
                    borderTop: i === 0 && mi > 0 ? '2px solid var(--border)' : undefined,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

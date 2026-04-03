'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const BIBTEX = `@misc{hhclaw2026,
  title        = {HHClaw: A Human-in-the-Loop Benchmark for Personal AI Assistants},
  author       = {HHClaw Team},
  year         = {2026},
  eprint       = {2026.xxxxx},
  archivePrefix= {arXiv},
  primaryClass = {cs.AI},
  url          = {https://arxiv.org/abs/2026.xxxxx}
}`;

export default function BibTexCopy() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(BIBTEX);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
    >
      {/* header bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{
          background: 'var(--surface-alt)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <span
          className="font-semibold"
          style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}
        >
          BibTeX Citation
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all duration-150 hover:scale-[1.02]"
          style={{
            fontSize: '0.75rem',
            background: copied ? '#dcfce7' : 'var(--primary-light)',
            color: copied ? '#16a34a' : 'var(--primary)',
            border: `1px solid ${copied ? '#86efac' : '#bfdbfe'}`,
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* code */}
      <pre
        className="code-block rounded-none m-0"
        style={{ borderRadius: 0, border: 'none', fontSize: '0.8rem' }}
      >
        {BIBTEX}
      </pre>
    </div>
  );
}

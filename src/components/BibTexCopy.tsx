'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const BIBTEX = `@article{clawarena2026,
  title={ClawArena: Benchmarking AI Agents in Evolving Information Environments},
  author={Anonymous},
  year={2026},
  note={Preprint}
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
          background: 'rgba(255,107,53,0.05)',
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
            background: copied ? 'rgba(34,197,94,0.12)' : 'rgba(255,107,53,0.1)',
            color: copied ? '#4ade80' : 'var(--primary)',
            border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : 'rgba(255,107,53,0.25)'}`,
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

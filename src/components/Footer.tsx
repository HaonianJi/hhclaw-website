'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        color: 'var(--text-secondary)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img
                src="/clawarena-logo.png"
                alt="ClawArena"
                width={32}
                height={32}
                className="rounded"
                style={{ filter: 'drop-shadow(0 0 6px rgba(255,107,53,0.35))' }}
              />
              <span
                className="font-bold"
                style={{
                  fontSize: '1rem',
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #ff6b35, #f7c948)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ClawArena
              </span>
            </div>
            <p
              style={{
                fontSize: '0.8125rem',
                color: 'var(--text-muted)',
                maxWidth: 300,
                lineHeight: 1.5,
              }}
            >
              Benchmarking AI Agents in Evolving Information Environments.
              A benchmark for AI agents in evolving information environments.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-5 text-sm flex-wrap">
            {[
              { href: '/leaderboard', label: 'Leaderboard' },
              { href: '/about', label: 'About' },
              { href: '/dataset', label: 'Dataset' },
              { href: '/submit', label: 'Submit' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="transition-colors duration-150"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6b35')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6b35')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              GitHub
            </a>
          </div>
        </div>

        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{
            borderTop: '1px solid var(--border)',
            color: 'var(--text-muted)',
          }}
        >
          <span>© 2026 ClawArena Project. Released under CC BY 4.0.</span>
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.6)' }}
            />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

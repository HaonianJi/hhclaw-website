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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🦀</span>
            <span className="font-semibold" style={{ color: 'var(--text)' }}>
              ClawArena Benchmark
            </span>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              — Benchmarking AI Agents in Evolving Information Environments
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/leaderboard"
              className="transition-colors duration-150 hover:underline"
              style={{ color: 'var(--text-secondary)' }}
            >
              Leaderboard
            </Link>
            <Link
              href="/about"
              className="transition-colors duration-150 hover:underline"
              style={{ color: 'var(--text-secondary)' }}
            >
              About
            </Link>
            <Link
              href="/dataset"
              className="transition-colors duration-150 hover:underline"
              style={{ color: 'var(--text-secondary)' }}
            >
              Dataset
            </Link>
            <Link
              href="/submit"
              className="transition-colors duration-150 hover:underline"
              style={{ color: 'var(--text-secondary)' }}
            >
              Submit
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:underline"
              style={{ color: 'var(--text-secondary)' }}
            >
              GitHub
            </a>
          </div>
        </div>

        <div
          className="mt-6 pt-6 text-center text-xs"
          style={{
            borderTop: '1px solid var(--border)',
            color: 'var(--text-muted)',
          }}
        >
          © 2026 ClawArena Project. Released under CC BY 4.0.
        </div>
      </div>
    </footer>
  );
}

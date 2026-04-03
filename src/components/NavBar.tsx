'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/about',       label: 'About' },
  { href: '/dataset',     label: 'Dataset' },
  { href: '/submit',      label: 'Submit' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 no-underline"
            style={{ textDecoration: 'none' }}
          >
            <span className="text-2xl select-none">🦀</span>
            <span
              className="font-bold"
              style={{
                fontSize: '1.25rem',
                color: 'var(--text)',
                letterSpacing: '-0.02em',
              }}
            >
              HHClaw
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link${isActive ? ' active' : ''}`}
                >
                  {label}
                </Link>
              );
            })}
            <div className="ml-3">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="w-9 h-9 rounded-md flex items-center justify-center transition-colors duration-150"
              style={{
                background: 'var(--surface-alt)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div
            className="md:hidden py-3 pb-4 flex flex-col gap-1 animate-fade-in"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link block${isActive ? ' active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}

import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HHClaw Benchmark',
  description:
    'Human-in-the-Loop Evaluation for Personal AI Assistants — 64 scenarios, 8 domains, 1,879 evaluation rounds.',
  keywords: ['AI benchmark', 'human-in-the-loop', 'evaluation', 'LLM', 'personal assistant'],
  openGraph: {
    title: 'HHClaw Benchmark',
    description:
      'Human-in-the-Loop Evaluation for Personal AI Assistants',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <NavBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

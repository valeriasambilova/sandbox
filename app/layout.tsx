import './global.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Header } from './components/header';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from './components/footer';
import { baseUrl } from './sitemap';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'CodeSprinkles',
    template: '%s | CodeSprinkles',
  },
  description: 'Mini coding adventures',
  openGraph: {
    title: 'CodeSprinkles',
    description: 'Mini coding adventures',
    url: baseUrl,
    siteName: 'CodeSprinkles',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={cx(
        'bg-white text-black dark:bg-neutral-900 dark:text-white',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className='antialiased'>
        <Header />
        <main className='mx-auto mt-6 flex max-w-7xl min-w-0 flex-auto flex-col px-4'>
          {children}
        </main>
        <Footer className='mx-auto max-w-7xl px-4' />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

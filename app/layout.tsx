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
  const bgColor = 'bg-neutral-500 dark:bg-neutral-900';

  return (
    <html
      lang='en'
      className={cx(
        'text-black dark:text-white',
        bgColor,
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className='antialiased'>
        <Header className={`${bgColor} text-sm`} />
        <main className='mx-auto mt-6 max-w-7xl flex min-w-0 flex-auto flex-col px-4 text-sm'>
          {children}
        </main>
        <Footer className='mx-auto max-w-7xl px-4' />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

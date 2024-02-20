import './ui/global.css';
import { inter } from '../app/ui/font';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description:
    'The best dashboard for all your financial needs, built with App Router.',
  keywords: ['dashboard', 'finance', 'money', 'budget'],
  openGraph: {
    title: 'Acme Dashboard',
    description:
      'The best dashboard for all your financial needs, built with App Router.',
    url: 'https://next-learn-dashboard.vercel.sh/',
    type: 'website',
    images: [
      {
        url: 'https://next-learn-dashboard.vercel.sh/og.png',
        width: 1200,
        height: 630,
        alt: 'Acme Dashboard',
      },
    ],
  },
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh/'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QueryProvider from '@/providers/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RITEM Consulting - HR Consultancy for Employee Engagement',
  description: 'Maximize employee engagement and health with proven HR solutions. Expert consultancy for global organizations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>

        <Header />
        <main>{children}</main>
        <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
import { Poppins } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Task 8 App',
  description: 'A2SV Internship Task 8',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
} 
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Add display swap for better performance
  preload: true // Ensure font preloading
});

export const metadata: Metadata = {
  title: 'POCSO Awareness - Protecting Children Together',
  description: 'Learn about POCSO Act and child protection. Resources and support for creating a safer environment for children.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
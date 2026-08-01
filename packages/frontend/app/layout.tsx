import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CyberSec Academy - Learn Cybersecurity. Practice It. Master It.',
  description: 'World-class cybersecurity education platform with interactive lessons, practical labs, CTF challenges, and professional certification paths.',
  keywords: ['cybersecurity', 'learning', 'labs', 'CTF', 'security training', 'ethical hacking'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-dark-900 text-white antialiased">
        {children}
      </body>
    </html>
  );
}

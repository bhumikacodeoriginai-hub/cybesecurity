import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CyberSec Academy | Learn Cybersecurity From Zero to Professional',
  description: 'Professional cybersecurity education platform with 10 modules, 72 lessons, and hands-on labs. Built for complete beginners to job-ready professionals.',
  keywords: ['cybersecurity', 'security training', 'ethical hacking', 'penetration testing', 'SOC analyst', 'OWASP'],
  authors: [{ name: 'Raghavendra N', url: 'https://codeorigin.ai' }],
  creator: 'Code Origin.AI Private Limited',
  publisher: 'Code Origin.AI Private Limited',
  robots: 'index, follow',
  openGraph: {
    title: 'CyberSec Academy | Professional Cybersecurity Training',
    description: '10 Modules. 72 Lessons. 10 Hands-On Labs. From zero to security professional.',
    type: 'website',
    siteName: 'CyberSec Academy',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050a14',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-screen bg-dark-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}

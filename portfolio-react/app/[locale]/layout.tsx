import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from "../../i18n/routing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://herosdinao.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Heros Dinão | Business Analytics & Automation',
    template: '%s | Heros Dinão'
  },
  description: 'Portfolio of Heros Dinão — Business Analytics, BI Dashboards, Process Automation and Data Engineering applied to real business problems.',
  openGraph: {
    siteName: 'Heros Dinão Portfolio',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Heros Dinão — Analytics & Automation Portfolio',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: `${siteUrl}/pt`,
    languages: {
      'pt': `${siteUrl}/pt`,
      'en': `${siteUrl}/en`,
      'x-default': `${siteUrl}/pt`,
    }
  },
  verification: {
    google: '2022f5b658c90591',
  }
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params
}: RootLayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming locale is valid
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Heros Dinão",
              "url": "https://herosdinao.vercel.app",
              "jobTitle": "Business Analytics & Automation",
              "knowsAbout": ["Power BI", "Python", "n8n", "Data Engineering", "ETL", "AI Agents"],
              "sameAs": [
                "https://www.linkedin.com/in/heros-dinao",
                "https://github.com/heros-s"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Heros Dinão | Portfolio",
              "url": "https://herosdinao.vercel.app",
              "description": "Portfolio of Heros Dinão — Business Analytics, BI Dashboards, Process Automation and Data Engineering.",
              "inLanguage": ["pt-BR", "en"]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
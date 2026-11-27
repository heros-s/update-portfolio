import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { getLocale } from "next-intl/server";
import { cn } from "@/lib/utils";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html
      lang={locale === 'en' ? 'en' : 'pt-BR'}
      suppressHydrationWarning
      className={cn(plexSans.variable, plexMono.variable)}
    >
      <body>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-6Y3690QMNW`} strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6Y3690QMNW');
          `}
        </Script>
        <Analytics />
      </body>
    </html>
  );
}

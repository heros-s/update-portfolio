import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MotionProvider } from "../components/MotionProvider";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://herosdinao.vercel.app";

const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Heros Dinão | Business Analytics & Automation",
    template: "%s | Heros Dinão",
  },
  description:
    "Portfolio of Heros Dinão — Business Analytics, BI Dashboards, Process Automation and Data Engineering applied to real business problems.",
  openGraph: {
    siteName: "Heros Dinão Portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Heros Dinão — Analytics & Automation Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  alternates: {
    languages: {
      pt: `${siteUrl}/pt`,
      en: `${siteUrl}/en`,
      "x-default": `${siteUrl}/pt`,
    },
  },
  verification: {
    google: "U1cJ-kqFPhPf9wHAptr3vwCr2CmA8rerGL2tszVIAeY",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...baseMetadata,
    alternates: {
      ...baseMetadata.alternates,
      canonical: `${siteUrl}/${locale}`,
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Heros Dinão",
            url: "https://herosdinao.vercel.app",
            jobTitle: "Business Analytics & Automation",
            knowsAbout: [
              "Power BI",
              "Python",
              "n8n",
              "Data Engineering",
              "ETL",
              "AI Agents",
            ],
            sameAs: [
              "https://www.linkedin.com/in/heros-dinao",
              "https://github.com/heros-s",
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Heros Dinão | Portfolio",
            url: "https://herosdinao.vercel.app",
            description:
              "Portfolio of Heros Dinão — Business Analytics, BI Dashboards, Process Automation and Data Engineering.",
            inLanguage: ["pt-BR", "en"],
          }),
        }}
      />

      <NextIntlClientProvider messages={messages}>
        <MotionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </NextIntlClientProvider>
    </>
  );
}
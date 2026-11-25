import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Lato } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { SITE } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], axes: ["opsz"], variable: "--font-inter-next", display: "swap" });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--font-lato-next", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Best Dental Clinic in Kokapet Hyderabad | Prodontics Dental Clinic",
  description:
    "Award-winning dental clinic in Kokapet, Hyderabad. Expert in dental implants, cosmetic dentistry, root canal & smile makeovers. 15+ years experience. Book now!",
  icons: { icon: "/images/7wtBQW15FGtu0H128fPPlq9uMwU.webp", apple: "/images/7wtBQW15FGtu0H128fPPlq9uMwU.webp" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: { type: "website", siteName: SITE.name },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#e6e9eb" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: SITE.name,
  url: SITE.url,
  telephone: SITE.phoneTel,
  email: SITE.email,
  image: `${SITE.url}/images/7wtBQW15FGtu0H128fPPlq9uMwU.webp`,
  address: { "@type": "PostalAddress", addressLocality: "Kokapet, Hyderabad", addressRegion: "Telangana", addressCountry: "IN" },
  geo: { "@type": "GeoCoordinates", latitude: 17.3849745, longitude: 78.3366229 },
  hasMap: SITE.mapsShort,
  sameAs: [SITE.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${lato.variable}`}>
      <body className="min-h-screen bg-surface">
        <Header />
        <main id="main" className="flex w-full flex-col items-center overflow-x-clip">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {SITE.gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${SITE.gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

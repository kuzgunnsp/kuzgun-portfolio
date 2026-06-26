import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kuzgun.dev"),
  title: {
    default: "Kuzgun | Mobile & Web Developer // UI Designer",
    template: "%s | Kuzgun"
  },
  description: "Kuzgun - Mobil, Web ve Oyun Geliştirici. Flutter, SwiftUI, Unity ve Next.js ile yüksek performanslı, minimalist ve kullanıcı odaklı premium dijital çözümler.",
  keywords: [
    "Kuzgun",
    "Kuzgun Developer",
    "Kuzgun Yazılım",
    "Mobile Developer",
    "Web Developer",
    "UI/UX Designer",
    "Flutter Geliştirici",
    "iOS Developer",
    "SwiftUI Geliştirici",
    "Next.js Portfolyo",
    "Lystra Studio",
    "Huzur Vakti Pro",
    "Merkezi Nokta",
    "Kuzgun Portfolyo",
    "Yazılım Geliştirici",
    "Freelance Geliştirici",
    "Premium Web Tasarım"
  ],
  authors: [{ name: "Kuzgun", url: "https://kuzgun.dev" }],
  creator: "Kuzgun",
  publisher: "Kuzgun",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://kuzgun.dev",
    title: "Kuzgun | Mobile & Web Developer // UI Designer",
    description: "Kuzgun - Mobil, Web ve Oyun Geliştirici. Flutter, SwiftUI, Unity ve Next.js ile yüksek performanslı, minimalist ve kullanıcı odaklı premium dijital çözümler.",
    siteName: "Kuzgun Portfolio",
    images: [
      {
        url: "/lystra.jpg",
        width: 1200,
        height: 1200,
        alt: "Kuzgun Portfolio Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuzgun | Mobile & Web Developer // UI Designer",
    description: "Kuzgun - Mobil, Web ve Oyun Geliştirici. Flutter, SwiftUI, Unity ve Next.js ile yüksek performanslı, minimalist ve kullanıcı odaklı premium dijital çözümler.",
    creator: "@kuzgun_dev",
    images: ["/lystra.jpg"],
  },
  alternates: {
    canonical: "https://kuzgun.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Arama motorları ve yapay zeka botları için yapılandırılmış veri (JSON-LD Schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kuzgun",
    "alternateName": "Kuzgun Developer",
    "jobTitle": "Mobile & Web Developer",
    "url": "https://kuzgun.dev",
    "image": "https://kuzgun.dev/lystra.jpg",
    "sameAs": [
      "https://github.com/kuzgunnsp",
      "https://linkedin.com"
    ],
    "description": "Kuzgun - Flutter, SwiftUI, Unity ve Next.js ile premium mobil, web ve oyun çözümleri sunan yazılımcı ve tasarımcı.",
    "knowsAbout": [
      "Mobile App Development",
      "Web Development",
      "Game Development",
      "UI/UX Design",
      "Flutter",
      "SwiftUI",
      "Next.js",
      "Unity",
      "WordPress",
      "WooCommerce",
      "PHP",
      "Tailwind CSS"
    ],
    "knowsLanguage": [
      {
        "@type": "Language",
        "name": "Turkish"
      },
      {
        "@type": "Language",
        "name": "English"
      }
    ]
  };

  return (
    <html
      lang="tr"
      className={`${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-zinc-800 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

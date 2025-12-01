import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "BananaSend - Amadureça a comunicação da sua operação!",
  description:
    "Solução completa para automação de marketing e gestão. Reduza custos e melhore o ROI com nossa plataforma integrada de disparos e gestão de leads.",
  keywords: ["automação de marketing", "disparo de WhatsApp", "gestão de leads", "e-mail marketing", "gerador de leads", "bananasend", "marketing digital"],
  authors: [{ name: 'BananaSend' }],
  openGraph: {
    title: 'BananaSend - Amadureça a comunicação da sua operação!',
    description: 'Solução completa para automação de marketing e gestão. Reduza custos e melhore o ROI com nossa plataforma integrada de disparos e gestão de leads.',
    url: 'https://bananasend.top',
    siteName: 'BananaSend',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'tUqgGgQ_eGW5Yacwnj4y9qEobfzSYHaIt501dKtO0qo',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

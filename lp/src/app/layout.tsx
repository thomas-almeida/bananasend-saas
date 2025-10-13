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
  title: "BananaSend - Quem não é visto, não é lembrado!",
  description:
    "Amadureça seu trampo aprendendo a valorizar suas entregas, seja notado por quem realmente pode te promover, envie newsletters sobre progressos e reports gerando ainda mais valor da sua pessoa no seu time",
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

import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "BananaSend Shop - Produtos Exclusivos",
  description: "Compre produtos únicos e exclusivos na BananaSend Shop. Monitores, eletrônicos e muito mais com entrega em São Paulo.",
  keywords: "loja online, produtos usados, monitor, eletrônicos, São Paulo, entrega",
  openGraph: {
    title: "Monitor AOC Hero 75hz + Suporte Articulado - BananaSend Shop",
    description: "Compre produtos únicos e exclusivos na BananaSend Shop",
    type: "website",
    locale: "pt_BR",
    siteName: "BananaSend",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monitor AOC Hero 75hz + Suporte Articulado - BananaSend Shop",
    description: "Compre produtos únicos e exclusivos na BananaSend Shop",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
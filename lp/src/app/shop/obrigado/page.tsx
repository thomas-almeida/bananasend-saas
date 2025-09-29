import Image from "next/image"
import Button from "@/app/components/ui/Button"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Obrigado pela sua compra! - BananaSend Shop",
  description: "Obrigado por comprar na BananaSend Shop! Em breve entraremos em contato para marcar a entrega do seu produto.",
  keywords: "obrigado, compra, entrega, são paulo, bananasend shop",
  openGraph: {
    title: "Obrigado pela sua compra!",
    description: "Obrigado por comprar na BananaSend Shop! Em breve entraremos em contato.",
    type: "website",
    locale: "pt_BR",
    siteName: "BananaSend Shop",
  },
  twitter: {
    card: "summary",
    title: "Obrigado pela sua compra!",
    description: "Obrigado por comprar na BananaSend Shop! Em breve entraremos em contato.",
  },
  robots: {
    index: false, // Não indexar página de obrigado
    follow: false,
  },
}

export default function Obrigado() {
    return (
        <div className="w-full flex justify-center items-center h-[80vh]">
            <div className="w-[90%] md:w-[40%] p-2">
                <header className="">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-center">
                        <div className="flex justify-center items-center gap-2">
                            <div className="flex justify-start items-center">
                                <Image
                                    src="/img/bananasend-logo.png"
                                    alt="send"
                                    width={80}
                                    height={80}
                                    className="rounded"
                                    priority
                                />
                                <p className="text-xs font-bold italic">Shop</p>
                            </div>
                        </div>
                    </div>
                </header>
                <div>
                    <h1 className="text-4xl py-2 tracking-tighter mt-2">Obrigado!</h1>
                    <p className="py-2 text-lg">Obrigado por sua compra!</p>
                    <p className="py-2 text-lg">Em breve entraremos em contato para marcar a data de entrega! caso queria me chame no whatsapp:</p>
                    <Link href={"https://wa.me/5511949098312"}>
                        <Button
                            value="Tirar Duvidas no Whatsapp"
                            className="p-2.5 px-6 my-2 shadow-lg cursor-pointer w-full font-bold transition-transform hover:scale-101"
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}
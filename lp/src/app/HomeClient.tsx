"use client"

import Image from "next/image";
import { GoogleButton } from "./components/GoogleButton";
import { Modal } from "./components/Modal";
import Pricing from "./components/Pricing";
import Badge from "./components/badge";
import Link from "next/link";
import { useState } from "react";
import type { SubscriptionPlan } from "./types/subscriptions";

interface HomeClientProps {
  initialPrices: SubscriptionPlan[]
  initialWishListTotal: number
}

export default function HomeClient({ initialPrices, initialWishListTotal }: HomeClientProps) {
  const [pricingOpen, setPricingOpen] = useState(false)
  const [wishListTotal] = useState(initialWishListTotal)
  const [prices] = useState<SubscriptionPlan[]>(initialPrices)

  return (
    <>
      <div className="min-h-dvh text-neutral-900 font-sans">
        {/* Header */}
        <header className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center md:justify-between justify-center">
          <div className="flex items-center gap-2 select-none">
            <Image
              src="/img/bananasend-logo.png"
              alt="send"
              width={80}
              height={80}
              className="rounded"
              priority
            />
            <ul className="flex items-center gap-4 text-sm">
              <li>
                <Link
                  href="https://www.tabnews.com.br/thommdev/quem-nao-e-visto-nao-e-lembrado"
                  target="_blank"
                  className="hover:underline"
                >
                  O que é?
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setPricingOpen(true)}
                  className="hover:underline"
                >
                  Preços
                </button>
              </li>
            </ul>
          </div>

          <span className="hidden w-1/2 md:flex items-center justify-end">
            <GoogleButton text="Fazer Login" />
          </span>
        </header>

        {/* Hero */}
        <main className="mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-12 text-center relative z-10 ">
          <span className="flex items-center justify-center">
            <p className="text-sm font-medium text-[#2bb24a] border border-slate-200 px-4 py-1 rounded-full shadow-lg shadow-slate-100">“Quem não é visto, não é Lembrado!” 👀</p>
          </span>

          <h1 className="mt-6 text-3xl sm:text-4xl md:text-[46px] leading-10 tracking-tighter text-neutral-900 italic font-mono">
            Um Jeito <span className="text-[#2bb24a] italic font-serif text-5xl">f0d@</span> de
            <br className="hidden sm:block" />
            <span className="px-2">Metrificar seu Trampo.</span>
          </h1>

          <div className=" px-2 md:px-0">
            <p className="mt-5 text-lg sm:text-md text-neutral-800 max-w-2xl mx-auto leading-6">
              Feito para <Badge text="Qualquer Profissional 🧑🏻‍💻" bgColor="white" textColor="" /> que reporta a algum gestor e usa emails no dia-a-dia! Amadureça suas entregas enviando relatórios simples, modernos e diretos por <Badge text="Email ✉️" bgColor="bg-[#2bb24a]" textColor="text-white" /> mostrando que você é <Badge text="Peça-Chave ✨" bgColor="bg-green-200" textColor="text-green-800" /> no seu time.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <p className="mt-5 text-base sm:text-md text-neutral-800 max-w-2xl mx-auto leading-5 border border-green-200 px-4 py-1 rounded-full shadow-lg shadow-slate-100">
              Já são <b className="text-[#2bb24a] font-mono">+{wishListTotal}</b> Profissionais se Destacando! 🚀
            </p>
          </div>

          <div className="mt-4 w-full flex items-center justify-center" id="cta">
            <GoogleButton text="Entrar na Lista de Espera!" />
          </div>
        </main>

        {/* Visual composition */}
        <section className="absolute 2xl:bottom-0 w-full">
          <div className="flex justify-center items-center">
            <Image
              src="/img/group.png"
              alt="Demonstração send"
              width={1200}
              height={1200}
              className="mix-blend-color md:w-[40%] 2xl:w-[35%]"
              priority
            />
          </div>
        </section>
      </div>
      {pricingOpen && (
        <Modal
          title=""
          onClose={() => setPricingOpen(false)}
        >
          <Pricing prices={prices} />
        </Modal>
      )}
    </>
  );
}

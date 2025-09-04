"use client"

import Image from "next/image";
import { GoogleButton } from "./components/GoogleButton";
import { Modal } from "./components/Modal";
import Pricing from "./components/Pricing";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [pricingOpen, setPricingOpen] = useState(false)
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
                  href="https://www.tabnews.com.br/thommdev"
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

          <span className="md:block hidden">
            <GoogleButton />
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
            Metrificar seu Trampo.
          </h1>

          <p className="mt-5 text-base sm:text-md text-neutral-800 max-w-2xl mx-auto leading-5">
            Amadureça seu trampo aprendendo a valorizar suas entregas, destaque-se dos demais e seja notado por quem realmente pode te promover enviando newsletters sobre progressos e reports gerando ainda mais valor da sua pessoa no seu time.
          </p>

          <div className="mt-6" id="cta">
            <GoogleButton />
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
              className="mix-blend-color md:w-[40%] "
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
          <Pricing />
        </Modal>
      )}
    </>
  );
}

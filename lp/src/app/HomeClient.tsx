"use client"

import Image from "next/image";
import { GoogleButton } from "./components/GoogleButton";
import Pricing from "./components/Pricing";
import Badge from "./components/badge";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { SubscriptionPlan } from "./types/subscriptions";

interface HomeClientProps {
  initialPrices: SubscriptionPlan[]
  initialWishListTotal: number
}

export default function HomeClient({ initialPrices, initialWishListTotal }: HomeClientProps) {
  const [wishListTotal] = useState(initialWishListTotal)
  const [prices] = useState<SubscriptionPlan[]>(initialPrices)

  // Allow only one FAQ <details> open at a time
  useEffect(() => {
    const faq = document.getElementById('faq')
    if (!faq) return

    const getDetails = () => Array.from(faq.querySelectorAll('details')) as HTMLDetailsElement[]

    const onToggle = (e: Event) => {
      const target = e.target as HTMLElement
      if (!target || target.tagName.toLowerCase() !== 'details') return
      const detailsEls = getDetails()
      const opened = target as HTMLDetailsElement
      if (opened.open) {
        detailsEls.forEach(d => {
          if (d !== opened) d.removeAttribute('open')
        })
      }
    }

    faq.addEventListener('toggle', onToggle, true)
    return () => faq.removeEventListener('toggle', onToggle, true)
  }, [])

  return (
    <>
      <div className="min-h-dvh text-neutral-900 font-sans pt-20">
        {/* Header */}
        <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center md:justify-between justify-center">
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
                  <Link
                    href="#precos"
                    className="hover:underline"
                  >
                    Preços
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faq"
                    className="hover:underline"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <span className="hidden w-1/2 md:flex items-center justify-end">
              <GoogleButton text="Fazer Login" />
            </span>
          </div>
        </header>

        {/* Hero */}
        <main className="mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-12 text-center relative z-10 ">
          <span className="flex items-center justify-center">
            <p className="text-sm font-medium text-[#2bb24a] border border-slate-200 px-4 py-1 rounded-full shadow-lg shadow-slate-100">“Quem não é visto, não é Lembrado!” 👀</p>
          </span>

          <h1 className="mt-6 text-3xl sm:text-4xl md:text-[46px] leading-10 tracking-tighter text-neutral-900 italic font-mono [text-wrap:balance]">
            Faça até seu <span className="text-[#2bb24a] italic font-serif text-5xl">Chefe</span> virar sua Audiência no&nbsp;Trampo
          </h1>

          <div className=" px-2 md:px-0">
            <p className="mt-5 text-lg sm:text-md text-neutral-800 max-w-2xl mx-auto leading-6">
              Melhore sua presença no <i>LinkedIn</i>, monitore oportunidades no <i>Whatsapp</i> e amadureça suas entregas enviando <i>Newsletters</i> modernas e diretas por <i>Email</i> mostrando que você é essencial para gestores e&nbsp;RHs.
            </p>
          </div>

          <div className="flex items-center justify-center mt-4">
            <Image
              src="/icons/linkedin.png"
              alt="send"
              className="rotate-[-12deg]"
              width={60}
              height={60}
              priority
            />
            <Image
              src="/icons/whatsapp.png"
              alt="send"
              className=""
              width={60}
              height={40}
              priority
            />
            <Image
              src="/icons/mail.png"
              alt="send"
              className="rotate-12"
              width={60}
              height={40}
              priority
            />
          </div>

          <div className="mt-6 w-full flex items-center justify-center" id="cta">
            <GoogleButton text="Começar Grátis Sem Cartão" />
          </div>
        </main>

        <section className="mx-auto my-12 max-w-3xl px-4 sm:px-6 pt-10 sm:pt-12 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl md:leading-8 tracking-tighter text-neutral-900 font-mono [text-wrap:balance]">Aumente sua visibilidade em apenas <span className="text-[#2bb24a] italic font-serif text-4xl">3</span> cliques!</h2>
          <p className="py-2 text-neutral-600">Faça seus relatórios serem o assunto da semana na reunião da sua gestão</p>
          <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
            <div className="grid grid-cols-1 gap-4 py-5">
              <div className="text-left border border-slate-200 p-6 py-8 rounded-2xl shadow-lg shadow-slate-100">
                <b className="text-2xl">✉️</b>
                <h3 className="text-xl text-[#2bb24a] font-mono tracking-tighter pb-2">Faça seu Login</h3>
                <p className="leading-5">Entre com sua conta Google, e complete seu cadastro e inclua os destinatários desejados</p>
              </div>
              <div className="text-left border border-slate-200 p-6 py-8 rounded-2xl shadow-lg shadow-slate-100">
                <b className="text-2xl">✨</b>
                <h3 className="text-xl text-[#2bb24a] font-mono tracking-tighter pb-2">Crie e Construa</h3>
                <p className="leading-5">Automatize seu primeiro post no LinkedIn, Crie sua primeira newsletter, Conecte seu Whatsapp e comece a ter insights para se destacar</p>
              </div>
              <div className="text-left border border-slate-200 p-6 py-8 rounded-2xl shadow-lg shadow-slate-100">
                <b className="text-2xl">✅</b>
                <h3 className="text-xl text-[#2bb24a] font-mono tracking-tighter pb-2">Seja notado!</h3>
                <p className="leading-5">Veja seu progresso e veja como sua presença no LinkedIn, feedbacks da Newsletter e as novas métricas do seu Whatsapp estão evoluindo</p>
              </div>
            </div>

            <div className="flex items-center justify-center my-5 relative ">
              <Image
                src="/nww.png"
                alt="send"
                width={400}
                height={400}
                className="shadow-lg shadow-slate-100 border border-slate-200 p-2 rounded-2xl"
                priority
              />
              <p className="absolute top-[-2%] left-[15%] p-1 rounded-full px-4 bg-white border border-slate-200 shadow-lg shadow-slate-100s font-mono z-10 ">Templates que Convertem</p>
              <p className="absolute left-[0%] rotate-[-12deg] p-1 rounded-full px-4 bg-white border border-slate-200 shadow-lg shadow-slate-100s font-mono z-10 ">Gere +Valor ✅</p>
              <p className="absolute top-[70%] left-[0%] rotate-[-12deg] p-1 rounded-full px-4 bg-white border border-slate-200 shadow-lg shadow-slate-100s font-mono z-10 ">Anexe Imagens 📸</p>
              <p className="absolute top-[64%] left-[0%] rotate-[-12deg] p-1 rounded-full px-4 bg-white border border-slate-200 shadow-lg shadow-slate-100s font-mono z-10 ">Crie Gráficos 📊</p>
              <p className="absolute top-[25%] left-[0%] rotate-[-12deg] p-1 rounded-full px-4 bg-white border border-slate-200 shadow-lg shadow-slate-100s font-mono z-10 ">Títulos Chamativos 🔥</p>
            </div>
          </div>
        </section>

        <section className="mx-auto my-24 py-24 max-w-3xl px-4 sm:px-6 md:border border-slate-200 md:rounded-2xl md:shadow-lg md:shadow-slate-100 text-center relative z-10">

          <span className="flex items-center justify-center py-4 mb-2">
            <Image
              src="/author.jpg"
              alt="send"
              width={40}
              height={40}
              className="mix-blend-multiply rounded-full "
              priority
            />
            <p className="ml-2"><b>Thomas Almeida</b></p>
          </span>
          <h2 className="text-2xl md:text-3xl md:leading-8 tracking-tighter text-neutral-900 font-mono [text-wrap:balance]">Como um Email e Bananas me fizeram almoçar com o CEO do<span className="text-[#f8b332] italic font-serif text-4xl ml-1"> Assaí Atacadista</span>?</h2>
          <p className="py-4 text-neutral-600 italic">&quot;Eu tava doido pra encontrar alguém pra mostrar as automações dos chamados que iam desafogar a fila do TI aqui do Assaí, mas ninguém tava tendo tempo pra uma reunião agendada, então tive uma ideia...&quot;</p>
          <Link
            href="https://www.tabnews.com.br/thommdev/quem-nao-e-visto-nao-e-lembrado"
            target="_blank"
            className="border border-slate-200 px-4 p-1 rounded-full hover:underline">
            Leia no Tabnews {"->"}
          </Link>
        </section>

        {/* Pricing Section */}
        <section id="precos" aria-label="Planos e Preços" className="mx-auto my-32 max-w-6xl px-4 sm:px-6 pt-10 sm:pt-12 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl md:leading-8 tracking-tighter text-neutral-900 font-mono [text-wrap:balance]">
            Planos e Preços
          </h2>
          <p className="py-2 text-neutral-600">Investimento melhor que esse, só tigrinho</p>
          <div className="mt-6 flex items-center justify-center">
            <Pricing prices={prices} />
          </div>
        </section>

        {/*FAQ*/}

        <section id="faq" aria-label="Perguntas frequentes" className="mx-auto my-12 max-w-3xl px-4 sm:px-6 pt-10 sm:pt-12 relative z-10">
          <h2 className="text-2xl md:text-3xl md:leading-8 tracking-tighter text-neutral-900 font-mono [text-wrap:balance] text-center">
            Perguntas Frequentes
          </h2>
          <p className="py-2 text-neutral-600 text-center">Tire suas dúvidas sobre o Bananasend</p>

          <div className="mt-6 space-y-3">
            <details className="group border border-slate-200 rounded-2xl shadow-lg shadow-slate-100 overflow-hidden">
              <summary className="flex w-full items-center justify-between cursor-pointer select-none px-4 py-3 font-medium text-neutral-900">
                O que é o Bananasend?
                <span className="ml-4 text-neutral-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-4 text-neutral-700 leading-6">
                O Bananasend ajuda profissionais a criarem uma presença mais ativa nas mídias de trabalho como LinkedIn, criação de Newsletters semanais por e-mail e métricas sobre Whatsapp de trabalho para aumentar sua visibilidade com gestores, audiência e lideranças.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-2xl shadow-lg shadow-slate-100 overflow-hidden">
              <summary className="flex w-full items-center justify-between cursor-pointer select-none px-4 py-3 font-medium text-neutral-900">
                Preciso de conhecimento técnico pra começar?
                <span className="ml-4 text-neutral-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-4 text-neutral-700 leading-6">
                Não. Você começa com <b className="text-[#2bb24a]">templates prontos</b> que convertem. Basta preencher com suas entregas, conectar seu número, anexar imagens e personalizar títulos chamativos.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-2xl shadow-lg shadow-slate-100 overflow-hidden">
              <summary className="flex w-full items-center justify-between cursor-pointer select-none px-4 py-3 font-medium text-neutral-900">
                Como funcionam os preços?
                <span className="ml-4 text-neutral-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-4 text-neutral-700 leading-6">
                Há planos mensais. Clique em <a href="#precos" className="underline text-[#2bb24a]">Preços</a> para ver os valores e benefícios de cada plano.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-2xl shadow-lg shadow-slate-100 overflow-hidden">
              <summary className="flex w-full items-center justify-between cursor-pointer select-none px-4 py-3 font-medium text-neutral-900">
                Consigo enviar para vários gestores ao mesmo tempo?
                <span className="ml-4 text-neutral-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-4 text-neutral-700 leading-6">
                Sim. Adicione múltiplos destinatários e mantenha todos atualizados sobre suas entregas com um único envio.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-2xl shadow-lg shadow-slate-100 overflow-hidden">
              <summary className="flex w-full items-center justify-between cursor-pointer select-none px-4 py-3 font-medium text-neutral-900">
                Tem risco do meu Whatsapp ou LinkedIn serem banidos/caírem?
                <span className="ml-4 text-neutral-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-4 text-neutral-700 leading-6">
                Não, o Bananasend utiliza um ambiente seguro e anti-spam para conectar, analisar e enviar seus conteúdos com as APIs oficiais do LinkedIn e Meta.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-2xl shadow-lg shadow-slate-100 overflow-hidden">
              <summary className="flex w-full items-center justify-between cursor-pointer select-none px-4 py-3 font-medium text-neutral-900">
                Preciso conectar meu email corporativo?
                <span className="ml-4 text-neutral-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-4 text-neutral-700 leading-6">
                Não, ao usar o banansend você envia seus conteúdos fácilmente pelo nosso domínio de ambiente seguro e anti-spam, Plug and Play.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-2xl shadow-lg shadow-slate-100 overflow-hidden">
              <summary className="flex w-full items-center justify-between cursor-pointer select-none px-4 py-3 font-medium text-neutral-900">
                Vocês tem suporte em caso de dúvidas?
                <span className="ml-4 text-neutral-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-4 text-neutral-700 leading-6">
                Sim, oferecemos suporte em tempo real pelo nosso <b>Discord</b> ou via <b>WhatsApp</b> basta acionar a gente!
              </div>
            </details>

            <details className="group border border-slate-200 rounded-2xl shadow-lg shadow-slate-100 overflow-hidden">
              <summary className="flex w-full items-center justify-between cursor-pointer select-none px-4 py-3 font-medium text-neutral-900">
                Consigo anexar imagens e gráficos nos emails e posts?
                <span className="ml-4 text-neutral-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-4 text-neutral-700 leading-6">
                Sim, dentro do nosso editor e dos templates você consegue anexar imagens e gráficos do seu jeito.
              </div>
            </details>
          </div>

          {/* Structured Data for SEO (FAQPage) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'O que é o Bananasend?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text:
                        'O Bananasend ajuda profissionais a enviarem criarem uma presença mais ativa nas mídias de trabalho como LinkedIn, criaçaão de Newsletters semanais por e-mail e métricas sobre Whatsapp de trabalho para aumentar sua visibilidade com gestores, audiência e lideranças.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Preciso de conhecimento em design?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text:
                        'Não. Você começa com templates prontos que convertem. Basta preencher com suas entregas, anexar imagens e personalizar títulos chamativos.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Como funcionam os preços?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text:
                        'Há planos mensais e anuais. Clique em Preços para ver os valores e benefícios de cada plano.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Consigo enviar para vários gestores ao mesmo tempo?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text:
                        'Sim. Adicione múltiplos destinatários e mantenha todos atualizados sobre suas entregas com um único envio.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Preciso conectar meu email corporativo?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text:
                        'Não, ao usar o Bananasend você envia seus conteúdos facilmente pelo nosso domínio de ambiente seguro e anti-spam, plug and play.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Vocês tem suporte em caso de dúvidas?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text:
                        'Sim, oferecemos suporte em tempo real pelo nosso Discord ou via WhatsApp. Basta acionar a gente.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Consigo anexar imagens e gráficos nos emails?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text:
                        'Sim, dentro do nosso editor e dos templates você consegue anexar imagens e gráficos do seu jeito.'
                    }
                  }
                ]
              })
            }}
          />
        </section>
        {/* Footer */}
        <footer className="mt-20 bg-white border-t">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="text-left">
                <p className="text-sm font-semibold">Bananasend</p>
                <p className="text-xs text-neutral-500">Quem não é visto, não é lembrado</p>
              </div>
            </div>

            <div className="text-center md:text-left">
              <p className="text-sm font-medium">Contato</p>
              <a href="mailto:contato@bananasend.top" className="text-xs text-neutral-600 hover:underline">
                contato@bananasend.top
              </a>
            </div>

            <div className="text-center md:text-right text-xs text-neutral-600">
              <p>CNPJ: 49.995.652/0001-00</p>
              <p className="mt-1">© {new Date().getFullYear()} Bananasend. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>

        {/* Floating WhatsApp Button (no link) */}
        <button
          type="button"
          aria-label="Abrir WhatsApp"
          className="cursor-pointer fixed bottom-4 right-4 z-50 inline-flex items-center justify-center h-14 w-14 rounded-full transition-transform hover:scale-105"
        >
          <Image
            src="/icons/whatsapp.png"
            alt="WhatsApp"
            width={60}
            height={60}
          />
        </button>

      </div>
    </>
  );
}

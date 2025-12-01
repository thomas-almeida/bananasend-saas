"use client"

import Image from "next/image";
import { GoogleButton } from "./components/GoogleButton";
import Link from "next/link";
import { useState } from "react";
import ShimmerText from "@/components/kokonutui/shimmer-text";
import TypewriterTitle from "@/components/kokonutui/type-writer";
import EnterpriseSlider from "./components/enterprise-slider";
import Services from "./components/services";
import TestimonialsSlider from "./components/testimonials-slider";
import Input from "./components/ui/Form/Input";
import Button from "./components/ui/Button";
import { addRecipient } from "./services";

export default function HomeClient() {
  const [mail, setMail] = useState("")
  const [alreadySubscribed, setAlreadySubscribed] = useState(false)
  const [isSending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {

    if (!mail.includes("@")) {
      alert("insira um email válido")
      return
    }

    e.preventDefault()
    setSending(true)
    try {
      await addRecipient({
        userId: process.env.NEXT_PUBLIC_MAINID!,
        recipient: mail
      })
      setMail("")
      setAlreadySubscribed(true)
    } catch (error) {
      console.error(error)
    } finally {
      setSending(false)
    }
  }

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
                    href="#servicos"
                    className="hover:underline"
                  >
                    Serviços
                  </Link>
                </li>
                <li>
                  <Link
                    href="#sobre"
                    className="hover:underline"
                  >
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faq"
                    className="hover:underline"
                  >
                    Dúvidas
                  </Link>
                </li>
              </ul>
            </div>

            <span className="hidden w-1/2 md:flex items-center justify-end">
              <GoogleButton text="Agende uma reunião" />
            </span>
          </div>
        </header>

        {/* Hero */}
        <main className="mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-12 text-center relative z-10 ">

          <TypewriterTitle />

          <ShimmerText
            text="Amadureça seus canais de comunicação à preço de banana"
            className="text-3xl sm:text-4xl md:text-[46px] leading-10 tracking-tighter italic [text-wrap:balance]"
          />

          <div className=" px-2 md:px-0">
            <p className="text-md sm:text-md text-neutral-800 max-w-2xl mx-auto leading-6">
              Dispare para Whatsapp e Email, faça gestão de TI e RH do seu negócio, crie estratégias de promoção para seu ecommerce, gere listas quentes de prospecção para sua operação, você escolhe!
            </p>
          </div>

          <div className="flex items-center justify-center mt-4">
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

            <Image
              src="/icons/person.png"
              alt="send"
              className=""
              width={70}
              height={40}
              priority
            />

            <Image
              src="/icons/cart.png"
              alt="send"
              className="mx-2"
              width={60}
              height={40}
              priority
            />
          </div>

          <div className="mt-6 w-full flex items-center justify-center" id="cta">
            <GoogleButton text="Agendar uma reunião" />
          </div>
        </main>

        <span id="servicos"></span>

        <section className="mx-auto my-24 max-w-3xl px-4 sm:px-6 pt-10 sm:pt-12 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl md:leading-8 tracking-tighter text-neutral-900 font-mono [text-wrap:balance]">Comece a integrar essa semana!</h2>
          <p className="py-2 text-neutral-600">Troque plataformas caras por serviços e infra de primeira, a preço de banana</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
            <Services title="Disparo de E-mail e Whatsapp" description="Envie E-mails e mensagens de Whatsapp para sua base em tempo recorde. integre com nossa API ou direto do nosso Dashboard." icons={["/icons/whatsapp.png", "/icons/mail.png"]} />
            <Services title="Gestão de TI & RH" description="Gerencie os emails coporativos do seu negócio, faça gestão de acessos, chamados, homologações e muito mais." icons={["/icons/person-1.png", "/icons/pc.png"]} />
            <Services title="Gerador de Leads" description="Crie listas de contato com leads qualificados em momento de compra e filtrados exatamente pro seu nicho" icons={["/icons/lead.png", "/icons/list.png"]} />
            <Services title="Ecommerce" description="Insira bots de promoções para seus clientes, melhore seu SEO no site e marketplaces, crie estratégias de conteúdo e muito mais." icons={["/icons/cart.png", "/icons/box.png"]} />
          </div>

        </section>


        <section className="mx-auto my-12 max-w-3xl px-4 sm:px-6 pt-10 sm:pt-12 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl md:leading-8 tracking-tighter text-neutral-900 font-mono [text-wrap:balance]">Testado e validado por empresas reais do mercado</h2>
          <p className="py-2 text-neutral-600">Negócios que já economizam tempo e dinheiro com o uso do Bananasend</p>
          <EnterpriseSlider />
        </section>


        <span id="sobre"></span>

        <section className="mx-auto my-24 py-24 max-w-3xl px-4 sm:px-6 md:border border-slate-200 md:rounded-2xl md:shadow-lg md:shadow-slate-100 text-center relative z-10">

          <p className="ml-2">Fundadores</p>
          <span className="flex flex-col md:flex-row items-center justify-center py-4 mb-2">
            <div className="flex ml-6 mb-2 md:mb-0 md:ml-0 items-center justify-center relative">
              <Image
                src="/author-2.jpeg"
                alt="send"
                width={40}
                height={40}
                className="rounded-full object-cover w-12 h-12 ml-4 z-10"
                priority
              />
              <Image
                src="/author-1.jpg"
                alt="send"
                width={40}
                height={40}
                className="rounded-full object-cover w-12 h-12 absolute z-0 right-10"
                priority
              />
            </div>
            <p className="ml-2"><b>Thomas Almeida</b> & <b>Eduarda Prestes</b></p>
          </span>
          <h2 className="text-2xl md:text-3xl md:leading-8 tracking-tighter text-neutral-900 font-mono [text-wrap:balance]">Como ex-funcionários de uma multinacional vão fazer você se apaixonar pelo o que estamos construindo com tecnologia?</h2>
          <p className="py-4 text-neutral-600 italic text-sm">&quot;Te convidamos a acompanhar a jornada de profissionais que cansaram de um ambiente quadrado que não se atualizava perante o mercado, veja como construímos soluções com tecnologias e metodologias do futuro, entregando com excelência&quot;</p>

          <div className="flex flex-col gap-3 items-center justify-center max-w-lg mx-auto">
            {
              alreadySubscribed ? (
                <p className="text-green-500 text-lg">Obrigado por se inscrever!</p>
              ) : (
                <>
                  <Input
                    type="email"
                    placeholder="Seu melhor email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                  />
                  <Button
                    disabled={isSending}
                    onClick={handleSubmit}
                    value="Inscreva-se na Newsletter"
                    className="w-full py-2"
                  />
                </>
              )
            }
          </div>
        </section>

        <section aria-label="Perguntas frequentes" className="mx-auto my-24 max-w-3xl px-4 sm:px-6 pt-10 sm:pt-12 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl md:leading-8 tracking-tighter text-neutral-900 font-mono [text-wrap:balance]">Fazemos mais que o combinado</h2>
          <p className="py-2 text-neutral-600">O Bananasend foi feito para criar cases de sucesso, entregas com excelência, satisfação e resultados reais dos clientes</p>
          <TestimonialsSlider />
        </section>

        <span id="faq"></span>

        <section aria-label="Perguntas frequentes" className="mx-auto my-24 max-w-3xl px-4 sm:px-6 pt-10 sm:pt-12 relative z-10">
          <h2 className="text-2xl md:text-3xl md:leading-8 tracking-tighter text-neutral-900 font-mono [text-wrap:balance] text-center">
            Perguntas Frequentes
          </h2>
          <p className="py-2 text-neutral-600 text-center">Ainda sem saber se o BananaSend é pra você, separamos as principais dúvidas dos nossos clientes tiveram antes de amadurecerem suas operações.</p>

          <div className="mt-6 space-y-3">
            <details className="group border border-slate-200 rounded-2xl shadow-lg shadow-slate-100 overflow-hidden">
              <summary className="flex w-full items-center justify-between cursor-pointer select-none px-4 py-3 font-medium text-neutral-900">
                O que é o Bananasend? é para a minha operação?
                <span className="ml-4 text-neutral-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-4 text-neutral-700 leading-6">
                O Bananasend ajuda empresas e profissionais a automatizar envios de marketing e gestão com inteligência de dados com as tecnlogias mais atuais do mercado, a um preço menor do que concorrentes datados e com preços arcaicos. Se sua operação tem gargalos de performance, custos elevados, suporte ruim e retorno de investimento baixo, o Bananasend é <b>perfeito</b> você.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-2xl shadow-lg shadow-slate-100 overflow-hidden">
              <summary className="flex w-full items-center justify-between cursor-pointer select-none px-4 py-3 font-medium text-neutral-900">
                Quanto tempo para integrar com vocês?
                <span className="ml-4 text-neutral-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-4 text-neutral-700 leading-6">
                Temos um tempo de integração, treinamento e lançamento recorde de 2 dias a uma semana, plug and play com o seu negócio, trocamos o pneu do seu carro com o carro andando.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-2xl shadow-lg shadow-slate-100 overflow-hidden">
              <summary className="flex w-full items-center justify-between cursor-pointer select-none px-4 py-3 font-medium text-neutral-900">
                Como funcionam os preços?
                <span className="ml-4 text-neutral-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-4 text-neutral-700 leading-6">
                Nossos preços são personalizados para a sua demanda, você pode saber mais agendando uma reunião conosco ou na aba de <a href="#pricing" className="underline">preços</a>
              </div>
            </details>

            <details className="group border border-slate-200 rounded-2xl shadow-lg shadow-slate-100 overflow-hidden">
              <summary className="flex w-full items-center justify-between cursor-pointer select-none px-4 py-3 font-medium text-neutral-900">
                Os disparos de Whatsapp/Emails tem risco de queda ou spam?
                <span className="ml-4 text-neutral-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-4 text-neutral-700 leading-6">
                Diferente de outras plataformas, com o Bananasend você conta com um ambiente seguro e anti-spam de emails, com um algoritmo de cadência top de mercado para evitar quedas e banimentos no Whastapp para disparar sem medo e com as APIs da Meta.
              </div>
            </details>


            <details className="group border border-slate-200 rounded-2xl shadow-lg shadow-slate-100 overflow-hidden">
              <summary className="flex w-full items-center justify-between cursor-pointer select-none px-4 py-3 font-medium text-neutral-900">
                Qual a qualidade dos leads do gerador? os contatos são verificados?
                <span className="ml-4 text-neutral-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-4 text-neutral-700 leading-6">
                Usamos um algoritmo de verificação de contatos para evitar spam e contatos inválidos nos leads que geramos, ao usar nosso gerador você tem uma lista de contatos atuais, com poder de compra do seu nicho e em um volume que você define.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-2xl shadow-lg shadow-slate-100 overflow-hidden">
              <summary className="flex w-full items-center justify-between cursor-pointer select-none px-4 py-3 font-medium text-neutral-900">
                Consigo conectar meu email corporativo?
                <span className="ml-4 text-neutral-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-4 text-neutral-700 leading-6">
                Sim, ao usar o banansend você gerencia seu domínio com um ambiente seguro e muito fácil de usar, Plug and Play.
              </div>
            </details>

            <details className="group border border-slate-200 rounded-2xl shadow-lg shadow-slate-100 overflow-hidden">
              <summary className="flex w-full items-center justify-between cursor-pointer select-none px-4 py-3 font-medium text-neutral-900">
                Vocês tem suporte em quais canais?
                <span className="ml-4 text-neutral-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-4 text-neutral-700 leading-6">
                Oferecemos suporte em tempo real pelo nosso <b>Discord</b> ou via <b>WhatsApp</b> e telefone basta acionar a gente 24/7!
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
                    name: 'O que é o Bananasend? é para a minha operação?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'O Bananasend ajuda empresas e profissionais a automatizar envios de marketing e gestão com inteligência de dados com as tecnologias mais atuais do mercado, a um preço menor do que concorrentes datados e com preços arcaicos. Se sua operação tem gargalos de performance, custos elevados, suporte ruim e retorno de investimento baixo, o Bananasend é perfeito para você.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Quanto tempo para integrar com vocês?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Temos um tempo de integração, treinamento e lançamento recorde de 2 dias a uma semana, plug and play com o seu negócio, trocamos o pneu do seu carro com o carro andando.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Como funcionam os preços?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Nossos preços são personalizados para a sua demanda, você pode saber mais agendando uma reunião conosco ou na aba de preços.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Os disparos de Whatsapp/Emails tem risco de queda ou spam?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Diferente de outras plataformas, com o Bananasend você conta com um ambiente seguro e anti-spam de emails, com um algoritmo de cadência top de mercado para evitar quedas e banimentos no Whatsapp para disparar sem medo e com as APIs da Meta.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Qual a qualidade dos leads do gerador? Os contatos são verificados?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Usamos um algoritmo de verificação de contatos para evitar spam e contatos inválidos nos leads que geramos, ao usar nosso gerador você tem uma lista de contatos atuais, com poder de compra do seu nicho e em um volume que você define.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Consigo conectar meu email corporativo?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Sim, ao usar o Bananasend você gerencia seu domínio com um ambiente seguro e muito fácil de usar, Plug and Play.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Vocês tem suporte em quais canais?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Oferecemos suporte em tempo real pelo nosso Discord ou via WhatsApp e telefone, basta acionar a gente 24/7!'
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

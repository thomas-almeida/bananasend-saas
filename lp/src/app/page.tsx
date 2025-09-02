import Image from "next/image";

function GoogleIcon({ className = "" }: { className?: string }) {
  // Google G mark
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      aria-hidden
    >
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.806 32.657 29.267 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.153 7.961 3.039l5.657-5.657C33.64 6.053 28.999 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20c10.493 0 19.333-8.507 19.333-19 0-1.273-.132-2.515-.389-3.667z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.4 16.07 18.828 12 24 12c3.059 0 5.842 1.153 7.961 3.039l5.657-5.657C33.64 6.053 28.999 4 24 4 16.318 4 9.689 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.185 0 9.86-1.977 13.4-5.197l-6.186-5.238C29.154 35.849 26.722 36.8 24 36.8c-5.24 0-9.69-3.403-11.305-8.139l-6.59 5.074C9.517 39.62 16.234 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.04 3.003-3.272 5.466-6.093 6.986.002-.001 6.187 5.239 6.187 5.239C38.4 36.559 44 31.333 44 25c0-1.273-.132-2.515-.389-3.667z" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-dvh text-neutral-900 font-sans">
      {/* Header */}
      <header className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 select-none">
          <Image
            src="/img/bananasend-logo.png"
            alt="send"
            width={100}
            height={100}
            className="rounded"
            priority
          />
          <ul className="flex items-center gap-4 text-sm">
            <li>
              <a href="#cta" className="hover:underline">Preços</a>
            </li>
            <li>
              <a href="#cta" className="hover:underline">O que é?</a>
            </li>
            <li>
              <a href="#cta" className="hover:underline">Contato</a>
            </li>
          </ul>
        </div>

        <a
          href="#cta"
          className="inline-flex items-center gap-2 rounded-sm bg-white border border-black/10 px-4 py-2 text-sm font-medium shadow-[0_1px_0_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow card-shadow"
        >
          Comece grátis
          <GoogleIcon className="size-4" />
        </a>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-12 text-center relative z-10 ">
        <p className="text-sm font-medium text-[#2bb24a]">“Quem não é visto, não é Lembrado!” 👀</p>

        <h1 className="mt-6 text-3xl sm:text-4xl md:text-[46px] leading-10 tracking-tighter text-neutral-900 italic">
          Um Jeito <span className="text-[#2bb24a] italic font-serif text-5xl">f0d@</span> de
          <br className="hidden sm:block" />
          Metrificar seu Trampo.
        </h1>

        <p className="mt-5 text-base sm:text-md text-neutral-800 max-w-2xl mx-auto leading-5">
          Amadureça seu trampo aprendendo a valorizar suas entregas, seja notado por quem realmente pode te promover, envie newsletters sobre progressos e reports gerando ainda mais valor da sua pessoa no seu time
        </p>

        <div className="mt-6" id="cta">
          <a
            href="#"
            className="inline-flex items-center gap-3 rounded-sm bg-white border border-black/10 px-5 py-3 text-[15px] font-semibold text-neutral-800 shadow-[0_1px_0_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow card-shadow"
          >
            Comece grátis sem cartão
            <GoogleIcon className="size-5" />
          </a>
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
            className="mix-blend-color w-[40%]"
            priority
          />
        </div>
      </section>
    </div>
  );
}

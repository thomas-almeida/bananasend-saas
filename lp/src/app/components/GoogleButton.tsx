import { GoogleIcon } from "./GoogleIcon";

export function GoogleButton() {
  return (
    <button
      onClick={() => { }}
      className="cursor-pointer inline-flex items-center gap-2 rounded-sm bg-white border border-black/10 px-4 py-2 text-sm font-medium shadow-[0_1px_0_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow card-shadow "
    >
      Entrar na Lista de Espera!
      <GoogleIcon className="size-4" />
    </button>
  )
}
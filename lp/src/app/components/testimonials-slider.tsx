import { InfiniteSlider } from "@/components/ui/infinite-slider";

export default function TestimonialsSlider() {
    return (
        <InfiniteSlider
            gap={20}
            speedOnHover={10}
            speed={20}
            className="py-4 items-center"
        >

            <div className="border border-slate-200 shadow p-6 rounded-lg max-w-[300px] h-[180px] ">
                <div className="flex justify-start items-center gap-2">
                    <div className="flex flex-col text-left">
                        <p className="font-semibold">David Bronchini</p>
                        <p className="text-sm text-neutral-500">Diretor na Innovation Brindes</p>
                    </div>
                </div>
                <div className="py-2">
                    <p className="italic text-neutral-500 text-sm text-left">"Gostamos muito do jeito que a equipe trabalha e da qualidade do produto."</p>
                </div>
            </div>
            <div className="border border-slate-200 shadow p-6 rounded-lg max-w-[300px] h-[180px] ">
                <div className="flex justify-start items-center gap-2">
                    <div className="flex flex-col text-left">
                        <p className="font-semibold">Daiane Borges</p>
                        <p className="text-sm text-neutral-500">Gerente na StartPro</p>
                    </div>
                </div>
                <div className="py-2">
                    <p className="italic text-neutral-500 text-sm text-left">"Um produto feito por quem estava lá desde o começo eles tem talento e paixão"</p>
                </div>
            </div>
            <div className="border border-slate-200 shadow p-6 rounded-lg max-w-[300px] h-[180px] ">
                <div className="flex justify-start items-center gap-2">
                    <div className="flex flex-col text-left">
                        <p className="font-semibold">Maira Magnani</p>
                        <p className="text-sm text-neutral-500">Coord. na UFF</p>
                    </div>
                </div>
                <div className="py-2">
                    <p className="italic text-neutral-500 text-sm text-left">"Agora os conteúdos da universidade rodam no automático, sem custos dolarizados e sem preocupações de infra."</p>
                </div>
            </div>
        </InfiniteSlider>
    )
}
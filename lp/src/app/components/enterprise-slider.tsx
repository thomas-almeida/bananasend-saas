import { InfiniteSlider } from "@/components/ui/infinite-slider";
import Image from "next/image";
import Link from "next/link";

export default function EnterpriseSlider() {
    return (
        <InfiniteSlider
            gap={20}
            speedOnHover={35}
            className="py-4 items-center"
        >

            <Link
                href="https://innovationbrindes.com.br/"
                target="_blank"
            >
                <Image
                    src="/enterprises/innovation.png"
                    alt="send"
                    width={150}
                    height={150}
                    className="w-[150px]"
                    priority
                />
            </Link>
            <Link
                href="https://startpro.com.br/"
                target="_blank"
            >
                <Image
                    src="/enterprises/startpro.png"
                    alt="send"
                    width={150}
                    height={150}
                    className="w-[150px]"
                    priority
                />
            </Link>
            <Link
                href="https://tradeupgroup.com.br/"
                target="_blank"
            >
                <Image
                    src="/enterprises/tradeup.png"
                    alt="send"
                    width={150}
                    height={150}
                    className="w-[150px]"
                    priority
                />
            </Link>
            <Link
                href="https://uff.br/"
                target="_blank"
            >
                <Image
                    src="/enterprises/uff.png"
                    alt="send"
                    width={150}
                    height={150}
                    className="w-[150px]"
                    priority
                />
            </Link>
            <Link
                href="https://up.bet.br/"
                target="_blank"
            >
                <Image
                    src="/enterprises/upbet.png"
                    alt="send"
                    width={150}
                    height={150}
                    className="w-[150px]"
                    priority
                />
            </Link>
        </InfiniteSlider>
    )
}
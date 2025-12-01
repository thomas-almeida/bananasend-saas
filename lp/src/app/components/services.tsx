import Image from "next/image";

interface ServiceProps {
    title: string;
    description: string;
    icons?: string[];
}

export default function Services({ title, description, icons }: ServiceProps) {
    return (
        <>
            <div className="border text-left p-8 rounded shadow">
                <div className="flex items-center justify-start mt-4">
                    {
                        icons?.map((icon, index) => (
                            <Image
                                key={index}
                                src={icon || ''}
                                alt={title}
                                width={55}
                                height={60}
                            />
                        ))
                    }
                </div>
                <h2 className="text-xl md:leading-8 tracking-tighter text-neutral-900 font-mono [text-wrap:balance]">{title}</h2>
                <p className="text-neutral-600 text-sm py-2">{description}</p>
            </div>
        </>
    )
}
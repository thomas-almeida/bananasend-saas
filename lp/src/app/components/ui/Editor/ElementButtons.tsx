interface ElementButtonsProps {
    icon: React.ReactNode;
    text: string;
    onClick: () => void;
}

export default function ElementButtons({ icon, text, onClick }: ElementButtonsProps) {
    return (
        <span
            className='flex justify-start gap-0.5 items-center font-semibold cursor-pointer hover:text-green-500'
            onClick={onClick}
        >
            {icon}
            <p>{text}</p>
        </span>
    );
}
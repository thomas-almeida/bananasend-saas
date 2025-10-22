interface ElementButtonsProps {
    icon: React.ReactNode;
    text: string;
    onClick: () => void;
    className?: string;
}

export default function ElementButtons({ icon, text, onClick, className = '' }: ElementButtonsProps) {
    return (
        <span
            className={`flex justify-start gap-0.5 items-center font-semibold cursor-pointer hover:text-green-500 ${className}`}
            onClick={onClick}
        >
            {icon}
            <p>{text}</p>
        </span>
    );
}
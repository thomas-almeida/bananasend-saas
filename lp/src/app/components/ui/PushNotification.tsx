
"use client"

import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface PushNotificationProps {
    message: string;
    type: "success" | "error" | "warning" | "info";
    onClose?: () => void;
}

export default function PushNotification({ message, type, onClose }: PushNotificationProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const handleClose = () => {
        setIsVisible(false);
        onClose?.();
    };

    if (!isVisible) return null;

    return (
        <>
            <div className="fixed top-12 left-0 right-0 z-[9999]">
                <div className="absolute top-12 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
                    <div className="relative">
                        <div
                            className="text-sm text-center w-[450px] p-3 pr-10 border border-slate-300 rounded bg-white shadow-xl transform transition-all duration-200 ease-in-out opacity-0 translate-y-[-20px] animate-[fadeInUp_0.5s_ease-in-out_forwards]"
                            style={{
                                backgroundColor: type === "success" ? "#FFFFFF" : type === "error" ? "#FCE7E6" : type === "warning" ? "#FEF9C3" : "#E5E7EB",
                                color: type === "success" ? "#22c55e" : type === "error" ? "#f55" : type === "warning" ? "#ff9800" : "#333333",
                            }}
                        >
                            <p className="text-center">{message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
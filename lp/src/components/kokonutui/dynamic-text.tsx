"use client";

/**
 * @author: @dorian_baffier
 * @description: Dynamic Text
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Greeting {
    text: string;
    language: string;
}

const greetings: Greeting[] = [
    { text: "Feito para Agências", language: "English" },
    { text: "Feito para Afilhados", language: "English" },
    { text: "Feito para TIs", language: "English" },
    { text: "Feito para RHs", language: "English" },
    { text: "Feito para Ecommerces", language: "English" },
];

const DynamicText = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        if (!isAnimating) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;

                if (nextIndex >= greetings.length) {
                    clearInterval(interval);
                    setIsAnimating(false);
                    return prevIndex;
                }

                return nextIndex;
            });
        }, 300);

        return () => clearInterval(interval);
    }, [isAnimating]);

    // Animation variants for the text
    const textVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { y: -100, opacity: 0 },
    };

    return (
        <section
            className="flex items-center justify-center gap-1 p-4"
            aria-label="Rapid greetings in different languages"
        >
            <div className="relative h-6 w-60 flex items-center justify-center overflow-visible">
                {isAnimating ? (
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={currentIndex}
                            className="absolute flex items-center gap-2 text-md font-medium text-gray-800 dark:text-gray-200"
                            aria-live="off"
                            initial={textVariants.hidden}
                            animate={textVariants.visible}
                            exit={textVariants.exit}
                            transition={{ duration: 2.2, ease: "easeOut" }}
                        >
                            <div
                                className="h-2 w-2 rounded-full bg-black dark:bg-white"
                                aria-hidden="true"
                            />
                            {greetings[currentIndex].text}
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <div className="flex items-center gap-2 text-md font-medium text-gray-800 dark:text-gray-200">
                        <div
                            className="h-2 w-2 rounded-full bg-black dark:bg-white"
                            aria-hidden="true"
                        />
                        {greetings[currentIndex].text}
                    </div>
                )}
            </div>
        </section>
    );
};

export default DynamicText;

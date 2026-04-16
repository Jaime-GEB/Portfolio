import { useState, useEffect } from 'react';

/**
 * Custom hook to create a typewriter effect.
 * @param text The full text to type out.
 * @param typingSpeed Speed in ms per character (default 100).
 * @param cursorBlinkSpeed Speed in ms for cursor blink (default 500).
 */
export const useTypingEffect = (text: string, typingSpeed: number = 100, cursorBlinkSpeed: number = 500) => {
    const [displayText, setDisplayText] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            setDisplayText(text.slice(0, i + 1));
            i++;
            
            if (i >= text.length) {
                clearInterval(typingInterval);
            }
        }, typingSpeed);

        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, cursorBlinkSpeed);

        return () => {
            clearInterval(typingInterval);
            clearInterval(cursorInterval);
        };
    }, [text, typingSpeed, cursorBlinkSpeed]);

    return { displayText, setDisplayText, showCursor };
};

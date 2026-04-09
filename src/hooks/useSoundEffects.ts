import { useEffect, useCallback } from 'react';

// Paths to the sounds
const SOUND_PATHS = {
    click: '/Portfolio/sounds/feedback-click-cut.mp3',
    yay: '/Portfolio/sounds/yay.mp3'
};

export const useSoundEffects = () => {
    
    // Play the standard physical terminal click
    const playClick = useCallback(() => {
        const sound = new Audio(SOUND_PATHS.click);
        sound.volume = 0.05;
        sound.play().catch(() => {});
    }, []);

    // Play the yay easter egg sound
    const playYay = useCallback(() => {
        const sound = new Audio(SOUND_PATHS.yay);
        sound.volume = 0.05;
        sound.play().catch(() => {});
    }, []);

    // --- Global Click Listener ---
    // Automatically plays the 'click' sound when the user interacts with valid buttons/links.
    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check if the clicked element is a button, link, or clickable node
            const isClickable = 
                target.closest('button') || 
                target.closest('a') || 
                target.closest('[role="button"]') || 
                // Checks if it's a MenuGrid card or something with cursor pointer
                window.getComputedStyle(target).cursor === 'pointer';

            if (isClickable) {
                playClick();
            }
        };

        // Use capture phase to ensure it triggers before react handlers might stop propagation
        document.addEventListener('click', handleGlobalClick, true);
        
        return () => {
            document.removeEventListener('click', handleGlobalClick, true);
        };
    }, [playClick]);

    return { playClick, playYay };
};

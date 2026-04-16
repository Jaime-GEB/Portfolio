import { useState, useEffect } from 'react';

/**
 * Custom hook to simulate system load/CPU metrics.
 * Returns a value between 0 and 100 that changes randomly.
 */
export const useSystemMetrics = () => {
    const [systemLoad, setSystemLoad] = useState(0);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        let currentLoad = 0;
        let speed = Math.random() * 5 + 1;

        const updateProgress = () => {
            currentLoad += speed;
            if (currentLoad >= 100) {
                currentLoad = 0;
                speed = Math.random() * 8 + 1;
            }
            setSystemLoad(currentLoad);
            
            const nextInterval = Math.random() * 100 + 30; 
            timeoutId = setTimeout(updateProgress, nextInterval);
        };

        updateProgress();
        return () => clearTimeout(timeoutId);
    }, []);

    return systemLoad;
};

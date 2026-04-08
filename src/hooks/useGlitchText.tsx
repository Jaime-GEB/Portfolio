import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook custom que genera un efecto de "glitch" o decodificación en las letras de un texto.
 * Al pasar el ratón por el elemento, las letras cambian aleatoriamente a la fuente 'BJ Cree'
 * y después de 0.2 segundos cambian a 'Libre Barcode'.
 */
export const useGlitchText = (originalText: string) => {
    const [isHovering, setIsHovering] = useState(false);
    const [glitchMap, setGlitchMap] = useState<Record<number, 'bjCree' | 'barcode'>>({});
    
    // Referencia para limpiar timeouts pendientes al desmontar o dejar de hover
    const timeoutsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

    const handleMouseEnter = useCallback(() => setIsHovering(true), []);
    const handleMouseLeave = useCallback(() => setIsHovering(false), []);

    const clearAllTimeouts = useCallback(() => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current.clear();
    }, []);

    // Procesa la transición de una letra específica
    const triggerGlitch = useCallback((index: number) => {
        // PASO 1: BJ CREE
        setGlitchMap(prev => ({ ...prev, [index]: 'bjCree' }));

        const t1 = setTimeout(() => {
            // PASO 2: BARCODE
            setGlitchMap(prev => (index in prev ? { ...prev, [index]: 'barcode' } : prev));
            
            const t2 = setTimeout(() => {
                // PASO 3: NORMAL
                setGlitchMap(prev => {
                    const next = { ...prev };
                    delete next[index];
                    return next;
                });
                timeoutsRef.current.delete(t2);
            }, 800);
            
            timeoutsRef.current.add(t2);
            timeoutsRef.current.delete(t1);
        }, 700);

        timeoutsRef.current.add(t1);
    }, []);

    useEffect(() => {
        if (!isHovering) {
            const timer = setTimeout(() => {
                clearAllTimeouts();
                setGlitchMap({});
            }, 0);
            return () => {
                clearTimeout(timer);
                clearAllTimeouts();
            };
        }

        // Calculamos la velocidad del glitch en función de la longitud del texto
        // A más texto, mayor frecuencia de glitch para mantener el dinamismo
        const intervalDelay = Math.max(20, Math.min(100, Math.floor(2000 / originalText.length)));

        const interval = setInterval(() => {
            if (originalText.length === 0) return;
            const index = Math.floor(Math.random() * originalText.length);
            
            // Disparamos el proceso de forma asíncrona fuera del render loop
            setTimeout(() => {
                setGlitchMap(prev => {
                    if (!(index in prev)) {
                        triggerGlitch(index);
                    }
                    return prev;
                });
            }, 0);
        }, intervalDelay);

        return () => {
            clearInterval(interval);
            clearAllTimeouts();
        };
    }, [isHovering, originalText, triggerGlitch, clearAllTimeouts]);

    /**
     * Función para renderizar el texto con los estilos de fuente aplicados según el mapa de glitch.
     */
    const renderGlitchedText = () => {
        return originalText.split('').map((char, index) => {
            const glitchType = glitchMap[index];
            // Usamos un key más descriptivo para evitar avisos de sonar
            const key = `char-${index}-${char}`;
            
            if (!glitchType) return <span key={key}>{char}</span>;

            return (
                <span 
                    key={key} 
                    style={{ 
                        fontFamily: '"Libre Barcode", cursive',
                        transition: 'font-family 0.5s ease',
                        display: 'inline-block'
                    }}
                >
                    {char}
                </span>
            );
        });
    };

    return {
        renderGlitchedText,
        handleMouseEnter,
        handleMouseLeave,
        isHovering
    };
};

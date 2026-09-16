import { useState, useCallback } from 'react';

export function useClipboard(delay = 2000) {
    const [isCopied, setIsCopied] = useState(false);

    const copy = useCallback((text: string) => {
        if (!navigator?.clipboard) {
            console.warn("Clipboard API not supported");
            return;
        }

        navigator.clipboard.writeText(text)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), delay);
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
            });
    }, [delay]);

    return { isCopied, copy };
}

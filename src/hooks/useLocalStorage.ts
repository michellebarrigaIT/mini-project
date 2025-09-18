import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initial: T) {
    const [state, setState] = useState<T>(() => {
        try {
            const raw = localStorage.getItem(key);
            return raw ? (JSON.parse(raw) as T) : initial;
        } catch (e) {
            console.warn("useLocalStorage parse error:", e);
            return initial;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch (e) {
            console.warn("useLocalStorage set error:", e);
        }
    }, [key, state]);

    return [state, setState] as const;
}

export default useLocalStorage;

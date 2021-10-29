import {useState, useCallback} from "react";
import { localizedError } from "../constants/messages";

export const useHttp = () => {
    const [pending, setPending] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'get', body = null, headers = {}) => {
        setPending(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-type'] = 'application/json'
            }
            const mode = 'cors';
            const response = await fetch(url, {method, body, headers, mode})

            let data = [];
            if (method === 'GET') {
                data = await response.json()
            }

            if (!response.ok) {
                setPending(false)
                setError(localizedError[method])
                await Promise.reject(localizedError[method])
            }

            setPending(false)

            return data;
        } catch (e) {
            setPending(false)
            setError(localizedError[method])
            await Promise.reject(e)
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {pending, request, error, clearError}
}

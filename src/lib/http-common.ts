
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.contoh.com';

interface RequestOptions extends RequestInit {
    params?: Record<string, string>;
}

async function fetcher<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, headers, ...customConfig } = options;

    let url = `${BASE_URL}${endpoint}`;
    if (params) {
        const searchParams = new URLSearchParams(params);
        url += `?${searchParams.toString()}`;
    }

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        // Masukkan token auth jika disimpan di cookie/storage kalau perlu
    };

    const config: RequestInit = {
        method: options.method || 'GET',
        headers: {
            ...defaultHeaders,
            ...headers,
        },
        ...customConfig,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    if (response.status === 204) {
        return {} as T;
    }

    return response.json();
}

export const api = {
    get: <T>(endpoint: string, options?: RequestOptions) =>
        fetcher<T>(endpoint, { ...options, method: 'GET' }),

    post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
        fetcher<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),

    put: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
        fetcher<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),

    delete: <T>(endpoint: string, options?: RequestOptions) =>
        fetcher<T>(endpoint, { ...options, method: 'DELETE' }),
};



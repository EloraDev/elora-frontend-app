import { AUTH_STORAGE_KEY } from "../constants";
import config from "./config";

if (!config.apiUrl) {
  console.warn("Missing API URL configuration. Please set a valid API URL in your configuration.");
}

type FetchFunction = typeof fetch;

const PUBLIC_ENDPOINTS = ["/admin/authentication", "/admin/reset-password", "admin/reset-password-request"] as const;

const isPublicEndpoint = (url: string | URL | Request): boolean => {
  const urlString = url instanceof Request ? url.url : url.toString();

  const path = urlString.startsWith('/') ? urlString : new URL(urlString).pathname;

  return PUBLIC_ENDPOINTS.some((endpoint) => path === endpoint);
};

const createAuthFetch = (baseFetch: FetchFunction): FetchFunction => {
  return async (input, init) => {
    try {
      const url = input instanceof Request ? 
        new URL(input.url, config.apiUrl) : 
        new URL(input.toString(), config.apiUrl);

      if (isPublicEndpoint(url.pathname)) {
        const headers = new Headers(init?.headers);

        return await baseFetch(url, {
          ...init,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
        });
      }

      const token = localStorage.getItem(AUTH_STORAGE_KEY);
      const headers = new Headers(init?.headers);
      
      const isFormData = init?.body instanceof FormData;
      
      if (isFormData) {
        headers.delete("Content-Type");
      }
      
      return await baseFetch(url, {
        ...init,
        headers: {
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          "Authorization": `Bearer ${token || ""}`,
          ...Object.fromEntries(headers.entries()),
        },
      });
    } catch (error) {
      console.error("Failed to make request:", error);
      throw error;
    }
  };
};

export const apiClient = createAuthFetch(fetch);

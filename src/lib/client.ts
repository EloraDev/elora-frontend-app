import { AUTH_STORAGE_KEY } from "../constants";
import config from "./config";

if (!config.apiUrl) {
  console.warn("Missing API URL configuration. Please set a valid API URL in your configuration.");
}

type FetchFunction = typeof fetch;

const PUBLIC_ENDPOINTS = ["/auth/login", "/auth/register"] as const;

const isPublicEndpoint = (url: string | URL | Request): boolean => {
  const urlString = url instanceof Request ? url.url : url.toString();

  const path = urlString.startsWith('/') ? urlString : new URL(urlString).pathname;

  return PUBLIC_ENDPOINTS.some((endpoint) => path === endpoint || path.includes(endpoint));
};

const createAuthFetch = (baseFetch: FetchFunction): FetchFunction => {
  return async (input, init) => {
    try {
      // Construct the full URL by concatenating base URL with the path
      let fullUrl: string;
      
      if (input instanceof Request) {
        const path = new URL(input.url).pathname;
        fullUrl = `${config.apiUrl}${path}`;
      } else {
        const path = input.toString();
        // Remove leading slash if present to avoid double slashes
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        fullUrl = `${config.apiUrl}/${cleanPath}`;
      }
      
      const url = new URL(fullUrl);

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

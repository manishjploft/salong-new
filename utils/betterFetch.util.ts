export class HttpError extends Error {
  error: any;
  constructor(error: any) {
    super();
    this.error = error;
  }
}

type RequestMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS";

export interface FetchOptions {
  method?: RequestMethod;
  headers?: Record<string, string | undefined>;
  body?: any;
  mode?: RequestMode;
  credentials?: RequestCredentials;
  cache?: RequestCache;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  integrity?: string;
  keepalive?: boolean;
  signal?: AbortSignal | null;
  window?: any;
  next?: any;
}

export async function betterFetch<T>(
  url: string,
  { body, headers, ...options }: FetchOptions = {},
  isOverwrite: boolean = false
) {
  const formattedBody =
    options.method !== "GET" ? JSON.stringify(body) : undefined;
  const hostname = process.env.NEXT_PUBLIC_API_URL;
  const formattedUrl =
    typeof window === "undefined" ? `${hostname}${url}` : `${url}`;
  let json;
  let res;
  const formattedOptions = { ...options };

  if (
    (!options?.method && !options?.next?.revalidate && !options.cache) ||
    options?.method === "GET"
  ) {
    formattedOptions.cache = "force-cache";
  }

  const formattedHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  try {
    res = await fetch(isOverwrite ? url : formattedUrl, {
      headers: {
        ...(formattedHeaders ?? {}),
      },
      body: formattedBody,
      ...formattedOptions,
    });
    if (!res.ok) {
      throw new HttpError({
        message: `HTTP error! status: ${res.status}`,
        statusCode: res.status,
      });
    }

    json = await res.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new HttpError({
        message: "Invalid JSON response",
        error,
        data: res,
      });
    } else if (error instanceof HttpError) {
      throw error;
    } else {
      throw new HttpError({
        message: "An unknown error occurred",
        error,
      });
    }
  }
  const errorCodes = [400, 404, 401, 403, 504, 502];
  if (errorCodes.includes(json?.statusCode)) {
    return new HttpError(json);
  }

  return json;
}

export type BetterFetch = typeof betterFetch;

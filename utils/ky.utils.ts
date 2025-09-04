import chalk from 'chalk';
import ky, { HTTPError, Options as KyOptions } from 'ky';

import { HttpError } from './betterFetch.util';

type Options = Omit<KyOptions, "body"> & { body?: unknown };

export async function kyFetch<T>(
  url: string,
  options?: Options,
  noPrefix: boolean = false
) {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const { body, ...formattedOptions } = options || {};

  if (
    (!options?.method && !options?.next?.revalidate && !options?.cache) ||
    options.next?.tags ||
    options?.method === "GET"
  ) {
    formattedOptions.cache = "force-cache";
  }

  if (body) {
    if (typeof body === "string") {
      (formattedOptions as Options).body = body;
    } else {
      formattedOptions.json = body;
    }
  }

  formattedOptions.timeout = 100000;

  formattedOptions.hooks = {
    afterResponse: [
      (response) => {
        // console.log(
        //   chalk.cyan(` KY_[${response.method}] `),
        //   chalk.cyan(`${requestUrl}`)
        // );
      },
    ],
  };

  try {
    if (noPrefix) {
      const res = await ky(url, formattedOptions).json<T>();

      return res;
    }
    const res = await ky(url.replace("/", ""), {
      prefixUrl: hostname,
      ...formattedOptions,
    }).json<T>();

    return res;
  } catch (error: unknown) {
    const err = error as HTTPError;
    const cause = err?.cause?.toString();
    // console.log("error", error);
    if (cause?.includes("ECONNREFUSED")) {
      console.info(
        chalk.red("KY_ERROR"),
        chalk.red("Please Check Configuration", err.cause)
      );
      throw new HttpError("");
    }
    console.info(chalk.red("KY_ERROR"), chalk.red(err.message));
    throw new HTTPError(err?.response, err?.request, err?.options);
  }
}

export type KyFetch = typeof kyFetch;

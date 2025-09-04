export async function legacyBetterPromises<T extends any[]>(
  promises: [...{ [K in keyof T]: Promise<T[K]> }]
): Promise<{
  [K in keyof T]: [T[K] | null, PromiseRejectedResult["reason"] | null];
}> {
  const results = await Promise.allSettled(promises);

  return results.map((result) => {
    return [
      result.status === "fulfilled" ? result.value : null,
      result.status === "rejected" ? result.reason : null,
    ];
  }) as {
    [K in keyof T]: [T[K] | null, PromiseRejectedResult["reason"] | null];
  };
}

export async function betterActionPromises<T extends any[]>(
  promises: [...{ [K in keyof T]: Promise<T[K]> }]
): Promise<{
  [K in keyof T]: [T[K][0] | null, T[K][1] | null];
}> {
  const results = await Promise.allSettled(promises);

  return results.map((result) => [
    result.status === "fulfilled" && result.value?.[0]
      ? result.value?.[0]
      : null,
    result.status === "fulfilled" && result?.value?.[1]
      ? result?.value?.[1]
      : null,
  ]) as {
    [K in keyof T]: [T[K][0] | null, T[K][1] | null];
  };
}

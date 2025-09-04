export const generateSearchParamsString = (
  searchParams: Record<string, string | string[]>
): string => {
  const formattedSearchParams = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      formattedSearchParams.append(key, value.join(","));
    } else {
      formattedSearchParams.append(key, value);
    }
  });

  return formattedSearchParams.toString();
};

export const getImageDataURL = (imageData: any, defaultImageURL: string) => {
  if (!imageData) return defaultImageURL;
  const imageBase64 = Buffer.from(imageData, "binary").toString("base64");
  const imageDataUrl = `data:image/jpeg;base64,${imageBase64}`;

  const imageURL = imageData
    ? imageDataUrl
    : defaultImageURL
    ? defaultImageURL
    : "/images/product/placeholder.webp";

  return imageURL;
};

export const getImageWithFallback = (imageUrl?: string) => {

  if (!imageUrl) return "/images/product/placeholder.webp";

  return imageUrl;
};

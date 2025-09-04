export const slugify = (str: string): string => {
  return (
    str
      // Normalize string to remove accents and diacritics
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritic marks
      // Replace specific characters
      .replace(/ø/g, "o")
      .replace(/å/g, "a")
      .replace(/æ/g, "ae")
      .replace(/&/g, "-and-")
      .replace(/à/g, "a")
      .replace(/á/g, "a")
      // Remove any remaining non-alphanumeric characters except spaces
      .replace(/[^a-zA-Z0-9 ]/g, "")
      // Replace spaces with dashes
      .replace(/\s+/g, "-")
      // Convert to lowercase
      .toLowerCase()
  );
};

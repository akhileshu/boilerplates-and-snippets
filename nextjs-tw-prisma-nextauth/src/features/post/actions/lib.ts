
export const generateSlug = (title: string) =>
  // only a-z , numbers , hyphen
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .trim()
    .replace(/\s+/g, "-"); // replace spaces with hyphen

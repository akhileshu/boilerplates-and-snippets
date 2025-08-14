export const getPreviewText = (content: string, length = 100) =>
  content?.length > length ? `${content.slice(0, length)}...` : content;


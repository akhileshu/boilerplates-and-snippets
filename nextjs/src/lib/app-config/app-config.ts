export const appConfig = {
  isProd: process.env.NODE_ENV === "production",
  limits: {
    POSTS_CREATE: 10,
    POSTS_UPDATE: 50,
    MAX_BOOKMARKS: 50,
  },
};

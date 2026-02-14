// utils/sanitize.ts
import { sanitize } from "isomorphic-dompurify";

export const sanitizeHtml = (dirtyHtml: string): string => {
  return sanitize(dirtyHtml, { USE_PROFILES: { html: true } });
};

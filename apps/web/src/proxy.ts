import { i18nRouter } from "next-i18n-router";
import { type NextRequest } from "next/server";

import i18nConfig from "./intl/i18n";

export function proxy(request: NextRequest) {
  return i18nRouter(request, i18nConfig);
}

// only apply this middleware to files in the app directory
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - next-api (Next.js API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - revalidate (revalidation API route)
     */
    "/((?!api|next-api|assets|_next/static|_next/image|revalidate).*)",
  ],
};

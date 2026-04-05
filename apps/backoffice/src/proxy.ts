import { type NextRequest, NextResponse } from "next/server";

import { getSessionCookie } from "better-auth/cookies";
import { i18nRouter } from "next-i18n-router";

import i18nConfig from "./intl/i18n";

function isI18nRedirect(response: Response) {
  return response.status >= 300 && response.status < 400;
}

function isPublicPath(pathname: string) {
  return pathname.startsWith("/sign-in");
}

export function proxy(request: NextRequest) {
  const i18nResponse = i18nRouter(request, i18nConfig);

  if (isI18nRedirect(i18nResponse)) {
    return i18nResponse;
  }

  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return i18nResponse;
  }

  if (!getSessionCookie(request)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return i18nResponse;
}

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

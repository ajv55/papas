import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse, NextFetchEvent } from 'next/server';

// Configuration for next-intl middleware
const locales = ['en', 'es'];
const defaultLocale = 'en';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'never',
});

// Define the authentication middleware
const authMiddleware = withAuth(
  async function middleware(request: NextRequestWithAuth, event: NextFetchEvent) {
    console.log(request.nextUrl.pathname);
    console.log(request.nextauth?.token);

    // Redirect to login if the user is not authorized
    if (request.nextUrl.pathname.startsWith('/orders') && !request.nextauth?.token?.role) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Redirect to denied page if the user is not an admin
    if (request.nextUrl.pathname.startsWith('/orders') && request.nextauth?.token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/denied', request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === 'admin',
    },
  }
);

export default async function middleware(request: NextRequestWithAuth, event: NextFetchEvent) {
  // Apply the intlMiddleware for all routes
  const intlResponse = intlMiddleware(request);
  if (intlResponse) {
    return intlResponse;
  }

  // Apply the authMiddleware only for /orders route
  if (request.nextUrl.pathname.startsWith('/orders')) {
    return authMiddleware(request, event);
  }

  // Allow other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all internationalized pathnames
    '/(en|es)/:path*',
    // Apply middleware to /orders route
    '/orders',
    // Include any routes that need to be accessed freely
    '/login',
    '/reg',
    '/',
    '/denied',
    '/terms',
    '/privacy',
    '/signOut'
    ],
};

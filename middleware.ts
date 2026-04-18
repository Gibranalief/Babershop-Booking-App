import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;

  // Protect /dashboard routes (Barbers only)
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (role !== 'barber') {
      return NextResponse.redirect(new URL('/user', request.url)); // Redirect to user page if not a barber
    }
  }

  // Protect /user routes (Users only)
  if (request.nextUrl.pathname.startsWith('/user')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect /booking (Both users & barbers)
  if (request.nextUrl.pathname.startsWith('/booking')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Prevent logged in users from visiting auth pages
  if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) {
    if (token) {
      return NextResponse.redirect(new URL(role === 'barber' ? '/dashboard' : '/user', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/user/:path*', '/login', '/register', '/booking/:path*'],
};

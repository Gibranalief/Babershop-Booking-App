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
    // 🔴 FIX: Check against uppercase BARBER (or lowercase just in case)
    if (role?.toUpperCase() !== 'BARBER') {
      return NextResponse.redirect(new URL('/user', request.url)); 
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
      // 🔴 FIX: Also check case here to route them correctly if they hit /login while logged in
      return NextResponse.redirect(new URL(role?.toUpperCase() === 'BARBER' ? '/dashboard' : '/user', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/user/:path*', '/login', '/register', '/booking/:path*'],
};
import { NextResponse } from 'next/server';
import { authPath } from './util/Util';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;
  const isAuthPath = authPath.includes(pathname);

  // if there is no token and user tries to access a path other than login or register, redirect to login page
  if (!token && !isAuthPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // if there is a token and user tries to access login or register, redirect to home page
  if (token && isAuthPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/'],
};

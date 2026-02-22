import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/
const SUPPORTED = ['en','fr']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname === '/') return NextResponse.redirect(new URL('/en/', req.url))
  if (pathname.startsWith('/_next') || PUBLIC_FILE.test(pathname)) return
  return NextResponse.next()
}

export const config = { matcher: ['/', '/((?!api|_next|static).*)'] }

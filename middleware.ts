import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/
const SUPPORTED = ['en','fr']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Skip static files and _next
  if (pathname.startsWith('/_next') || PUBLIC_FILE.test(pathname)) return

  // Root redirect: use cookie preference or default to 'en'
  if (pathname === '/') {
    const preferred = req.cookies.get('NEXT_LOCALE')?.value
    const locale = SUPPORTED.includes(preferred || '') ? preferred : 'en'
    return NextResponse.redirect(new URL(`/${locale}/`, req.url))
  }

  // For locale routes, set the cookie to remember preference
  const segments = pathname.split('/')
  const urlLocale = segments[1]
  if (SUPPORTED.includes(urlLocale)) {
    const response = NextResponse.next()
    response.cookies.set('NEXT_LOCALE', urlLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    })
    return response
  }

  return NextResponse.next()
}

export const config = { matcher: ['/', '/((?!api|_next|static).*)'] }

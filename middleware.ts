import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/
const SUPPORTED = ['en','fr']

/**
 * Detect preferred language from Accept-Language header.
 * Parses "fr-FR,fr;q=0.9,en;q=0.8" → checks each tag against SUPPORTED.
 */
function detectLocale(acceptLang: string | null): string | null {
  if (!acceptLang) return null
  // Parse and sort by quality value
  const langs = acceptLang.split(',').map(part => {
    const [tag, q] = part.trim().split(';q=')
    return { lang: tag.split('-')[0].toLowerCase(), q: q ? parseFloat(q) : 1 }
  }).sort((a, b) => b.q - a.q)

  for (const { lang } of langs) {
    if (SUPPORTED.includes(lang)) return lang
  }
  return null
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Skip static files and _next
  if (pathname.startsWith('/_next') || PUBLIC_FILE.test(pathname)) return

  // Root redirect: priority = cookie > browser language > default 'en'
  if (pathname === '/') {
    const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value
    const browserLocale = detectLocale(req.headers.get('accept-language'))
    const locale = SUPPORTED.includes(cookieLocale || '')
      ? cookieLocale!
      : browserLocale || 'en'
    const response = NextResponse.redirect(new URL(`/${locale}/`, req.url))
    // Save detected locale so next visit uses cookie directly
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    })
    return response
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

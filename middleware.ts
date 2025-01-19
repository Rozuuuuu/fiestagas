import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Allow access to login page
  if (path === '/admin/login') {
    return NextResponse.next()
  }

  // Protect admin routes
  if (path.startsWith('/admin')) {
    const isAdmin = request.cookies.get('isAdmin')?.value === 'true'
    
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}

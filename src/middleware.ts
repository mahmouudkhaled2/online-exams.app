import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export default async function middleware(request: NextRequest) {

    const token = await getToken({req: request});
    const url = request.nextUrl.pathname;
    const authPages = ['/auth/login', '/auth/register', '/auth/forget-password'];

    // if user authenticated redirect him to home page.
    if (token && authPages.includes(url)) 
        return NextResponse.redirect(new URL('/', request.nextUrl.origin));
    
    // otherwise redirect him to login page.
    if (!token && !authPages.includes(url)) 
        return NextResponse.redirect(new URL('/auth/login',  request.nextUrl.origin));


    return NextResponse.next();
        
}
 
export const config = {
  matcher: [ '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}
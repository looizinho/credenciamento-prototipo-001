export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/eventos/:path*'],
};

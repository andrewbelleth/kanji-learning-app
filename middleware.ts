import { updateSession } from '@/lib/supabase/proxy';
import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};

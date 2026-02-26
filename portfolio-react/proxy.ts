import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const handleProxy = createMiddleware(routing);

export function proxy(request: NextRequest) {
    return handleProxy(request);
}

export const config = {
    matcher: ['/((?!_next|_vercel|.*\\..*).*)', ]
};
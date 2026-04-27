import { Auth } from '@auth/core';
import Resend from '@auth/core/providers/resend';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../../src/lib/db/client';
import {
  users,
  accounts,
  sessions,
  verificationTokens,
} from '../../src/lib/db/schema';

const authConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: process.env.AUTH_EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: '/admin/login',
    verifyRequest: '/admin/check-email',
  },
  callbacks: {
    async session({ session, user }: any) {
      if (session.user) {
        (session.user as any).id = user.id;
        (session.user as any).tenantId = (user as any).tenantId ?? null;
      }
      return session;
    },
  },
};

function toRequest(req: VercelRequest): Request {
  const url = `https://${req.headers.host}${req.url}`;
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (Array.isArray(v)) headers.set(k, v.join(', '));
    else if (typeof v === 'string') headers.set(k, v);
  }
  const init: RequestInit = { method: req.method, headers };
  if (req.method && !['GET', 'HEAD'].includes(req.method)) {
    init.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    if (!headers.has('content-type')) headers.set('content-type', 'application/json');
  }
  return new Request(url, init);
}

async function sendResponse(res: VercelResponse, response: Response) {
  res.status(response.status);
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') res.setHeader('set-cookie', value);
    else res.setHeader(key, value);
  });
  const body = await response.text();
  res.send(body);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const request = toRequest(req);
  const response = await Auth(request, authConfig as any);
  await sendResponse(res, response);
}

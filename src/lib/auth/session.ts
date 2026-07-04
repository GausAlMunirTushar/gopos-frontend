'use client';

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    organization: { id: string; name: string; slug: string };
  };
}

const SESSION_KEY = 'gopos.session';

export const authSession = {
  get(): AuthSession | null {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      window.localStorage.removeItem(SESSION_KEY);
      return null;
    }
  },
  set(session: AuthSession): void {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  },
  clear(): void {
    window.localStorage.removeItem(SESSION_KEY);
  },
};

import { PortfolioData, ContactMessage, UserAuthSession } from '../types.js';

const AUTH_TOKEN_KEY = 'namrata_portfolio_token';
const AUTH_USER_KEY = 'namrata_portfolio_user';

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getStoredUser(): { email: string; name: string } | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveAuthSession(session: UserAuthSession) {
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, session.token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify({ email: session.email, name: session.name }));
  } catch (err) {
    console.error('Failed to store session in localStorage:', err);
  }
}

export function clearAuthSession() {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  } catch (err) {
    console.error('Failed to clear session:', err);
  }
}

function getAuthHeaders(): Record<string, string> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function fetchPortfolio(): Promise<PortfolioData> {
  const res = await fetch('/api/portfolio');
  if (!res.ok) {
    throw new Error('Failed to load portfolio data from server');
  }
  return res.json();
}

export async function savePortfolio(data: PortfolioData): Promise<PortfolioData> {
  const res = await fetch('/api/portfolio', {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to save portfolio changes to cloud');
  }
  const result = await res.json();
  return result.data;
}

export async function loginUser(email: string, password: string): Promise<UserAuthSession> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Invalid credentials');
  }
  const data = await res.json();
  saveAuthSession(data.session);
  return data.session;
}

export async function logoutUser(): Promise<void> {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: getAuthHeaders(),
    });
  } finally {
    clearAuthSession();
  }
}

export async function checkAuth(): Promise<boolean> {
  const token = getStoredToken();
  if (!token) return false;
  try {
    const res = await fetch('/api/auth/me', {
      headers: getAuthHeaders(),
    });
    if (res.ok) {
      return true;
    } else {
      clearAuthSession();
      return false;
    }
  } catch {
    return false;
  }
}

export async function changePassword(newPassword: string): Promise<void> {
  const res = await fetch('/api/auth/change-password', {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ newPassword }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to update password');
  }
}

export async function submitContact(msg: { name: string; email: string; subject: string; message: string }): Promise<void> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(msg),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to send message');
  }
}

export async function fetchMessages(): Promise<ContactMessage[]> {
  const res = await fetch('/api/messages', {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch messages');
  }
  return res.json();
}

export async function deleteMessage(id: string): Promise<void> {
  const res = await fetch(`/api/messages/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to delete message');
  }
}

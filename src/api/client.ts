const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// ─── Local Mode (no backend) ─────────────────────────────────
const LOCAL_MODE = import.meta.env.VITE_LOCAL_MODE === 'true';
const LOCAL_EMAIL = import.meta.env.VITE_LOCAL_ADMIN_EMAIL || 'admin@skooture.ai';
const LOCAL_PASSWORD = import.meta.env.VITE_LOCAL_ADMIN_PASSWORD || 'admin123';
const LOCAL_TOKEN_VALUE = 'local_mode_token';

function _localGetMessages(): any[] {
  const saved = localStorage.getItem('skooture_messages');
  return saved ? JSON.parse(saved) : [];
}

function getToken(): string | null {
  return localStorage.getItem('skooture_token');
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  return res.json();
}

// ─── Auth ────────────────────────────────────────────────────

export async function login(email: string, password: string) {
  if (LOCAL_MODE) {
    if (email === LOCAL_EMAIL && password === LOCAL_PASSWORD) {
      localStorage.setItem('skooture_token', LOCAL_TOKEN_VALUE);
      return { token: LOCAL_TOKEN_VALUE, user: { id: 'local', email, role: 'admin' } };
    }
    throw new Error('Invalid credentials');
  }
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await handleResponse<{ token: string; user: { id: string; email: string; role: string } }>(res);
  localStorage.setItem('skooture_token', data.token);
  return data;
}

export async function verifyToken(): Promise<boolean> {
  if (LOCAL_MODE) {
    return localStorage.getItem('skooture_token') === LOCAL_TOKEN_VALUE;
  }
  const token = getToken();
  if (!token) return false;
  try {
    const res = await fetch(`${API_BASE}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data.valid === true;
  } catch {
    return false;
  }
}

export async function getMe() {
  const res = await fetch(`${API_BASE}/auth/me`, { headers: authHeaders() });
  return handleResponse<{ id: string; email: string; role: string; createdAt: string }>(res);
}

export function logout() {
  localStorage.removeItem('skooture_token');
}

// ─── Content ─────────────────────────────────────────────────

export async function getContent() {
  if (LOCAL_MODE) {
    const saved = localStorage.getItem('skooture_content');
    return saved ? JSON.parse(saved) : {};
  }
  const res = await fetch(`${API_BASE}/content`);
  return handleResponse<Record<string, any>>(res);
}

export async function updateContent(content: Record<string, any>) {
  if (LOCAL_MODE) {
    localStorage.setItem('skooture_content', JSON.stringify(content));
    return { success: true, message: 'Saved locally' };
  }
  const res = await fetch(`${API_BASE}/content`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(content),
  });
  return handleResponse<{ success: boolean; message: string }>(res);
}

export async function resetContent() {
  if (LOCAL_MODE) {
    localStorage.removeItem('skooture_content');
    return { success: true, message: 'Reset locally' };
  }
  const res = await fetch(`${API_BASE}/content/reset`, {
    method: 'POST',
    headers: authHeaders(),
  });
  return handleResponse<{ success: boolean; message: string }>(res);
}

// ─── Subscribers ─────────────────────────────────────────────

export async function getSubscribers() {
  if (LOCAL_MODE) {
    const saved = localStorage.getItem('skooture_subscribers');
    return saved ? JSON.parse(saved) : [];
  }
  const res = await fetch(`${API_BASE}/subscribers`, { headers: authHeaders() });
  return handleResponse<any[]>(res);
}

export async function createSubscriber(email: string) {
  if (LOCAL_MODE) {
    const subs = JSON.parse(localStorage.getItem('skooture_subscribers') || '[]');
    const newSub = { id: Date.now().toString(), email, createdAt: new Date().toISOString() };
    subs.push(newSub);
    localStorage.setItem('skooture_subscribers', JSON.stringify(subs));
    return newSub;
  }
  const res = await fetch(`${API_BASE}/subscribers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return handleResponse<any>(res);
}

export async function deleteSubscriber(id: string) {
  if (LOCAL_MODE) {
    const subs = JSON.parse(localStorage.getItem('skooture_subscribers') || '[]').filter((s: any) => s.id !== id);
    localStorage.setItem('skooture_subscribers', JSON.stringify(subs));
    return { success: true };
  }
  const res = await fetch(`${API_BASE}/subscribers/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse<{ success: boolean }>(res);
}

// ─── Messages ────────────────────────────────────────────────


export async function getMessages() {
  if (LOCAL_MODE) return _localGetMessages();
  const res = await fetch(`${API_BASE}/messages`, { headers: authHeaders() });
  return handleResponse<any[]>(res);
}

export async function sendMessage(data: { name: string; email: string; message: string }) {
  if (LOCAL_MODE) {
    const messages = _localGetMessages();
    const newMsg = { ...data, id: Date.now().toString(), read: false, createdAt: new Date().toISOString() };
    messages.push(newMsg);
    localStorage.setItem('skooture_messages', JSON.stringify(messages));
    return newMsg;
  }
  const res = await fetch(`${API_BASE}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<any>(res);
}

export async function deleteMessage(id: string) {
  if (LOCAL_MODE) {
    const messages = _localGetMessages().filter((m: any) => m.id !== id);
    localStorage.setItem('skooture_messages', JSON.stringify(messages));
    return { success: true };
  }
  const res = await fetch(`${API_BASE}/messages/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse<{ success: boolean }>(res);
}

export async function markMessageRead(id: string) {
  if (LOCAL_MODE) {
    const messages = _localGetMessages().map((m: any) => m.id === id ? { ...m, read: true } : m);
    localStorage.setItem('skooture_messages', JSON.stringify(messages));
    return { success: true };
  }
  const res = await fetch(`${API_BASE}/messages/${id}/read`, {
    method: 'PATCH',
    headers: authHeaders(),
  });
  return handleResponse<any>(res);
}

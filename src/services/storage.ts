import { User } from '../types';

const PREFIX = 'lendsqr_user_';

export function saveUserToStorage(user: User): void {
  try {
    localStorage.setItem(`${PREFIX}${user.id}`, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user to localStorage', e);
  }
}

export function getUserFromStorage(id: string): User | null {
  try {
    const raw = localStorage.getItem(`${PREFIX}${id}`);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function savePaginationState(page: number, pageSize: number): void {
  try {
    localStorage.setItem('lendsqr_pagination', JSON.stringify({ page, pageSize }));
  } catch {
    // silent
  }
}

export function getPaginationState(): { page: number; pageSize: number } {
  try {
    const raw = localStorage.getItem('lendsqr_pagination');
    if (raw) return JSON.parse(raw);
  } catch {
    // silent
  }
  return { page: 1, pageSize: 10 };
}

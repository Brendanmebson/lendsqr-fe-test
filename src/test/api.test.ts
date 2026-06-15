import { describe, it, expect, beforeAll } from 'vitest';
import { fetchUsers, fetchUserById, filterUsers } from '../services/api';
import { User, FilterParams } from '../types';

describe('fetchUsers', () => {
  it('returns 500 users', async () => {
    const users = await fetchUsers();
    expect(users).toHaveLength(500);
  });

  it('each user has required fields', async () => {
    const users = await fetchUsers();
    const user = users[0];
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('status');
    expect(user).toHaveProperty('organization');
  });

  it('status is one of valid values', async () => {
    const users = await fetchUsers();
    const validStatuses = ['Active', 'Inactive', 'Pending', 'Blacklisted'];
    users.forEach(u => {
      expect(validStatuses).toContain(u.status);
    });
  });
});

describe('fetchUserById', () => {
  it('returns user with matching id', async () => {
    const user = await fetchUserById('user-1');
    expect(user.id).toBe('user-1');
  });

  it('throws for unknown id', async () => {
    await expect(fetchUserById('user-9999')).rejects.toThrow('User not found');
  });
});

describe('filterUsers', () => {
  let users: User[];

  beforeAll(async () => {
    users = await fetchUsers();
  });

  it('filters by organization', () => {
    const result = filterUsers(users, { organization: 'Lendsqr' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(u => expect(u.organization).toBe('Lendsqr'));
  });

  it('filters by status', () => {
    const result = filterUsers(users, { status: 'Active' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(u => expect(u.status).toBe('Active'));
  });

  it('returns empty array for no match', () => {
    const result = filterUsers(users, { email: 'notexisting@xyz.invalid' });
    expect(result).toHaveLength(0);
  });

  it('filters by username partial match', () => {
    const sample = users[0];
    const partial = sample.username.slice(0, 3);
    const result = filterUsers(users, { username: partial });
    expect(result.length).toBeGreaterThan(0);
  });

  it('handles empty filter object - returns all', () => {
    const result = filterUsers(users, {} as FilterParams);
    expect(result).toHaveLength(500);
  });

  it('combines multiple filters', () => {
    const result = filterUsers(users, { status: 'Active', organization: 'Lendsqr' });
    result.forEach(u => {
      expect(u.status).toBe('Active');
      expect(u.organization).toBe('Lendsqr');
    });
  });
});

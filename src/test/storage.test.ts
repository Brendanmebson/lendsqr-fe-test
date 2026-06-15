import { describe, it, expect, beforeEach } from 'vitest';
import { saveUserToStorage, getUserFromStorage, savePaginationState, getPaginationState } from '../services/storage';
import { User } from '../types';

const mockUser: User = {
  id: 'test-user-1',
  organization: 'Lendsqr',
  username: 'graceeff',
  email: 'grace@lendsqr.com',
  phoneNumber: '08012345678',
  dateJoined: 'Jan 1, 2023 10:00 AM',
  status: 'Active',
  fullName: 'Grace Effiom',
  bvn: '12345678901',
  gender: 'Female',
  maritalStatus: 'Single',
  children: 'None',
  typeOfResidence: "Parent's Apartment",
  levelOfEducation: 'B.Sc',
  employmentStatus: 'Employed',
  sectorOfEmployment: 'FinTech',
  durationOfEmployment: '2 years',
  officeEmail: 'grace@lendsqr.com',
  monthlyIncome: '₦200,000.00 - ₦400,000.00',
  loanRepayment: '40000',
  twitter: '@grace_effiom',
  facebook: 'Grace Effiom',
  instagram: '@grace_effiom',
  guarantors: [],
  userTier: 2,
  accountBalance: '₦200,000.00',
  accountNumber: '9912345678',
  bank: 'Providus Bank',
};

beforeEach(() => localStorage.clear());

describe('saveUserToStorage / getUserFromStorage', () => {
  it('saves and retrieves a user', () => {
    saveUserToStorage(mockUser);
    const retrieved = getUserFromStorage('test-user-1');
    expect(retrieved).toEqual(mockUser);
  });

  it('returns null for unknown id', () => {
    const result = getUserFromStorage('does-not-exist');
    expect(result).toBeNull();
  });

  it('overwrites existing user on re-save', () => {
    saveUserToStorage(mockUser);
    const updated = { ...mockUser, fullName: 'Grace Updated' };
    saveUserToStorage(updated);
    const retrieved = getUserFromStorage('test-user-1');
    expect(retrieved?.fullName).toBe('Grace Updated');
  });
});

describe('pagination state', () => {
  it('saves and retrieves pagination state', () => {
    savePaginationState(3, 20);
    const { page, pageSize } = getPaginationState();
    expect(page).toBe(3);
    expect(pageSize).toBe(20);
  });

  it('returns defaults when nothing saved', () => {
    const { page, pageSize } = getPaginationState();
    expect(page).toBe(1);
    expect(pageSize).toBe(10);
  });
});

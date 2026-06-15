import axios from 'axios';
import { User, UserStatus, FilterParams } from '../types';

const organizations = ['Lendsqr', 'Irorun', 'Lendstar', 'Mifos', 'PayStack', 'Flutterwave', 'Kuda', 'PiggyVest'];
const statuses: UserStatus[] = ['Active', 'Inactive', 'Pending', 'Blacklisted'];
const genders = ['Male', 'Female'];
const maritalStatuses = ['Single', 'Married', 'Divorced'];
const childrenOptions = ['None', '1', '2', '3+'];
const residenceTypes = ["Parent's Apartment", 'Own Apartment', 'Rented Apartment'];
const educationLevels = ['B.Sc', 'M.Sc', 'HND', 'OND', 'Ph.D', 'SSCE'];
const employmentStatuses = ['Employed', 'Self-employed', 'Unemployed', 'Student'];
const sectors = ['FinTech', 'Education', 'Healthcare', 'Agriculture', 'Technology', 'Banking'];
const banks = ['Providus Bank', 'GT Bank', 'First Bank', 'Access Bank', 'Zenith Bank', 'UBA'];
const relationships = ['Sister', 'Brother', 'Friend', 'Parent', 'Spouse', 'Colleague'];

const firstNames = ['Grace', 'Tosin', 'Debby', 'Adedeji', 'Chima', 'Amaka', 'Femi', 'Ngozi', 'Bola', 'Emeka',
  'Sade', 'Kunle', 'Tunde', 'Yetunde', 'Chidi', 'Obioma', 'Aisha', 'Fatima', 'Ibrahim', 'Musa'];
const lastNames = ['Effiom', 'Dokunmu', 'Ogana', 'Adeyemi', 'Okafor', 'Nwosu', 'Bello', 'Lawal', 'Obi', 'Eze',
  'Adeleke', 'Okonkwo', 'Babatunde', 'Chukwu', 'Ologun', 'Adebayo', 'Yakubu', 'Abdullahi', 'Shehu', 'Garba'];

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.floor(seededRandom(seed) * arr.length)];
}

function generatePhone(seed: number): string {
  const prefixes = ['0803', '0806', '0701', '0706', '0810', '0812', '0816', '0902', '0905'];
  const prefix = pick(prefixes, seed);
  const number = String(Math.floor(seededRandom(seed + 1) * 9000000) + 1000000);
  return `${prefix}${number}`;
}

function generateDate(seed: number): string {
  const year = 2019 + Math.floor(seededRandom(seed) * 4);
  const month = 1 + Math.floor(seededRandom(seed + 2) * 12);
  const day = 1 + Math.floor(seededRandom(seed + 3) * 28);
  const hour = Math.floor(seededRandom(seed + 4) * 12) + 8;
  const minute = Math.floor(seededRandom(seed + 5) * 60);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[month - 1]} ${day}, ${year} ${hour}:${String(minute).padStart(2, '0')} AM`;
}

function generateUser(index: number): User {
  const s = index * 13 + 7;
  const firstName = pick(firstNames, s);
  const lastName = pick(lastNames, s + 1);
  const fullName = `${firstName} ${lastName}`;
  const org = pick(organizations, s + 2);
  const orgSlug = org.toLowerCase().replace(/\s/g, '');
  const email = `${firstName.toLowerCase()}${index}@${orgSlug}.com`;
  const status = pick(statuses, s + 3);
  const tier = 1 + Math.floor(seededRandom(s + 4) * 3);
  const balance = (seededRandom(s + 5) * 500000).toFixed(2);
  const acctNum = String(Math.floor(seededRandom(s + 6) * 9000000000) + 1000000000);
  const bank = pick(banks, s + 7);

  const gFirstName = pick(firstNames, s + 8);
  const gLastName = pick(lastNames, s + 9);

  return {
    id: `user-${index}`,
    organization: org,
    username: `${firstName.toLowerCase()}${lastName.toLowerCase().slice(0, 3)}`,
    email,
    phoneNumber: generatePhone(s),
    dateJoined: generateDate(s),
    status,
    fullName,
    bvn: generatePhone(s + 10).slice(1),
    gender: pick(genders, s + 11),
    maritalStatus: pick(maritalStatuses, s + 12),
    children: pick(childrenOptions, s + 13),
    typeOfResidence: pick(residenceTypes, s + 14),
    levelOfEducation: pick(educationLevels, s + 15),
    employmentStatus: pick(employmentStatuses, s + 16),
    sectorOfEmployment: pick(sectors, s + 17),
    durationOfEmployment: `${1 + Math.floor(seededRandom(s + 18) * 9)} years`,
    officeEmail: `${firstName.toLowerCase()}@${orgSlug}.com`,
    monthlyIncome: `₦${(50000 + Math.floor(seededRandom(s + 19) * 350000)).toLocaleString()}.00 - ₦${(400000 + Math.floor(seededRandom(s + 20) * 600000)).toLocaleString()}.00`,
    loanRepayment: String(Math.floor(seededRandom(s + 21) * 80000) + 10000),
    twitter: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
    facebook: fullName,
    instagram: `@${firstName.toLowerCase()}${lastName.toLowerCase().slice(0, 3)}`,
    guarantors: [
      {
        fullName: `${gFirstName} ${gLastName}`,
        phoneNumber: generatePhone(s + 22),
        email: `${gFirstName.toLowerCase()}@gmail.com`,
        relationship: pick(relationships, s + 23),
      },
      {
        fullName: `${pick(firstNames, s + 24)} ${pick(lastNames, s + 25)}`,
        phoneNumber: generatePhone(s + 26),
        email: `${pick(firstNames, s + 27).toLowerCase()}@gmail.com`,
        relationship: pick(relationships, s + 28),
      },
    ],
    userTier: tier,
    accountBalance: `₦${Number(balance).toLocaleString()}`,
    accountNumber: acctNum,
    bank,
  };
}

// Generate all 500 users once
const ALL_USERS: User[] = Array.from({ length: 500 }, (_, i) => generateUser(i + 1));

let cachedUsers: User[] | null = null;

// Simulate async network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface UsersResponse {
  data: User[];
  total: number;
}

export async function fetchUsers(): Promise<User[]> {
  if (cachedUsers) return cachedUsers;
  await delay(800);

  // In test environment, return ALL_USERS directly to avoid HTTP network issues
  if (import.meta.env.MODE === 'test') {
    cachedUsers = ALL_USERS;
    return cachedUsers;
  }

  const endpoint = import.meta.env.VITE_API_URL || '/mock-users.json';
  const response = await axios.get<User[]>(endpoint);
  cachedUsers = response.data;
  return cachedUsers;
}

export async function fetchUserById(id: string): Promise<User> {
  await delay(600);
  const users = await fetchUsers();
  const user = users.find(u => u.id === id);
  if (!user) throw new Error('User not found');
  return user;
}

export function filterUsers(users: User[], filters: FilterParams): User[] {
  return users.filter(user => {
    if (filters.organization && !user.organization.toLowerCase().includes(filters.organization.toLowerCase())) return false;
    if (filters.username && !user.username.toLowerCase().includes(filters.username.toLowerCase())) return false;
    if (filters.email && !user.email.toLowerCase().includes(filters.email.toLowerCase())) return false;
    if (filters.phoneNumber && !user.phoneNumber.includes(filters.phoneNumber)) return false;
    if (filters.status && user.status !== filters.status) return false;
    if (filters.date && !user.dateJoined.includes(filters.date)) return false;
    return true;
  });
}

export function getOrganizations(): string[] {
  return organizations;
}

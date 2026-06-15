export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
  // Details fields
  fullName: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
  // Education & Employment
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  // Socials
  twitter: string;
  facebook: string;
  instagram: string;
  // Guarantors
  guarantors: Guarantor[];
  // Account
  userTier: number;
  accountBalance: string;
  accountNumber: string;
  bank: string;
}

export interface Guarantor {
  fullName: string;
  phoneNumber: string;
  email: string;
  relationship: string;
}

export interface FilterParams {
  organization?: string;
  username?: string;
  email?: string;
  date?: string;
  phoneNumber?: string;
  status?: string;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
}

export interface Credential {
  id: string;
  website: string;
  username: string;
  password: string;
  createdAt: number;
  updatedAt: number;
}

export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}
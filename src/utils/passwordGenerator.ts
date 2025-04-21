import { PasswordOptions } from '../types';

const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export const generatePassword = (options: PasswordOptions): string => {
  let chars = '';
  
  if (options.includeUppercase) chars += uppercase;
  if (options.includeLowercase) chars += lowercase;
  if (options.includeNumbers) chars += numbers;
  if (options.includeSymbols) chars += symbols;
  
  // Default to lowercase if nothing is selected
  if (chars === '') chars = lowercase;
  
  let password = '';
  for (let i = 0; i < options.length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  
  return password;
};

export const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  
  // Length check
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  
  // Character variety checks
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  
  return Math.min(5, strength);
};

export const getStrengthLabel = (strength: number): { label: string; color: string } => {
  switch (strength) {
    case 0:
    case 1:
      return { label: 'Very Weak', color: 'bg-red-500' };
    case 2:
      return { label: 'Weak', color: 'bg-orange-500' };
    case 3:
      return { label: 'Moderate', color: 'bg-yellow-500' };
    case 4:
      return { label: 'Strong', color: 'bg-blue-500' };
    case 5:
      return { label: 'Very Strong', color: 'bg-green-500' };
    default:
      return { label: 'Unknown', color: 'bg-gray-500' };
  }
};
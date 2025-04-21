import React, { useState, useEffect } from 'react';
import { RefreshCw, Copy, Check } from 'lucide-react';
import { generatePassword, calculatePasswordStrength, getStrengthLabel } from '../utils/passwordGenerator';
import { PasswordOptions } from '../types';
import { copyToClipboard } from '../utils/clipboard';

interface PasswordGeneratorProps {
  onPasswordGenerated: (password: string) => void;
}

const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({ onPasswordGenerated }) => {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });
  
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    generateNewPassword();
  }, []);
  
  useEffect(() => {
    setStrength(calculatePasswordStrength(password));
  }, [password]);
  
  useEffect(() => {
    onPasswordGenerated(password);
  }, [password, onPasswordGenerated]);
  
  const generateNewPassword = () => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
  };
  
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : Number(value),
    }));
  };
  
  const handleCopy = async () => {
    const success = await copyToClipboard(password);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const strengthInfo = getStrengthLabel(strength);
  
  return (
    <div className="glass-effect rounded-xl p-6 space-y-6">
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-3 pr-24 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-xl text-gray-800 dark:text-gray-200 font-mono shadow-inner-lg"
          value={password}
          readOnly
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
          <button
            onClick={generateNewPassword}
            className="p-2 rounded-lg bg-gray-500/10 hover:bg-gray-500/20 text-gray-600 dark:text-gray-400 transition-colors duration-200"
            aria-label="Generate new password"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-gray-500/10 hover:bg-gray-500/20 text-gray-600 dark:text-gray-400 transition-colors duration-200"
            aria-label="Copy password"
          >
            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Length: {options.length}
            </label>
            <span className="text-xs text-gray-500">8-32 characters</span>
          </div>
          <input
            type="range"
            name="length"
            min={8}
            max={32}
            value={options.length}
            onChange={handleOptionChange}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="includeUppercase"
              checked={options.includeUppercase}
              onChange={handleOptionChange}
              className="w-5 h-5 rounded text-primary-500 focus:ring-primary-500 border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Uppercase (A-Z)</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="includeLowercase"
              checked={options.includeLowercase}
              onChange={handleOptionChange}
              className="w-5 h-5 rounded text-primary-500 focus:ring-primary-500 border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Lowercase (a-z)</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="includeNumbers"
              checked={options.includeNumbers}
              onChange={handleOptionChange}
              className="w-5 h-5 rounded text-primary-500 focus:ring-primary-500 border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Numbers (0-9)</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="includeSymbols"
              checked={options.includeSymbols}
              onChange={handleOptionChange}
              className="w-5 h-5 rounded text-primary-500 focus:ring-primary-500 border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Symbols (!@#$%^&*)</span>
          </label>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Password Strength</p>
          <p className="text-sm font-medium" style={{ color: strengthInfo.color.replace('bg-', 'text-') }}>
            {strengthInfo.label}
          </p>
        </div>
        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full ${strengthInfo.color} transition-all duration-300 ease-in-out`} 
            style={{ width: `${(strength / 5) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
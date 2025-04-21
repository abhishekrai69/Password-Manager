import React, { useState } from 'react';
import { Credential } from '../types';
import PasswordGenerator from './PasswordGenerator';

interface AddCredentialFormProps {
  onAdd: (credential: Credential) => void;
  onCancel: () => void;
}

const AddCredentialForm: React.FC<AddCredentialFormProps> = ({ onAdd, onCancel }) => {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showGenerator, setShowGenerator] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!website || !username || !password) {
      return;
    }
    
    const newCredential: Credential = {
      id: crypto.randomUUID(),
      website,
      username,
      password,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    onAdd(newCredential);
    setWebsite('');
    setUsername('');
    setPassword('');
    setShowGenerator(false);
  };
  
  return (
    <div className="glass-effect rounded-xl shadow-glass p-6 animate-scale-up">
      <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
        Add New Credential
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Website
          </label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="example.com"
            className="input-field"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username or email"
            className="input-field"
            required
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowGenerator(!showGenerator)}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors duration-200"
            >
              {showGenerator ? 'Hide Generator' : 'Generate Password'}
            </button>
          </div>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="•••••••••••••"
            className="input-field"
            required
          />
        </div>
        
        {showGenerator && (
          <div className="mt-6 animate-slide-down">
            <PasswordGenerator onPasswordGenerated={setPassword} />
          </div>
        )}
        
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            Save Credential
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCredentialForm;
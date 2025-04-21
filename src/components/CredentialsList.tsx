import React from 'react';
import { Credential } from '../types';
import CredentialCard from './CredentialCard';

interface CredentialsListProps {
  credentials: Credential[];
  onDelete: (id: string) => void;
  onEdit: (credential: Credential) => void;
}

const CredentialsList: React.FC<CredentialsListProps> = ({ credentials, onDelete, onEdit }) => {
  if (credentials.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 transition-colors duration-200">
        <p className="text-gray-500 dark:text-gray-400">No credentials found.</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Add your first credential using the form above.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {credentials.map((credential) => (
        <CredentialCard
          key={credential.id}
          credential={credential}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default CredentialsList;
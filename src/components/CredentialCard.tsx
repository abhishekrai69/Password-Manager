import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Check, Trash, Edit, Save, X } from 'lucide-react';
import { Credential } from '../types';
import { copyToClipboard } from '../utils/clipboard';

interface CredentialCardProps {
  credential: Credential;
  onDelete: (id: string) => void;
  onEdit: (credential: Credential) => void;
}

const CredentialCard: React.FC<CredentialCardProps> = ({ credential, onDelete, onEdit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCredential, setEditedCredential] = useState<Credential>(credential);
  const [copied, setCopied] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleCopy = async () => {
    const success = await copyToClipboard(credential.password);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const handleToggleEdit = () => {
    if (isEditing) {
      setEditedCredential(credential);
    }
    setIsEditing(!isEditing);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCredential(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSave = () => {
    const updated = {
      ...editedCredential,
      updatedAt: Date.now()
    };
    onEdit(updated);
    setIsEditing(false);
  };
  
  const formatDomain = (url: string) => {
    try {
      if (!url.includes('://')) {
        url = 'https://' + url;
      }
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch (e) {
      return url;
    }
  };

  const getInitial = () => {
    const domain = formatDomain(credential.website);
    return domain.charAt(0).toUpperCase();
  };
  
  const getAvatarGradient = () => {
    const gradients = [
      'from-blue-500 to-indigo-500',
      'from-purple-500 to-pink-500',
      'from-green-500 to-teal-500',
      'from-red-500 to-orange-500',
      'from-yellow-500 to-orange-500',
      'from-pink-500 to-rose-500',
      'from-indigo-500 to-purple-500',
      'from-teal-500 to-cyan-500'
    ];
    
    const charCode = credential.website.charCodeAt(0);
    return gradients[charCode % gradients.length];
  };
  
  return (
    <div className="glass-effect rounded-xl shadow-glass p-6 animate-fade-in hover:shadow-xl transition-all duration-300">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getAvatarGradient()} flex items-center justify-center shadow-lg transform transition-transform duration-200 hover:scale-110`}>
          <span className="text-lg font-semibold text-white">{getInitial()}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              name="website"
              value={editedCredential.website}
              onChange={handleChange}
              className="input-field"
            />
          ) : (
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
              {formatDomain(credential.website)}
            </h3>
          )}
          
          <div className="mt-1">
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={editedCredential.username}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {credential.username}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button 
                onClick={handleSave}
                className="p-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 transition-colors duration-200"
                aria-label="Save changes"
              >
                <Save size={18} />
              </button>
              <button 
                onClick={handleToggleEdit}
                className="p-2 rounded-lg bg-gray-500/10 hover:bg-gray-500/20 text-gray-600 dark:text-gray-400 transition-colors duration-200"
                aria-label="Cancel editing"
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleToggleEdit}
                className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-colors duration-200"
                aria-label="Edit credential"
              >
                <Edit size={18} />
              </button>
              <button 
                onClick={() => onDelete(credential.id)}
                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 transition-colors duration-200"
                aria-label="Delete credential"
              >
                <Trash size={18} />
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="mt-4 relative">
        {isEditing ? (
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={editedCredential.password}
            onChange={handleChange}
            className="input-field"
          />
        ) : (
          <div className="flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              readOnly
              value={credential.password}
              className="input-field pr-20"
            />
            <div className="absolute right-2 flex space-x-1">
              <button
                onClick={togglePasswordVisibility}
                className="p-2 rounded-lg bg-gray-500/10 hover:bg-gray-500/20 text-gray-600 dark:text-gray-400 transition-colors duration-200"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
        )}
      </div>
    </div>
  );
};

export default CredentialCard;
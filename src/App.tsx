import React, { useState, useEffect } from 'react';
import { PlusCircle, Search, ShieldCheck } from 'lucide-react';
import Layout from './components/Layout';
import SearchBar from './components/SearchBar';
import AddCredentialForm from './components/AddCredentialForm';
import CredentialsList from './components/CredentialsList';
import { Credential } from './types';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [credentials, setCredentials] = useLocalStorage<Credential[]>('credentials', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [filteredCredentials, setFilteredCredentials] = useState<Credential[]>([]);
  
  // Update filtered credentials whenever search term or credentials list changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCredentials(credentials);
    } else {
      const lowerCaseSearch = searchTerm.toLowerCase();
      const filtered = credentials.filter(
        (credential) =>
          credential.website.toLowerCase().includes(lowerCaseSearch) ||
          credential.username.toLowerCase().includes(lowerCaseSearch)
      );
      setFilteredCredentials(filtered);
    }
  }, [searchTerm, credentials]);
  
  const handleAddCredential = (newCredential: Credential) => {
    setCredentials([...credentials, newCredential]);
    setShowAddForm(false);
  };
  
  const handleDeleteCredential = (id: string) => {
    setCredentials(credentials.filter((cred) => cred.id !== id));
  };
  
  const handleEditCredential = (updatedCredential: Credential) => {
    setCredentials(
      credentials.map((cred) =>
        cred.id === updatedCredential.id ? updatedCredential : cred
      )
    );
  };
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 transition-colors duration-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
            <div className="flex items-center space-x-2">
              <ShieldCheck size={24} className="text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Password Manager
              </h1>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center space-x-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200"
            >
              <PlusCircle size={18} />
              <span>{showAddForm ? 'Cancel' : 'Add New'}</span>
            </button>
          </div>
          
          {showAddForm ? (
            <AddCredentialForm
              onAdd={handleAddCredential}
              onCancel={() => setShowAddForm(false)}
            />
          ) : (
            <>
              <div className="mb-6">
                <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              </div>
              
              <CredentialsList
                credentials={filteredCredentials}
                onDelete={handleDeleteCredential}
                onEdit={handleEditCredential}
              />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default App;
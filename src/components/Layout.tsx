import React, { ReactNode } from 'react';
import { Lock, Shield } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="fixed inset-0 bg-gradient-radial from-primary-500/5 to-transparent dark:from-primary-400/5 pointer-events-none" />
      
      <header className="sticky top-0 z-50 glass-effect shadow-glass border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
                <Lock size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                SecureVault
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="glass-effect border-t border-gray-200/50 dark:border-gray-700/50 py-6 transition-all duration-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-md">
                <Shield size={16} className="text-white" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your passwords are stored locally and never leave your device
              </p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              © {new Date().getFullYear()} SecureVault Password Manager-Abhishek Rai
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

import React from 'react';
import { User, LogOut } from 'lucide-react';

interface NavbarProps {
  isRTL: boolean;
  setIsRTL: (rtl: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isRTL, setIsRTL }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold text-gray-800">Welcome, Ahmed</h2>
      </div>

      <div className="flex items-center space-x-4">
        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-gray-800">Ahmed Zaki</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>

        {/* Logout */}
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-red-600">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;

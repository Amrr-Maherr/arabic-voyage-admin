
import React from 'react';
import { Bell, User, LogOut, Languages } from 'lucide-react';

interface NavbarProps {
  isRTL: boolean;
  setIsRTL: (rtl: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isRTL, setIsRTL }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h2 className="text-lg font-semibold text-gray-800">
          {isRTL ? 'مرحباً، أحمد' : 'Welcome, Ahmed'}
        </h2>
      </div>

      <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Language Toggle */}
        <button
          onClick={() => setIsRTL(!isRTL)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title={isRTL ? "Switch to English" : "التبديل إلى العربية"}
        >
          <Languages className="w-5 h-5 text-gray-600" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-sm font-medium text-gray-800">
              {isRTL ? 'أحمد زكي' : 'Ahmed Zaki'}
            </p>
            <p className="text-xs text-gray-500">
              {isRTL ? 'مدير' : 'Administrator'}
            </p>
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

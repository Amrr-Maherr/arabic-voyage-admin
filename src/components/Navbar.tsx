
import React from 'react';
import { User, LogOut, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isRTL: boolean;
  setIsRTL: (rtl: boolean) => void;
  userType?: 'admin' | 'employee';
}

const Navbar: React.FC<NavbarProps> = ({ isRTL, setIsRTL, userType = 'admin' }) => {
  return (
    <header className="bg-background shadow-sm border-b border-border h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold text-foreground">
          أهلاً وسهلاً، {userType === 'admin' ? 'المدير' : 'الموظف'}
        </h2>
      </div>

      <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {/* نوع المستخدم */}
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
          userType === 'admin' 
            ? 'bg-purple-100 text-purple-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {userType === 'admin' ? (
            <Shield className="w-4 h-4" />
          ) : (
            <User className="w-4 h-4" />
          )}
          <span>{userType === 'admin' ? 'أدمن' : 'موظف'}</span>
        </div>

        {/* User Profile */}
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>

        {/* Logout */}
        <button className="p-2 rounded-lg hover:bg-muted transition-colors text-destructive">
          <Link to="/">
          <LogOut className="w-5 h-5" />
          </Link>
        </button>
      </div>
    </header>
  );
};

export default Navbar;

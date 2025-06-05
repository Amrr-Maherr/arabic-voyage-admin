
import React from 'react';
import { 
  LayoutDashboard, 
  Plane, 
  Building2, 
  Car, 
  Image, 
  Users, 
  Settings,
  MapPin
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isRTL: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isRTL }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, labelAr: 'لوحة التحكم' },
    { id: 'flights', label: 'Manage Flights', icon: Plane, labelAr: 'إدارة الرحلات' },
    { id: 'hotels', label: 'Manage Hotels', icon: Building2, labelAr: 'إدارة الفنادق' },
    { id: 'limousines', label: 'Manage Limousines', icon: Car, labelAr: 'إدارة الليموزين' },
    { id: 'background', label: 'Background Manager', icon: Image, labelAr: 'إدارة الخلفيات' },
    { id: 'users', label: 'Users', icon: Users, labelAr: 'المستخدمين' },
    { id: 'settings', label: 'Settings', icon: Settings, labelAr: 'الإعدادات' },
  ];

  return (
    <div className={`bg-white shadow-lg h-screen w-64 flex flex-col ${isRTL ? 'border-l' : 'border-r'} border-gray-200`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 travel-gradient rounded-lg flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              {isRTL ? 'ترافل بوك' : 'TravelBook'}
            </h1>
            <p className="text-sm text-gray-500">
              {isRTL ? 'إدارة السفر' : 'Travel Management'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className={`sidebar-item w-full text-left ${isActive ? 'active' : ''} ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <Icon className={`w-5 h-5 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  <span className="font-medium">
                    {isRTL ? item.labelAr : item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

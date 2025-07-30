
import React from 'react';
import { 
  LayoutDashboard, 
  Plane, 
  Building2, 
  Car, 
  Image, 
  Calendar,
  Settings,
  Palette
} from 'lucide-react';
import LogoImage from "../../public/logo (1) 1.png";

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isRTL: boolean;
  userType?: 'admin' | 'employee' | 'date-pricing' | 'room-manager';
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isRTL, userType = 'admin' }) => {
  const adminMenuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'flights', label: 'إدارة الرحلات الجوية', icon: Plane },
    { id: 'hotels', label: 'إدارة الفنادق', icon: Building2 },
    { id: 'limousines', label: 'إدارة الليموزين', icon: Car },
    { id: 'bookings', label: 'جميع الحجوزات', icon: Calendar },
    { id: 'background', label: 'إدارة الخلفية', icon: Image },
    { id: 'color-settings', label: 'إعدادات الألوان', icon: Palette },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  const employeeMenuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'flights', label: 'الرحلات الجوية', icon: Plane },
    { id: 'hotels', label: 'الفنادق', icon: Building2 },
    { id: 'limousines', label: 'الليموزين', icon: Car },
    { id: 'bookings', label: 'الحجوزات', icon: Calendar },
  ];

  const getMenuItems = () => {
    if (userType === 'date-pricing') {
      return [{ id: 'date-pricing', label: 'تسعير التواريخ', icon: Calendar }];
    }
    if (userType === 'room-manager') {
      return [{ id: 'room-management', label: 'إدارة الغرف', icon: Building2 }];
    }
    return userType === 'admin' ? adminMenuItems : employeeMenuItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className={`bg-white shadow-lg min-h-screen w-64 flex flex-col border-r border-gray-200 ${isRTL ? 'border-l border-r-0' : ''}`}>
      {/* الشعار */}
      <div className="p-6 border-b border-gray-200">
        <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse' : 'space-x-3'}`}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <img src={LogoImage} alt="شعار قافلة الإيمان" />
          </div>
          <div>
            <h1 className="text-md font-bold text-gray-800">قافلة الإيمان</h1>
            <p className="text-xs text-gray-500">
              {userType === 'admin' ? 'أدمن' : 
               userType === 'employee' ? 'موظف' :
               userType === 'date-pricing' ? 'مُسعِّر' :
               userType === 'room-manager' ? 'مدير غرف' : 'مستخدم'}
            </p>
          </div>
        </div>
      </div>

      {/* التنقل */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className={`sidebar-item w-full flex items-center ${isRTL ? 'flex-row-reverse text-right' : 'text-left'} p-3 rounded-lg transition-colors ${
                    isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  <span className="font-medium">{item.label}</span>
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

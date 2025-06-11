
import React from 'react';
import { 
  LayoutDashboard, 
  Plane, 
  Building2, 
  Car, 
  Image, 
  Calendar,
  Settings,
  MapPin,
  Palette
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isRTL: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isRTL }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'flights', label: 'Manage Flights', icon: Plane },
    { id: 'hotels', label: 'Manage Hotels', icon: Building2 },
    { id: 'limousines', label: 'Manage Limousines', icon: Car },
    { id: 'bookings', label: 'All Bookings', icon: Calendar },
    { id: 'background', label: 'Background Manager', icon: Image },
    { id: 'color-settings', label: 'Color Settings', icon: Palette },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleMenuClick = (itemId: string) => {
    if (itemId === 'color-settings') {
      window.location.href = '/color-settings';
    } else {
      setCurrentPage(itemId);
    }
  };

  return (
    <div className="bg-white shadow-lg min-h-screen w-64 flex flex-col border-r border-gray-200">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 travel-gradient rounded-lg flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">TravelBook</h1>
            <p className="text-sm text-gray-500">Travel Management</p>
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
                  onClick={() => handleMenuClick(item.id)}
                  className={`sidebar-item w-full text-left ${isActive ? 'active' : ''}`}
                >
                  <Icon className="w-5 h-5 mr-3" />
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


import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DashboardHome from './DashboardHome';
import FlightsPage from './FlightsPage';
import HotelsPage from './HotelsPage';
import LimousinesPage from './LimousinesPage';
import BackgroundManager from './BackgroundManager';
import UsersPage from './UsersPage';
import SettingsPage from './SettingsPage';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isRTL, setIsRTL] = useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'flights':
        return <FlightsPage />;
      case 'hotels':
        return <HotelsPage />;
      case 'limousines':
        return <LimousinesPage />;
      case 'background':
        return <BackgroundManager />;
      case 'users':
        return <UsersPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex w-full">
        <Sidebar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          isRTL={isRTL}
        />
        <div className="flex-1 flex flex-col">
          <Navbar isRTL={isRTL} setIsRTL={setIsRTL} />
          <main className="flex-1 p-6">
            {renderCurrentPage()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

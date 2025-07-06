
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DashboardHome from './DashboardHome';
import FlightsPage from './FlightsPage';
import HotelsPage from './HotelsPage';
import LimousinesPage from './LimousinesPage';
import BookingsPage from './BookingsPage';

const EmployeeDashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isRTL, setIsRTL] = useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'flights':
        return <FlightsPage isEmployee={true} />;
      case 'hotels':
        return <HotelsPage isEmployee={true} />;
      case 'limousines':
        return <LimousinesPage isEmployee={true} />;
      case 'bookings':
        return <BookingsPage />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex w-full">
        <Sidebar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          isRTL={isRTL}
          userType="employee"
        />
        <div className="flex-1 flex flex-col">
          <Navbar isRTL={isRTL} setIsRTL={setIsRTL} userType="employee" />
          <main className="flex-1 p-6">
            {renderCurrentPage()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

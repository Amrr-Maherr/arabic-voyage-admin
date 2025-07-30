import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import RoomManagement from './RoomManagement';

const RoomManagerDashboard = () => {
  const [currentPage, setCurrentPage] = useState('room-management');
  const [isRTL, setIsRTL] = useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'room-management':
        return <RoomManagement />;
      default:
        return <RoomManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex w-full">
        <Sidebar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          isRTL={isRTL}
          userType="room-manager"
        />
        <div className="flex-1 flex flex-col">
          <Navbar isRTL={isRTL} setIsRTL={setIsRTL} userType="room-manager" />
          <main className="flex-1 p-6">
            {renderCurrentPage()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default RoomManagerDashboard;
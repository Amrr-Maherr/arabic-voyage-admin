import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import HotelDatePricing from './HotelDatePricing';

const DatePricingDashboard = () => {
  const [currentPage, setCurrentPage] = useState('date-pricing');
  const [isRTL, setIsRTL] = useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'date-pricing':
        return <HotelDatePricing />;
      default:
        return <HotelDatePricing />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex w-full">
        <Sidebar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          isRTL={isRTL}
          userType="date-pricing"
        />
        <div className="flex-1 flex flex-col">
          <Navbar isRTL={isRTL} setIsRTL={setIsRTL} userType="date-pricing" />
          <main className="flex-1 p-6">
            {renderCurrentPage()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DatePricingDashboard;
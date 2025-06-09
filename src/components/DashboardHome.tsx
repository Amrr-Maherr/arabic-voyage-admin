
import React from 'react';
import { Plane, Building2, Car, DollarSign, Calendar } from 'lucide-react';

const DashboardHome = () => {
  const stats = [
    {
      title: 'Flights',
      titleAr: 'الرحلات',
      value: '154',
      icon: Plane,
      gradient: 'flight-gradient',
      change: '+12%',
    },
    {
      title: 'Hotels',
      titleAr: 'الفنادق',
      value: '93',
      icon: Building2,
      gradient: 'hotel-gradient',
      change: '+8%',
    },
    {
      title: 'Limousines',
      titleAr: 'الليموزين',
      value: '41',
      icon: Car,
      gradient: 'limo-gradient',
      change: '+15%',
    },
    {
      title: "Today's Earnings",
      titleAr: 'أرباح اليوم',
      value: '$1,240',
      icon: DollarSign,
      gradient: 'earnings-gradient',
      change: '+5%',
    },
  ];

  const recentBookings = [
    { id: 1, type: 'Flight', customer: 'Sarah Johnson', destination: 'Cairo to Dubai', amount: '$350', status: 'Confirmed' },
    { id: 2, type: 'Hotel', customer: 'Mohamed Ali', destination: 'Nile Palace', amount: '$240', status: 'Pending' },
    { id: 3, type: 'Limousine', customer: 'Ahmed Zaki', destination: 'Airport Transfer', amount: '$80', status: 'Confirmed' },
    { id: 4, type: 'Flight', customer: 'Lisa Chen', destination: 'London to Cairo', amount: '$520', status: 'Confirmed' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Travel Dashboard</h1>
        <p className="text-gray-600">Monitor your travel business performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card-hover">
              <div className={`${stat.gradient} rounded-lg p-6 text-white shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-white/80 text-sm">{stat.change} from last month</p>
                  </div>
                  <Icon className="w-8 h-8 text-white/80" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
          <Calendar className="w-5 h-5 text-blue-500" />
        </div>
        <div className="space-y-3">
          {recentBookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  booking.status === 'Confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900">{booking.customer}</p>
                  <p className="text-sm text-gray-600">{booking.type} - {booking.destination}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{booking.amount}</p>
                <p className={`text-sm ${
                  booking.status === 'Confirmed' ? 'text-green-600' : 'text-yellow-600'
                }`}>{booking.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

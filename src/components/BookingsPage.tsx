
import React, { useState } from 'react';
import { Search, Filter, Calendar, Plane, Building2, Car, Eye, Edit, Trash2, Download } from 'lucide-react';

const BookingsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const bookings = [
    {
      id: 'BK001',
      type: 'flight',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.johnson@email.com',
      service: 'Cairo to Dubai',
      date: '2024-06-15',
      status: 'Confirmed',
      amount: '$450',
      bookingDate: '2024-06-01'
    },
    {
      id: 'BK002',
      type: 'hotel',
      customerName: 'Ahmed Mohamed',
      customerEmail: 'ahmed.mohamed@email.com',
      service: 'Nile Palace Hotel',
      date: '2024-06-20',
      status: 'Pending',
      amount: '$240',
      bookingDate: '2024-06-02'
    },
    {
      id: 'BK003',
      type: 'limousine',
      customerName: 'Lisa Chen',
      customerEmail: 'lisa.chen@email.com',
      service: 'Airport Transfer - Mercedes S',
      date: '2024-06-18',
      status: 'Completed',
      amount: '$150',
      bookingDate: '2024-06-03'
    },
    {
      id: 'BK004',
      type: 'flight',
      customerName: 'Mohamed Ali',
      customerEmail: 'mohamed.ali@email.com',
      service: 'London to Cairo',
      date: '2024-06-25',
      status: 'Confirmed',
      amount: '$380',
      bookingDate: '2024-06-04'
    },
    {
      id: 'BK005',
      type: 'hotel',
      customerName: 'Emma Wilson',
      customerEmail: 'emma.wilson@email.com',
      service: 'Red Dunes Resort',
      date: '2024-06-30',
      status: 'Cancelled',
      amount: '$500',
      bookingDate: '2024-06-05'
    },
    {
      id: 'BK006',
      type: 'limousine',
      customerName: 'Omar Hassan',
      customerEmail: 'omar.hassan@email.com',
      service: 'City Tour - BMW 7 Series',
      date: '2024-06-22',
      status: 'Confirmed',
      amount: '$200',
      bookingDate: '2024-06-06'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return <Plane className="w-4 h-4 text-blue-600" />;
      case 'hotel':
        return <Building2 className="w-4 h-4 text-green-600" />;
      case 'limousine':
        return <Car className="w-4 h-4 text-purple-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || booking.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getBookingStats = () => {
    const total = bookings.length;
    const flights = bookings.filter(b => b.type === 'flight').length;
    const hotels = bookings.filter(b => b.type === 'hotel').length;
    const limousines = bookings.filter(b => b.type === 'limousine').length;
    const totalRevenue = bookings.reduce((sum, booking) => {
      return sum + parseInt(booking.amount.replace('$', ''));
    }, 0);

    return { total, flights, hotels, limousines, totalRevenue };
  };

  const stats = getBookingStats();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Bookings</h1>
          <p className="text-gray-600">Manage all customer reservations and bookings</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-lg font-semibold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Plane className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Flights</p>
              <p className="text-lg font-semibold text-gray-900">{stats.flights}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <Building2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Hotels</p>
              <p className="text-lg font-semibold text-gray-900">{stats.hotels}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <Car className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Limousines</p>
              <p className="text-lg font-semibold text-gray-900">{stats.limousines}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-lg font-semibold text-gray-900">${stats.totalRevenue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by customer name, service, or booking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Types</option>
              <option value="flight">Flights</option>
              <option value="hotel">Hotels</option>
              <option value="limousine">Limousines</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getTypeIcon(booking.type)}
                      <span className="ml-2 font-medium text-gray-900">{booking.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{booking.customerName}</p>
                      <p className="text-sm text-gray-500">{booking.customerEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{booking.service}</p>
                      <p className="text-sm text-gray-500 capitalize">{booking.type} booking</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      {booking.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">{booking.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800" title="Edit Booking">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800" title="Cancel Booking">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;

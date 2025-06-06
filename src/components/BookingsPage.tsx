import React, { useState } from 'react';
import { Search, Filter, Calendar, Plane, Building2, Car, Eye, Edit, Trash2, Download, X, User, Mail, MapPin, CreditCard, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const BookingsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookings = [
    {
      id: 'BK001',
      type: 'flight',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.johnson@email.com',
      customerPhone: '+1 234 567 8900',
      service: 'Cairo to Dubai',
      date: '2024-06-15',
      status: 'Confirmed',
      amount: '$450',
      bookingDate: '2024-06-01',
      details: {
        departure: 'Cairo International Airport (CAI)',
        arrival: 'Dubai International Airport (DXB)',
        departureTime: '14:30',
        arrivalTime: '18:45',
        airline: 'Emirates',
        flightNumber: 'EK924',
        class: 'Economy',
        passengers: 1
      }
    },
    {
      id: 'BK002',
      type: 'hotel',
      customerName: 'Ahmed Mohamed',
      customerEmail: 'ahmed.mohamed@email.com',
      customerPhone: '+20 123 456 789',
      service: 'Nile Palace Hotel',
      date: '2024-06-20',
      status: 'Pending',
      amount: '$240',
      bookingDate: '2024-06-02',
      details: {
        checkIn: '2024-06-20',
        checkOut: '2024-06-23',
        nights: 3,
        roomType: 'Deluxe Suite',
        guests: 2,
        address: '123 Nile Corniche, Cairo, Egypt',
        amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant']
      }
    },
    {
      id: 'BK003',
      type: 'limousine',
      customerName: 'Lisa Chen',
      customerEmail: 'lisa.chen@email.com',
      customerPhone: '+1 555 123 4567',
      service: 'Airport Transfer - Mercedes S',
      date: '2024-06-18',
      status: 'Completed',
      amount: '$150',
      bookingDate: '2024-06-03',
      details: {
        pickupLocation: 'Downtown Hotel',
        dropoffLocation: 'Cairo International Airport',
        pickupTime: '08:00',
        vehicleType: 'Mercedes S-Class',
        driver: 'Mohamed Hassan',
        driverPhone: '+20 100 123 456',
        duration: '45 minutes'
      }
    },
    {
      id: 'BK004',
      type: 'flight',
      customerName: 'Mohamed Ali',
      customerEmail: 'mohamed.ali@email.com',
      customerPhone: '+20 111 222 333',
      service: 'London to Cairo',
      date: '2024-06-25',
      status: 'Confirmed',
      amount: '$380',
      bookingDate: '2024-06-04',
      details: {
        departure: 'Heathrow Airport (LHR)',
        arrival: 'Cairo International Airport (CAI)',
        departureTime: '22:15',
        arrivalTime: '05:30+1',
        airline: 'EgyptAir',
        flightNumber: 'MS777',
        class: 'Business',
        passengers: 1
      }
    },
    {
      id: 'BK005',
      type: 'hotel',
      customerName: 'Emma Wilson',
      customerEmail: 'emma.wilson@email.com',
      customerPhone: '+44 789 012 345',
      service: 'Red Dunes Resort',
      date: '2024-06-30',
      status: 'Cancelled',
      amount: '$500',
      bookingDate: '2024-06-05',
      details: {
        checkIn: '2024-06-30',
        checkOut: '2024-07-05',
        nights: 5,
        roomType: 'Presidential Suite',
        guests: 2,
        address: 'Red Sea Coast, Hurghada, Egypt',
        amenities: ['Private Beach', 'Diving Center', 'Golf Course', 'Multiple Restaurants']
      }
    },
    {
      id: 'BK006',
      type: 'limousine',
      customerName: 'Omar Hassan',
      customerEmail: 'omar.hassan@email.com',
      customerPhone: '+20 122 333 444',
      service: 'City Tour - BMW 7 Series',
      date: '2024-06-22',
      status: 'Confirmed',
      amount: '$200',
      bookingDate: '2024-06-06',
      details: {
        pickupLocation: 'Four Seasons Hotel',
        tour: 'Full Day Cairo City Tour',
        pickupTime: '09:00',
        vehicleType: 'BMW 7 Series',
        driver: 'Ahmed Mostafa',
        driverPhone: '+20 100 654 321',
        duration: '8 hours'
      }
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

  const renderBookingDetails = () => {
    if (!selectedBooking) return null;

    const { type, details } = selectedBooking;

    if (type === 'flight') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Flight Information</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Flight:</span> {details.flightNumber}</p>
                <p><span className="font-medium">Airline:</span> {details.airline}</p>
                <p><span className="font-medium">Class:</span> {details.class}</p>
                <p><span className="font-medium">Passengers:</span> {details.passengers}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Schedule</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Departure:</span> {details.departureTime}</p>
                <p><span className="font-medium">Arrival:</span> {details.arrivalTime}</p>
                <p><span className="font-medium">From:</span> {details.departure}</p>
                <p><span className="font-medium">To:</span> {details.arrival}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'hotel') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Stay Information</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Check-in:</span> {details.checkIn}</p>
                <p><span className="font-medium">Check-out:</span> {details.checkOut}</p>
                <p><span className="font-medium">Nights:</span> {details.nights}</p>
                <p><span className="font-medium">Room:</span> {details.roomType}</p>
                <p><span className="font-medium">Guests:</span> {details.guests}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
              <p className="text-sm mb-3">{details.address}</p>
              <h4 className="font-semibold text-gray-900 mb-2">Amenities</h4>
              <div className="flex flex-wrap gap-1">
                {details.amenities.map((amenity, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'limousine') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Service Information</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Vehicle:</span> {details.vehicleType}</p>
                <p><span className="font-medium">Pickup Time:</span> {details.pickupTime}</p>
                <p><span className="font-medium">Duration:</span> {details.duration}</p>
                {details.tour && <p><span className="font-medium">Tour:</span> {details.tour}</p>}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Locations</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Pickup:</span> {details.pickupLocation}</p>
                {details.dropoffLocation && <p><span className="font-medium">Drop-off:</span> {details.dropoffLocation}</p>}
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 mt-4">Driver</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Name:</span> {details.driver}</p>
                <p><span className="font-medium">Phone:</span> {details.driverPhone}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

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
                      <button 
                        className="text-blue-600 hover:text-blue-800" 
                        title="View Details"
                        onClick={() => setSelectedBooking(booking)}
                      >
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

      {/* Booking Details Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedBooking && getTypeIcon(selectedBooking.type)}
              Booking Details - {selectedBooking?.id}
            </DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Customer Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Name</p>
                    <p className="text-gray-600">{selectedBooking.customerName}</p>
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">{selectedBooking.customerEmail}</p>
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">{selectedBooking.customerPhone}</p>
                  </div>
                  <div>
                    <p className="font-medium">Booking Date</p>
                    <p className="text-gray-600">{selectedBooking.bookingDate}</p>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Service Details
                </h3>
                {renderBookingDetails()}
              </div>

              {/* Payment Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Payment Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Total Amount</p>
                    <p className="text-gray-600 text-lg font-semibold">{selectedBooking.amount}</p>
                  </div>
                  <div>
                    <p className="font-medium">Status</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedBooking.status)}`}>
                      {selectedBooking.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingsPage;

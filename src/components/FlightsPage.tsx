
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Plane, Clock, MapPin } from 'lucide-react';

const FlightsPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [flights, setFlights] = useState([
    {
      id: 1,
      flightNumber: 'EG205',
      airline: 'EgyptAir',
      departure: 'Cairo (CAI)',
      arrival: 'Dubai (DXB)',
      departureTime: '14:30',
      arrivalTime: '18:45',
      date: '2025-06-05',
      price: 350,
      status: 'On Time',
      seats: 180,
      bookedSeats: 142
    },
    {
      id: 2,
      flightNumber: 'BA401',
      airline: 'British Airways',
      departure: 'London (LHR)',
      arrival: 'Cairo (CAI)',
      departureTime: '09:15',
      arrivalTime: '15:30',
      date: '2025-06-05',
      price: 520,
      status: 'Delayed',
      seats: 220,
      bookedSeats: 195
    },
    {
      id: 3,
      flightNumber: 'LH502',
      airline: 'Lufthansa',
      departure: 'Frankfurt (FRA)',
      arrival: 'Cairo (CAI)',
      departureTime: '11:00',
      arrivalTime: '16:20',
      date: '2025-06-06',
      price: 480,
      status: 'Scheduled',
      seats: 200,
      bookedSeats: 167
    }
  ]);

  const handleEdit = (flight) => {
    setEditingFlight(flight);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    setFlights(flights.filter(flight => flight.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setShowAddForm(false);
    setEditingFlight(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Flight Management</h1>
          <p className="text-gray-600">Manage flight schedules and bookings</p>
        </div>
        <button
          onClick={() => {
            setEditingFlight(null);
            setShowAddForm(!showAddForm);
          }}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Flight</span>
        </button>
      </div>

      {/* Add/Edit Flight Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingFlight ? 'Edit Flight' : 'Add New Flight'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Flight Number</label>
              <input
                type="text"
                placeholder="e.g., EG205"
                defaultValue={editingFlight?.flightNumber || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Airline</label>
              <input
                type="text"
                placeholder="e.g., EgyptAir"
                defaultValue={editingFlight?.airline || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departure City</label>
              <input
                type="text"
                placeholder="e.g., Cairo (CAI)"
                defaultValue={editingFlight?.departure || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Arrival City</label>
              <input
                type="text"
                placeholder="e.g., Dubai (DXB)"
                defaultValue={editingFlight?.arrival || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
              <input
                type="time"
                defaultValue={editingFlight?.departureTime || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Time</label>
              <input
                type="time"
                defaultValue={editingFlight?.arrivalTime || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                defaultValue={editingFlight?.date || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                placeholder="Enter ticket price"
                defaultValue={editingFlight?.price || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Seats</label>
              <input
                type="number"
                placeholder="Enter seat capacity"
                defaultValue={editingFlight?.seats || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div className="lg:col-span-3 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingFlight(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                {editingFlight ? 'Update Flight' : 'Add Flight'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Flights Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Flight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Occupancy
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
              {flights.map((flight) => (
                <tr key={flight.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <Plane className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{flight.flightNumber}</p>
                        <p className="text-sm text-gray-500">{flight.airline}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{flight.departure}</p>
                        <p className="text-xs text-gray-500">{flight.departureTime}</p>
                      </div>
                      <div className="flex-1 border-t border-gray-300 relative">
                        <Plane className="w-4 h-4 text-gray-400 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{flight.arrival}</p>
                        <p className="text-xs text-gray-500">{flight.arrivalTime}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-gray-900">{flight.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">${flight.price}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900">{flight.bookedSeats}/{flight.seats}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(flight.bookedSeats / flight.seats) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      flight.status === 'On Time'
                        ? 'bg-green-100 text-green-800'
                        : flight.status === 'Delayed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {flight.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(flight)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(flight.id)}
                        className="text-red-600 hover:text-red-800"
                      >
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

export default FlightsPage;


import React, { useState } from 'react';
import { Plus, Edit, Trash2, Phone, MapPin, User } from 'lucide-react';

const LimousinesPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const limousines = [
    {
      id: 1,
      carType: 'Mercedes S-Class',
      model: '2023',
      driverName: 'Ahmed Zaki',
      contact: '+20 123 456 789',
      pricePerHour: 50,
      route: 'Cairo - Giza',
      date: '2025-06-05',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300'
    },
    {
      id: 2,
      carType: 'BMW 7 Series',
      model: '2023',
      driverName: 'Mohamed Ali',
      contact: '+20 123 456 790',
      pricePerHour: 45,
      route: 'Cairo Airport - Downtown',
      date: '2025-06-05',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300'
    },
    {
      id: 3,
      carType: 'Audi A8',
      model: '2022',
      driverName: 'Hassan Omar',
      contact: '+20 123 456 791',
      pricePerHour: 55,
      route: 'Alexandria - Cairo',
      date: '2025-06-06',
      status: 'Maintenance',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Limousine Management</h1>
          <p className="text-gray-600">Manage your luxury transportation fleet</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Limousine</span>
        </button>
      </div>

      {/* Add Limousine Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Limousine</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Car Type</label>
              <input
                type="text"
                placeholder="e.g., Mercedes S-Class"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model Year</label>
              <input
                type="text"
                placeholder="e.g., 2023"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Driver Name</label>
              <input
                type="text"
                placeholder="Enter driver name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <input
                type="tel"
                placeholder="+20 123 456 789"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price per Hour ($)</label>
              <input
                type="number"
                placeholder="Enter hourly rate"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Car Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
              <textarea
                rows={3}
                placeholder="Additional notes about the vehicle or service"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              ></textarea>
            </div>
            <div className="md:col-span-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add Limousine
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Limousines Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price/Hour
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
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
              {limousines.map((limo) => (
                <tr key={limo.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={limo.image}
                        alt={limo.carType}
                        className="w-12 h-12 rounded-lg object-cover mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{limo.carType}</p>
                        <p className="text-sm text-gray-500">{limo.model}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-gray-900">{limo.driverName}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Phone className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">{limo.contact}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">${limo.pricePerHour}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-gray-900">{limo.route}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{limo.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      limo.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : limo.status === 'Maintenance'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {limo.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
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

export default LimousinesPage;


import React, { useState } from 'react';
import { Plus, Star, Edit, Trash2, MapPin, Wifi, Coffee, Waves } from 'lucide-react';

const HotelsPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: 'Nile Palace',
      city: 'Cairo',
      stars: 4,
      rooms: 80,
      price: 120,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300',
      services: ['Wi-Fi', 'Breakfast', 'Pool']
    },
    {
      id: 2,
      name: 'Red Dunes Resort',
      city: 'Dubai',
      stars: 5,
      rooms: 150,
      price: 250,
      status: 'Inactive',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300',
      services: ['Wi-Fi', 'Breakfast', 'Pool']
    },
    {
      id: 3,
      name: 'Seaside Paradise',
      city: 'Alexandria',
      stars: 4,
      rooms: 120,
      price: 180,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300',
      services: ['Wi-Fi', 'Pool']
    }
  ]);

  const handleEdit = (hotel) => {
    setEditingHotel(hotel);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    setHotels(hotels.filter(hotel => hotel.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setShowAddForm(false);
    setEditingHotel(null);
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < count ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'Wi-Fi':
        return <Wifi className="w-4 h-4" />;
      case 'Breakfast':
        return <Coffee className="w-4 h-4" />;
      case 'Pool':
        return <Waves className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hotels Management</h1>
          <p className="text-gray-600">Manage your hotel inventory and bookings</p>
        </div>
        <button
          onClick={() => {
            setEditingHotel(null);
            setShowAddForm(!showAddForm);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Hotel</span>
        </button>
      </div>

      {/* Add/Edit Hotel Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingHotel ? 'Edit Hotel' : 'Add New Hotel'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
              <input
                type="text"
                placeholder="Enter hotel name"
                defaultValue={editingHotel?.name || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                placeholder="Enter city"
                defaultValue={editingHotel?.city || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Star Rating</label>
              <select 
                defaultValue={editingHotel?.stars || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select rating</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Rooms</label>
              <input
                type="number"
                placeholder="Enter room count"
                defaultValue={editingHotel?.rooms || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price per Night ($)</label>
              <input
                type="number"
                placeholder="Enter price"
                defaultValue={editingHotel?.price || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows={3}
                placeholder="Enter hotel description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 rounded" />
                  <Wifi className="w-4 h-4 mr-1" />
                  Wi-Fi
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 rounded" />
                  <Coffee className="w-4 h-4 mr-1" />
                  Breakfast
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 rounded" />
                  <Waves className="w-4 h-4 mr-1" />
                  Pool
                </label>
              </div>
            </div>
            <div className="md:col-span-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingHotel(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingHotel ? 'Update Hotel' : 'Add Hotel'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Hotels Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hotel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rooms
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price/Night
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Services
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
              {hotels.map((hotel) => (
                <tr key={hotel.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-12 h-12 rounded-lg object-cover mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{hotel.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-gray-900">{hotel.city}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex">{renderStars(hotel.stars)}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{hotel.rooms}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">${hotel.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {hotel.services.map((service, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          {getServiceIcon(service)}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      hotel.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {hotel.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(hotel)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(hotel.id)}
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

export default HotelsPage;

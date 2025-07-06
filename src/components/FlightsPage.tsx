import React, { useState } from 'react';
import { Plus, Edit, Trash2, Plane, Clock, MapPin } from 'lucide-react';

interface FlightsPageProps {
  isEmployee?: boolean;
}

const FlightsPage: React.FC<FlightsPageProps> = ({ isEmployee = false }) => {
  const isRTL = document.dir === 'rtl';
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFlight, setEditingFlight] = useState<number | null>(null);

  const flights = [
    {
      id: 1,
      from: 'القاهرة',
      to: 'دبي',
      airline: 'طيران الإمارات',
      departure: '08:00',
      arrival: '12:30',
      price: 450,
      date: '2025-06-05',
      status: 'متاح',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300'
    },
    {
      id: 2,
      from: 'نيويورك',
      to: 'لندن',
      airline: 'الخطوط الجوية البريطانية',
      departure: '14:00',
      arrival: '18:00',
      price: 600,
      date: '2025-06-06',
      status: 'متاح',
      image: 'https://images.unsplash.com/photo-1484150053570-71ca7a039c2f?w=300'
    },
    {
      id: 3,
      from: 'طوكيو',
      to: 'سيدني',
      airline: 'الخطوط الجوية اليابانية',
      departure: '21:00',
      arrival: '06:00',
      price: 800,
      date: '2025-06-07',
      status: 'محجوز',
      image: 'https://images.unsplash.com/photo-1549486250-d33a97a19c5f?w=300'
    }
  ];

  const handleEdit = (flightId: number) => {
    if (!isEmployee) {
      setEditingFlight(flightId);
    }
  };

  const handleDelete = (flightId: number) => {
    if (!isEmployee) {
      console.log('Deleting flight:', flightId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEmployee ? 'الرحلات الجوية' : 'إدارة الرحلات الجوية'}
          </h1>
          <p className="text-gray-600">
            {isEmployee ? 'عرض الرحلات الجوية المتاحة' : 'إدارة رحلاتك الجوية وحجوزاتك'}
          </p>
        </div>
        {!isEmployee && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>إضافة رحلة</span>
          </button>
        )}
      </div>

      {/* Add Form - Only for Admin */}
      {showAddForm && !isEmployee && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">إضافة رحلة جديدة</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">من</label>
              <input
                type="text"
                placeholder="مطار المغادرة"
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">إلى</label>
              <input
                type="text"
                placeholder="مطار الوصول"
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">شركة الطيران</label>
              <input
                type="text"
                placeholder="اسم شركة الطيران"
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">السعر ($)</label>
              <input
                type="number"
                placeholder="سعر التذكرة"
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">وقت المغادرة</label>
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">وقت الوصول</label>
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className={`md:col-span-2 flex justify-end space-x-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                إضافة رحلة
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
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  الرحلة
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  التوقيت
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  السعر
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  التاريخ
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  الحالة
                </th>
                {!isEmployee && (
                  <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                    الإجراءات
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {flights.map((flight) => (
                <tr key={flight.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <img
                        src={flight.image}
                        alt={flight.airline}
                        className="w-12 h-12 rounded-lg object-cover mr-3"
                      />
                      <div>
                        <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="font-medium text-gray-900">{flight.from} ← {flight.to}</span>
                        </div>
                        <p className="text-sm text-gray-500">{flight.airline}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      <div>
                        <p className="text-gray-900">{flight.departure} - {flight.arrival}</p>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 text-gray-900 font-medium ${isRTL ? 'text-right' : ''}`}>${flight.price}</td>
                  <td className={`px-6 py-4 text-gray-900 ${isRTL ? 'text-right' : ''}`}>{flight.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      flight.status === 'متاح'
                        ? 'bg-green-100 text-green-800'
                        : flight.status === 'مكتمل'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {flight.status}
                    </span>
                  </td>
                  {!isEmployee && (
                    <td className="px-6 py-4">
                      <div className={`flex space-x-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <button 
                          onClick={() => handleEdit(flight.id)}
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
                  )}
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

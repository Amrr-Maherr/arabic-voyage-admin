import React, { useState } from 'react';
import { Plus, Edit, Trash2, Plane, Clock, MapPin } from 'lucide-react';

const FlightsPage = () => {
  const isRTL = document.dir === 'rtl';
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [flights, setFlights] = useState([
    {
      id: 1,
      flightNumber: 'EG205',
      airline: 'مصر للطيران',
      departure: 'القاهرة (CAI)',
      arrival: 'دبي (DXB)',
      departureTime: '14:30',
      arrivalTime: '18:45',
      date: '2025-06-05',
      price: 350,
      status: 'في الموعد',
      seats: 180,
      bookedSeats: 142
    },
    {
      id: 2,
      flightNumber: 'BA401',
      airline: 'الخطوط الجوية البريطانية',
      departure: 'لندن (LHR)',
      arrival: 'القاهرة (CAI)',
      departureTime: '09:15',
      arrivalTime: '15:30',
      date: '2025-06-05',
      price: 520,
      status: 'متأخر',
      seats: 220,
      bookedSeats: 195
    },
    {
      id: 3,
      flightNumber: 'LH502',
      airline: 'لوفتهانزا',
      departure: 'فرانكفورت (FRA)',
      arrival: 'القاهرة (CAI)',
      departureTime: '11:00',
      arrivalTime: '16:20',
      date: '2025-06-06',
      price: 480,
      status: 'مجدول',
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
    // معالجة منطق إرسال النموذج هنا
    setShowAddForm(false);
    setEditingFlight(null);
  };

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة الرحلات الجوية</h1>
          <p className="text-gray-600">إدارة جدول الرحلات الجوية والحجوزات</p>
        </div>
        <button
          onClick={() => {
            setEditingFlight(null);
            setShowAddForm(!showAddForm);
          }}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>إضافة رحلة</span>
        </button>
      </div>

      {/* نموذج إضافة/تعديل رحلة */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingFlight ? 'تعديل رحلة' : 'إضافة رحلة جديدة'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الرحلة</label>
              <input
                type="text"
                placeholder="مثال: EG205"
                defaultValue={editingFlight?.flightNumber || ''}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">شركة الطيران</label>
              <input
                type="text"
                placeholder="مثال: مصر للطيران"
                defaultValue={editingFlight?.airline || ''}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">مدينة المغادرة</label>
              <input
                type="text"
                placeholder="مثال: القاهرة (CAI)"
                defaultValue={editingFlight?.departure || ''}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">مدينة الوصول</label>
              <input
                type="text"
                placeholder="مثال: دبي (DXB)"
                defaultValue={editingFlight?.arrival || ''}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">وقت المغادرة</label>
              <input
                type="time"
                defaultValue={editingFlight?.departureTime || ''}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">وقت الوصول</label>
              <input
                type="time"
                defaultValue={editingFlight?.arrivalTime || ''}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">التاريخ</label>
              <input
                type="date"
                defaultValue={editingFlight?.date || ''}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">السعر ($)</label>
              <input
                type="number"
                placeholder="أدخل سعر التذكرة"
                defaultValue={editingFlight?.price || ''}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">إجمالي المقاعد</label>
              <input
                type="number"
                placeholder="أدخل سعة المقاعد"
                defaultValue={editingFlight?.seats || ''}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div className={`lg:col-span-3 flex justify-end space-x-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingFlight(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                {editingFlight ? 'تحديث الرحلة' : 'إضافة رحلة'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* جدول الرحلات */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  الرحلة
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  المسار
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  الجدول
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  السعر
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  الإشغال
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  الحالة
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {flights.map((flight) => (
                <tr key={flight.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
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
                    <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
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
                    <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-gray-900">{flight.date}</span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 text-gray-900 font-medium ${isRTL ? 'text-right' : ''}`}>${flight.price}</td>
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
                      flight.status === 'في الموعد'
                        ? 'bg-green-100 text-green-800'
                        : flight.status === 'متأخر'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {flight.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex space-x-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
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